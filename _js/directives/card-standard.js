app.directive('appCardStandard', function () {

    var image = '<img class="md-card-image" alt="{{ item.name }}" ng-src="{{ item.image == null ? item.image_path : item.image }}">';
    image = '<a ng-if="(item.image_path != null || item.image != null);" ng-href="{{ prefix + \'/\' + item.id }}">' + image + '</a>';

    var title = '<a class="md-headline" ng-href="{{ prefix + \'/\' + item.id }}" bind-html-compile="item.name"></a>';
    //title += '<span class="md-subhead" ng-if="item.price != null">{{ item.price }} €</span>';
    title = '<md-card-title-title layout="column">' + title + '</md-card-title-title>';
    title = '<md-card-title ng-if="item.name != null">' + title + '</md-card-title>';

    var content = '<md-card-content ng-if="item.excerpt != null">{{ item.excerpt }}</md-card-content>';

    var card_conditional = "(item.image_path != null || item.image != null) || item.name != null";

    var template = '<md-card flex-xs md-theme="default" md-theme-watch ng-if="' + card_conditional + '">' +
        image +
        title +
        content +
        '</md-card>';

    return {
        restrict: 'E',
        scope: {
            item: '=',
            prefix: '='
        },
        template: template
    };
});
