app.directive('appPaginatorBrowser', function () {

    var template = '<div class="large-10 large-offset-1 columns">' +
        '<app-element-feedback style="display: none;"></app-element-feedback>' +
        '<div ng-if="element_status() == \'loading\'" layout-align="space-around" layout="row" layout-margin>' +
            '<md-progress-circular md-mode="indeterminate"></md-progress-circular>' +
        '</div>' +
        '<div ng-if="element_status() == \'ok\'" class="row collapse">' +
            '<ng-transclude></ng-transclude>' +
        '</div>' +
        '<app-paginator-controls></app-paginator-controls>' +
        '<app-back-bar></app-back-bar>' +
    '</div>';
    template = '<div class="row collapse">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template
    };
});
