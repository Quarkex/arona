app.directive('appRelatedContent', function () {

    var header = '{{ translate( \'general.\', \'contenidos_relacionados\') | capitalize | gsub:\'_\':\' \' }}';
    header = '<h2 style=" text-transform: uppercase; font-size: 20px; line-height: 1.2; border-bottom: 2px solid #d2251a;">' + header + '</h2>';

    var content_a = '<img class="md-media-md card-media" alt="{{ card.name }}" src="http://www.arona.org/portal/imagecache/ficha/{{ card.IMAGEN }}">';
    content_a = '<md-card-title-media>' + content_a + '</md-card-title-media>';
    content_a = '<div style="flex-basis:125px;">' + content_a + '</div>';

    var content_b1 = 'card.TITULO';
    content_b1 = '<a style="text-align: left;" href="{{ node.href }}/{{ card.CODCONTENIDO }}" bind-html-compile="' + content_b1 + '"></a>';
    content_b1 = '<span class="md-headline" style="font-size: 18px;">' + content_b1 + '</span>';

    var content_b2 = 'card.DESCRIPCION_COMUN';
    content_b2 = '<md-truncate flex class="md-subhead" style="padding-top: 0;" bind-html-compile="' + content_b2 + '"></md-truncate>';

    var content_b = content_b1 + content_b2;
    content_b = '<md-card-title-text>' + content_b + '</md-card-title-text>';
    content_b = '<div flex>' + content_b + '</div>';

    content = '<md-card-title style="padding: 16px;">' + content_a + content_b + '</md-card-title>';
    content = '<md-card flex md-theme="default" md-theme-watch style="min-height: 150px; background-color: #f6f6f6;">' + content + '</md-card>';
    content = '<md-grid-tile md-rowspan="1" md-colspan="1" ng-repeat="card in element().CONTENIDOS_RELACIONADOS">' + content + '</md-grid-tile>';
    content = '<md-grid-list md-cols-gt-xs="2" md-cols="1" md-row-height="3:1" flex class="hide-for-print">' + content + '</md-grid-list>';

    var template = header + content;
    template = '<div layout-margin ng-if="element().CONTENIDOS_RELACIONADOS.length > 0">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
