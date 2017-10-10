app.directive('appOffCanvas', function () {

    var template = '<div class="off-canvas-content {{\'page-level-\' + level() }} panel" ng-transclude flex="100" layout="column"></div>';

    template = '<app-off-canvas-nav></app-off-canvas-nav>' + template;

    template = '<div class="off-canvas-wrapper-inner" flex="100">' + template + '</div>';
    template = '<div class="off-canvas-wrapper" flex="100" layout="fill">' + template + '</div>';
    template = '<div class="content-wrapper" flex="100" layout="fill">' + template + '</div>';

    return {
        restrict: 'E',
        scope: true,
        transclude: true,
        template: template
    };
});
