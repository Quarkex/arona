app.directive('appDefaultView', function () {

    var template = '<div class="territorial-view" ng-controller="resourcePaginatorCtrl">' +
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
                    '<md-content flex flex-gt-xs="50" class="territorial-map flex-video">' +
                        '<img style="min-width: 100%; min-height: 100%;" ng-if="element().IMAGEN != -1" class="md-media-md card-media" alt="{{ element().TITULO }}" src="http://www.arona.org/portal/imagecache/ficha/{{ element().IMAGEN }}">' +
                    '</md-content>' +
                    '<md-card flex class="territorial-contact" style="padding: 0 2.5em;">' +
                        '<md-card-content>' +
                            '<div ng-if="element().DIRECCION != null" class="row collapse">' +
                                '<p>{{  element().DIRECCION }}</p>' +
                            '</div>' +
                            '<div ng-if="element().TELEFONO != null" class="row collapse">' +
                                '<p>{{ translate("general.", \'telefono\') | capitalize }}: {{  element().TELEFONO }}</p>' +
                            '</div>' +
                            '<div ng-if="element().FAX != null" class="row collapse">' +
                                '<p>{{ translate("general.", \'fax\') | capitalize }}: {{  element().FAX }}</p>' +
                            '</div>' +
                            '<div ng-if="element().HORARIO != null" class="row collapse" bind-html-compile="element().HORARIO"></div>' +
                            '<div ng-if="element().DESCRIPCION != null" class="row collapse" bind-html-compile="element().DESCRIPCION"></div>' +
                        '</md-card-content>' +
                        '<md-card-footer style="margin-left: -2em">' +
                            '<md-card-actions layout="row" layout-align="begining center">' +
                                '<md-button ng-if="element().EMAIL != null" class="md-primary" ng-href="mailto:{{  element().EMAIL }}">{{ translate("general.", \'email\') }}</md-button>' +
                                '<md-button ng-if="element().WEB_PROPIA != null" class="md-primary" ng-href="{{  element().WEB_PROPIA }}">{{ translate("general.", \'website\') }}</md-button>' +
                            '</md-card-actions>' +
                        '</md-card-footer>' +
                    '</md-card>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<div layout="column" layout-margin style="padding: 0 5em;">' +
                    '<md-content ng-if="element().DESCRIPCION_COMUN != null" bind-html-compile="element().DESCRIPCION_COMUN" flex class="territorial-description" style="background: none;"></md-content>' +
                    '<md-content ng-if="element().TEXTO != null" bind-html-compile="element().TEXTO" flex class="territorial-description" style="background: none;"></md-content>' +
                    '<md-content ng-if="element().MAPA_IFRAME != null" bind-html-compile="element().MAPA_IFRAME" flex class="territorial-map flex-video"></md-content>' +
                '</div>' +
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

