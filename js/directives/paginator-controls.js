app.directive('appPaginatorControls', function () {

    var paginator_contidional = 'element_status() != \'loading\' && paginator_pages().length > 1';

    var back = '<md-icon class="material-icons">keyboard_arrow_left</md-icon>';
    back = '<md-button ng-click="previous_page();" class="md-icon-button md-primary">' + back + '</md-button>';

    var fordward = '<md-icon class="material-icons">keyboard_arrow_right</md-icon>';
    fordward = '<md-button ng-click="next_page();" class="md-icon-button md-primary">' + fordward + '</md-button>';

    var buttons = '<span ng-if="p.current" class="show-for-sr">You\'re on page</span> {{ p.number }}';
    buttons = '<md-button ng-disabled="p.current" ng-click="page(p.number);" ng-repeat="p in paginator_pages()" class="md-icon-button {{ p.current ? \'current\': \'\' }}">' + buttons + '</md-button>';

    buttons = back + buttons + fordward;

    buttons = '<div flex class="columns" layout="row" layout-align="center center" layout-align-gt-sm="begin center">' + buttons + '</div>';

    var feedback = '{{ string_interpolate( translate(\'general.\', \'paginado_de_contenidos\'), page(), pages().length, \'\', size() ) }}';
    feedback = '<p class="panel page-counter">' + feedback + '</p>';
    feedback = '<div class="columns text-center large-text-right" style="padding-top: 0.6em;">' + feedback + '</div>';

    var template = buttons + feedback;
    template = '<md-content ng-if="' + paginator_contidional + '" flex class="row hide-for-print" layout-gt-sm="row" layout="column">' + template + '</md-content>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
