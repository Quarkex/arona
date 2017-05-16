app.directive('appSideNav', function () {

    var template = '{{ translate(\'pagina.titulo_\', label) }}';
    template = '<a href="{{ link[\'href\'].substring(0,4) == \'http\' ? link[\'href\'] : \'#/\' + lang() + \'/\' }}{{ link.href }}" aria-controls="panel-{{ label }}">' + template + '</a>';
    template = '<li ng-repeat="(label, link) in sublinks" class="{{ current_section(label) ? \'is-active\' : \'is-inactive\' }}">' + template + '</li>';
    template = '<ul class="vertical menu side-nav">' + template + '</ul>';
    template = '<div class="side-nav-wrapper">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});

