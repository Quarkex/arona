app.directive('appPatreonSlider', function () {

    var template = '<div flex>' +
        '<h2>Patrocinadores</h2>' +
        '<div style="width: 100%; height: 140px;" class="sliding-banner" ng-controller="patreonsScrollCtrl">' +
            '<a ng-href="{{ patreon.link }}" style="padding: 2px; height: 100px; width: 180px;"><img style="height: auto; width:100%;" ng-repeat="patreon in elements() | orderBy: \'weight\'" ng-src="/img/patreons/{{ patreon.name | slugify }}.png" alt="{{ patreon.name }}" ng-class="{\'first\': patreon == elements()[0]}"></a>' +
        '</div>' +
    '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
