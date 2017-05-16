app.directive('appDocumentalView', function () {

    var template = '<div class="row territorial-view" ng-controller="resourcePaginatorCtrl">' +
        '<div class="row">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<div layout="column" layout-margin>' +
                    '<h2 style="margin-top: 1.5em; border-bottom: 3px solid #004481;">{{  element().TITULO }}</h2>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<div layout-gt-xs="row" layout="column" class="territorial-info" layout-margin>' +
                    '<!-- Swap this commented line with the next one to hide image field if not found -->' +
                    '<!-- <md-content ng-if="element().IMAGEN != -1" flex flex-gt-xs="50" class="territorial-map flex-video"> -->' +
                    '<md-content flex flex-gt-xs="30" class="territorial-map flex-video">' +
                        '<img ng-if="element().IMAGEN != -1" class="md-media-md card-media" alt="{{ element().TITULO }}" src="http://www.arona.org/portal/imagecache/ficha/{{ element().IMAGEN }}">' +
                    '</md-content>' +
                    '<md-card flex class="territorial-contact" style="padding: 0 2.5em;">' +
                        '<md-card-content>' +
                            '<div layout="column" layout-margin>' +
                                '<md-content bind-html-compile="element().TEXTO" flex class="territorial-description" style="background: none; text-align: justify;"></md-content>' +
                            '</div>' +
                        '</md-card-content>' +
                    '</md-card>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<app-related-content></app-related-content>' +
            '</div>' +
        '</div>' +
        '<div class="row collapse">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<app-back-bar></app-back-bar>' +
            '</div>' +
        '</div>' +
    '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});


