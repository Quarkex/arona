app.directive('appPaginatorFilters', function ($compile) {

    return {
        restrict: 'E',
        transclude: true,
        scope: false,
        link: function(scope, element, attrs){
            var filters = scope.node.toggleable_filters;
            if (filters != null)
            for (var i = 0; i < filters.length; i++){
                var f = filters[i];
                var textContent = "{{ translate( 'filter.', '" + f.label + "' ) | capitalize }}";

                var object = document.createElement('a');
                object.setAttribute( 'class', "md-button {{ (node.toggleable_filters[" + i + "].status == false ) ? '' : 'md-raised' }}");
                object.setAttribute( 'target', i);
                object.onclick = function(ev){
                    var el = ev.currentTarget;
                    var fi = scope.node.toggleable_filters[el.getAttribute('target')];
                    var cl = el.getAttribute('class').split(' ');
                    var is_active = true;
                    for (var i = 0; i < cl.length; i++ ){
                        if (cl[i] == 'md-raised'){
                            is_active = false;
                            cl[i] = '';
                        }
                    }
                    cl = cl.join(' ').replace(/[\ ]+/g, ' ');
                    if (is_active == true) cl += ' md-raised';
                    el.setAttribute( 'class', cl);

                    fi.status = !fi.status;

                    scope.toggle_filter(fi.target, fi.object);
                };
                object.textContent = textContent;

                var content = $compile(object)(scope);
                var base_class= "md-button flex-20";
                content.attr( 'class', (f.status == true) ? base_class + " md-raised" : base_class);
                content.attr( 'flex', "20" );
                element.append(content);

                element.attr('layout', 'row');
                element.attr('layout-wrap', '');

            }
        }
    };
});
