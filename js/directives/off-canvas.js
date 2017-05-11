app.directive('appOffCanvas', function () {

    var template = '<div class="off-canvas-content {{\'page-level-\' + level() }} panel" ng-transclude></div>';

    template = '<app-off-canvas-nav></app-off-canvas-nav>' + template;

    template = '<div class="off-canvas-wrapper-inner">' + template + '</div>';
    template = '<div class="off-canvas-wrapper">' + template + '</div>';
    template = '<div class="content-wrapper">' + template + '</div>';

    return {
        restrict: 'E',
        scope: true,
        transclude: true,
        template: template
    };
});
