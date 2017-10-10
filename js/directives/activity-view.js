app.directive('appActivityView', function () {

    var template = '<div class="row collapse">' +
        '<article class="medium-10 medium-offset-1 columns activity-view">' +
            '<header>' +
                '<div class="row post-title"><h2 ng-bind="element().TITULO"></h2></div>' +
                '<div class="row post-place"><h3 ng-if="element().DONDE != null" bind-html-compile="element().DONDE"></h3></div>' +
                '<div class="row post-header">' +
                    '<div class="medium-3 columns">' +
                        '<div class="square" style="background-image: url(http://www.arona.org/portal/imagecache/ampliado/{{ element().IMAGEN }});"></div>' +
                    '</div>' +
                    '<div class="medium-9 columns text-center medium-text-left">' +
                        '<p class="post-meta date">' +
                        '<time datetime="{{ element().F_INICIO }}">{{ element().F_INICIO | date: \'EEE dd, MMM yyyy\'}}</time>' +
                        '<span ng-if="element().F_FIN != null" class="show-for-medium"> - </span>' +
                        '<br class="hide-for-medium">' +
                        '<time ng-if="element().F_FIN != null" datetime="{{ element().F_FIN }}">{{ element().F_FIN | date: \'EEE dd, MMM yyyy\'}}</time>' +
                        '</p>' +
                        '<p class="post-meta time price">' +
                        '<time ng-if="element().F_INICIO != null" datetime="{{ element().F_INICIO }}">{{ element().F_INICIO | date: \'HH:mm\' : \'+0000\'}} h</time>' +
                        '<span ng-if="element().F_FIN != null"> - </span>' +
                        '<time ng-if="element().F_FIN != null" datetime="{{ element().F_FIN }}">{{ element().F_FIN | date: \'HH:mm\' : \'+0000\'}} h</time>' +
                        '<span ng-if="element().PRECIO != null" class="show-for-medium"> | </span>' +
                        '<br class="hide-for-medium">' +
                        '<!--span ng-if="element().PRECIO != null">{{ element().PRECIO | gsub: \'&[#]?[0-9a-z]+;\':\'\':true | gsub: \'[^0-9.,]*\':\'\':true | currency:"€" }}</span-->' +
                        '<span ng-if="element().PRECIO != null" bind-html-compile=" element().PRECIO | gsub: \'<[^>]+>\':\' \':true"></span>' +
                        '<!--span ng-if="element().PRECIO != null" ng-bind-html="{{ element().PRECIO }}"></span-->' +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</header>' +
            '<div layout="column" class="row post-content">' +
                '<div class="activity-content" layout="column" ng-if="element()[\'TAQUILLA\'] != null && element()[\'TAQUILLA\'].trim() != \'\'">' +
                    '<h4 class="section-title">{{ translate(\'general.seccion_\', \'taquilla\') + \':\' | gsub: \'_\':\' \':true | capitalize }}</h4>' +
                    '<div bind-html-compile="element()[\'TAQUILLA\']"></div>' +
                '</div>' +

                '<div class="activity-content" layout="column" ng-if="element()[\'ORGANIZACION\'] != null">' +
                    '<h4 class="section-title">{{ translate(\'general.seccion_\', \'organiza\') + \':\' | gsub: \'_\':\' \':true | capitalize }}</h4>' +
                    '<div bind-html-compile="element()[\'ORGANIZACION\']"></div>' +
                '</div>' +

                '<div class="activity-content" layout="column" ng-if="element()[\'TELEFONO\'] != null">' +
                    '<h4 class="section-title">{{ translate(\'general.seccion_\', \'contacto\') + \':\' | gsub: \'_\':\' \':true | capitalize }}</h4>' +
                    '<div bind-html-compile="element()[\'TELEFONO\']"></div>' +
                '</div>' +

                '<div class="activity-content" layout="column" ng-if="element()[\'WEB_PROPIA\'] != null">' +
                    '<h4 class="section-title">{{ translate(\'general.\', \'web\') | gsub: \'_\':\' \':true | capitalize }}</h4>' +
                    '<div><a href="{{ element().WEB_PROPIA }}">{{ element().WEB_PROPIA }}</a></div>' +
                '</div>' +

                '<div class="activity-content" layout="column" ng-if="element()[\'DESCRIPCION_COMUN\'] != null">' +
                    '<h4 class="section-title">{{ translate(\'general.seccion_\', \'descripcion_del_evento\') + \':\' | gsub: \'_\':\' \':true | capitalize }}</h4>' +
                    '<div bind-html-compile="element()[\'DESCRIPCION_COMUN\']"></div>' +
                '</div>' +
            '</div>' +
        '</article>' +
        '<div class="row">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<app-related-content></app-related-content>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="large-10 large-offset-1 columns">' +
                '<div layout-margin>' +
                    '<app-back-bar layout-margin></app-back-bar>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});

