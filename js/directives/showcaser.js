app.directive('appShowcaser', function () {

    var tile_a1 = '<img src="http://www.arona.org/portal/imagecache/ficha/{{ article.IMAGEN }}">';
    tile_a1 = '<md-grid-tile md-colspan="1" md-rowspan="3">' + tile_a1 + '</md-grid-tile>';

    var tile_a2 = '{{ article.F_INICIO | date : schema | capitalize }}';
    tile_a2 = '<div class="showcaser-date">' + tile_a2 + '</div>';

    tile_a2 += '<div>{{ article.TITULO }}</div>';

    tile_a2 = '<div style="height: 100%; width: 100%; padding: 1em;" layout="column">' + tile_a2 + '</div>';
    tile_a2 = '<md-grid-tile md-colspan="1" md-rowspan="3" md-rowspan-gt-md="2">' + tile_a2 + '</md-grid-tile>';

    var tile_a = tile_a1 + tile_a2;
    tile_a = '<md-grid-list md-cols="2" md-cols-gt-md="1" md-row-height="3:1">' + tile_a + '</md-grid-list>';
    tile_a = '<md-content>' + tile_a + '</md-content>';
    tile_a = '<a style="width: 100%; height:100%;" href="#/{{ lang }}/actividades/{{ article.CODCONTENIDO }}">' + tile_a + '</a>';
    tile_a = '<md-grid-tile class="showcaser-card" md-rowspan="1" md-rowspan-gt-md="4" md-colspan="1" ng-repeat="article in elements">' + tile_a + '</md-grid-tile>';

    var tile_b = '<md-icon class="material-icons md-primary">today</md-icon>';
    tile_b = '<div>' + tile_b + '</div>';
    tile_b += '<span>{{ label }}</span>';
    tile_b = '<a layout="row" class="icon-button" href="{{ href }}">' + tile_b + '</a>';
    tile_b = '<md-grid-tile md-rowspan="1" md-colspan="1" md-colspan-gt-sm="3">' + tile_b + '</md-grid-tile>';

    var template = tile_a + tile_b;
    template = '<md-grid-list md-cols="1" md-cols-gt-xs="2" md-cols-gt-md="3" md-row-height-gt-md="15:5" md-row-height-gt-xs="2:1" md-row-height="2:1" md-gutter="12px" md-gutter-gt-sm="24px">' + template + '</md-grid-list>';
    template = '<md-content flex="100" style="overflow: hidden;">' + template + '</md-content>';
    template = '<div class="large-10 large-offset-1 columns">' + template + '</div>';
    template = '<div class="row showcaser">' + template + '</div>';

    return {
        restrict: 'E',
        scope: {
            'elements': '=',
            'schema': '=',
            'href': '=',
            'lang': '=',
            'label': '='
        },
        transclude: true,
        template: template
    };
});
