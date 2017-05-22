app.directive('appTabBar', function () {

    var template = '{{ translate(\'pagina.titulo_\', label) }}';
    template = '<md-nav-item ng-repeat="(label, link) in sublinks" md-nav-click="navNavigate( link.href )" name="{{ label }}">' + template + '</md-nav-item>';
    template = '<md-nav-bar md-selected-nav-item="current_section()">' + template + '</md-nav-bar>';
    template = '<div style="overflow-x: auto;">' + template + '</div>';
    template = '<div class="large-10 large-offset-1 columns">' + template + '</div>';
    template = '<div class="row">' + template + '</div>';
    template = '<div class="tabs-wrapper hide-for-print" ng-controller="navigatorCtrl">' + template + '</div>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});
