app.directive('appShowcaser', function () {

    var articles_bottom = '<md-icon class="material-icons md-primary">today</md-icon>';
    articles_bottom = '<div>' + articles_bottom + '</div>';
    articles_bottom += '<span>{{ label }}</span>';
    articles_bottom = '<a layout="row" class="icon-button" href="{{ href }}">' + articles_bottom + '</a>';
    articles_bottom = '<div layout="row" layout-align="center center">' + articles_bottom + '</div>';
    articles_bottom = '<div flex="100" flex-gt-sm="50" flex-gt-md="100" layout="row" layout-align="center top">' + articles_bottom + '</div>';

    var article_image   = '<img src="http://www.arona.org/portal/imagecache/ficha/{{ article.IMAGEN }}">';
        article_image   = '<div flex="40" flex-gt-sm="66" layout="column" style="overflow: hidden">' + article_image + '</div>';
    var article_title   = '<div>{{ article.TITULO }}</div>';
    var article_date    = '{{ article.F_INICIO | date : schema | capitalize }}';
        article_date    = '<div class="showcaser-date">' + article_date + '</div>';
    var article_content = '<div flex layout="column" layout-padding>' + article_date + article_title + '</div>';
        article_content = '<div ' +
            'class="showcaser-card" ' +
            'flex="100" ' +
            'flex-gt-md="33" ' +
            'flex-gt-sm="50" ' +
            'layout-align="center strech" ' +
            'layout-gt-sm="column" ' +
            'layout="row" ' +
            'ng-repeat="article in elements">' +
            '<a flex layout-gt-sm="column" layout="row" href="#!/{{ lang }}/actividades/{{ article.CODCONTENIDO }}">' +
                article_image +
                article_content +
            '</a>' +
            '</div>';
    var template = '<div layout="row" flex flex-gt-sm="80" layout-wrap layout-padding layout-align="center strech">' + article_content + articles_bottom + '</div>';
    template = '<div class="showcaser" layout="row" flex layout-align="center center">' + template + '</div>';

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
