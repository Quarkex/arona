app.directive('appHotelView', function () {

    var template = '<div class="territorial-view">' +
        '<div class="territorial-header" style="background-image: url(\'{{ elements()[0].image }}\');">' +
            '<div class="inner-wrapper">' +
                '<h1>{{  elements()[0].name }}</h1>' +
                '<h2>{{  elements()[0].type }}</h2>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="territorial-view">' +
        '<div class="row">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<div layout-gt-xs="row" layout="column" class="territorial-info" layout-margin>' +
                    '<md-content bind-html-compile="elements()[0].map_iframe" flex flex-gt-xs="66" class="territorial-map flex-video"></md-content>' +
                    '<md-card flex flex-gt-xs="33" class="territorial-contact">' +
                        '<md-card-content>' +
                            '<div class="row collapse">' +
                                '<p>{{  elements()[0].address }}</p>' +
                            '</div>' +
                            '<div ng-if="elements()[0].contact_phone != null" class="row collapse">' +
                                '<p>{{ translate("general.", \'telefono\') | capitalize }}: {{  elements()[0].contact_phone }}</p>' +
                            '</div>' +
                        '</md-card-content>' +
                        '<md-card-footer>' +
                            '<md-card-actions layout="row" layout-align="begining center">' +
                                '<md-button class="md-primary" ng-href="mailto:{{  elements()[0].email }}">{{ translate("general.", \'email\') }}</md-button>' +
                                '<md-button class="md-primary" ng-href="{{  elements()[0].website }}">{{ translate("general.", \'website\') }}</md-button>' +
                            '</md-card-actions>' +
                        '</md-card-footer>' +
                    '</md-card>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="row" style="margin-top: 1em;">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<div layout-margin>' +
                    '<h1 class="territorial-services-title">{{ translate(\'general.\', \'servicios_del_establecimiento\') }}</h1>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<div layout-margin>' +
                    '<div class="row small-up-2 large-up-3" style="margin-left: -0.45em; margin-right: -0.45em;">' +
                        '<div class="services-list column" ng-repeat="(section, section_body) in elements()[0].characteristics">' +
                            '<h3>{{ translate( \'servicio.seccion_\', section ) | capitalize }}</h3>' +
                            '<ul>' +
                                '<li ng-repeat="item in section_body.contents">' +
                                    '<md-tooltip ng-if="\'categoria\' != section && \'zona_turistica\' != section" md-direction="top">{{ item.label }}</md-tooltip>' +
                                    '<img ng-if="\'categoria\' != section && \'zona_turistica\' != section" ng-src="{{ item.image }}" alt="{{ item.label }}">' +
                                    '<span ng-if="\'categoria\' == section || \'zona_turistica\' == section">{{ item.label }}</span>' +
                                '</li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<app-related-content></app-related-content>' +
            '</div>' +
        '</div>' +
    '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});

