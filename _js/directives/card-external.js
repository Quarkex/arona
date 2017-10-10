app.directive('appCardExternal', function () {

    var href = '{{ item.RECURSOS[0].RECURSO.substring(0,4) == \'http\' ? item.RECURSOS[0].IMAGEN : \'http://www.arona.org/portal/\' + item.RECURSOS[0].IMAGEN }}';

    var text = '<h1 ng-bind="item.TITULO"></h1>' + '<p bind-html-compile="item.DESCRIPCION_COMUN"></p>';
    text = '<div flex>' + text + '</div>';


    var template = text;
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
