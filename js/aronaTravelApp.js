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

var app = angular.module("aronaTravelApp", ["ngRoute","ngResource","mm.foundation", "tmh.dynamicLocale", "ngAnimate", "ngMaterial"]);

app.value('page', {
    'title': "Arona.travel",
    'panels':{}
});

app.value('constants', {
    "SUBTIPO_PRINCIPAL": {
        "apartamentos":                           "Apartamentos",
        "hoteles":                                "Hoteles",
        "pensiones":                              "Pensiones",
        "ialojamiento_rural":                     "Alojamiento Rural",
        "aparthoteles":                           "Aparthoteles"
    },
    "SUBTIPO": {
        "panflets":                               "Folletos / Trípticos"
    },
    "CODCONTENIDO": {
        "clima":                                  21687,
        "compromiso_con_la_calidad":              21849,
        "playa_de_las_vistas":                    22539,
        "playa_de_las_vistas_accesible":          2106,
        "playa_de_las_galletas":                  22569,
        "puerto_de_las_galletas":                 489,
        "plaza_de_arona":                         22543,
        "la_conquista_de_canarias":               4180,
        "los_cristianos":                         22573,
        "otras_webcams":                          22585
    },
    'CODSUBTIPOCONT':{
        "agencias_de_viaje":                      48,
        "alojamiento_rural":                      15,
        "alquiler_de_ayudas_tecnicas":            669,
        "alquiler_de_vehiculos":                  47,
        "apartahteles":                           659,
        "apartamentos":                           40,
        "arquitectura_tradicional":               490,
        "arona_unica":                            517,
        "arte_y_artesania":                       473,
        "auditorios":                             596,
        "biosphere":                              517,
        "centros_civicos":                        466,
        "centros_culturales":                     146,
        "ciclismo":                               454,
        "compras":                                157,
        "costumbres_y_folclore":                  490,
        "deporte_y_aventura":                     454,
        "discotecas_y_pubs":                      249,
        "espacios_naturales":                     327,
        "especialidades_nauticas":                454,
        "espectaculos":                           330,
        "estadisticas":                           592,
        "gimnasia_y_juegos_deportivos":           253,
        "golf":                                   310,
        "hipica":                                 454,
        "historia_de_arona":                      329,
        "hoteles":                                26,
        "informacion_portuaria":                  524,
        "instalaciones_deportivas":               321,
        "lugares_de_interes":                     331,
        "motor":                                  454,
        "museos":                                 250,
        "ocio_diurno":                            152, //parques temáticos y atracciones
        "ocio_y_playas":                          454,
        "oficinas_de_informacion":                145,
        "otras_especialidades":                   454,
        "otros_centros_de_congresos_de_tenerife": 398,
        "pastelerias":                            582,
        "pensiones":                              25,
        "por_mar_y_aire":                         150,
        "publicaciones_y_revistas":               522,
        "restaurantes":                           30,
        "salud_y_belleza":                        159,
        "senderismo":                             327,
        "situacion_orografia_y_vegetacion":       506,
        "sol_y_playa":                            154,
        "tenis_y_especialidades_con_raqueta":     454,
        "touroperadores":                         251,
        "transporte_publico":                     163,
        "webcam":                                 342,
        "zonas_de_acampada":                      18
    },
    'CODSUBAREAS':{
        "arquitectura_tradicional":               278,
        "biosphere":                              464,
        "ciclismo":                               323,
        "costumbres_y_folclore":                  155,
        "especialidades_nauticas":                169,
        "espectaculos":                           156,
        "hipica":                                 379,
        "motor":                                  268,
        "museos":                                 155,
        "ocio_y_playas":                          156,
        "otras_especialidades":                   174,
        "tenis_y_especialidades_con_raqueta":     175,
        "zonas_de_acampada":                      157
    },
    'CODAREAS':{
        "centros_culturales":                     6,
        "instalaciones_deportivas":               15,
        "ciclismo":                               15,
        "especialidades_nauticas":                15,
        "hipica":                                 15,
        "motor":                                  15,
        "otras_especialidades":                   15,
        "pastelerias":                            null,
        "tenis_y_especialidades_con_raqueta":     15
    }
});

function Languaje($location, $window, $resource, tmhDynamicLocale){

    var self = this;
    var scope_interface = [];

    this.variables = {
        'dictionary': {},
        //'available_languages': ['de', 'en', 'es', 'fi', 'fr', 'it', 'nl', 'ru', 'sv'],
        'available_languages': ['es', 'en'],
        // parameterized URL template with parameters prefixed by : as in /user/:username
        'url': '/locales/:language.json',
        // default values for url parameters
        'parameters': {},
        // hash with declaration of custom actions
        'actions': {
            "get": {
                "method": "POST"
            }
        },
        // hash with custom settings
        'settings': {}
    };

    this.dictionary = function(o){
        if (o !== undefined){
            for (var k in o){
                if (o.hasOwnProperty(k)) {
                    self.variables.dictionary[k] = o[k];
                }
            }
        }
        return self.variables.dictionary;
    };
    scope_interface.push("dictionary");

    this.current_language = function(l) {
        if (l !== undefined){
            var current_location = $location.path().split('/');
            if (! self.isValid(l)) l = self.default_language();
            if (current_location[1] != l){
                current_location[1] = l;
                current_location = current_location.join('/');
                $location.path( current_location );
                self.get();
            }
        }
        return $location.path().split('/')[1];
    }
    scope_interface.push("current_language");
    self.variables.parameters["language"] = self.current_language;

    this.available_languages = function(a){
        if (a !== undefined) if (Array.isArray(a)) self.variables.available_languages = a;
        return self.variables.available_languages;
    };
    scope_interface.push("available_languages");

    this.isValid = function(l){
        return this.available_languages().includes(l) ? true : false ;
    };

    this.window_lang = function(){
        return $window.navigator.language;
    };

    this.default_language = function(){
        var output = this.isValid(self.window_lang().split('-')[0]) ? self.window_lang().split('-')[0] : 'en';
        return output;
    };
    scope_interface.push("default_language");

    this.translate = function(stringA, stringB ) {
        // this is to respect the less surprise directive. Prefixes should precede the target string
        var string = stringB == undefined ? stringA : stringB;
        var prefix = stringB == undefined ? null : stringA;

        if ( self.dictionary().hasOwnProperty( prefix == null? string : prefix + string ) ){
            string = self.dictionary()[prefix == null ? string : prefix + string];
        }
        return string;
    };
    scope_interface.push("translate");

    // hash as seen by the final cgi
    this.values = {
        language: self.current_language
    };
    this.resource = $resource( self.variables.url, self.variables.parameters, self.variables.actions, self.variables.settings );

    this.get = function(){
        self.resource.get( self.values, function(data){
            if (data != null){
                for (var k in data){
                    if (data.hasOwnProperty(k)) {
                        self.variables.dictionary[k] = data[k];
                    }
                }
                tmhDynamicLocale.set(self.current_language());
            }
        });
    };

    this.expose_interface = function(scope){
        for ( var i = 0; i < scope_interface.length; i++ ){
            scope[scope_interface[i]] = self[scope_interface[i]];
        }
    }
}
app.service('language', ["$location", "$window", "$resource", "tmhDynamicLocale", Languaje]);

function ResourcePaginator(language, $resource){

    var self = this;
    var scope_interface = [];

    this.variables = {
        'elements': [],
        'stats': {
            'size': 0,
            'largest_size': 0
        },
        // parameterized URL template with parameters prefixed by : as in /user/:username
        'url': 'api/fetch.json',
        // default values for url parameters
        'parameters': {},
        // hash with declaration of custom actions
        'actions': {
            "get": {
                "method": "POST",
                "isArray": true
            }
        },
        // hash with custom settings
        'settings': {}
    };

    // hash as seen by the final cgi
    this.values = {
        language: language.current_language(),
        offset: 0,
        limit: 0,
        filters: {},
        values: [],
        collection: null,
        stats: true
    };

    this.resource = $resource( self.variables.url, self.variables.parameters, self.variables.actions, self.variables.settings );

    function get(){
        self.elements([]);
        self.resource.get( self.values, function(data){
            if (self.values.collection != null) {
                if (data[0] == null){
                    console.warn("Got a null array. Probably no such collection: " + self.values.collection);
                } else {
                    if (true == self.values.stats){
                        var stats = data.pop();
                        self.size(stats.size);
                        self.last_modified(stats.last_modified);
                    }
                    if (data.length > 0){
                        var last_item = data[data.length - 1];
                        while ( last_item.hasOwnProperty("error")){
                            var error_object = data.pop();
                            console.warn("API responded with the following error: " + error_object.error);
                            console.warn("Backtrace:");
                            console.warn(error_object.backtrace);
                            console.warn("Offending parameters:");
                            console.warn(error_object.parameters);
                            if (data.length > 0) last_item = data[data.length - 1];
                            else last_item = {};
                        }
                    }
                    self.elements(data);
                }
            }
        });
    }

    this.elements = function(e){
        if (e != undefined){
            self.variables.elements = e;
        }
        return self.variables.elements;
    };
    scope_interface.push("elements");

    this.size = function(s){
        if (s != undefined){
            if (s >= 0){
                self.variables.stats.size = s;
                if (s > self.variables.stats.largest_size) self.largest_size(s);
            }
        }
        return self.variables.stats.size;
    };
    scope_interface.push("size");

    this.largest_size = function(s){
        if (s != undefined){
            if (s >= 0) self.variables.stats.largest_size = s;
        }
        return self.variables.stats.largest_size;
    };
    scope_interface.push("largest_size");

    this.last_modified = function(d){
        if (d != undefined){
            if (d != '' && d != null) self.variables.last_modified = d;
        }
        if (self.variables.last_modified == undefined) return '';
        else return self.variables.stats.last_modified;
    };
    scope_interface.push("last_modified");

    this.pages = function(){
        var output = [];
        var pages = Math.ceil(self.size() / self.page_size());
        for (var i = 0; i < pages; i++){
            var item = {'number': (i + 1), 'href': (i + 1)};
            if ( item.number == self.page() ) item.current = true;
            output.push(item);
        }
        return output;
    };
    scope_interface.push("pages");

    this.paginator_pages = function(p){
        if (p == undefined) p = 6;
        var output = [];
        var pages = self.pages();
        var current_page = self.page();
        var last_page = pages.length;
        for (var i=0; i < pages.length; i++){
            var page = i + 1;

            var lower_limit = Math.floor( p / 2 );
            var upper_limit = last_page - Math.floor( p / 2 );

            var is_first_page = (page == 1);
            var is_second_page = (page == 2);
            var is_last_page = (page == last_page);
            var is_second_to_last_page = (page == last_page - 1);

            if ( is_second_page && current_page > lower_limit ) p--;
            if ( is_second_to_last_page && current_page < upper_limit ) p--;

            var lower_offset = current_page - lower_limit;
            var upper_offset = current_page + lower_limit;
            if (lower_offset < 0) upper_offset += Math.abs(lower_offset);
            // TODO: modify offset for end pages too

            switch (true){
                case (is_first_page || is_last_page):
                    output.push(pages[i]);
                    break;
                case ( (is_second_page && current_page > lower_limit ) || ( is_second_to_last_page && current_page < upper_limit ) ):
                    output.push({"number": "...", "disabled": true});
                    break;
                case ((page <= lower_offset) || (page >= upper_offset)):
                    break;
                default:
                    output.push(pages[i]);
            }
        }
        return output;
    };
    scope_interface.push("paginator_pages");

    this.page = function(p){
        if (p != undefined){
            var target = ( (p - 1) * self.page_size() );
            var max = ( Math.ceil(self.size() / self.page_size()) * self.page_size() );
            if (target >= 0 && target <= max) self.set_values({offset: target});
        }
        return Math.ceil(self.values.offset / self.page_size()) + 1;
    };
    scope_interface.push("page");

    this.page_size = function(p){
        if (p != undefined){
            if (p > 0){
                self.set_values({limit: p});
            }
        }
        return self.values.limit;
    };
    scope_interface.push("page_size");

    this.previous_page = function(){
        var target =  self.values.offset - self.page_size();
        if ( target >= 0 ) self.set_values({offset: target});
    };
    scope_interface.push("previous_page");

    this.next_page = function(){
        var max = ( ( Math.ceil(self.size() / self.page_size() ) - 1 ) * self.page_size() );
        var target = self.values.offset + self.page_size();
        if ( target <= max ) self.set_values({offset: target});
    };
    scope_interface.push("next_page");

    this.filter = function(f, v){
        if (f === undefined) return null;
        if (v !== undefined){
            if (!angular.equals(self.values.filters[f], v)){
                var o = {};
                o[f] = v;
                self.set_values({"offset": 0, "filters": o});
            }
        }
        if (self.values.filters[f] === undefined){
            return null;
        } else {
            return self.values.filters[f];
        }
    };
    scope_interface.push("filter");

    this.filters = function(o){
        if (o !== undefined){
            self.set_values({ "offset": 0, "filters": o });
        }
        return self.values.filters;
    };
    scope_interface.push("filters");

    this.toggle_filter = function(f, v){
        if (f === undefined) return null;
        if (v !== undefined){
            var o = {};
            o[f] = (angular.equals(self.values.filters[f], v)) ? null : v;
            self.set_values({"offset": 0, "filters": o});
        }
        if (self.values.filters[f] === undefined){
            return null;
        } else {
            return self.values.filters[f];
        }
    };
    scope_interface.push("toggle_filter");

    this.set_values = function( new_values ){
        var values_changed = false;
        for (var k in new_values){
            if (new_values.hasOwnProperty(k)) {
                //FIXME this should be refactored to check object equality
                //this “if” statement is a quick'n'dirty fix
                if (typeof new_values[k] == 'object'){
                    // begin of duplicate code
                    values_changed = true;
                    // if it's a non-null object...
                    if (self.values[k] !== null && typeof self.values[k] === 'object'){
                        var values = new_values[k];
                        // ...for every value in it...
                        for ( var value in values) if (values.hasOwnProperty(value)) {
                            // if it's not null, update it
                            if (values[value] != null) self.values[k][value] = values[value];
                            // else, remove it
                            else delete self.values[k][value];
                        }

                    } else {
                        // if it's not an object, replace it
                        self.values[k] = new_values[k];
                    }
                    // end of duplicate code
                } else {
                    if (!angular.equals(self.values[k], new_values[k])){
                        values_changed = true;
                        // if it's a non-null object...
                        if (self.values[k] !== null && typeof self.values[k] === 'object'){
                            var values = new_values[k];
                            // ...for every value in it...
                            for ( var value in values) if (values.hasOwnProperty(value)) {
                                // if it's not null, update it
                                if (values[value] != null) self.values[k][value] = values[value];
                                // else, remove it
                                else delete self.values[k][value];
                            }

                        } else {
                            // if it's not an object, replace it
                            self.values[k] = new_values[k];
                        }
                    }
                }
            }
        }
        if (values_changed) get();
    };

    this.expose_interface = function(scope){
        for ( var i = 0; i < scope_interface.length; i++ ){
            scope[scope_interface[i]] = self[scope_interface[i]];
        }
    }

}

app.config(function($routeProvider, tmhDynamicLocaleProvider, $animateProvider, $mdThemingProvider) {
    var isValidLang = function($location, language){
        language.current_language($location.path().split('/')[1]);
    };

    $animateProvider.classNameFilter(/angular-animate/);

    tmhDynamicLocaleProvider.localeLocationPattern('/js/angularjs/i18n/angular-locale_{{locale}}.js');

    // By default, shades 500, 300 800 and A100 are used for primary and warn intentions, while A200, A100, A400 and A700 are used for accent.
    $mdThemingProvider.extendPalette('indigo', {
        '400': '#15388a',
        'contrastDefaultColor': 'dark'
    });
    $mdThemingProvider.extendPalette('pink', {
        '400': '#d2251a',
        'contrastDefaultColor': 'light'
    });
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'default': '400', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })


    $routeProvider
    .when("/:language", {
        templateUrl : "assets/panels/main.htm",
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/galeria", {
        redirectTo: "/:language/galeria/arona_360"
    })
    .when("/:language/destino_arona/datos_generales", {
        redirectTo: "/:language/destino_arona/datos_generales/situacion_orografia_y_vegetacion"
    })
    .when("/:language/destino_arona/un_poco_de_historia", {
        redirectTo: "/:language/destino_arona/un_poco_de_historia/la_conquista_de_canarias"
    })
    .when("/:language/destino_arona/patrimonio_cultural", {
        redirectTo: "/:language/destino_arona/patrimonio_cultural/arquitectura_tradicional"
    })
    .when("/:language/planea_tu_viaje/donde_alojarse", {
        redirectTo: "/:language/planea_tu_viaje/donde_alojarse/hoteles"
    })
    .when("/:language/planea_tu_viaje/como_llegar", {
        redirectTo: "/:language/planea_tu_viaje/como_llegar/por_mar_y_aire"
    })
    .when("/:language/planea_tu_viaje/como_moverse", {
        redirectTo: "/:language/planea_tu_viaje/como_moverse/transporte_publico"
    })
    .when("/:language/planea_tu_viaje/destino_accesible", {
        redirectTo: "/:language/planea_tu_viaje/destino_accesible/playa_de_las_vistas_accesible"
    })
    .when("/:language/planea_tu_viaje/destino_accesible/donde_alojarse", {
        redirectTo: "/:language/planea_tu_viaje/destino_accesible/hoteles"
    })
    .when("/:language/vive_tu_estancia/actividades_recomendadas", {
        redirectTo: "/:language/vive_tu_estancia/actividades_recomendadas/deporte_y_aventura/instalaciones_deportivas"
    })
    .when("/:language/vive_tu_estancia/gastronomia", {
        redirectTo: "/:language/vive_tu_estancia/gastronomia/restaurantes"
    })
    .when("/:language/vive_tu_estancia/cultura", {
        redirectTo: "/:language/vive_tu_estancia/cultura/museos"
    })
    .when("/:language/vive_tu_estancia/ocio_nocturno", {
        redirectTo: "/:language/vive_tu_estancia/ocio_nocturno/discotecas_y_pubs"
    })
    .when("/:language/vive_tu_estancia/naturaleza_y_paisajes", {
        redirectTo: "/:language/vive_tu_estancia/naturaleza_y_paisajes/senderismo"
    })
    .when("/:language/vive_tu_estancia/congresos_y_negocios", {
        redirectTo: "/:language/vive_tu_estancia/congresos_y_negocios/hoteles"
    })
    .when("/:language/area_profesional/descargas", {
        redirectTo: "/:language/area_profesional/descargas/biosphere"
    })
    .when("/:language/webcams", {
        redirectTo: "/:language/webcams/playa_de_las_vistas"
    })
    .when("/:language/404", {
        templateUrl : "assets/404.htm",
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/:section/:type", {
        templateUrl :function(urlattr){
            var url = '/assets/panels';
            var path = [ urlattr.section, urlattr.type ];
            var custom_values = [
                [],
                ["oficinas_de_informacion","lugares_de_interes","arona_360","albumes","videos","folletos_y_mapas","destino_accesible"]
            ];
            for (var i = 0; i < path.length; i++){
                switch(i){
                    case 1:
                        if (custom_values[i].includes(path[i])) url += '/' + path[i];
                        break;
                    default:
                        url += '/' + path[i];
                }
            }
            url += isNaN(path[path.length -1]) ? "/browser.htm" : "/view.htm";
            return url;
        },
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/:section/:subsection/:type", {
        templateUrl :function(urlattr){
            var url = '/assets/panels';
            var path = [ urlattr.section, urlattr.subsection, urlattr.type ];
            var custom_values = [
                [],
                ["destino_accesible","descargas"],
                ["guia_de_accesibilidad", "videos", "playa_de_las_vistas_accesible", "clima", "compromiso_con_la_calidad","la_conquista_de_canarias"]
            ];
            for (var i = 0; i < path.length; i++){
                switch(i){
                    case 1:
                    case 2:
                        if (custom_values[i].includes(path[i])) url += '/' + path[i];
                        break;
                    default:
                        url += '/' + path[i];
                }
            }
            url += isNaN(path[path.length -1]) ? "/browser.htm" : "/view.htm";
            return url;
        },
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/:section/:subsection/:type/:id", {
        templateUrl :function(urlattr){
            var url = '/assets/panels';
            var path = [ urlattr.section, urlattr.subsection, urlattr.type, urlattr.id ];
            var custom_values = [
                ["vive_tu_estancia", "planea_tu_viaje"],
                ["destino_accesible", "donde_alojarse"],
                ["donde_alojarse"]
            ];
            for (var i = 0; i < path.length; i++){
                switch(i){
                    case 1:
                    case 2:
                        if (custom_values[i].includes(path[i])) url += '/' + path[i];
                        break;
                    case 3:
                        break;
                    default:
                        url += '/' + path[i];
                }
            }
            url += isNaN(path[path.length -1]) ? "/browser.htm" : "/view.htm";
            return url;
        },
        resolve:{ "check":isValidLang },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/vive_tu_estancia/:subsection", {
        templateUrl : '/assets/panels/vive_tu_estancia/browser.htm',
        resolve:{ "check":isValidLang },
        controller: "activityCtrl"
    })
    .when("/:language/territoriales/:type/:id", {
        templateUrl : '/assets/panels/territoriales/view.htm',
        resolve:{ "check":isValidLang },
        controller: "territorialesCtrl"
    })
    .when("/:language/actividades/:activity", {
        templateUrl : '/assets/panels/actividades/view.htm',
        resolve:{ "check":isValidLang },
        controller: "activityCtrl"
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
        // FIXME: this is not triggering when it should
        redirectTo: function(language){ return "/" + language.default_language; }
    })
    .otherwise({
        // TODO: this should redirect to a 404 page
        resolve:{ "check":isValidLang },
        redirectTo: function(urlattr){
            return '/' + urlattr.language + '/';
        }
    });
});

//FIXME this doesnt handle $routeParams variables and such
var resourceControllers = {
    //"apartments": {
    //    "controllerElements": ["$rootScope", "$scope"],
    //    "controllerValues": {
    //        "collection": "territoriales",
    //        "filters": {"SUBTIPO_PRINCIPAL": "Apartamentos"},
    //        "values": ["MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    //        "offset": 0,
    //        "limit": 100
    //    },
    //    "singleElement": false 
    //},
    //"hotels": {
    //    "controllerElements": ["$rootScope", "$scope"],
    //    "controllerValues": {
    //        "collection": "territoriales",
    //        "filters": {"SUBTIPO_PRINCIPAL": "Hoteles"},
    //        "values": ["MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    //        "offset": 0,
    //        "limit": 100
    //    },
    //    "singleElement": false
    //},
    //"hostels": {
    //    "controllerElements": ["$rootScope", "$scope"],
    //    "controllerValues": {
    //        "collection": "territoriales",
    //        "filters": {"SUBTIPO_PRINCIPAL": "Pensiones"},
    //        "values": ["MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    //        "offset": 0,
    //        "limit": 100
    //    },
    //    "singleElement": false
    //},
    //"ruralHostels": {
    //    "controllerElements": ["$rootScope", "$scope"],
    //    "controllerValues": {
    //        "collection": "territoriales",
    //        "filters": {"SUBTIPO_PRINCIPAL": "Alojamiento Rural"},
    //        "values": ["MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    //        "offset": 0,
    //        "limit": 100
    //    },
    //    "singleElement": false
    //},
    //"aparthotels": {
    //    "controllerElements": ["$rootScope", "$scope"],
    //    "controllerValues": {
    //        "collection": "territoriales",
    //        "filters": {"SUBTIPO_PRINCIPAL": "Aparthoteles"},
    //        "values": ["MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    //        "offset": 0,
    //        "limit": 100
    //    },
    //    "singleElement": false
    //},
    "panflets": {
        "controllerElements": ["$rootScope", "$scope"],
        "controllerValues": {
            "collection": "documentales",
            "filters": {"SUBTIPO": "Folletos / Trípticos"},
            "values": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"],
            "offset": 0,
            "limit": 8
        },
        "singleElement": false
    },
    "virtualTour": {
        "controllerElements": ["$rootScope", "$scope"],
        "controllerValues": {
            "collection": "recursos",
            "filters": {"TIPO": "Vista 360"},
            "values": ['TITULO', 'HREF', 'CODCONTENIDO', 'IMAGEN'],
            "offset": 0,
            "limit": 1000
        },
        "singleElement": false
    },
    "video": {
        "controllerElements": ["$rootScope", "$scope"],
        "controllerValues": {
            "collection": "descriptivos",
            "filters": {"CODSUBTIPOCONT": 441, "CODAREAS": 16},
            "values": ['TITULO', 'HREF', 'CODCONTENIDO', 'IMAGEN', 'DESCRIPCION_COMUN'],
            "offset": 0,
            "limit": 10
        },
        "singleElement": false
    },
    "album": {
        "controllerElements": ["$rootScope", "$scope"],
        "controllerValues": {
            "collection": "descriptivos",
            "filters": {"CODSUBTIPOCONT": 290, "CODAREAS": 16},
            "values": ['TITULO', 'HREF', 'CODCONTENIDO', 'IMAGEN', 'DESCRIPCION_COMUN'],
            "offset": 0,
            "limit": 10
        },
        "singleElement": false
    },
    "activities": {
        "controllerElements": ["$rootScope", "$scope"],
        "controllerValues": {
            "collection": "actividades",
            "filters": {"CODSUBTIPOCONT": 595, "CODAREAS": 16},
            "values": ['TITULO', 'F_INICIO', 'CODCONTENIDO', 'IMAGEN'],
            "offset": 0,
            "limit": 6
        },
        "singleElement": false
    }
};

// FIXME For some reason the following code only loads the last instance in “resourceControllers”
/*
var Ctrls = {};
for (var ctrl in resourceControllers) if (resourceControllers.hasOwnProperty(ctrl)){
    var controller = resourceControllers[ctrl];

    var controllerElements = controller["controllerElements"];
    controllerElements.push(ctrl);

    var controllerClosure = function(){
        var service = arguments[arguments.length - 1];
        console.log(service);
        service.expose_interface($scope);
        if (controller["singleElement"]) $scope.element = function(){return service.elements()[0]};
        var values = {};
        for (var k in controller["controllerValues"]){
            if (controller["controllerValues"].hasOwnProperty(k)) values[k] = controller["controllerValues"][k];
        }
        console.log(values);
        service.set_values(values);
    };
    controllerClosure = controllerClosure.toString();
    controllerClosure = controllerClosure.slice( controllerClosure.indexOf("{") + 1,  controllerClosure.lastIndexOf("}"));
    controllerElements.push(controllerClosure);

    var wrapper = function(args) {
        return function() {
            return Function.apply(this, args);
        };
    };

    Ctrls[ctrl] = wrapper(controllerElements)();
}
var serviceElements = ["language", "$resource", ResourcePaginator];
for (var k in Ctrls) if (Ctrls.hasOwnProperty(k)){
    app.service(k, serviceElements);
    app.controller(k + "Ctrl", Ctrls[k]);
}
*/

app.service('territoriales', ["language", "$resource", ResourcePaginator]);
app.controller("territorialesCtrl", function($scope, territoriales, constants) {

    territoriales.expose_interface($scope);

    var filters = function() {
        var section = $scope.path().split('/').pop();
        var output = { "$and": [] };

        var process_variable = function(variable){
            if (constants[variable].hasOwnProperty(section)){
                value = constants[variable][section];
                if ( Array.isArray(value) ){
                    if (variable == "CODAREAS") value.push(16);
                    var options = [];
                    for ( var j = 0; j < value.length; j++ ){
                        var filter = {};
                        filter[variable] = value[j];
                        options.push(filter);
                    }
                    return { "$or": options };
                } else {
                    var filter = {};
                    filter[variable] = value;
                    return filter;
                }
            } else if (variable == "CODAREAS") {
                // If no CODAREAS given, assume it's Turismo
                return { "CODAREAS": 16 };
            } else return null;
        };

        var variables = ["SUBTIPO_PRINCIPAL", "CODSUBTIPOCONT", "CODAREAS", "CODSUBAREAS"];
        variables.forEach(function(element, index){
            var filter = process_variable(element);
            if (filter != null) output.$and.push(filter);
        });

        return output;
    };

    territoriales.set_values({
        "collection": "territoriales",
        "filters": filters(),
        "values": ["MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
        "offset": 0,
        "limit": 100
    });
});

app.service('accesibilidad', ["language", "$resource", ResourcePaginator]);
app.controller("accesibilidadCtrl", function($scope, $routeParams, accesibilidad, constants) {

    accesibilidad.expose_interface($scope);

    var section = $scope.path().split('/').pop();
    var codeSubtipo = constants["CODSUBTIPOCONT"].hasOwnProperty(section) ? constants["CODSUBTIPOCONT"][section] : null;
    var codeSubarea = constants["CODSUBAREAS"].hasOwnProperty(section) ? constants["CODSUBAREAS"][section] : null;
    var codeArea = constants["CODAREAS"].hasOwnProperty(section) ? constants["CODAREAS"][section] : 16;

    accesibilidad.set_values({
        "collection": "territoriales",
        "filters": {"CODSUBTIPOCONT": codeSubtipo, "CODAREAS": codeArea, "CODSUBAREAS": codeSubarea, "VALORESINDICADORES": { $in:[37] } },
        "values": ["MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
        "offset": 0,
        "limit": 100
    });
});

app.service('descriptivos', ["language", "$resource", ResourcePaginator]);
app.controller("descriptivosCtrl", function($scope, $routeParams, descriptivos, constants) {

    descriptivos.expose_interface($scope);

    $scope.element = function(){return descriptivos.elements()[0]};

    var codeSubtipo = constants["CODSUBTIPOCONT"].hasOwnProperty($routeParams.type) ? constants["CODSUBTIPOCONT"][$routeParams.type] : null;
    var codeSubarea = constants["CODSUBAREA"].hasOwnProperty($routeParams.type) ? constants["CODSUBAREA"][$routeParams.type] : null;

    descriptivos.set_values({
        "collection": "descriptivos",
        "filters": {"CODSUBTIPOCONT": codeSubtipo, "CODAREAS": 16, "CODSUBAREAS": codeSubarea },
        "values": ['TITULO', 'HREF', 'CODCONTENIDO', 'IMAGEN', 'DESCRIPCION_COMUN','TEXTO'],
        "offset": 0,
        "limit": 100
    });
});

app.service('documentales', ["language", "$resource", ResourcePaginator]);
app.controller("documentalesCtrl", function($scope, documentales, constants) {

    documentales.expose_interface($scope);

    var section = $scope.path().split('/').pop();
    var codeSubtipo = constants["CODSUBTIPOCONT"].hasOwnProperty(section) ? constants["CODSUBTIPOCONT"][section] : null;
    var codeSubarea = constants["CODSUBAREAS"].hasOwnProperty(section) ? constants["CODSUBAREAS"][section] : null;
    var codeArea = constants["CODAREAS"].hasOwnProperty(section) ? constants["CODAREAS"][section] : 16;

    documentales.set_values({
        "collection": "documentales",
        "filters": {"CODSUBTIPOCONT": codeSubtipo, "CODAREAS": codeArea, "CODSUBAREAS": codeSubarea },
        "values": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"],
        "offset": 0,
        "limit": 100
    });
});

app.service('panflets', ["language", "$resource", ResourcePaginator]);
app.controller("panfletsCtrl", function($rootScope, $scope, panflets) {
    panflets.expose_interface($scope);
    panflets.set_values(resourceControllers["panflets"]["controllerValues"]);
});

app.service('guiaAccesibilidad', ["language", "$resource", ResourcePaginator]);
app.controller("guiaAccesibilidadCtrl", function($rootScope, $scope, guiaAccesibilidad) {

    guiaAccesibilidad.expose_interface($scope);

    guiaAccesibilidad.set_values({
        "collection": "documentales",
        "filters": {"CODSUBTIPOCONT": 292, "CODAREAS": 16, "CODSUBAREAS": 277},
        "values": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"],
        "offset": 0,
        "limit": 8
    });
});

app.service('virtualTour', ["language", "$resource", ResourcePaginator]);
app.controller("virtualTourCtrl", function($rootScope, $scope, virtualTour) {
    virtualTour.expose_interface($scope);
    virtualTour.set_values(resourceControllers["virtualTour"]["controllerValues"]);
});

app.service('video', ["language", "$resource", ResourcePaginator]);
app.controller("videoCtrl", function($scope, video) {
    video.expose_interface($scope);
    video.set_values(resourceControllers["video"]["controllerValues"]);
});

app.service('album', ["language", "$resource", ResourcePaginator]);
app.controller("albumCtrl", function($scope, album) {
    album.expose_interface($scope);
    album.set_values(resourceControllers["album"]["controllerValues"]);
});

app.service('videoAccesible', ["language", "$resource", ResourcePaginator]);
app.controller("videoAccesibleCtrl", function($scope, videoAccesible) {

    videoAccesible.expose_interface($scope);
    videoAccesible.set_values({
        "collection": "descriptivos",
        "filters": {"CODSUBTIPOCONT": 441, "CODAREAS": 16, "CODSUBARES": 277},
        "values": ['TITULO', 'HREF', 'CODCONTENIDO', 'IMAGEN', 'DESCRIPCION_COMUN'],
        "offset": 0,
        "limit": 10
    });
});

app.service('descriptivo', ["language", "$resource", ResourcePaginator]);
app.controller("descriptivoCtrl", function($scope, $routeParams, descriptivo, constants) {

    descriptivo.expose_interface($scope);

    $scope.element = function(){return descriptivo.elements()[0]};

    var section = $scope.path().split('/').pop();
    var code = constants["CODCONTENIDO"].hasOwnProperty(section) ? constants["CODCONTENIDO"][section] : null;

    descriptivo.set_values({
        "collection": "descriptivos",
        "filters": {"CODCONTENIDO": { $in: [code, parseInt (section)]}},
        "values": ['TITULO', 'HREF', 'CODCONTENIDO', 'IMAGEN', 'DESCRIPCION_COMUN','TEXTO'],
        "offset": 0,
        "limit": 1
    });
});


app.service('activities', ["language", "$resource", ResourcePaginator]);
app.controller("activitiesCtrl", function($rootScope, $scope, activities) {
    activities.expose_interface($scope);
    activities.set_values(resourceControllers["activities"]["controllerValues"]);
});

app.service('territorial', ["language", "$resource", ResourcePaginator]);
app.controller("territorialCtrl", function($scope, $routeParams, territorial, constants) {

    territorial.expose_interface($scope);

    $scope.element = function(){return territorial.elements()[0]};

    var section = $scope.path().split('/').pop();
    var code = constants["CODCONTENIDO"].hasOwnProperty(section) ? constants["CODCONTENIDO"][section] : null;

    territorial.set_values({
        "collection": "territoriales",
        "filters": {"CODCONTENIDO": { $in: [code, parseInt (section)]}},
        "values": ["MAPA_IFRAME", "MAPA","CODCONTENIDO","TITULO","ZONA","TELEFONO","FAX","WEB_PROPIA","DIRECCION","EMAIL","INDICADORES", "IMAGEN"],
        "offset": 0,
        "limit": 1
    });
});

app.service('activity', ["language", "$resource", ResourcePaginator]);
app.controller("activityCtrl", function($routeParams, $scope, constants, activity) {
    activity.expose_interface($scope);
    $scope.element = function(){return activity.elements()[0]};

    var section = $scope.path().split('/').pop();
    var code = constants["CODCONTENIDO"].hasOwnProperty(section) ? constants["CODCONTENIDO"][section] : null;

    activity.set_values({
        "collection": "actividades",
        "filters": {"CODCONTENIDO": { $in: [code, parseInt (section)]}},
        "values": ['TITULO', 'TELEFONO', 'F_INICIO', 'F_FIN', 'IMAGEN', 'DESCRIPCION_COMUN', 'TAQUILLA', 'ORGANIZACION', 'DONDE', 'PRECIO'],
        "offset": 0,
        "limit": 1
    });
});

app.service('webcams', ["language", "$resource", ResourcePaginator]);
app.controller("webcamsCtrl", function($scope, webcams, constants) {
    webcams.expose_interface($scope);

    var webcam_string = $scope.path().split('/').pop();
    var code = constants["CODSUBTIPOCONT"].hasOwnProperty(webcam_string) ? constants["CODSUBTIPOCONT"][webcam_string] : null;

    webcams.set_values({
        "collection": "territoriales",
        "filters": {"CODSUBTIPOCONT": code},
        "values": ['TITULO'],
        "offset": 0,
        "limit": 1000
    });
});

app.service('webcam', ["language", "$resource", ResourcePaginator]);
app.controller("webcamCtrl", function($scope, webcam, constants) {
    webcam.expose_interface($scope);
    $scope.element = function(){return webcam.elements()[0]};

    var webcam_string = $scope.path().split('/').pop();
    var code = constants["CODCONTENIDO"].hasOwnProperty(webcam_string) ? constants["CODCONTENIDO"][webcam_string] : null;

    webcam.set_values({
        "collection": "territoriales",
        "filters": {"CODCONTENIDO": code},
        "values": ['DESCRIPCION_COMUN', 'WEBCAM', 'DATOS_INTERES', 'FMODIFICACION'],
        "offset": 0,
        "limit": 1
    });
});

function Navigator(language, $location, $timeout){

    var self = this;
    var scope_interface = [];

    // hash as seen by the final cgi
    this.values = {
        language: language.current_language(),
        current: ''
    };

    this.sections = function (){ return $location.path().substring(1).split('/'); };
    scope_interface.push("sections");

    this.current_section = function (section){
        var sections = this.sections();
        if (section == undefined) return sections[sections.length - 1];
        else return ( section == sections[sections.length - 1] );
    };
    scope_interface.push("current_section");

    this.navNavigate = function(p){
        $location.path(p);
    };
    scope_interface.push("navNavigate");

    this.set_values = function( new_values ){
        var values_changed = false;
        for (var k in new_values){
            if (new_values.hasOwnProperty(k)) {
                if (!angular.equals(self.values[k], new_values[k])){
                    values_changed = true;
                    // if it's a non-null object...
                    if (self.values[k] !== null && typeof self.values[k] === 'object'){
                        var values = new_values[k];
                        // ...for every value in it...
                        for ( var value in values) if (values.hasOwnProperty(value)) {
                            // if it's not null, update it
                            if (values[value] != null) self.values[k][value] = values[value];
                            // else, remove it
                            else delete self.values[k][value];
                        }

                    } else {
                        // if it's not an object, replace it
                        self.values[k] = new_values[k];
                    }
                }
            }
        }
        return values_changed;
    };

    this.expose_interface = function(scope){
        for ( var i = 0; i < scope_interface.length; i++ ){
            scope[scope_interface[i]] = self[scope_interface[i]];
        }
    }

}

app.service('tabs', ["language", "$location", "$timeout", Navigator]);
app.controller("tabsCtrl", function($routeParams, $scope, tabs) {

    tabs.expose_interface($scope);

    tabs.set_values({
        "current": tabs.current_section()
    });

    $scope.current_nav = tabs.values.current;
});

app.service('accordion', ["language", "$location", "$timeout", Navigator]);
app.controller("accordionCtrl", function($routeParams, $scope, accordion) {

    accordion.expose_interface($scope);

    accordion.set_values({
        "current": accordion.current_section()
    });

    $scope.current_nav = accordion.values.current;
});

app.controller("aronaTravelCtrl", function($rootScope, $location, $routeParams, $resource, page, language, $mdDialog ) {

    $rootScope.page = page;

    language.expose_interface($rootScope);
    $rootScope.lang = language.current_language;

    $rootScope.params = $routeParams;

    $rootScope.location = $location;

    $rootScope.path = function (){ return $location.path(); };
    $rootScope.level = function (){ return $location.path().substring(1).split('/').length; };
    $rootScope.sections = function (){ return $location.path().substring(1).split('/'); };
    $rootScope.current_section = function (section){
        var sections = $rootScope.sections();
        if (section == undefined) return sections[sections.length - 1];
        else return ( section == sections[sections.length - 1] );
    };
    $rootScope.breadcrumbs = [];
    $rootScope.$watch(function () {
            return $location.path()
    }, function (value) {
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
        $rootScope.breadcrumbs = output;
    });

    $rootScope.weather = $resource('/api/fetch_weather.json').query();

    $rootScope.nav = {};
    $resource('/api/fetch_navigation.json', {language:$rootScope.lang()}).get(function(data){
        $rootScope.nav = data;
    });
    $rootScope.sublinks = function(link){
        var sections = link == undefined ? $rootScope.sections() : ( '/' + link).split('/');
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

    language.get();
    $rootScope.translate = language.translate;

    $rootScope.string_interpolate = function() {
        var args = Array.from(arguments);
        var string = args[0];

        for (var i = 1; i < args.length; i++){
            if ( args[i] != undefined) string = string.replace('{'+(i - 1)+'}', args[i]);
        }

        return string;
    };

    page.panels["home"] = {
        'url': '/api/fetch.json',
        'offset': 0,
        'limit': 3,
        'filters': {"CODAREAS": 16, "CODSUBTIPOCONT": 595},
        'values': ['TITULO', 'F_INICIO', 'CODCONTENIDO', 'IMAGEN'],
        'elements': {}
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
            collection: "actividades"
        }, function(data){
        page.panels["home"].elements = data;
    });

    $rootScope.randomInt = function(i){
        return Math.floor(Math.random() * i) + 1;
    };

    this.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    this.notificationsEnabled = true;
    this.toggleNotifications = function() {
        this.notificationsEnabled = !this.notificationsEnabled;
    };

    $rootScope.set_path = function(p){
        var ngview = document.querySelectorAll('[ng-view]');
        for(var i = 0; i < ngview.length; i++){
            ngview[i].innerHTML = '';
            if ( i < ngview.length - 1 ) ngview[i].parentElement.removeChild(ngview[i]);
        }
        $location.path(p);
    };

});
app.filter("trust", ['$sce', function($sce) {
      return function(htmlCode){
              return $sce.trustAsHtml(htmlCode);
                }
}]);
app.filter("pad", [function() {
    return function(n, width, z){
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
}]);
app.filter("capitalize", [function() {
    return function(input, scope) {
        var output = '';
        if (input!=null) output = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
        return output
    }
}]);
app.filter("gsub", [function() {
    return function(input, pattern, replacement, isRegex) {
        if (isRegex == undefined) isRegex = false;
        if (input != null && pattern != null && replacement != null){
            var output = '';
            if (! isRegex) pattern = pattern.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            if (input!=null) output = input.replace(new RegExp(pattern, "g"), replacement);
            return output;
        } else {
            return '';
        }
    }
}]);
