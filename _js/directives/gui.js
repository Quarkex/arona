app.directive('appGui', function () {

    var template = 
        '<app-header class="hide-for-print"></app-header>' +
        '<app-titlebar class="hide-for-print"></app-titlebar>' +
//        '<br />' +
//        '<md-toolbar class="md-hue-2">' +
//            '<div class="md-toolbar-tools">' +
//                '<a ng-href="{{ \'#!\' + lang() + \'/\' }}" flex md-truncate><h2>Inicio</h2></a>' +
//                '<span flex></span>' +
//                '<h3>Contacto: 655 127 796</h2>' +
//            '</div>' +
//        '</md-toolbar>' +
        '<div ng-transclude flex layout="column"></div>' +
        '<md-toolbar class="md-hue-2" hide-gt-sm>' +
            '<div class="md-toolbar-tools">' +
                '<a ng-href="{{ \'#!\' + lang() + \'/\' }}" flex md-truncate><h2>Inicio</h2></a>' +
                '<h3>Contacto: 655 127 796</h2>' +
            '</div>' +
        '</md-toolbar>';
    template = '<div layout="column" flex flex-gt-xs="90">' + template + '</div>';
    template = '<div layout="row" flex="100" layout-align="center start" style="min-height: 100vh;">' + template + '</div>';

    template = '<app-off-canvas class="content-wrapper" flex="100" layout="column">' + template + '</app-off-canvas>';

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template
    };
});
