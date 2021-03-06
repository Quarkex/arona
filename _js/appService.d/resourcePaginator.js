function ResourcePaginator(language, $resource, $rootScope){

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
        'settings': {},
        'element_status': 'ok',
        'buttons': [],
        'pages': []
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
        if ( self.last_values == undefined ) self.last_values = {};
        if (!(angular.equals(self.values, self.last_values) && !angular.equals(self.values.filters, self.last_values.filters))){

            self.last_values = {};
            angular.copy(self.values, self.last_values);

            self.elements([]);
            self.last_modified(null);
            self.element_status('loading');

            var clear_empty = function recurse( object ){
                var conditional_filters = ["$and", "$or", "$nor"];
                for (var i = 0; i < conditional_filters.length; i++) if(object.hasOwnProperty(conditional_filters[i])){
                    if(object[conditional_filters[i]].length == 0) delete object[conditional_filters[i]];
                    else {
                        if (self.values.filters[conditional_filters[i]] != undefined)
                        for( var j = 0; j < self.values.filters[conditional_filters[i]].length; j++ ){
                            switch( typeof object[conditional_filters[i]][j] ){
                                case "object":
                                    if (object[conditional_filters[i]][j] instanceof RegExp)
                                        object[conditional_filters[i]][j] = 'regexp(' + object[conditional_filters[i]][j].toString() + ')';
                                    else {
                                        for(var key in object[conditional_filters[i]][j])
                                        if (object[conditional_filters[i]][j].hasOwnProperty(key))
                                        if (object[conditional_filters[i]][j][key] instanceof RegExp)
                                        object[conditional_filters[i]][j][key] = 'regexp(' + object[conditional_filters[i]][j][key].toString() + ')';
                                    }

                                    recurse(object[conditional_filters[i]][j]);

                                    break;
                            }
                        }
                    }
                }
            };

            clear_empty(self.values.filters);

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
                                self.element_status('error');
                            }
                        }
                        self.elements(data);
                        self.element_status('ok');
                    }
                }
            });
        }
    }

    this.element_status = function(e){
        if (e != undefined){
            self.variables.element_status = e;
        }
        return self.variables.element_status;
    };
    scope_interface.push("element_status");

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
        if (d === null) delete self.variables.last_modified;
        if (d != undefined){
            if (d != '' && d != null) self.variables.last_modified = d;
        }
        if (self.variables.last_modified == undefined) return '';
        else return self.variables.last_modified;
    };
    scope_interface.push("last_modified");

    this.pages = function(){
        var pages = Math.ceil(self.size() / self.page_size());
        while (self.variables.pages.length < pages) self.variables.pages.push({});
        while (self.variables.pages.length > pages) self.variables.pages.pop();

        for (var i = 0; i < pages; i++){
            var item = self.variables.pages[i];
            item.number = (i + 1);
            item.href = (i + 1);
            item.current =  item.number == self.page() ? true : false;
        }
        return self.variables.pages;
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
                    pages[i].disabled = false;
                    output.push(pages[i]);
                    break;
                case ( (is_second_page && current_page > lower_limit ) || ( is_second_to_last_page && current_page < upper_limit ) ):
                    output.push({"number": "...", "disabled": true});
                    break;
                case ((page <= lower_offset) || (page >= upper_offset)):
                    break;
                default:
                    pages[i].disabled = false;
                    output.push(pages[i]);
            }
        }

        while (self.variables.buttons.length < output.length) self.variables.buttons.push({});
        while (self.variables.buttons.length > output.length) self.variables.buttons.pop();
        for (i = 0; i < output.length; i++){
            var target = self.variables.buttons[i];
            var model = output[i];

            target.number = model.number;
            target.href = model.href;
            target.disabled = model.disabled == true ? true : false;
            target.current = model.current == true ? true : false;
        }
        return self.variables.buttons;
    };
    scope_interface.push("paginator_pages");

    this.page = function(p){
        if (p != undefined){
            var target = ( (p - 1) * self.page_size() );
            var max = ( Math.ceil(self.size() / self.page_size()) * self.page_size() );
            if (target >= 0 && target <= max) {
                window.scrollTo(0, 0);
                self.set_values({offset: target});
            }
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
        if ( target >= 0 ){
            window.scrollTo(0, 0);
            self.set_values({offset: target});
        }
    };
    scope_interface.push("previous_page");

    this.next_page = function(){
        var max = ( ( Math.ceil(self.size() / self.page_size() ) - 1 ) * self.page_size() );
        var target = self.values.offset + self.page_size();
        if ( target <= max ){
            window.scrollTo(0, 0);
            self.set_values({offset: target});
        }
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

    this.has_filter = function recursion(o){
        var output = false;
        if (o !== undefined){
            for (var i = 0; i < self.values.filters.length; i++){
                var match = true;
                var f = self.values.filters[i];
                for ( key in o ) if (o.hasOwnProperty(key)){
                    if (! f.hasOwnProperty(key)) match = false;
                    else {
                        switch( true ){
                            case (typeof f[key] == 'object'):
                                match = recursion(f[key]);
                            case (typeof f[key] == 'array'):
                                var array_contains_filter = false;
                                for (var j = 0; j > f[key].length; j++){
                                    if ( recursion(f[key][j]) == true ) array_contains_filter = true;
                                }
                                if (! array_contains_filter == true) match = false;
                                break;
                            default:
                                if ( f[key] != o[key] ) match = false;
                        }
                    }
                }
                if (match == true) output = true;
            }
        }
        return output;
    };
    scope_interface.push("has_filter");

    this.toggle_filter = function(f, v){
        if (f === undefined) return null;
        if (v !== undefined){
            var o = {};
            switch (f){
                case "$and":
                case "$nor":
                case "$or":
                    if ( self.values.filters[f] === undefined || self.values.filters[f] === null ){
                        self.values.filters[f] = [];
                    }
                    var included = false;
                    for ( var i = 0; i < self.values.filters[f].length; i++){
                        var is_equal = true;
                        for (key in self.values.filters[f][i]){
                            if ( self.values.filters[f][i].hasOwnProperty(key) ){
                                if (self.values.filters[f][i][key] != v[key]){
                                    is_equal = false;
                                    break;
                                }
                            }
                        }
                        if (is_equal === true){
                            included = i;
                            break;
                        }
                    }
                    if ( included === false ){
                        self.values.filters[f].push(v);
                    } else {
                        self.values.filters[f].splice(included, 1);
                        if (self.values.filters[f].length == 0) delete self.values.filters[f];
                    }
                    break;
                default:
                    var object = {};
                    object[f] = v;
                    o[f] = ( self.has_filter(object) ) ? null : v;
            }
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
app.service('resourcePaginator', ["language", "$resource", "$rootScope", ResourcePaginator]);
app.controller("resourcePaginatorCtrl", function($rootScope, $scope, $location, $routeParams, resourcePaginator, resourceValues, constants) {

    resourcePaginator.expose_interface($scope);

    $scope.element = function(){return resourcePaginator.elements()[0]};

    var section = $scope.path().split('/').pop();
    var code = constants["CODCONTENIDO"].hasOwnProperty(section) ? constants["CODCONTENIDO"][section] : null;

    var update = function(){
        var params = $location.search();
        var page = params["page"] == null ? 1 : parseInt(params["page"]);
        var path = $location.path().substr(1).split('/');
        path.shift();

        var id = null, section = path.pop();
        if (!isNaN(section)) id = parseInt(section);

        var values = {}, object_elements = ["language", "collection", "filters", "values_list", "values_view", "limit", "offset", "pub"];
        for ( var i = 0; i < object_elements.length; i++){
            var element_label = object_elements[i];
            var node = $rootScope.getNode();
            if (id != null && element_label == "filters"){
                if ( node != undefined )
                if ( node.filters != undefined )
                if ( node.filters.$text != undefined )
                delete node.filters.$text;
            }
            while ( values[element_label] === undefined ){
                if (node[element_label] !== undefined){
                    values[element_label] = node[element_label];
                } else if (node.parent == null) {
                    values[element_label] = null;
                } else {
                    angular.copy(node.parent, node);
                }
            }
        }
        if (values["values_list"] == undefined || values["values_list"] == null) values["values_list"] = values["values_view"];
        if (values["values_view"] == undefined || values["values_view"] == null) values["values_view"] = values["values_list"];
        values["values"] = (id === null) ? values["values_list"] : values["values_view"];

        if (values["language"]) values["language"] = function(){ return $scope.lang();}();
        else delete values["language"];

        if (values["collection"] == null) values["collection"] = "territoriales";

        if (values["filters"]    == null) values["filters"] = {};

        if (values["values"]     == null) values["values"]  = [];

        if (values["limit"]      == null) values["limit"]   = 100;

        if (values["offset"]     == null) values["offset"]  = 0;

        if (values["pub"]        == null) values["pub"]     = true;

        var limit = params["limit"] == null ? parseInt(values["limit"]) : parseInt(params["limit"]);
        var offset = params["page"] == null ? parseInt(values["offset"]) : ( page - 1) * limit;

        if (id != null){
            if (values["filters"]['$and'] == undefined) values["filters"]['$and'] = [];
            var querylet = { $or: [] };
            querylet["$or"].push({"CODCONTENIDO": id});
            querylet["$or"].push({"CODRECURSO": id});
            querylet["$or"].push({"id": id});
            querylet["$or"].push({"ID": id});
            values["filters"]['$and'].push(querylet);
        }

        values["limit"] = limit;
        values["offset"] = offset;

        var old_filters = resourcePaginator.values.filters;
        for (var variableKey in old_filters){
            if (old_filters.hasOwnProperty(variableKey)){
                delete old_filters[variableKey];
            }
        }

        if ($scope != undefined)
        if ($scope.node != undefined)
        if ($scope.node.filters != undefined)
        if ($scope.node.filters.$text != undefined)
        if ($scope.node.filters.$text.$search != undefined)
            values.filters.$text.$search = $scope.node.filters.$text.$search;

        resourcePaginator.set_values(values);
    };

    $scope.update_resources = update;
    $scope.$watch('node.filters.$text.$search', function(newvalue,oldvalue) {
        if (newvalue != undefined) if (newvalue.length > 3) update();
    });
    $scope.$on('$locationChangeSuccess', function(event){ update(); });
    update();

});
