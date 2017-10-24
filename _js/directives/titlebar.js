app.directive('appTitlebar', function () {

    var menu_button = '<md-icon class="material-icons">menu</md-icon>';
    menu_button = '<md-button class="left-off-canvas-toggle md-icon-button">' + menu_button + '</md-button>';

    var menu_title = '{{ translate(\'general.\', \'menu\') }}';
    menu_title = '<h1 md-truncate class="md-hue-3">' + menu_title + '</h1>';

    //var language_selector = '<app-language-selector></app-language-selector>';

    //var small_menu = menu_button + menu_title + language_selector;
    var small_menu = '<span hide-gt-md layout="row" layout-align="begin center">' + menu_button + menu_title + '</span>';


    var toolbar_buttons = function(position){
        var ng_repeat = '(label, link) in nav';
        var ng_if = function(position){ return "link.position == '" + position + "'";};
        var ng_href = '{{ link.href.substring(0,4) == \'http\' ? link.href : \'#!/\' + lang() + \'/\' + link.href }}';
        var base_class = 'md-secondary';
        var base_style = 'min-width: 1%;';
        var layout_align = (position == "right") ? 'end center' : 'begin center';

        var buttons = '<md-button class="' + base_class + '"' +
            ' ng-href="' + ng_href + '"' +
            ' ng-if="' + ng_if(position) + '"' +
            ' ng-repeat="' + ng_repeat + '"' +
            ' style="' + base_style + '"' +
            '>{{ label }}</md-button>';
        return '<div layout="row" flex layout-align="' + layout_align + '">' + buttons + '</div>';
    };

    var large_menu = toolbar_buttons('left') + toolbar_buttons('right');
    large_menu = '<div hide-xs hide-gt-xs show-gt-md layout="row" flex>' + large_menu + '</div>';

    var template = large_menu + small_menu;

    template = '<div class="md-toolbar-tools">' + template + '</div>';
    template = '<md-toolbar class="md-hue-2 title-bar" ng-class="{\'sub-level\': level() > 1 }">' + template + '</md-toolbar>';

    return {
        scope: false,
        restrict: 'E',
        template: template
    };
});
