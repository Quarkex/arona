app.directive('appSlidingBanner', function () {

    var template = '<div flex class="sliding-banner" ng-controller="sliderCtrl">' +
        '<div ng-if="line.content != undefined" ng-repeat="line in elements()">' +
            '<span>{{ line.content }}</span><span ng-if="!$last"> • </span>' +
        '</div>' +
    '</div>';

    return {
        scope: false,
        restrict: 'E',
        template: template
    };
});
