app.directive('appPaginatorBrowser', function () {

    var template = '<div flex="100" flex-gt-sm="70" flex-offset-gt-sm="15" layout="row" layout-wrap>' +
        '<app-element-feedback flex="100" style="display: none;"></app-element-feedback>' +
        '<div flex="100" ng-if="element_status() == \'loading\'" layout-align="space-around" layout="row" layout-padding>' +
            '<md-progress-circular md-mode="indeterminate"></md-progress-circular>' +
        '</div>' +
        '<div layout="row" layout-wrap flex="100" layout-align="begin strech" ng-if="element_status() == \'ok\'" ng-transclude></div>' +
        '<app-paginator-controls flex="100"></app-paginator-controls>' +
        '<app-back-bar flex="100"></app-back-bar>' +
    '</div>';
    template = '<div flex="100">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template
    };
});
