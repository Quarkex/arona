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
                    if (variable == "VALORESINDICADORES") {
			return { "$in": options };
		    } else {   
			return { "$or": options };
		    }
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

        var variables = ["SUBTIPO_PRINCIPAL", "CODSUBTIPOCONT", "CODAREAS", "CODSUBAREAS", "VALORESINDICADORES"];
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
