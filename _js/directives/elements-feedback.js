app.directive('appElementsFeedback', function () {

    var template = '{{ string_interpolate( translate(\'general.\', \'numero_de_contenidos\'), size(), current_section(), largest_size()) }}';
    template = '<h2 style="font-size: 24px; padding-top: 1.5em; padding-bottom: 1.5em;">' + template + '</h2>';
    template = '<div class="small-12 columns">' + template + '</div>';
    template = '<div class="row">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
