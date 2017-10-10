app.config(function($locationProvider, $routeProvider, tmhDynamicLocaleProvider, $animateProvider, $mdThemingProvider) {

    //$locationProvider.hashPrefix('');

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
        controller: "mainCtrl"
    })
    .when("/:language/:panel*", {
        controller: "mainCtrl"
    })
    .when("", {
        // FIXME: this is not triggering when it should
        redirectTo: function(language){ return "/" + language.default_language; }
    })
    .otherwise({
        // TODO: this should redirect to a 404 page
        redirectTo: function(urlattr){
            return '/' + urlattr.language + '/';
        }
    });
});
