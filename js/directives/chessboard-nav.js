app.directive('appChessboardNav', function () {

    var template = '';
    var chessboard_image = '<div class="large-6 {{ $even? \'\' : \'large-push-6\' }} columns" style="background-image: url(\'/img/backgrounds/pagina.{{ label }}.png\'), linear-gradient(to bottom, grey, grey);"></div>';

    var chessboard_list_first = '{{ translate(\'pagina.titulo_\', label) }}';
    chessboard_list_first = '<a href="{{ link.href }}">' + chessboard_list_first + '</a>';
    chessboard_list_first = '<li>' + chessboard_list_first + '</li>';

    var chessboard_list_last = '{{ translate(\'pagina.titulo_\', sublabel) }}';
    chessboard_list_last = '<a href="{{ sublink[\'href\'].substring(0,4) == \'http\' ? sublink[\'href\'] : \'#/\' + lang() + \'/\' }}{{ sublink.href }}">' + chessboard_list_last + '</a>';
    chessboard_list_last = '<li ng-repeat="(sublabel, sublink) in link.content">' + chessboard_list_last + '</li>';

    var chessboard_list = '<ul class="link-list">' + chessboard_list_first + chessboard_list_last + '</ul>';
    chessboard_list = '<div class="large-6 {{ $even? \'\' : \'large-pull-6\' }} columns">' + chessboard_list + '</div>';

    chessboard = chessboard_image + chessboard_list;
    chessboard = '<div ng-if="link.content != undefined" ng-repeat="(label, link) in sublinks" class="row collapse">' + chessboard + '</div>';
    chessboard = '<div class="row large-8 large-offset-2 columns collapse link-lists">' + chessboard + '</div>';

    var icon = '<md-icon class="material-icons md-primary">{{ translate(\'pagina.icono_\', label) }}</md-icon>';
    icon = '<div>' + icon + '</div>';

    var label = '<span>{{ translate(\'pagina.titulo_\', label) }}</span>';

    var buttons = icon + label;
    buttons = '<a flex layout="row" class="icon-button" href="{{ link.href }}">' + buttons + '</a>';
    buttons = '<div flex flex-gt-md="50" ng-if="link.content == undefined" ng-repeat="(label, link) in sublinks">' + buttons + '</div>';
    buttons = '<div flex="100" flex-gt-md="65" layout="column" layout-gt-md="row" layout-margin="24px" layout-align="center center">' + buttons + '</div>';
    buttons = '<div flex="100" layout="row" style="background-color: #f6f6f6;" layout-align="center center">' + buttons + '</div>';

    var template = chessboard + buttons;
    template = '<app-off-canvas class="content-wrapper">' + template + '</app-off-canvas>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
