function Languaje($location, $window, $resource, tmhDynamicLocale){

    var self = this;
    var scope_interface = [];

    this.variables = {
        'dictionary': {},
        'dictionary_lang': null,
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
        'settings': {},
        'element_status': 'empty'
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
        language: self.current_language()
    };
    this.resource = $resource( self.variables.url, self.variables.parameters, self.variables.actions, self.variables.settings );

    this.get = function(){
        if(self.variables.dictionary_lang != self.current_language()) {
            self.language_status('loading');
            self.resource.get( self.values, function(data){
                if (data != null){
                    for (var k in data){
                        if (data.hasOwnProperty(k)) {
                            self.variables.dictionary[k] = data[k];
                        }
                    }
                    tmhDynamicLocale.set(self.current_language());
                    self.language_status('ok');
                    self.variables.dictionary_lang = self.current_language();
                }
            });
        }
    };

    this.language_status = function(e){
        if (e != undefined){
            self.variables.language_status = e;
        }
        return self.variables.language_status;
    };
    scope_interface.push("language_status");

    this.expose_interface = function(scope){
        for ( var i = 0; i < scope_interface.length; i++ ){
            scope[scope_interface[i]] = self[scope_interface[i]];
        }
    }
}
app.service('language', ["$location", "$window", "$resource", "tmhDynamicLocale", Languaje]);

