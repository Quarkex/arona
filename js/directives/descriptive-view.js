app.directive('appDescriptiveView', function () {

    var template = '<div class="row territorial-view">' +
        '<div class="large-10 large-offset-1 columns">' +
            '<article class="small-12 columns activity-view">' +
                '<header>' +
                    '<div class="row post-title"><h2 ng-bind="element().TITULO"></h2></div>' +
                    '<div class="row post-header">' +
                        '<div class="medium-3 columns">' +
                            '<div class="square" style="background-image: url(http://www.arona.org/portal/imagecache/ampliado/{{ element().IMAGEN }});"></div>' +
                        '</div>' +
                '<div layout="column" class="row post-content">' +
                    '<div class="activity-content" layout="column" ng-if="element()[\'DESCRIPCION_COMUN\'] != null">' +
                        '<div bind-html-compile="element()[\'DESCRIPCION_COMUN\']"></div>' +
                    '</div>' +
                    '<div class="activity-content" layout="column" ng-if="element()[\'TEXTO\'] != null">' +
                        '<div bind-html-compile="element()[\'TEXTO\']"></div>' +
                    '</div>' +
                '</div>' +
            '</article>' +
        '</div>' +
    '</div>' +
    '<app-related-content></app-related-content>' +
    '<div class="row">' +
        '<div class="large-10 large-offset-1 columns">' +
            '<app-back-bar class="small-12 columns"></app-back-bar>' +
        '</div>' +
    '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});


