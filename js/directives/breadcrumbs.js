app.directive('appBreadcrumbs', function () {

    var template = '';

    var crumb_label = '{{ translate( "pagina.titulo_", crumb.label ) | gsub:\'_\':\' \' | capitalize }}';
    var crumb_href= '{{crumb.href}}';
    var crumb_conditional= 'crumb.inactive == undefined || crumb.inactive == false';
    var crumb_conditional_active= 'crumb.inactive == true';

    var crumb = '<a ng-if="' + crumb_conditional + '" href="' + crumb_href + '">' + crumb_label + '</a>';
    var active_crumb = '<span ng-if="' + crumb_conditional_active + '"><span class="show-for-sr">{{ translate( "general.", "actual" ) }}: </span> ' + crumb_label + '</span>';


    template = '<li ng-repeat="crumb in breadcrumbs track by crumb.href">' + crumb + active_crumb + '</li>';
    template = '<ul class="breadcrumbs">' + template + '</ul>';
    template = '<div class="large-10 large-offset-1 columns">' + template + '</div>';
    template = '<nav class="row" aria-label="You are here:" role="navigation">' + template + '</nav>';
    template = '<div class="breadcrumbs-wrapper hide-for-print">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
