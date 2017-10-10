app.directive('appSimpleForm', function () {

    var toolbarHeader = {
    };
    var toolbarHeaderAction = {
    };
    var toolbar_object = {
        "Habitación": {
            {
                "label": "Modificar título",
                "type": "button",
                "action": toolbar.changeName(item, $event);
            },
            {
                "label": "Modificar dirección",
                "type": "button",
                "action": toolbar.changeAddress(item, $event);
            },
            {
                "label": "Modificar resumen",
                "type": "button",
                "action": toolbar.changeExcerpt(item, $event);
            }
        },
        "Visibilidad": {
            "Publicado": {
                "type": "checkbox",
                "model": item.published
            },
            "Slider": {
                "type": "checkbox",
                "model": item.slider
            }
        },
        "Archivos": {
            "Imagen": {
                "type": "custom",
                "innerHTML": '<span style="white-space: nowrap;">Imagen: <ngf-select name="room_image" type="file" ng-model="item.image"></ngf-select></span>'
            }
        }
    };
    var toolbar_header = '<h2 md-truncate flex="100" class="md-toolbar-tools" ng-click="toolbarHeaderAction">{{ toolbarHeader }}</h2>',
    var toolbar_body = [
        '<md-menu-bar flex="100">',
            '<md-menu ng-repeat="(top_label, menu) in toolbar_object">',
                '<button ng-click="$mdMenu.open()">',
                    '{{ top_label }}',
                '</button>',
                '<md-menu-content ng-repeat="(label, content) in menu">',
                    '<md-menu-item ng-if="content.type == \'button\'">',
                        '<md-button ng-click="content.action">',
                            '{{ label }}',
                        '</md-button>',
                    '</md-menu-item>',
                    '<md-menu-item ng-if="content.type == \'checkbox\'" type="checkbox" ng-model="content.model">{{ label }}</md-menu-item>',
                    '<md-menu-item ng-if="content.type == \'custom\'" bind-html-compile="content.innerHTML"></md-menu-item>',
                '</md-menu-content>',
            '</md-menu>',

        '</md-menu-bar>'
    ].join(' ');
    var toolbar = toolbar_head + toolbar_body;
    var toolbar = '<div flex="100" layout="row" layout-wrap>' + toolbar + '</div>';
    var toolbar = '<div layout="row">' + toolbar + '</div>';
    var toolbar = '<md-toolbar class="md-menu-toolbar">' + toolbar + '</md-toolbar>';

    var filters = '{\'id\': item.id }';
    var collection = 'rooms';
    var action = 'api/setter.json';

    var form = [
        '<label ng-if="data[0] != \'checkbox\'">{{ label }}</label>',

        '<md-checkbox',
        'ng-if="data[0] == \'checkbox\'"',
        'ng-model="item[data[1]]"',
        'ng-required="data[2]"',
        'flex="100"',
        '>{{ label }}</md-checkbox>',

        '<input',
        'ng-if="data[0] == \'checkbox\'"',
        'type="hidden"',
        'name="{{ data[1] }}"',
        'value="{{ item[data[1]] }}"',
        'ng-required="data[2]"',
        '/>',

        '<input',
        'ng-if="data[0] != \'checkbox\' && data[0] != \'select\'"',
        'type="{{ data[0] }}"',
        'name="{{ data[1] }}"',
        'ng-model="item[data[1]]"',
        'ng-required="data[2]"',
        'flex="100"',
        '/>',

        '<md-select',
        'ng-if="data[0] == \'select\'"',
        'ng-model="item[data[1]]"',
        'ng-required="data[2]"',
        'flex="100"',
        '>',
            '<md-option',
            'ng-value="value"',
            'ng-repeat="(name, value) in data[3]"',
            '>{{ name }}</md-option>',
        '</md-select>',

        '<div ng-if="data[0] == \'ckeditor\'" style="min-height: 50vh; width: 100%; padding: 1em;" class="form-editor md-whiteframe-1dp" ng-model="item[data[1]]" ckeditor="options" ready="onReady()" contenteditable="true"></div>'
    ].join(' ');

    var formFields = {
        'Ascensor':                   ['checkbox', 'elevator',        false],
        'Comunidad':                  ['checkbox', 'community',       false],
        'Escaleras':                  ['checkbox', 'stairs',          false],
        'Piscina':                    ['checkbox', 'pool',            false],
        'Trastero':                   ['checkbox', 'storage',         false],
            'Año de construcción':        ['number',   'year',            true],
            'Baños':                      ['number',   'restroom',        true],
            'Tipo de inmueble':           ['select',   'type',            true, {
                'Alquiler': 'rent',
                'Venta':    'sell'
            }],
        'Certificado energético':     ['select',   'energy_cert',     true, {
            'A': 'a',
            'B': 'b',
            'C': 'c',
            'D': 'd',
            'E': 'e',
            'F': 'f',
            'G': 'g'
        }],
        'Estado del inmueble':        ['text',     'building_status', true],
        'M2 construidos':             ['number',   'm2_built',        true],
        'M2 de terreno':              ['number',   'm2_terrain',      true],
        'M2 terraza/balcón':          ['number',   'm2_balcony',      true],
        'Nº de plantas del edificio': ['number',   'building_floors', true],
        'Precio':                     ['number',   'price',           true],
        'Cocina':                     ['text',     'kitchen',         false],
        'Dormitorios':                ['text',     'bedrooms',        false],
        'Garage':                     ['text',     'parking',         false],
        'Muebles':                    ['text',     'furniture',       false],
        'Salón/comedor':              ['text',     'livingroom',      false],
        'Tel/wifi':                   ['text',     'tel_or_wifi',     false],
        'Vistas':                     ['text',     'views',           false]
    };

    form = '<md-input-container flex="100">' + form + '</md-input-container>';
    form = '<div flex="100" flex-gt-sm="50" layout="row" layout-wrap ng-repeat="(label, data) in formFields">' + form + '</div>';
    form = '<div layout="row" flex="100" layout-align="center" layout-wrap>' + form + '</div>';
    form += [
        '<div layout="row" flex="100" layout-align="end">',
            '<input class="md-button" type="submit" value="Guardar">',
        '</div>'
    ].join(' ');

    form = '<div flex="100" layout="row" layout-wrap ng-init="formFields = ' + formFields.to_JSON() + '">' + form + '</div>';
    form = '<md-content class="md-padding">' + form + '</md-content>';

    form = '<form ng-submit="submitForm({ \'filters\': [' + filters + '], \'values\': [ item ], \'collection\': \'' + collection + '\' }, \''+ action +'\');">' + form + '</form>';

    var template = [
        '<div ng-repeat="item in elements()">',
            toolbar,
            form,
        '</div>'
    ].join(' ');

    return {
        restrict: 'E',
        scope: {
            toolbarHeader: "=",
            toolbarHeaderAction: "=",
            toolbarObject: "="
        },
        template: template
    };
});
