app.directive('appSlideshow', function () {

    var template = '' +
       '<div ng-controller="slideshowCtrl">' +
           '<slick adaptiveHeight="true" infinite="true" dots="false" arrows="true" data="elements()" init-onload="true" autoplay="true">' +
               '<div ng-repeat="item in elements()">' +
                   '<a class="territorial-header" layout="row" layout-wrap layout-align="end end" ng-href="{{ \'#!/\' + lang() + \'/\' + item.id }}" style="background-image: url(\'{{ item.map_image == null ? item.image_path : item.map_image }}\');">' +
                       '<md-card layout="column" layout-padding>' +
                           '<md-card-title layout="column" layout-gt-xs="column" layout-padding>' +
                               '<md-card-title-text layout="column" layout-align="begin begin" ng-if="item.name != null">' +
                                   '<span class="md-headline">{{ item.name.lenght > 60 ? ( item.name | limitTo: 59 ) + \'…\' : item.name }}</span>' +
                                   '<span class="md-subhead">{{ item.type == \'rent\' ? \'Alquiler\' : \'Venta\' }}</span>' +
                               '</md-card-title-text>' +
                               '<md-card-title-media ng-if="item.image_path != null" flex="100" layout="row" layout-align="center center">' +
                                   '<div class="md-media-lg card-media">' +
                                       '<img flex="100" ng-src="{{ item.image_path }}">' +
                                   '</div>' +
                               '</md-card-title-media>' +
//                               '<md-card-content ng-if="item.price != null">' +
//                                   '<span class="md-subhead">{{ item.price }} €</span>' +
//                               '</md-card-content>' +
                           '</md-card-title>' +
                           '<md-card-content ng-if="item.excerpt != null" bind-html-compile="item.excerpt"></md-card-content>' +
                       '</md-card>' +
                   '</a>' +
               '</div>' +
           '</slick>' +
       '</div>' +
       '';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
