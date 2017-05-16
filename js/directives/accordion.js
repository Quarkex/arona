app.directive('appAccordion', function () {

    var section = '<h2 ng-bind="translate( \'pagina.titulo_\', node.parent.parent.title )"></h2>';

    var header = '<accordion-heading>{{ translate(\'pagina.titulo_\', link.title) | gsub:\'_\':\' \' | capitalize }}</accordion-heading>';

    var lone_button = '{{ translate(\'pagina.titulo_\', link.title) | gsub:\'_\':\' \' | capitalize }}';
    lone_button = '<li ng-class="{ \'active\': (current_section() == link.id) }">' + lone_button + '</li>';
    lone_button = '<a ng-if="link.nodes.length == 0" ng-href="{{ link.href.substr(0,1) == \'/\' ? \'#/\' + lang() : \'\' }}{{ link.href }}">' + lone_button + '</a>';

    var multiple_buttons = '{{ translate(\'pagina.titulo_\', sublink.title) | gsub:\'_\':\' \' | capitalize }}';
    multiple_buttons = '<li ng-class="{ \'active\': (current_section() == sublink.id) }">' + multiple_buttons + '</li>';
    multiple_buttons = '<a ng-if="link.content" ng-href="{{ sublink.href.substr(0,1) == \'/\' ? \'#/\' + lang() : \'\' }}{{ sublink.href }}" ng-repeat="sublink in link.nodes">' + multiple_buttons + '</a>';

    var template = lone_button + multiple_buttons;
    template = '<ul layout="column">' + template + '</ul>';
    template = header + template;
    template = '<accordion-group is-open="::(node.parent.title == link.id )" ng-repeat="link in node.parent.parent.nodes">' + template + '</accordion-group>';
    template = '<accordion close-others="true" ng-controller="accordionCtrl">' + template + '</accordion>';
    template = '<div class="accordion-wrapper hide-for-print">' + section + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template
    };
});
