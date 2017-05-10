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

//FIXME this doesnt handle $routeParams variables and such
var resourceControllers = {
    //"apartments": {
    //    "controllerElements": ["$rootScope", "$scope"],
    //    "controllerValues": {
    //        "collection": "territoriales",
    //        "filters": {"SUBTIPO_PRINCIPAL": "Apartamentos"},
    //        "values": ["MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    //        "offset": 0,
    //        "limit": 6
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
    //        "limit": 6
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
    //        "limit": 6
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
    //        "limit": 6
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
    //        "limit": 6
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
            "values": ["TITULO", "HREF", "CODCONTENIDO", "IMAGEN"],
            "offset": 0,
            "limit": 6
        },
        "singleElement": false
    },
    "video": {
        "controllerElements": ["$rootScope", "$scope"],
        "controllerValues": {
            "collection": "descriptivos",
            "filters": {"CODSUBTIPOCONT": 441, "CODAREAS": 16},
            "values": ["TITULO", "RECURSOS", "CODCONTENIDO", "IMAGEN", "DESCRIPCION_COMUN"],
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
            "values": ["TITULO", "HREF", "CODCONTENIDO", "IMAGEN", "DESCRIPCION_COMUN"],
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
            "values": ["TITULO", "F_INICIO", "CODCONTENIDO", "IMAGEN"],
            "offset": 0,
            "limit": 100
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
        "values": ["HORARIO", "MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
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
        "values": ["HORARIO", "MAPA", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
        "offset": 0,
        "limit": 100
    });
});

app.service('descriptivos', ["language", "$resource", ResourcePaginator]);
app.controller("descriptivosCtrl", function($scope, $routeParams, descriptivos, constants) {

    descriptivos.expose_interface($scope);

    $scope.element = function(){return descriptivos.elements()[0]};

    var codeSubtipo = constants["CODSUBTIPOCONT"].hasOwnProperty($routeParams.type) ? constants["CODSUBTIPOCONT"][$routeParams.type] : null;
    var codeSubarea = constants["CODSUBAREAS"].hasOwnProperty($routeParams.type) ? constants["CODSUBAREAS"][$routeParams.type] : null;

    descriptivos.set_values({
        "collection": "descriptivos",
        "filters": {"CODSUBTIPOCONT": codeSubtipo, "CODAREAS": 16, "CODSUBAREAS": codeSubarea },
        "values": ["TITULO", "HREF", "CODCONTENIDO", "IMAGEN", "DESCRIPCION_COMUN", "TEXTO"],
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

app.service('noticias', ["language", "$resource", ResourcePaginator]);
app.controller("noticiasCtrl", function($scope, $routeParams, noticias, constants) {

    noticias.expose_interface($scope);

    $scope.element = function(){return noticias.elements()[0]};

    noticias.set_values({
        "collection": "noticias",
        "filters": {"CODAREAS": 16 },
        "values": ["TITULO", "TITULO_CORTO", "F_PUB_ORIGINAL", "HREF", "CODCONTENIDO", "IMAGEN", "RESUMEN", "DESCRIPCION_COMUN", "TEXTO", "FMODIFICACION"],
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
        "values": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO", "RECURSOS", "CONTENIDOS_RELACIONADOS"],
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
        "filters": {"CODSUBTIPOCONT": 441, "CODAREAS": 16, "CODSUBAREAS": 277},
        "values": ["TITULO", "RECURSOS", "CODCONTENIDO", "IMAGEN", "DESCRIPCION_COMUN"],
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
        "values": ["TITULO", "HREF", "CODCONTENIDO", "IMAGEN", "DESCRIPCION_COMUN", "TEXTO", "RECURSOS", "CONTENIDOS_RELACIONADOS"],
        "offset": 0,
        "limit": 1
    });
});

app.service('noticia', ["language", "$resource", ResourcePaginator]);
app.controller("noticiaCtrl", function($scope, $routeParams, noticia, constants) {

    noticia.expose_interface($scope);

    $scope.element = function(){return noticia.elements()[0]};

    var section = $scope.path().split('/').pop();
    var code = constants["CODCONTENIDO"].hasOwnProperty(section) ? constants["CODCONTENIDO"][section] : null;

    noticia.set_values({
        "collection": "noticias",
        "filters": {"CODCONTENIDO": { $in: [code, parseInt (section)]}},
        "values": ["TITULO", "TITULO_CORTO", "F_PUB_ORIGINAL", "HREF", "CODCONTENIDO", "IMAGEN", "RESUMEN", "DESCRIPCION_COMUN", "TEXTO", "FMODIFICACION", "RECURSOS", "CONTENIDOS_RELACIONADOS"],
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
        "values": ["HORARIO", "MAPA_IFRAME", "MAPA", "CODCONTENIDO", "TITULO", "ZONA", "TELEFONO", "FAX", "WEB_PROPIA", "DIRECCION", "EMAIL", "INDICADORES", "IMAGEN", "DESCRIPCION_COMUN", "RECURSOS", "CONTENIDOS_RELACIONADOS"],
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
        "values": ["TITULO", "TELEFONO", "F_INICIO", "F_FIN", "IMAGEN", "DESCRIPCION_COMUN", "TAQUILLA", "ORGANIZACION", "DONDE", "PRECIO", "RECURSOS", "CONTENIDOS_RELACIONADOS"],
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
        "values": ["TITULO"],
        "offset": 0,
        "limit": 100
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
        "values": ["HORARIO", "DESCRIPCION_COMUN", "WEBCAM", "DATOS_INTERES", "FMODIFICACION", "RECURSOS", "CONTENIDOS_RELACIONADOS"],
        "offset": 0,
        "limit": 1
    });
});

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
        "values": ["TITULO", "F_INICIO", "CODCONTENIDO", "IMAGEN"],
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
