app.directive('appFooter', function () {

    var template = '';

    var footer_dialogs = [
        ['POLÍTICA DE PRIVACIDAD/AVISO LEGAL', 'politica-de-privacidad-aviso-legal'],
        ['CONDICIONES COMERCIALES', 'condiciones-comerciales']
    ];

    var footer_left = [
        'Cantera Base 1939 Canarias, Sociedad Anónima Deportiva ',
        'Año de fundación: 1939'
    ];

    var footer_center = [
        'E-mail: secretaria@cbcanarias.es ',
        'Teléfono: 922-25-36-84',
        'Fax: 922-31-59-09'
    ];

    var footer_right = [
        'C/Mercedes, s/n, Pabellón Insular de Tenerife Santiago Martín',
        'Casa del Deporte / 3ª planta / 38108 – La Laguna'
    ];

    var footer_string = '';
    var footer_dialogs_string = '';
    var footer_left_string = '';
    var footer_center_string = '';
    var footer_right_string = '';

    var i = 0;

    for ( i = 0; i < footer_dialogs.length; i++){
        footer_dialogs_string = footer_dialogs_string + '<a ng-click="dialog=\'assets/dialogs/' + footer_dialogs[i][1] + '.tmpl.html\'; showDialog();">' + footer_dialogs[i][0] + '</a>';
        if ( i != (footer_dialogs.length - 1) ) footer_dialogs_string = footer_dialogs_string + ' <span hide-xs>|</span> ';
    }
    footer_dialogs_string = '<div flex layout="column" layout-gt-xs="row" layout-align="center center" layout-margin>' + footer_dialogs_string + '</div>';

    for ( i = 0; i < footer_right.length; i++){
        footer_right[i] = '<span>' + footer_right[i] + '</span>';
    }
    footer_right_string = '<div class="right" flex flex-gt-sm="33" layout="column" layout-align="begin center" layout-align-gt-sm="begin end">' + footer_right.join('') + '</div>';

    for ( i = 0; i < footer_center.length; i++){
        footer_center[i] = '<span>' + footer_center[i] + '</span>';
    }
    footer_center_string = '<div class="center" flex flex-gt-sm="33" layout="column" layout-align="begin center">' + footer_center.join('') + '</div>';

    for ( i = 0; i < footer_left.length; i++){
        footer_left[i] = '<span>' + footer_left[i] + '</span>';
    }
    footer_left_string = '<div class="left" flex flex-gt-sm="33" layout="column" layout-align="begin center" layout-align-gt-sm="begin begin">' + footer_left.join('') + '</div>';

    footer_string = footer_left_string + footer_center_string + footer_right_string;
    footer_string = '<div flex layout="column" layout-gt-sm="row" layout-padding>' + footer_string + '</div>';
    footer_string = '<div ng-controller="footerCtrl" class="footer-wrapper hide-for-print" layout="column" flex>' + footer_dialogs_string + footer_string + '</div>';


    template = footer_string;

    return {
        restrict: 'EA',
        template: template
    };
});
