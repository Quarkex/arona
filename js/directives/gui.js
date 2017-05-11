app.directive('appGui', function () {

    var template = 
        '<app-titlebar class="hide-for-print"></app-titlebar>' +
        '<app-breadcrumbs class="hide-for-print" ng-if=" path() != ( \'/\' + lang() )"></app-breadcrumbs>' +
        '<div class="hide-for-print" ng-include="\'assets/header.htm\'"></div>' +
        '<div ng-transclude></div>'+
        '<div class="main-row hide-for-print" ng-include="\'assets/bottomnav.htm\'"></div>' +
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
