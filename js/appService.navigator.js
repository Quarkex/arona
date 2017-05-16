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
        p = p.split('/');
        p.shift();
        p = p.join('/');
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
app.service('navigator', ["language", "$location", "$timeout", Navigator]);
