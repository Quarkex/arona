app.directive('appOffCanvasNav', function () {

    var template = '';
    var header = '';
    var header_label = '';
    var header_href = '';
    var content = '';
    var content_label = '';
    var content_href = '';

    header_label = '{{ translate("pagina.titulo_", label) }}';
    header_href = '{{ link.href.substring(0,4) == \'http\' ? link.href : \'#!/\' + lang() + \'/\' + link.href }}';

    header = '<md-button class="md-primary" ng-href="' + header_href + '">' + header_label + '</md-button>';
    header = '<md-subheader class="md-no-sticky">' + header + '</md-subheader>';

    content_label = '{{ translate("pagina.titulo_", sublabel) }}';
    content_href = '{{ sublink[\'href\'].substring(0,4) == \'http\' ? sublink[\'href\'] : \'#!/\' + lang() + \'/\' + sublink[\'href\'] }}';

    content = '<md-button ng-href="' + content_href + '">' + content_label + '</md-button>';
    content = '<md-list-item class="md-1-line" ng-if="link.content != undefined" ng-repeat="(sublabel, sublink) in link.content">' + content + '</md-list-item>';

    template = '<md-content>' + template + '</md-content>';
    template = '<md-list flex ng-repeat="(label, link) in nav">' + header + content + '</md-list>';
    template = '<md-content>' + template + '</md-content>';
    template = '<div class="off-canvas position-left hide-for-print">' + template + '</div>';

    return {
        scope: false,
        restrict: 'E',
        template: template
    };
});
