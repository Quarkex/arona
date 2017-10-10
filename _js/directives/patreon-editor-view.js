app.directive('appPatreonEditorView', function () {

    var template = '<md-content layout-padding>' +
        '<div layout="row" ng-repeat="patreon in elements();" layout-align="center center" layout-wrap>' +
            '<form flex="100" method="POST" enctype="multipart/form-data" action="api/set_patreon.rb" layout="row" layout-wrap>' +
                '<input type="hidden" name="ID"         value="{{ patreon[\'ID\'] }}"        required>' +
                '<input type="hidden" name="IDIOMA"     value="{{ lang() }}"                 required>' +
                '<input type="hidden" name="image_name" value="{{ patreon.name | slugify }}" required>' +
                '<md-input-container flex="100" flex-gt-sm="50" ng-repeat="(label, data) in ' +
                    '{' +
                        '\'Nombre\':                   [\'text\',     \'name\',        true ],' +
                        '\'Tipo\':                     [\'text\',     \'type\',        true ],' +
                        '\'Visible en slider\':        [\'checkbox\', \'scrolleable\', false],' +
                        '\'Peso\':                     [\'number\',   \'weight\',      false],' +
                        '\'Enlace\':                   [\'text\',     \'link\',        false]' +
                    '}' +
                '">' +
                    '<label ng-if="data[0] != \'checkbox\'">{{ label }}</label>' +

                    '<md-checkbox flex="100" ng-model="patreon[data[1]]" ng-if="data[0] == \'checkbox\'" ng-required="data[2]">{{ label }}</md-checkbox>' +
                    '<input ng-if="data[0] == \'checkbox\'" type="hidden"  name="{{ data[1] }}" value="{{ patreon[data[1]] }}" ng-required="data[2]">' +

                    '<input flex="100" type="{{ data[0] }}" name="{{ data[1] }}" ng-model="patreon[data[1]]" ng-if="data[0] != \'checkbox\'" ng-required="data[2]">' +

                '</md-input-container>' +

                '<md-input-container flex="100" flex-gt-sm="50">' +
                    '<label>Imagen</label>' +
                    '<input class="button" type="file" name="upload">' +
                '</md-input-container>' +

                '<div layout="row" layout-align="end center" flex="100">' +
                    '<a class="md-button md-warn" ng-click="remove_patreon(patreon);">Borrar patrocinador</a>' +
                    '<input class="md-button md-primary md-raised" type="submit" value="Guardar nuevo patrocinador">' +
                '</div>' +
            '</form>' +
        '</div>' +
    '</md-content>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});

