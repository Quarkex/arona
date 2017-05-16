app.directive('appHeader', function () {

    var template = '';

     //////////////////////////
    // Begin of main header //
   //////////////////////////

    var links = 
        '<a class="site-title" href="#/{{ lang() }}/">' +
            '<h6>{{ translate(\'general.titulo\') }}</h6>' +
        '</a>' +
        '<a href="#">' +
            '<h1>Playa de las Americas</h1>' +
        '</a> <br>' +
        '<a href="#">' +
            '<h1>Costa del Silencio</h1>' +
        '</a> <br>' +
        '<a href="#">' +
            '<h1>Playa de los Cristianos</h1>' +
        '</a>';

    var button_left = '<span>{{ translate(\'pagina.titulo_conoce_arona\') }}</span>';
    button_left = '<a class="button opaque full-width" href="#/{{ lang() }}/destino_arona">' + button_left + '</a>';
    button_left = '<div flex="100" class="text-center">' + button_left + '</div>';
    button_left = '<div hide-xs flex="15"></div>' + button_left;
    button_left = '<div flex flex-gt-xs="33" layout="row">' + button_left + '</div>';

    var button_right = '<span>{{ translate(\'pagina.titulo_tour_virtual_360\') }}</span>';
    button_right = '<a class="button opaque full-width" href="http://www.arona.org/portal/RecursosWeb/PAGINA/ilovetheword/arona.html">' + button_right + '</a>';
    button_right = '<div class="text-center">' + button_right + '</div>';
    button_right = '<div flex="100">' + button_right + '</div>';

    var cam_button = '<md-icon style="color:white;" class="material-icons">camera_alt</md-icon>';
    cam_button = '<a class="button" href="#/{{ lang() }}/galeria" style="padding: 0.48rem;">' + cam_button + '</a>';
    cam_button = '<div flex flex-xs="15" flex-sm="15" class="text-left" style="margin-left: 0.2em;">' + cam_button + '</div>';

    button_right += cam_button;
    button_right = '<div layout="row" flex-gt-xs="33">' + button_right + '</div>';

    var buttons = button_left + button_right;
    buttons = '<div flex></div>' + buttons + '<div flex></div>';
    buttons = '<div hide-xs layout-gt-xs="row" layout-padding>' + buttons + '</div>';
    buttons = '<div class="large-10 large-offset-1 columns">' + buttons + '</div>';
    buttons = '<div class="row">' + buttons + '</div>';

    var logo = '<img src="img/logo.svg">';
    logo = '<a href="#/{{ lang() }}/">' + logo + '</a>';
    logo = '<div class="row columns text-center">' + logo + '</div>';

    var main_header = links + buttons + logo;
    main_header = '<div class="inner-wrapper">' + main_header + '</div>';
    main_header = '<header ng-if="level() == 1" class="text-center index-header" style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(255, 255, 255, 0)), url(/img/backgrounds/home/{{ ::randomInt(3) | pad: 2  }}.jpg);">' + main_header + '</header>';

    var responsive_buttons = button_left + button_right;
    responsive_buttons = '<div flex></div>' + responsive_buttons + '<div flex></div>';
    responsive_buttons = '<div ng-if="level() == 1" hide-gt-xs layout-gt-xs="row" layout-padding style="margin-bottom: 2em;">' + responsive_buttons + '</div>';

    main_header += responsive_buttons;

     ///////////////////////////////
    // Begin of secondary header //
   ///////////////////////////////

    var secondary_header_title = '<h1>{{ translate(\'pagina.titulo_\', sections()[0] ) }}</h1>';
    var secondary_header_subtitle = '{{ translate(\'pagina.subtitulo_\', sections()[0] ) }}';
    secondary_header_subtitle = '<h2 ng-if="( translate(\'pagina.subtitulo_\', sections()[0] ) != \'\' ) && ( level() == 2 )">' + secondary_header_subtitle + '</h2>';

    var secondary_header = secondary_header_title + secondary_header_subtitle;

    secondary_header = '<div class="large-10 large-offset-1 columns">' + secondary_header + '</div>';
    secondary_header = '<div class="row">' + secondary_header + '</div>';
    secondary_header = '<header ng-if="level() > 1" class="section-header" style="background-image: linear-gradient(to bottom, rgba(00, 00, 00, 0.4), rgba(00, 00, 00, 0.4)), url(/img/headers/pagina.{{ sections()[2] }}.png), url(/img/headers/pagina.{{ sections()[1] }}.png), url(/img/headers/pagina.{{ sections()[0] }}.png)">' + secondary_header + '</header>';

    template = main_header + secondary_header;

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template
    };
});

