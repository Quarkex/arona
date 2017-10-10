app.directive('appAdsBanner', function () {

    var template = '<div flex="100" layout="column" layout-align="center center">' +
        '<img src="/img/ads/Imberostar-H.gif" alt="Imberostar">' +
    '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
