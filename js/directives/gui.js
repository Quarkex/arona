app.directive('appGui', function () {

    var template = 
        '<div ng-init="showDiv = true;" ng-show="showDiv"  ng-if="isExplorer" bind-html-compile="translate(\'general.\', \'actualizarnavegador\')" ng-click="showDiv = !showDiv;" layout="column" layout-margin layout-padding></div>'+
        '<app-titlebar class="hide-for-print"></app-titlebar>' +
        '<app-breadcrumbs class="hide-for-print" ng-if=" path() != ( \'/\' + lang() )"></app-breadcrumbs>' +
        '<app-header class="hide-for-print"></app-header>' +
        '<div ng-transclude></div>'+
        '<app-bottom-nav></app-bottom-nav>' +
        '<br>' +
        '<app-bottom-extra></app-bottom-extra>';

    template = '<app-off-canvas class="content-wrapper">' + template + '</app-off-canvas>';
    template += '<app-footer></app-footer>';

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template
    };
});
