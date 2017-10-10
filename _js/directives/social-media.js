app.directive('appSocialMedia', function () {

    var template = '<h2>Redes</h2>' +
    '<div flex="100" layout="column" layout-gt-md="row" layout-wrap>' +
        '<div flex="100" flex-gt-md="33">' +
            '<iframe id="twitter-widget-0" scrolling="no" allowtransparency="true" allowfullscreen="true" class="twitter-timeline twitter-timeline-rendered" style="position: static; visibility: visible; display: inline-block; width: 100%; height: 355px; padding: 0px; border: medium none; max-width: 100%; min-width: 180px; margin-top: 0px; margin-bottom: 0px; min-height: 200px;" data-widget-id="profile:CB1939Canarias" title="Twitter Timeline" frameborder="0"></iframe> <script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>' +
        '</div>' +
        '<div flex="100" flex-gt-md="33">' +
            '<div class="flex-video"><iframe src="http://www.youtube.com/embed/?listType=user_uploads&amp;list=Canarias1929" width="480" height="400"></iframe></div>' +
        '</div>' +
        '<div flex="100" flex-gt-md="33" layout="column" layout-align="center center">' +
            '<iframe src="http://www.facebook.com/plugins/likebox.php?id=114789778556625&amp;width=292&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" style="border:none; overflow:hidden; width:292px; height:255px;" allowtransparency="true" frameborder="0"></iframe>' +
        '</div>' +
    '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
