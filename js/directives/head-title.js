app.directive('appHeadTitle', function () {

    var title = '{{ sections().length > 0 ? translate (\'pagina.titulo_\', sections()[sections().length - 1]) : \'Turismo Arona\'}}'
    var template = title 

    return {
        restrict: 'A',
        scope: false,
        transclude: true,
        template: template
    };
});
