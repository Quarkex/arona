app.directive('appBottomExtra', function () {

    var a_1 = '<a href="http://www.calidadturistica.es/"><img src="/img/bottom_extra/LogoA.png" style="max-height: 95px; width: auto;"></a>';
    a_1 = '<md-grid-tile md-rowspan="1" md-rowspan-gt-xs="1" md-colspan="1">' + a_1 + '</md-grid-tile>';

    var a_2 = '<a href="https://www.biospheretourism.com/"><img src="/img/bottom_extra/LogoB.png" style="max-height: 95px; width: auto;"></a>';
    a_2 = '<md-grid-tile md-rowspan="1" md-rowspan-gt-xs="1" md-colspan="1">' + a_2 + '</md-grid-tile>';

    var a_3 = '<a href="http://lasgalletas.eu/"><img src="/img/bottom_extra/LogoC.png" style="max-height: 95px; width: auto;"></a>';
    a_3 = '<md-grid-tile md-rowspan="1" md-rowspan-gt-xs="1" md-colspan-gt-xs="1" md-colspan="2">' + a_3 + '</md-grid-tile>';

    var column_a = a_1 + a_2 + a_3;
    column_a = '<md-grid-list md-cols="2" md-cols-gt-xs="3" md-row-height="4:3" md-row-height-gt-xs="1:1" md-gutter="12px" md-gutter-gt-sm="8px">' + column_a + '</md-grid-list>';
    column_a = '<div flex-gt-md="50" flex-gt-xs="33" style="margin-top: 1em;">' + column_a + '</div>';



    var b_1 = '<a href="" class="text-left medium-text-center" style="width: 90%;"><img src="/img/bottom_extra/ButtonA.png"></a>';
    b_1 = '<md-grid-tile md-rowspan="1" md-colspan-gt-xs="1" md-colspan="2">' + b_1 + '</md-grid-tile>';

    var b_2 = '<a href="https://itunes.apple.com/{{ lang () }}/app/ilovearona/id955221205?mt=8"><img src="/img/bottom_extra/ButtonB.png"></a>';
    b_2 = '<md-grid-tile md-rowspan="1" md-colspan="1">' + b_2 + '</md-grid-tile>';

    var b_3 = '<a href="https://play.google.com/store/apps/details?id=com.ilove.iLoveArona"><img src="/img/bottom_extra/ButtonC.png"></a>';
    b_3 = '<md-grid-tile md-rowspan="1" md-colspan="1">' + b_3 + '</md-grid-tile>';

    var column_b = b_1 + b_2 + b_3;
    column_b = '<md-grid-list md-cols="2" md-cols-gt-xs="1" md-row-height="3:1" md-row-height-gt-xs="6:1" md-gutter="12px" md-gutter-gt-xs="8px">' + column_b + '</md-grid-list>';
    column_b = '<div flex-gt-md="25" flex-gt-xs="33" style="margin-top: 1em;">' + column_b + '</div>';



    var c_1 = '<a class="button transparent expanded secondary" href="#/{{ lang() }}/actividades">{{ translate(\'pagina.titulo_actividades\') }}</a>';
    b_1 = '<md-grid-tile md-rowspan="1" md-colspan="1">' + c_1 + '</md-grid-tile>';

    var c_2 = '<a class="button transparent expanded secondary" href="#/{{ lang() }}/webcams">{{ translate(\'pagina.titulo_webcams\') }}</a>';
    b_2 = '<md-grid-tile md-rowspan="1" md-colspan="1">' + c_2 + '</md-grid-tile>';

    var c_3 = '<a class="button transparent expanded secondary" href="#/{{ lang() }}/galeria/arona_360">{{ translate(\'pagina.titulo_arona_360\') }}</a>';
    b_3 = '<md-grid-tile md-rowspan="1" md-colspan="1">' + c_3 + '</md-grid-tile>';

    var column_c = c_1 + c_2 + c_3;
    column_c = '<md-grid-list md-cols="1" md-row-height-gt-xs="6:1" md-row-height="9:1" md-gutter="12px" md-gutter-gt-xs="8px">' + column_c + '</md-grid-list>';
    column_c = '<div flex-gt-md="25" flex-gt-xs="33" style="margin-top: 1em;">' + column_c + '</div>';



    var template = column_a + column_b + column_c;
    template = '<div class="large-10 large-offset-1 column" layout="column" layout-gt-xs="row">' + template + '</div>';
    template = '<div class="row bottom-extra" style="overflow: hidden; padding-bottom: 2em;">' + template + '</div>';
    template = '<div class="main-row hide-for-print" style="background-color: #eeeeee;">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
