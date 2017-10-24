app.directive('appPaginatorBrowser', function () {

    var template = '<div flex layout="column">' +
        '<app-element-feedback style="display: none;"></app-element-feedback>' +
        '<div ng-if="element_status() == \'loading\'" layout-align="center center" layout="row" layout-margin>' +
            '<md-progress-circular md-mode="indeterminate"></md-progress-circular>' +
        '</div>' +
        '<app-paginator-filters></app-paginator-filters>' +
        '<div ng-if="element_status() == \'ok\'" flex layout="column">' +
            '<ng-transclude flex layout="row" layout-wrap layout-align="space-around center"></ng-transclude>' +
        '</div>' +
        '<app-paginator-controls></app-paginator-controls>' +
    '</div>';
    template = '<div flex>' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template
    };
});
