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
 * - {{ level() }}
 *
 *   Returns the current angular path level of nesting as an integer
 *
 * - {{ nav }}
 *
 *   Returns an object with arrays of navigation links. They can also have more content.
 *   E.G: {{ nav.left }} => [{"label":"AngularJS", "href":"http://angularjs.org", "content":[...]}]
 *
 * - {{ breadcrumbs }}
 *
 *   Returns an object with arrays of navigation links based on current location.
 *   E.G: {{ breadcrumbs }} => [{"label":"home", "href":"#/"},{"label":"angular", "href":"#/angular"}]
 */

var app = angular.module("aronaTravelApp", ["ngRoute","ngResource","mm.foundation"]);

app.value('page', {
    'title': "Arona.travel",
    'available_languages': ['de', 'en', 'es', 'fi', 'fr', 'it', 'nl', 'ru', 'sv'],
    'dictionary':{},
    'panels':{}
});


app.config(function($routeProvider) {
    $routeProvider
    .when("/:language", {
        templateUrl : "assets/panels/main.htm",
        controller: "aronaTravelCtrl"
    })
    .when("/:language/404", {
        templateUrl : "assets/404.htm",
        controller: "aronaTravelCtrl"
    })
    .when("/:language/eventos/:event", {
        templateUrl : function(urlattr){
            return '/assets/panels/eventos.htm';
        },
        controller: "aronaTravelCtrl"
    })
    .when("/:language/:panel*", {
        templateUrl : function(urlattr){
            return '/assets/panels/' + urlattr.panel + '.htm';
        },
        controller: "aronaTravelCtrl"
    })
    .when("/", {
        redirectTo: "/en"
    })
    .otherwise({
        redirectTo: function(urlattr){
            return '/' + urlattr.language + '/404';
        }
    });
});

app.controller("aronaTravelCtrl", function($scope, $location, $routeParams, $resource, page) {

    $scope.page = page;

    $scope.lang = function (){ return $routeParams.language; };

    var Lang = $resource(

            // Url targeting the resource
            '/locales/:lang.json',

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
                lang: $scope.lang() == undefined? 'en' : $scope.lang()
            }
    );
    Lang.get(function(data){
        for (var k in data){
            if (data.hasOwnProperty(k)) {
                page.dictionary[k] = data[k];
            }
        }
    });

    $scope.path = function (){ return $location.path(); };
    $scope.level = function (){ return $location.path().substring(1).split('/').length; };
    $scope.sections = function (){ return $location.path().substring(1).split('/'); };
    $scope.breadcrumbs = function() {
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

    $scope.nav = {};
    $resource('/clockworks/fetch_navigation.json', {lang:$scope.lang()}).get(function(data){
        $scope.nav = data;
    });

    $scope.translate = function(stringA, stringB ) {
        // this is to respect the less surprise directive. Prefixes should precede the target string
        var string = stringB == undefined ? stringA : stringB;
        var prefix = stringB == undefined ? null : stringA;

        if ( page.dictionary.hasOwnProperty( prefix == null? string : prefix + string ) ){
            string = page.dictionary[prefix == null ? string : prefix + string];
        }
        return string;
    };

    page.panels["home"] = {
        'url': '/clockworks/fetch_news.json',
        'offset': 0,
        'limit': 3,
        'filters': {'lang': $scope.lang()},
        'values': ['title', 'date', 'id', 'image'],
        'elements': {}
    };
    var News = $resource(
            page.panels["home"].url,
            {
                lang: $scope.lang() == undefined? 'en' : $scope.lang(),
                offset: page.panels["home"].offset,
                limit: page.panels["home"].limit,
                filters: page.panels["home"].filters,
                values: page.panels["home"].values
            }
    );
    News.get(function(data){
        page.panels["home"].elements = data.news;
    });

});
