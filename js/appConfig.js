app.config(function($locationProvider, $routeProvider, tmhDynamicLocaleProvider, $animateProvider, $mdThemingProvider) {

    $locationProvider.hashPrefix('');

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
        controller: "mainCtrl"
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
        redirectTo: "/:language/planea_tu_viaje/destino_accesible/hoteles_accesible"
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
        controller: "mainCtrl"
    })
    .when("/:language/:section/:type", {
        templateUrl :function(urlattr){
            var url = '/assets/panels';
            var path = [ urlattr.section, urlattr.type ];
            var custom_values = [
                [],
                ["oficinas_de_informacion","lugares_de_interes","arona_360","albumes","videos","folletos_y_mapas","destino_accesible","noticias_del_sector"]
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
        controller: "mainCtrl"
    })
    .when("/:language/:section/:subsection/:type", {
        templateUrl :function(urlattr){
            var url = '/assets/panels';
            var path = [ urlattr.section, urlattr.subsection, urlattr.type ];
            var custom_values = [
                [],
                ["destino_accesible","descargas","noticias_del_sector"],
                ["guia_de_accesibilidad", "videos", "alquiler_de_ayudas_tecnicas", "playa_de_las_vistas_accesible", "clima", "compromiso_con_la_calidad","la_conquista_de_canarias"]
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
        controller: "mainCtrl"
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
        controller: "mainCtrl"
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
        controller: "mainCtrl"
    })
    .when("/:language/:panel*", {
        templateUrl : function(urlattr){
            return '/assets/panels/' + urlattr.panel + '.htm';
        },
        resolve:{ "check":isValidLang },
        controller: "mainCtrl"
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
