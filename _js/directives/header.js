app.directive('appHeader', function () {

    var template = '';

    var logo = '<img ng-src="{{ logo_image }}">';
    logo = '<a href="#!/{{ lang() }}/">' + logo + '</a>';
    logo = '<div layout="column" layout-margin>' + logo + '</div>';

    var banner = '<div flex hide-xs show-gt-sm class="show-for-large">' +
            '<div flex layout="column" class="fading-banner" layout-align="center end">' +
            /*
            '<figure flex layout="row" layout-align="center end"><img src="/img/banners/01.png" alt="banner"></figure>' +
            '<figure flex layout="row" layout-align="center end"><img src="/img/banners/02.png" alt="banner"></figure>' +
            '<figure flex layout="row" layout-align="center end"><img src="/img/banners/03.png" alt="banner"></figure>' +
            */
            '</div>' +
        '</div>';

    var main_header = logo + banner;
    main_header = '<div layout="row" layout-align="center end">' + main_header + '</div>';
    main_header = '<header>' + main_header + '</header>';

    template = main_header;

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: template
    };
});

