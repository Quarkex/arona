app.directive('appFooter', function () {

    var template = '';

    var foot_links = [
        ['Patronato Municipal de Turismo del Ayuntamiento de Arona', 'http://www.arona.travel'],
        ['Calle El Calvario 5. 38640 Arona. Tenerife. España', 'http://maps.google.es/maps?f=q&t=k&z=17&hl={{ lang () }}&q=Calvario%205%20Arona%2038640%20Tenerife%20Espa%F1a']
    ];

    var head_left_links = [
        ['{{ translate(\'pie.ayuntamiento\') }}', 'http://www.arona.org'],
        ['{{ translate(\'pie.avisolegal\') }}', '#!'],
        ['{{ translate(\'pie.protecciondedatos\') }}', '#!'],
        ['{{ translate(\'pie.indicedecontenidos\') }}', '#!']
    ];

    var head_right_links = [
        ['<md-icon class="fa fa-facebook-official"></md-icon>', 'http://www.facebook.com/turismoaronatenerifesur'],
        ['<md-icon class="fa fa-twitter"></md-icon>',           'http://twitter.com/TurismoArona'],
        ['<md-icon class="fa fa-youtube-play"></md-icon>',      'http://www.youtube.com/channel/UCWnPtYXRFfn84JUF_zDaQ6Q'],
        ['<md-icon class="fa fa-instagram"></md-icon>',         'http://instagram.com/turismoarona'],
        ['<md-icon class="fa fa-tripadvisor"></md-icon>',       'https://www.tripadvisor.es/Tourism-g230096-Arona_Tenerife_Canary_Islands-Vacations.html'],
        ['<md-icon class="fa fa-flickr"></md-icon>',            'https://www.flickr.com/photos/turismoaronatenerife/albums']
    ];

    var head = '';
    var head_left = '';
    var head_right = '';
    var foot = '';

    var i = 0;

    for ( i = 0; i < head_left_links.length; i++){
        head_left = head_left + '<a  href="' + head_left_links[i][1] + '">' + head_left_links[i][0] + '</a>';
        if ( i != (head_left_links.length - 1) ) head_left = head_left + ' <span>|</span> ';
    }
    head_left = '<div class="large-7 large-offset-1 text-center large-text-left columns">' + head_left + '</div>';

    for ( i = 0; i < head_right_links.length; i++){
        head_right = head_right + '<a  href="' + head_right_links[i][1] + '">' + head_right_links[i][0] + '</a>';
    }
    head_right = '<div class="large-3 text-center large-text-right end column">' + '<span>{{ translate(\'pie.siguenos\') }}' + head_right + '</span>' + '</div>';

    head = '<div class="row">' + head_left + head_right + '</div>';
    head = '<div class="main-row" style="padding: 0;">' + head + '</div>';

    for ( i = 0; i < foot_links.length; i++){
        foot = foot + '<a  href="' + foot_links[i][1] + '">' + foot_links[i][0] + '</a>';
        if ( i != (foot_links.length - 1) ) foot = foot + ' <span>|</span> ';
    }
    foot = '<div class="row text-center column" style="padding: 0.1em;">' + foot + '</div>';
    foot = '<div class="row" style="max-width: none;">' + foot + '</div>';

    template = '<div class="footer-wrapper hide-for-print">' + head + foot + '</div>';

    return {
        restrict: 'EA',
        template: template
    };
});
