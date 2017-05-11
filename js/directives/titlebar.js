app.directive('appTitlebar', function () {

    var menu_button = '<md-icon class="material-icons">menu</md-icon>';
    menu_button = '<md-button class="left-off-canvas-toggle md-icon-button">' + menu_button + '</md-button>';

    var menu_title = '{{ translate(\'general.\', \'menu\') }}';
    menu_title = '<h1 flex md-truncate class="md-hue-3">' + menu_title + '</h1>';

    var accessibility_link = '#/{{ lang() }}/planea_tu_viaje/destino_accesible';
    var accessibility_button = '<md-icon class="material-icons">accessible</md-icon>';
    accessibility_button = '<md-button class="md-icon-button" href="' + accessibility_link + '">' + accessibility_button + '</md-button>';

    var language_selector = '<div ng-include="\'assets/language_selector.htm\'"></div>';

    var template = menu_button + menu_title + accessibility_button + language_selector;

    template = '<div class="md-toolbar-tools">' + template + '</div>';
    template = '<md-toolbar class="md-hue-2 title-bar" ng-class="{\'sub-level\': level() > 1 }">' + template + '</md-toolbar>';

    return {
        restrict: 'E',
        template: template
    };
});
