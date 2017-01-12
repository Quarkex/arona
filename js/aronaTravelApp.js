/**
 * aronaTravelApp.js
 * Initializes Arona.travel app in Angular.js
 *
 * Author: Manlio Joaquín García González (manliojoaquin@gmail.com)
 *
 * This file contains the initializator, values and methods for the app.
 * Provides behaviour to set localization based on url location, build
 * navigation trees and import panels and subpanels as required.
 *
 * Once loaded, you may use these variables and methods in your Angular app:
 *
 * - {{ translate( string, [prefix] ) }}
 *
 *   Fetch a localized alternative from the internal dictionary, or the string
 *   if none is found.
 *
 * - {{ page }}
 *
 *   Returns the internal page object, with variables like title or dictionary
 *   The page object act as a global scope variables holder.
 *
 * - {{ lang() }}
 *
 *   Returns the current language based on the url location as a string
 *
 * - {{ path() }}
 *
 *   Returns the current angular path location as a string
 *
 * - {{ sections() }}
 *
 *   Returns the current angular path location as an array
 *
 * - {{ current_section([String section]) }}
 *
 *   Returns the current section, or a boolean if a string is provided, true if matching
 *   the current section.
 *
 * - {{ level() }}
 *
 *   Returns the current angular path level of nesting as an integer
 *
 * - {{ nav }}
 *
 *   Returns a hash object with keys of navigation links. They can also have more content.
 *   E.G: {{ nav }} => {"AngularJS": {"href":"http://angularjs.org", "content":[...]}}
 *
 * - {{ sublinks( [String link] ) }}
 *
 *   Returns a hash with the last "content" value of the "link" var (current path by default),
 *   as seen in the nav object. Generally the child nodes, or the sibling nodes if the current
 *   node has no "content" value.
 *
 * - {{ breadcrumbs }}
 *
 *   Returns an object with arrays of navigation links based on current location.
 *   E.G: {{ breadcrumbs }} => [{"label":"home", "href":"#/"},{"label":"angular", "href":"#/angular"}]
 */

var app = angular.module("aronaTravelApp", ["ngRoute","ngResource","mm.foundation"]);

app.value('page', {
    'title': "Arona.travel",
    'dictionary':{},
    'panels':{}
});

app.service('language', ["$location", "$window", function($location, $window){

    this.current = $location.path().split('/')[1];


    this.available_languages = ['de', 'en', 'es', 'fi', 'fr', 'it', 'nl', 'ru', 'sv'];

    this.isValid = function(l){
        return this.available_languages.includes(l) ? true : false ;
    };

    this.window_lang = $window.navigator.language;

    this.default = this.isValid(this.window_lang.split('-')[0]) ? this.window_lang.split('-')[0] : 'en';

}]);


app.config(function($routeProvider) {
    var isValidLang = function($location, language){
        var current_lang = $location.path().split('/')[1];
        if ( ! language.isValid(current_lang) ) $location.path('/' + language.default );
    };

    $routeProvider
    .when("/:language", {
        templateUrl : "assets/panels/main.htm",
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/galeria", {
        redirectTo: "/:language/galeria/tour_virtual_360"
    })
    .when("/:language/planea_tu_viaje/donde_alojarse", {
        redirectTo: "/:language/planea_tu_viaje/donde_alojarse/hoteles"
    })
    .when("/:language/404", {
        templateUrl : "assets/404.htm",
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/planea_tu_viaje/donde_alojarse/:type/:territorial", {
        templateUrl : '/assets/panels/planea_tu_viaje/donde_alojarse/view.htm',
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/actividades/:activity", {
        templateUrl : '/assets/panels/actividades/view.htm',
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/eventos/:event", {
        templateUrl : '/assets/panels/eventos/view.htm',
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/:panel*", {
        templateUrl : function(urlattr){
            return '/assets/panels/' + urlattr.panel + '.htm';
        },
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("", {
        redirectTo: function(language){ return "/" + language.default; }
    })
    .otherwise({
        resolve:{ "check":isValidLang },
        redirectTo: function(urlattr){
            return '/' + urlattr.language + '/404';
        }
    });
});

app.controller("aronaTravelCtrl", function($rootScope, $location, $routeParams, $resource, page) {

    $rootScope.page = page;

    $rootScope.lang = function (){ return $routeParams.language; };

    $rootScope.params = $routeParams;

    $rootScope.location = $location;


    var Lang = $resource(

            // Url targeting the resource
            '/locales/:language.json',

            // Default values for url parameters. These can be overridden in actions methods.
            // If a parameter value is a function, it will be called every time a param value
            // needs to be obtained for a request (unless the param was overridden).
            // The function will be passed the current data value as an argument.
            //
            //  Given a template /path/:verb and parameter {verb:'greet', salutation:'Hello'}
            //  results in URL /path/greet?salutation=Hello.
            //
            //  If the parameter value is prefixed with @, then the value for that parameter
            //  will be extracted from the corresponding property on the data object (provided
            // when calling a "non-GET" action method). For example, if the defaultParam object is
            // {someParam: '@someProp'} then the value of someParam will be data.someProp. Note
            // that the parameter will be ignored, when calling a "GET" action method (i.e. an
            // action method that does not accept a request body)
            {
                language: $rootScope.lang() == undefined? 'en' : $rootScope.lang()
            }
    );
    Lang.get(function(data){
        for (var k in data){
            if (data.hasOwnProperty(k)) {
                page.dictionary[k] = data[k];
            }
        }
    });

    $rootScope.path = function (){ return $location.path(); };
    $rootScope.level = function (){ return $location.path().substring(1).split('/').length; };
    $rootScope.sections = function (){ return $location.path().substring(1).split('/'); };
    $rootScope.current_section = function (section){
        var sections = $rootScope.sections();
        if (section == undefined) return sections[sections.length - 1];
        else return ( section == sections[sections.length - 1] );
    };
    $rootScope.breadcrumbs = function() {
        var output = [];
        var path = $location.path().substr(1).split('/');
        var path_length = path.length;
        for (var i = 0; i < path_length; i++){
            var item = path[path.length - 1];
            item = {'label': item, 'href': '#/' + path.join('/')};
            if (i == 0) item.current = true;
            if (i == (path_length - 1) ) item.label = "inicio";
            output.push(item);
            path.pop();
        }
        output.reverse();
        return output;
    };

    $rootScope.nav = {};
    $resource('/api/fetch_navigation.json', {language:$rootScope.lang()}).get(function(data){
        $rootScope.nav = data;
    });
    $rootScope.sublinks = function(link){
        var sections = link == undefined ? $rootScope.sections() : '/' + $rootScope.lang() + link.substring(1).split('/');
        var sublinks = $rootScope.nav;
        for ( var i = 1; i < (sections.length + 1); i++){
            if ( sublinks.hasOwnProperty(sections[i]) ){
                if ( sublinks[sections[i]].hasOwnProperty('content') ){
                    sublinks = sublinks[sections[i]].content;
                } else break;
            } else break;
        }
        return sublinks;
    };

    $rootScope.translate = function(stringA, stringB ) {
        // this is to respect the less surprise directive. Prefixes should precede the target string
        var string = stringB == undefined ? stringA : stringB;
        var prefix = stringB == undefined ? null : stringA;

        if ( page.dictionary.hasOwnProperty( prefix == null? string : prefix + string ) ){
            string = page.dictionary[prefix == null ? string : prefix + string];
        }
        return string;
    };

    $rootScope.string_interpolate = function() {
        var args = Array.from(arguments);
        var string = args[0];

        for (var i = 0; i < args.length; i++){
            if ( args[i] != undefined) string = string.replace('{'+(i - 1)+'}', args[i]);
        }

        return string;
    };

    page.panels["home"] = {
        'url': '/api/fetch.json',
        'offset': 0,
        'limit': 3,
        'filters': {},
        'values': ['TITULO', 'F_INICIO_PUB', 'CODCONTENIDO', 'IMAGEN'],
        'elements': {}
    };

    page.panels["hoteles"] = {
        'set_page': function(p){
            var pages = Math.ceil(page.panels['hoteles'].elements.length / page.panels['hoteles'].limit);
            if (p >= 1 && p <= pages){
                page.panels['hoteles'].current_page = p;
            }
        },
        'previous_page': function(){
            if (page.panels['hoteles'].current_page > 1){
                page.panels['hoteles'].current_page = page.panels['hoteles'].current_page - 1;
            }
        },
        'next_page': function(){
            var pages = Math.ceil(page.panels['hoteles'].elements.length / page.panels['hoteles'].limit);
            if (page.panels['hoteles'].current_page < pages){
                page.panels['hoteles'].current_page = page.panels['hoteles'].current_page + 1;
            }
        },
        'offset': function(){
            return page.panels['hoteles'].limit * (page.panels['hoteles'].current_page - 1);
        },
        'limit': 4,
        'current_page': 1,
        'pages': function(){
            var output = [];
            var pages = Math.ceil(page.panels['hoteles'].elements.length / page.panels['hoteles'].limit);
            for (var i = 0; i < pages; i++){
                var item = {'number': (i + 1), 'href': (i + 1)};
                if ( item.number == page.panels['hoteles'].current_page ) item.current = true;
                output.push(item);
            }
            return output;
        },
        'page': function(){
            var output = [];
            var array= page.panels['hoteles'].elements;
            var offset = page.panels['hoteles'].limit * (page.panels['hoteles'].current_page - 1);
            var limit = page.panels['hoteles'].limit;
            for (var i = offset; (i - offset) <= limit; i++ ){
                if ( array[i] != undefined && output.length < limit){
                    output.push(array[i]);
                }
            }
            return output;
        },
        'filters': {"SUBTIPO": "Hoteles"},
        'values': ["MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
        'elements': []
    };

    var News = $resource(
            // parameterized URL template with parameters prefixed by : as in /user/:username
            page.panels["home"].url,
            // default values for url parameters
            {},
            // hash with declaration of custom actions
            {
                "get": {
                    "method": "POST",
                    "isArray": true
                }
            },
            // hash with custom settings
            {}
    );
    News.get(
        {
            language: $rootScope.lang() == undefined? 'en' : $rootScope.lang(),
            offset: page.panels["home"].offset,
            limit: page.panels["home"].limit,
            filters: page.panels["home"].filters,
            values: page.panels["home"].values,
            collection: "noticias"
        }, function(data){
        page.panels["home"].elements = data;
    });

    var Hotels = $resource(
            '/api/fetch.json',
            {},
            {
                "get": { "method": "POST","isArray": true }
            } 
    );
    Hotels.get( {
        language: $rootScope.lang() == undefined? 'en' : $rootScope.lang(),
        offset: page.panels["hoteles"].offset,
        limit: 0,
        filters: page.panels["hoteles"].filters,
        values: page.panels["hoteles"].values,
        collection: "territoriales"
    }, function(data){
        page.panels["hoteles"].elements = data;
    });

    var Territorial = $resource(
            '/api/fetch.json',
            {},
            {
                "get": { "method": "POST", "isArray": true }
            }
    );
    Territorial.get({
        language: $rootScope.lang() == undefined? 'en' : $rootScope.lang(),
        limit: 1,
        filters: {"CODCONTENIDO": $routeParams.territorial},
        /*CODCONTENIDO│CODIDIOMA│CODSUBTIPOCONT│SUBTIPO│CODCATEGORIA│CATEGORIA│IMAGEN│WEB_PROPIA│DOCUMENTO│CODZONA│ZONA│F_INICIO_PUB│F_FIN_PUB│F_REVISION│F_BAJA│NOVEDAD│F_INICIO_NOV│F_FIN_NOV│CODPROPIETARIO│NOMBRE│TITULO│DESCRIPCION_COMUN│DATOS_INTERES│PALABRAS_CLAVE│CODLOCALIDAD│DESCRIPCION│TIPO_VIA│NOMBRE_VIA│NUMERO│BLOQUE│PORTAL│ESCALERA│PLANTA│PUERTA│LOCAL│CODIGO_POSTAL│TELEFONO│FAX│EMAIL│NOMBRE_SOCIAL│VACACIONES│CIERRE│HORARIO│ACCESOS│SERV_PRINCIPALES│PUBLICADO│REF_VPORTAL*/
        values: ["MAPA_IFRAME", "MAPA","CODCONTENIDO","TITULO","ZONA","TELEFONO","FAX","WEB_PROPIA","DIRECCION","EMAIL","SERV_PRINCIPALES", "IMAGEN"],
        collection: "territoriales"
    }, function(data){
        page.panels["territorial"] = data[0];
    });

});
app.filter("trust", ['$sce', function($sce) {
      return function(htmlCode){
              return $sce.trustAsHtml(htmlCode);
                }
}]);
