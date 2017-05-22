app.directive('appCardStandard', function () {

    var image = '<img class="md-media-md card-media" alt="{{ item.name }}" src="http://www.arona.org/portal/imagecache/ficha/{{ item.IMAGEN }}">';
    image = '<md-card-title-media>' + image + '</md-card-title-media>';
    image = '<div style="flex-basis:125px;">' + image + '</div>';

    var text = '<a style="text-align: left;" href="{{ prefix }}/{{ item.CODCONTENIDO }}" bind-html-compile="item.TITULO"></a>';
    text = '<span class="md-headline" style="font-size: 18px;">' + text + '</span>';
    text += '<span class="md-subhead" style="padding-top: 0;" ng-if="item.DIRECCION != nil">{{ item.DIRECCION }}</span>';
    text += '<span class="md-subhead" style="padding-top: 0;" ng-if="item.HORARIO != nil" bind-html-compile="item.HORARIO"></span>';
    text = '<md-card-title-text>' + text + '</md-card-title-text>';
    text = '<div flex>' + text + '</div>';

    var title = image + text;
    title = '<md-card-title>' + title + '</md-card-title>';

     /////////////////////////
    // Card bottom actions //
   /////////////////////////

    var actions_contidionals = 'item.EMAIL != null || ' + 'item.WEB_PROPIA != null || ' + 'item.CONTACTO != null || ' + 'item.MAPA != null';

    var email_button = '<md-button class="md-primary" ng-if="item.EMAIL != null" ng-href="{{ \'mailto:\' + item.EMAIL }}">EMAIL</md-button>';
    var website_button = '<md-button class="md-primary" ng-if="item.WEB_PROPIA != null" ng-href="{{ item.WEB_PROPIA }}">WEBSITE</md-button>';

    var actions_left = email_button + website_button;
    actions_left = '<div flex-xs flex="50" layout="row" xs-layout="column">' + actions_left + '</div>';

    var map_button = '<md-icon class="material-icons">place</md-icon>';
    map_button = '<md-button ng-if="item.MAPA != null" href="{{ item.MAPA }}" target=\'_blank\' class="md-icon-button md-primary">' + map_button + '</md-button>';

    var contact_button = '<md-icon class="material-icons">contact_mail</md-icon>';
    contact_button = '<md-button ng-if="item.CONTACTO != null" ng-href="{{ \'mailto:\' + item.CONTACTO }}" class="md-icon-button md-primary">' + contact_button + '</md-button>';

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
