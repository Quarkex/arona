---
id: "apartamentos"
title: "apartamentos"
view: "hotel"
"filters": {"SUBTIPO_PRINCIPAL": "Apartamentos"}
selector_filters: [
    {"type": "Zona turística", "name": "Playa de los cristianos", "value":{"VALORESINDICADORESLISTA": regex("/.*Playa de Los Cristianos.*/")}            },
    {"type": "Zona turística", "name": "Playa de las américas",   "value":{"VALORESINDICADORESLISTA": regex("/.*Playa de Las Américas.*/")}              },
    {"type": "Zona turística", "name": "Costa del silencio",      "value":{"VALORESINDICADORESLISTA": regex("/.*Costa del Silencio.*/")}                 },
    {"type": "Zona turística", "name": "Arona rural",             "value":{"VALORESINDICADORESLISTA": regex("/.*Arona Rural.*/")}                        },
    {"type": "Categoría",      "name": "2 Estrellas",             "value":{"VALORESINDICADORESLISTA": regex("/.*2 estrellas.*/")}                        },
    {"type": "Categoría",      "name": "3 Estrellas",             "value":{"VALORESINDICADORESLISTA": regex("/.*3 estrellas.*/")}                        },
    {"type": "Categoría",      "name": "4 Estrellas",             "value":{"VALORESINDICADORESLISTA": regex("/.*4 estrellas.*/")}                        },
    {"type": "Categoría",      "name": "5 Estrellas",             "value":{"VALORESINDICADORESLISTA": regex("/.*5 estrellas.*/")}                        },
    {"type": "Accesibilidad",  "name": "Accesible",               "value":{"VALORESINDICADORESLISTA": regex("/.*Accesible.*/")}                          },
    {"type": "Servicios",      "name": "Piscina",                 "value":{"VALORESINDICADORESLISTA": regex("/.*Piscina.*/")}                            },
    {"type": "Servicios",      "name": "Tarjeta de crédito",      "value":{"VALORESINDICADORESLISTA": regex("/.*Admite pago por tarjeta de crédito.*/")} },
    {"type": "Servicios",      "name": "Aire Acondicionado",      "value":{"VALORESINDICADORESLISTA": regex("/.*Aire Acondicionado.*/")}                 }
]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser>
    <div flex="100" layout="row" layout-wrap layout-align="center">
        <md-menu ng-repeat="(type, filters) in node.selector_filters | groupBy: 'type'">
            <md-button ng-click="$mdMenu.open($event)">{{ type }}</md-button>
            <md-menu-content width="4">
                <md-menu-item ng-repeat="filter in filters">
                    <md-button ng-click="toggle_filter('$and', filter.value)">{{ filter.name }}</md-button>
                </md-menu-item>
            </md-menu-content>
        </md-menu>
    </div>
    <div flex="100" flex-gt-sm="50" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
