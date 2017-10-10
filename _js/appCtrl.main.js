app.controller("mainCtrl", function( $mdMenu, $http, $location, $mdDialog, $resource, $rootScope, $routeParams, language, page, resourcePaginator, tree ) {

    // Opera 8.0+
    $rootScope.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    $rootScope.isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    $rootScope.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    $rootScope.isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    $rootScope.isEdge = !$rootScope.isIE && !!window.StyleMedia;

    // Chrome 1+
    $rootScope.isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    $rootScope.isBlink = ($rootScope.isChrome || $rootScope.isOpera) && !!window.CSS;

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

    $rootScope.weather = $resource('/api/weather.json').query();

    var sublinks = function(link){
        var node = link == null ? getNode() : getNode(link);
        if (node != null){
            var nodes = node["nodes"];
            var links = {};
            for (var i = 0; i < nodes.length; i++){
                var n = nodes[i];
                var l = {};
                l["href"] = n["href"] != null ? n["href"] : node["href"] + '/' + n["id"];
                l["position"] = n["position"] != null ? n["position"] : "left";
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
            if (node["href"] == undefined) node["href"] = '#!/' + $rootScope.lang();
            return node;
        }

        var sections = path == undefined ? $rootScope.sections() : $rootScope.sections(lang() + '/' + path);

        var last_nodes = null;
        var last_node = null;
        var depth = 0;
        for (depth = 0; depth < sections.length; depth++){
            if (node["nodes"] != undefined){
                if (node["nodes"].length > 0) last_nodes = node["nodes"];
                target_id = sections[depth];
                target_node = null;
                for (var j = 0; j < node["nodes"].length; j++){
                    if ( node["nodes"][j]["id"] == target_id ){
                        target_node = node["nodes"][j];
                    }
                }

                if (target_node != null){
                    target_node.parent = last_node;
                    if ( target_node.nodes == undefined || target_node.nodes == null ){
                        target_node.sibling_nodes = true;
                        target_node.nodes = target_node.parent.nodes;
                    }
                    node = target_node;
                } else if (!isNaN(target_id)) {
                    node = {};
                    if ( last_node == null ) last_node = tree["nodes"][0];
                    node.parent = last_node;
                    angular.copy(last_node, node);
                    node.isView = true;
                    node['id'] = target_id;
                    node['href'] == undefined ? node['href'] = target_id : node['href'] += '/' + target_id;
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

        node["depth"] = depth;
        if (depth == 1) node.parent = tree["nodes"][0];
        if (node["href"].substring(0,4) == 'http') node["href"] = '#!/' + lang() + '/' + node["href"];
        if (node["nodes"] == undefined || node["nodes"].length <= 0 ){
            node["nodes"] = last_nodes;
            node["sibling_nodes"] = true;
        }
        var mapped = node["nodes"].map(function(x) {
            if (x["href"].substring(0,1) != '#!' && x["href"].substring(0,4) != 'http'){
                x["href"] = '#!/' + lang() + '/' + x["href"];
            }
            return x;
        });
        node["nodes"] = mapped;

        return node;
    }
    $rootScope.getNode = getNode;

    $rootScope.history = [];
    for (var i = 0; i < sections().length; i++ ){
        var node_id = sections().slice(0, i + 1).join('/');
        var node = getNode(node_id);
        if (node != null) $rootScope.history.push(node);
    }

    var breadcrumbs = function(){
        var output = [{ label: "inicio", href: '#!/' + lang(), inactive: false }];
        var current_section = $location.path().substr(1).split('/').pop();
        var crumbs = [];
        for (var i = 0; i < $rootScope.history.length; i++){
            var crumb = {};
            var href = [];
            for ( var j = 0; j < crumbs.length; j++){
                href.push(crumbs[j]["label"]);
            }
            crumb["label"] = $rootScope.history[i]["id"];
            crumb["href"] = crumbs.length == 0 ? crumb["label"] : href.join('/') + '/' + crumb["label"];
            crumb["href"] = '#!/' + lang() + '/' + crumb["href"];
            crumb["inactive"] = ( (current_section == crumb["label"]) || ($rootScope.history[i]['content'].trim() == '') );
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

    $rootScope.empty_rows = new Array(10);

    $rootScope.ckOptions = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    $rootScope.loadingResources = function(){
        var output = 0;
        var resources = ['element_status', 'language_status', 'poster_status', 'slider_status', 'showcase_status', 'slideshow_status', 'patreons_status'];
        for ( var i = 0; i < resources.length; i++ ){
            var resource = $rootScope[resources[i]];
            if(typeof(resource) === 'function') if (resource() == 'loading') output++;
        }
        return output;
    };

    $rootScope.remove_patreon = function(patreon) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('¿Está seguro?')
            .textContent('Esta acción no se puede deshacer.')
            .ariaLabel('Confirmación')
            .ok('Eliminar patrocinador')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
            $http({ method: 'POST', data: { "collection": "patreons", "filters": [{ "ID": patreon["ID"] }] }, url: 'api/delete.json' });
            $location.path( $rootScope.lang() + '/patrocinadores/');
        });
    };

    $rootScope.remove_team_member = function(member) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('¿Está seguro?')
            .textContent('Esta acción no se puede deshacer.')
            .ariaLabel('Confirmación')
            .ok('Eliminar miembro')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
            $http({ method: 'POST', data: { "collection": "team", "filters": [{ "ID": member["ID"] }] }, url: 'api/delete.json' });
            $location.path( $rootScope.lang() + '/equipo/');
        });
    };

    $rootScope.toolbar = {
        changeName: function(item, ev){
            var confirm = $mdDialog.prompt()
                .title('Modificar nombre')
                .textContent('Introduzca el nuevo nombre.')
                .placeholder('Nuevo nombre')
                .ariaLabel('Nombre')
                .initialValue(item.name)
                .targetEvent(ev)
                .ok('Modificar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function(result) {
                item.name = result;
            }, function(result){});
        },
        changeAddress: function(item, ev){
            var confirm = $mdDialog.prompt()
                .title('Modificar dirección')
                .textContent('La dirección se usa también para calcular la posición en el mapa.')
                .placeholder('Dirección')
                .ariaLabel('Dirección')
                .initialValue(item.address)
                .targetEvent(ev)
                .ok('Modificar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function(result) {
                item.address = result;
            }, function(result){});
        },
        changeExcerpt: function(item, ev){
            var confirm = $mdDialog.prompt()
                .title('Modificar resumen')
                .textContent('Si deja esto en blanco el sistema generará el resumen en base al contenido.')
                .placeholder('Resumen')
                .ariaLabel('Resumen')
                .initialValue(item.excerpt)
                .targetEvent(ev)
                .ok('Modificar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function(result) {
                item.excerpt = result;
            }, function(result){});
        },
        changeDate: function(item, ev){
            var confirm = $mdDialog.prompt()
                .title('Modificar fecha')
                .textContent('Introduzca la fecha asignada al artículo.')
                .placeholder('DD/MM/AAAA')
                .ariaLabel('Fecha del artículo')
                .initialValue(item.date.getDate() + '/' + (item.date.getMonth() + 1) + '/' + item.date.getFullYear() )
                .targetEvent(ev)
                .ok('Modificar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function(result) {
                result = result.split('/').reverse().join('-');
                result = new Date( result + 'T00:00:00Z');
                item.date = result;
            }, function(result){});
        }
    };

    $rootScope.Date = function(arg){
        if (arg != null) {
            return new Date(arg);
        } else {
            return new Date();
        }
    };

    $rootScope.submitForm = function (data, action){
        for (var value_index = 0; value_index < data.values.length; value_index++){
            var v= data.values[value_index];
            delete v['image'];
            delete v['images'];
            delete v['image_path'];
            delete v['image_paths'];
            if ( v['type'] != 'sell' ) v['ibi'] = null;
            for (key in Object.keys(v)){
                key = Object.keys(v)[key];
                if (v.hasOwnProperty(key)){
                    var value = v[key];
                    switch(true){
                        case (value == 'true' || value == 'false'):
                            v[key] = (value == 'true');
                            break;
                    }
                }
            }
        }
        $http({ url: action, data: data, method: 'POST' })
        .then(function(response) {
            if (response.data.length != 0){
                if (response.data[response.data.length - 1].hasOwnProperty('error') ){
                    $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Error')
                        .textContent('Ha ocurrido un error durante la operación. Contacte con el administrador de la página.')
                        .ariaLabel('Error en la operación')
                        .ok('Aceptar')
                        );
                } else {
                    console.warn(response.data[response.data.length - 1]);
                    $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Exito')
                        .textContent('Sus datos han sido registrados correctamente.')
                        .ariaLabel('Datos registrados')
                        .ok('Aceptar')
                        );
                }
            } else {
                $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent('Ha ocurrido un error durante la operación. Contacte con el administrador de la página.')
                    .ariaLabel('Error en la operación')
                    .ok('Aceptar')
                    );
            }
        }, function(response) {
            $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Error')
                .textContent('Ha ocurrido un error durante la operación. Contacte con el administrador de la página.')
                .ariaLabel('Error en la operación')
                .ok('Aceptar')
                );
        });
    };

});
