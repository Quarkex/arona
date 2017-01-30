/**
 * cbcanariasApp.js
 * Initializes cbcanarias app in Angular.js
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

var app = angular.module("cbcanariasApp", ["ngRoute","ngResource","mm.foundation", "tmh.dynamicLocale", "slugifier", "pmkr.filters", "slick"]);

app.value('page', {
    'title': "C.B. Canarias",
    'panels':{}
});

function Languaje($location, $window, $resource, tmhDynamicLocale){

    var self = this;
    var scope_interface = [];

    this.variables = {
        'dictionary': {},
        'available_languages': ['es'],
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
            self.variables.last_modified = d;
        }
        return self.variables.stats.last_modified;
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
        if (values_changed) get();
    };

    this.expose_interface = function(scope){
        for ( var i = 0; i < scope_interface.length; i++ ){
            scope[scope_interface[i]] = self[scope_interface[i]];
        }
    }

}

app.config(function($routeProvider, tmhDynamicLocaleProvider) {
    var isValidLang = function($location, language){
        language.current_language($location.path().split('/')[1]);
    };

    tmhDynamicLocaleProvider.localeLocationPattern('/js/angularjs/i18n/angular-locale_{{locale}}.js');

    $routeProvider
    .when("/:language", {
        templateUrl : "assets/panels/main.htm",
        resolve:{ "check":isValidLang },
        controller: "cbcanariasCtrl"
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
        controller: "cbcanariasCtrl"
    })
    .when("/:language/planea_tu_viaje/donde_alojarse/:type/:territorial", {
        templateUrl : '/assets/panels/planea_tu_viaje/donde_alojarse/view.htm',
        resolve:{ "check":isValidLang },
        controller: "territorialCtrl"
    })
    .when("/:language/noticias/:article", {
        templateUrl : '/assets/panels/noticias/view.htm',
        resolve:{ "check":isValidLang },
        controller: "articleCtrl"
    })
    .when("/:language/actividades/:activity", {
        templateUrl : '/assets/panels/actividades/view.htm',
        resolve:{ "check":isValidLang },
        controller: "activityCtrl"
    })
    .when("/:language/eventos/:event", {
        templateUrl : '/assets/panels/eventos/view.htm',
        resolve:{ "check":isValidLang },
        controller: "cbcanariasCtrl"
    })
    .when("/:language/:panel*", {
        templateUrl : function(urlattr){
            return '/assets/panels/' + urlattr.panel + '.htm';
        },
        resolve:{ "check":isValidLang },
        controller: "cbcanariasCtrl"
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

app.service('news', ["language", "$resource", ResourcePaginator]);
app.controller("newsCtrl", function($rootScope, $scope, news) {

    news.expose_interface($scope);

    news.set_values({
        "collection": "articles",
        "filters": {},
        "values": ['id', 'title', 'date', 'excerpt', 'figure'],
        "offset": 4,
        "limit": 6
    });
});

app.service('articles', ["language", "$resource", ResourcePaginator]);
app.controller("articlesCtrl", function($rootScope, $scope, articles) {

    articles.expose_interface($scope);

    articles.set_values({
        "collection": "articles",
        "filters": {},
        "values": ['id', 'title', 'date', 'excerpt', 'figure'],
        "offset": 0,
        "limit": 6
    });
});

app.service('article', ["language", "$resource", ResourcePaginator]);
app.controller("articleCtrl", function($rootScope, $scope, $routeParams, article) {

    article.expose_interface($scope);

    article.set_values({
        "collection": "articles",
        "filters": {'id': parseInt($routeParams.article)},
        "values": ['id', 'title', 'date', 'content'],
        "offset": 0,
        "limit": 1
    });
});

app.service('navigation', ["language", "$resource", ResourcePaginator]);
app.controller("navigationCtrl", function($rootScope, $scope, navigation) {

    navigation.expose_interface($scope);

    navigation.set_values({
        "language": '',
        "collection": "navigation",
        "filters": {},
        "values": [],
        "offset": 0,
        "limit": 0
    });
});

app.service('patreons', ["language", "$resource", ResourcePaginator]);
app.controller("patreonsCtrl", function($rootScope, $scope, patreons) {

    patreons.expose_interface($scope);

    patreons.set_values({
        "language": '',
        "collection": "patreons",
        "filters": {},
        "values": [],
        "offset": 0,
        "limit": 0
    });
});

app.service('patreonsScroll', ["language", "$resource", ResourcePaginator]);
app.controller("patreonsScrollCtrl", function($rootScope, $scope, patreonsScroll) {

    patreonsScroll.expose_interface($scope);

    patreonsScroll.set_values({
        "language": '',
        "collection": "patreons",
        "filters": {"scrolleable": "true"},
        "values": [],
        "offset": 0,
        "limit": 0
    });
});

app.service('slider', ["language", "$resource", ResourcePaginator]);
app.controller("sliderCtrl", function($rootScope, $scope, slider) {

    slider.expose_interface($scope);

    slider.set_values({
        "language": '',
        "collection": "slider",
        "filters": {},
        "values": [],
        "offset": 0,
        "limit": 0
    });
});

app.service('buttons', ["language", "$resource", ResourcePaginator]);
app.controller("buttonsCtrl", function($rootScope, $scope, buttons) {

    buttons.expose_interface($scope);

    buttons.set_values({
        "language": '',
        "collection": "buttons",
        "filters": {},
        "values": [],
        "offset": 0,
        "limit": 0
    });
});

app.service('team', ["language", "$resource", ResourcePaginator]);
app.controller("teamCtrl", function($rootScope, $scope, team) {

    team.expose_interface($scope);

    team.set_values({
        "language": '',
        "collection": "team",
        "filters": {},
        "values": [],
        "offset": 0,
        "limit": 0
    });
});

app.service('eventArticle', ["language", "$resource", ResourcePaginator]);
app.controller("eventArticleCtrl", function($rootScope, $scope, eventArticle) {

    eventArticle.expose_interface($scope);

    eventArticle.set_values({
        "language": '',
        "collection": "articles",
        "filters": {"event": true},
        "values": ["title", "id"],
        "offset": 0,
        "limit": 0
    });
});

app.service('featured', ["language", "$resource", ResourcePaginator]);
app.controller("featuredCtrl", function($rootScope, $scope, featured) {

    featured.expose_interface($scope);

    featured.set_values({
        "language": '',
        "collection": "articles",
        "filters": {},
        "values": ["title", "figure", "id"],
        "offset": 0,
        "limit": 4
    });
});

app.service('matches', ["language", "$resource", ResourcePaginator]);
app.controller("matchesCtrl", function($rootScope, $scope, matches) {

    matches.expose_interface($scope);

    matches.set_values({
        "language": '',
        "collection": "matches",
        "filters": {},
        "values": [],
        "offset": 0,
        "limit": 0
    });
});

app.controller("cbcanariasCtrl", function($rootScope, $location, $routeParams, $resource, page, language ) {

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

    language.get();
    $rootScope.translate = language.translate;

    $rootScope.string_interpolate = function() {
        var args = Array.from(arguments);
        var string = args[0];

        for (var i = 0; i < args.length; i++){
            if ( args[i] != undefined) string = string.replace('{'+(i - 1)+'}', args[i]);
        }

        return string;
    };

    $rootScope.randomInt = function(i){
        return Math.floor(Math.random() * i) + 1;
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
