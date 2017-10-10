app.directive('appCardOld', function () {

    var image = '<img class="md-media-md card-media" alt="{{ item.name }}" src="{{ item.image }}">';
    image = '<md-card-title-media>' + image + '</md-card-title-media>';
    image = '<div style="flex-basis:125px;">' + image + '</div>';

    var text = '<a style="text-align: left;" href="{{ prefix }}/{{ item.id }}" bind-html-compile="item.name"></a>';
    text = '<span class="md-headline" style="font-size: 18px;">' + text + '</span>';
    text += '<span class="md-subhead" style="padding-top: 0;" ng-if="item.address != nil">{{ item.address }}</span>';
    text += '<span class="md-subhead" style="padding-top: 0;" ng-if="item.working_hours != nil" bind-html-compile="item.working_hours"></span>';
    text = '<md-card-title-text>' + text + '</md-card-title-text>';
    text = '<div flex>' + text + '</div>';

    var title = image + text;
    title = '<md-card-title>' + title + '</md-card-title>';

     /////////////////////////
    // Card bottom actions //
   /////////////////////////

    var actions_contidionals = 'item.email != null || ' + 'item.webpage != null || ' + 'item.contact_info != null || ' + 'item.map != null';

    var email_button = '<md-button class="md-primary" ng-if="item.email != null" ng-href="{{ \'mailto:\' + item.email }}">EMAIL</md-button>';
    var website_button = '<md-button class="md-primary" ng-if="item.webpage != null" ng-href="{{ item.webpage }}">WEBSITE</md-button>';

    var actions_left = email_button + website_button;
    actions_left = '<div flex-xs flex="50" layout="row" xs-layout="column">' + actions_left + '</div>';

    var map_button = '<md-icon class="material-icons">place</md-icon>';
    map_button = '<md-button ng-if="item.map != null" href="{{ item.map }}" target=\'_blank\' class="md-icon-button md-primary">' + map_button + '</md-button>';

    var contact_button = '<md-icon class="material-icons">contact_mail</md-icon>';
    contact_button = '<md-button ng-if="item.contact_info != null" ng-href="{{ \'mailto:\' + item.contact_info }}" class="md-icon-button md-primary">' + contact_button + '</md-button>';

    var actions_right = map_button + contact_button;

    actions_right = '<md-card-icon-actions layout-align="end center">' + actions_right + '</md-card-icon-actions>';
    actions_right = '<div flex-xs flex="50" layout="row" xs-layout="column">' + actions_right + '</div>';

    var actions = actions_left + actions_right;
    actions = '<div flex layout="row">' + actions + '</div>';
    actions = '<div class="show-for-large" style="flex-basis:115px;"></div>' + actions;
    actions = '<md-card-actions layout="row" ng-if="' + actions_contidionals + '">' + actions + '</md-card-actions>';

    var template = title + actions;
    var template = '<md-card flex-xs md-theme="default" md-theme-watch style="min-height: 250px; background-color: #f6f6f6;">' + template + '</md-card>';

    return {
        restrict: 'E',
        scope: {
            item: '=',
            prefix: '='
        },
        template: template
    };
});
