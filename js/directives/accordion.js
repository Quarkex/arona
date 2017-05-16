app.directive('appAccordion', function () {

    var section = '<h2 ng-bind="translate( \'pagina.titulo_\', params.subsection )"></h2>';

    var header = '<accordion-heading>{{ translate(\'pagina.titulo_\', label) | gsub:\'_\':\' \' | capitalize }}</accordion-heading>';

    var lone_button = '{{ translate(\'pagina.titulo_\', label) | gsub:\'_\':\' \' | capitalize }}';
    lone_button = '<li ng-class="{ \'active\': (params.id == label) }">' + lone_button + '</li>';
    lone_button = '<a ng-if="! link.content" ng-href="{{ link.href.substr(0,1) == \'/\' ? \'#/\' + lang() : \'\' }}{{ link.href }}">' + lone_button + '</a>';

    var multiple_buttons = '{{ translate(\'pagina.titulo_\', sublabel) | gsub:\'_\':\' \' | capitalize }}';
    multiple_buttons = '<li ng-class="{ \'active\': (params.id == sublabel) }">' + multiple_buttons + '</li>';
    multiple_buttons = '<a ng-if="link.content" ng-href="{{ sublink.href.substr(0,1) == \'/\' ? \'#/\' + lang() : \'\' }}{{ sublink.href }}" ng-repeat="(sublabel, sublink) in link.content">' + multiple_buttons + '</a>';

    var template = lone_button + multiple_buttons;
    template = '<ul layout="column">' + template + '</ul>';
    template = header + template;
    template = '<accordion-group is-open="::(params.type == label )" ng-repeat="(label, link) in sublinks">' + template + '</accordion-group>';
    template = '<accordion close-others="true" ng-controller="accordionCtrl">' + template + '</accordion>';
    template = '<div class="accordion-wrapper hide-for-print">' + section + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template
    };
});
