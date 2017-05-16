app.controller("mainCtrl", function($rootScope, $location, $routeParams, $resource, page, tree, language, $mdDialog, resourcePaginator ) {

    $rootScope.page = page;

    language.expose_interface($rootScope);
    resourcePaginator.expose_interface($rootScope);
    $rootScope.element = function(){return resourcePaginator.elements()[0]};

    var lang = language.current_language;
    $rootScope.lang = language.current_language;
    language.get();

    $rootScope.params = $routeParams;

    $rootScope.location = $location;

    $rootScope.path = function (){ return $location.path(); };

    var sections = function (p){
        var path = p == undefined ? $location.path().substr(1).split('/') : p.split('/');
        path.shift();
        while (path[path.length -1] == ''){
            path.pop();
        }
        return path;
    };
    $rootScope.sections = sections;

    var current_section = function (section){
        var sections = $rootScope.sections();
        if (section == undefined) return sections.length == 0 ? 'index' : sections[sections.length - 1]['id'];
        else return ( section == sections[sections.length - 1]['id'] );
    };
    $rootScope.current_section = current_section;

    var level = function (){
        return sections().length + 1;
    };
    $rootScope.level = level;

    $rootScope.weather = $resource('/api/fetch_weather.json').query();

    var sublinks = function(link){
        var node = link == null ? getNode() : getNode(link);
        if (node != null){
            var nodes = node["nodes"];
            var links = {};
            for (var i = 0; i < nodes.length; i++){
                var n = nodes[i];
                var l = {};
                l["href"] = n["href"] != null ? n["href"] : node["href"] + '/' + n["id"];
                if (n["nodes"] != undefined){
                    if (n["nodes"].length > 0){
                        l["content"] = {};
                        for (var j = 0; j < n["nodes"].length; j++){
                            var sn = n["nodes"][j];
                            if (sn["href"] == undefined) sn["href"] = l["href"] + '/' + sn["id"];
                            l["content"][sn["title"]] = { href: sn["href"] };
                        }
                    }
                }
                links[n["title"]] = l;
            }
            return links;
        } else {
            return null;
        }
    };
    $rootScope.sublinks = [];
    $rootScope.nav = sublinks('');

    $rootScope.translate = language.translate;

    $rootScope.string_interpolate = function() {
        var args = Array.from(arguments);
        var string = args[0];

        for (var i = 1; i < args.length; i++){
            if ( args[i] != undefined) string = string.replace('{'+(i - 1)+'}', args[i]);
        }

        return string;
    };

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

    $rootScope.node = tree["nodes"][0];

    function getNode( path ){
        var node = {};
        angular.copy(tree["nodes"][0], node);

        if (path == ''){
            if (node["href"] == undefined) node["href"] = '#/' + $rootScope.lang();
            return node;
        }

        var sections = path == undefined ? $rootScope.sections() : $rootScope.sections(lang() + '/' + path);

        var last_nodes = null;
        var last_node = null;
        for (var i = 0; i < sections.length; i++){
            if (node["nodes"] != undefined){
                if (node["nodes"].length > 0) last_nodes = node["nodes"];
                target_id = sections[i];
                target_node = null;
                for (var j = 0; j < node["nodes"].length; j++){
                    if ( node["nodes"][j]["id"] == target_id ){
                        target_node = node["nodes"][j];
                    }
                }

                if (target_node != null) node = target_node;
                else if (!isNaN(target_id)) {
                    node = {};
                    angular.copy(last_node, node);
                    node.isView = true;
                    node['id'] = target_id;
                    node['href'] += '/' + target_id;
                    delete node.title;
                    delete node.nodes;
                    delete node.sibling_nodes;
                    node['view'] = node['view'] == undefined ? 'default' : node['view'];
                    node['content'] = '<app-' + node['view'] + '-view ng-init="id = \'' + node.id + '\'"></app-' + node['view'] + '-view>';
                }
                else {
                    console.warn("this node does not have that child ("+ target_id +"): " + node["id"]);
                    node = null;
                    break;
                }
                last_node = node;
            } else {
                console.warn("node has no child nodes: " + node);
                node = null;
                break;
            }
        }
        if (node == null) return null;

        if (node["href"].substring(0,4) == 'http') node["href"] = '#/' + lang() + '/' + node["href"];
        if (node["nodes"] == undefined || node["nodes"].length <= 0 ){
            node["nodes"] = last_nodes;
            node["sibling_nodes"] = true;
        }
        var mapped = node["nodes"].map(function(x) {
            if (x["href"].substring(0,1) != '#' && x["href"].substring(0,4) != 'http'){
                x["href"] = '#/' + lang() + '/' + x["href"];
            }
            return x;
        });
        node["nodes"] = mapped;

        return node;
    }

    $rootScope.history = [];
    for (var i = 0; i < sections().length; i++ ){
        var node_id = sections().slice(0, i + 1).join('/');
        var node = getNode(node_id);
        if (node != null) $rootScope.history.push(node);
    }

    var breadcrumbs = function(){
        var output = [{ label: "inicio", href: '#/' + lang(), current: false }];
        var crumbs = [];
        for (var i = 0; i < $rootScope.history.length; i++){
            var crumb = {};
            crumb["label"] = $rootScope.history[i]["id"];
            crumb["href"] = crumbs.length == 0 ? crumb["label"] : crumbs.map(function(x){return x['label']}).join('/') + '/' + crumb["label"];
            crumb["href"] = '#/' + lang() + '/' + crumb["href"];
            crumb["current"] = current_section() == crumb["label"];
            crumbs.push(crumb);
        }
        return output.concat(crumbs);
    };
    $rootScope.breadcrumbs = [];

    $rootScope.go_to = function(path){
        $rootScope.target = null;
        if ( path != null && path != '' ) {
            var node = getNode(path);
            if (node != null){
                if (node["id"] != ''){
                    $rootScope.history = [];
                    for (var i = 0; i < sections().length; i++ ){
                        var node_id = sections().slice(0, i + 1).join('/');
                        var node = getNode(node_id);
                        if (node != null) $rootScope.history.push(node);
                    }
                }
                $rootScope.breadcrumbs = breadcrumbs();
                $rootScope.sublinks = sublinks();
                $rootScope.node = node;
                // If no content, auto-select first child
                if ($rootScope.node.content.trim() == '' && !node.isView){
                    $location.path( lang() + '/' + path + '/' + $rootScope.node.nodes[0]['id']);
                }
            }
            else console.warn("broken adress:" + path );
        } else {
            $rootScope.history = [];
            $rootScope.breadcrumbs = breadcrumbs();
            $rootScope.node = tree["nodes"][0];
        }
    };

    var update_location = function(){
        var params = $location.search();
        var path = $location.path().substr(1).split('/');
        var path_lang = path.shift();

        if (!language.isValid(path_lang)){
            $location.path( language.default_language() + '/' + path.join('/') );
        } else if(language.current_dictionary() != path_lang && language.language_status() != 'loading') {
            language.get();
            language.current_language(path_lang);
            $location.path( path_lang + '/' + path.join('/') );
        } else {
            path = path.join('/').replace( /[\/]*$/, '');
            $rootScope.go_to(path);
            window.scrollTo(0, 0);
        }
    };

    $rootScope.$on('$locationChangeSuccess', function(event){ update_location(); });

});
