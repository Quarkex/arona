app.directive('appArticleView', function () {

    var template = '<div layout="row" flex>' +
        '<div class="text-justify" layout="column" flex>' +
            '<div><h1 class="post-title" ng-bind="element().title"></h1></div>' +
            '<span class="post-date" ng-bind="element().date | date : translate(\'date.schema\')"></span>' +
            '<div class="post-content" bind-html-compile="element().content"></div>' +
        '</div>' +
    '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});


