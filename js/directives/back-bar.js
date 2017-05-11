app.directive('appBackBar', function () {

    var left_a = '<md-icon class="material-icons">arrow_back</md-icon>';
    left_a = '<md-button class="md-primary" style="min-width: unset; background-color: #eeeeee;" onclick="history.go(-1);">' + left_a + '</md-button>';

    var left_b = '{{ translate(\'general.\', \'volver\') }}';
    left_b = '<md-button class="md-primary" style="min-width: unset; background-color: #eeeeee; margin-left: -6px;" onclick="history.go(-1);">' + left_b + '</md-button>';

    var left = '<div flex layout="row" layout-align="begin center">' + left_a + left_b + '</div>';

    var right = '{{ string_interpolate(translate(\'general.\', \'ultima_modificacion\'), last_modified()) }}';
    right = '<p class="panel last-modified">' + right + '</p>';
    right = '<md-content style="padding: 0.6em 0.6em 0em 0.6em;">' + right + '</md-content>';
    right = '<div ng-if="last_modified() != \'\'" flex="50" layout="row" layout-align="end center">' + right + '</div>';

    var template = left + right;
    template = '<div class="row hide-for-print" layout="row">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
