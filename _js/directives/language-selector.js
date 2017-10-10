app.directive('appLanguageSelector', function () {

    var template = '';

    var button_label = '{{ lang() | uppercase }}';
    var button_icon = '<md-icon md-menu-origin class="material-icons">language</md-icon>';
    var button = button_label + ' ' + button_icon;

    button = '<md-button class="md-button" ng-click="$mdMenu.open($event)" style="min-width: unset;">' + button + '</md-button>';

    var item_label = '{{ translate(\'idioma.\', l ) }}';
    var item_href = '#!{{ path().replace( lang(), l ) }}';

    var menu = '<md-button href="' + item_href + '">' + item_label + '</md-button>';

    menu = '<md-menu-item ng-if="lang() != l" ng-repeat="l in available_languages()">' + menu + '</md-menu-item>';
    menu = '<md-menu-content width="3">' + menu + '</md-menu-content>';

    template = '<md-menu>' + button + menu + '</md-menu>';

    return {
        scope: false,
        restrict: 'E',
        template: template
    };
});
