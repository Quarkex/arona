app.directive('appCardDocument', function () {

    var href = '{{ item.DOCUMENTO.substring(0,4) == \'http\' ? item.DOCUMENTO : \'http://www.arona.org/portal/\' + item.DOCUMENTO }}';

    var text = '<h1 ng-bind="item.TITULO"></h1>' + '<p bind-html-compile="item.DESCRIPCION_COMUN"></p>';
    text = '<div flex>' + text + '</div>';

    var image = '<div class="square" style="background-image: url(http://www.arona.org/portal/imagecache/ampliado/{{ item.IMAGEN }})"></div>';

    var template = image + text;
    template = '<a layout="row" flex ng-href="' + href + '" layout-margin>' + template + '</a>';
    template = '<div layout="row" class="row video-list">' + template + '</div>';

    return {
        restrict: 'E',
        scope: {
            item: '=',
        },
        template: template
    };
});
