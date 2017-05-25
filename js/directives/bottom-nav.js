app.directive('appBottomNav', function () {

    var header = '<a href="{{ link.href.substr(0,1) != \'/\' ? \'#/\' + lang() + \'/\' : \'\' }}{{link.href}}">{{ translate("pagina.titulo_", label) }}</a>';
    header = '<li>' + header + '</li>';

    var link = '<a href="{{ sublink.href.substr(0,1) != \'/\' ? \'#/\' + lang() + \'/\' : \'\' }}{{sublink.href}}">{{ translate("pagina.titulo_", sublabel) }}</a>';
    link = '<li ng-repeat="(sublabel, sublink) in link.content">' + link + '</li>';

    var template = header + link;

    template = '<ul style="height: 100%;">' + template + '</ul>';
    template = '<div class="small-6 medium-3 columns" ng-if="$index < 4"  ng-repeat="(label, link) in nav">' + template + '</div>';
    template = '<div class="row">' + template + '</div>';
    template = '<div class="large-10 large-offset-1 columns">' + template + '</div>';
    template = '<div class="row bottomnav">' + template + '</div>';
    template = '<div class="main-row hide-for-print" style="background-color: #eeeeee;">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});

