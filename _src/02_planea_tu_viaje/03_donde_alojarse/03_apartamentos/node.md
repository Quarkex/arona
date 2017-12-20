---
id: "apartamentos"
title: "apartamentos"
view: "hotel"
"filters": {"SUBTIPO_PRINCIPAL": "Apartamentos"}
selector_filters: [
    {"type": "Zona turística", "name": "Playa de los cristianos", "value":{"VALORESINDICADORESLISTA": regexp("/.*Playa de Los Cristianos.*/")}            },
    {"type": "Zona turística", "name": "Playa de las américas",   "value":{"VALORESINDICADORESLISTA": regexp("/.*Playa de Las Américas.*/")}              },
    {"type": "Zona turística", "name": "Costa del silencio",      "value":{"VALORESINDICADORESLISTA": regexp("/.*Costa del Silencio.*/")}                 },
    {"type": "Zona turística", "name": "Arona rural",             "value":{"VALORESINDICADORESLISTA": regexp("/.*Arona Rural.*/")}                        },
    {"type": "Categoría",      "name": "2 Estrellas",             "value":{"VALORESINDICADORESLISTA": regexp("/.*2 estrellas.*/")}                        },
    {"type": "Categoría",      "name": "3 Estrellas",             "value":{"VALORESINDICADORESLISTA": regexp("/.*3 estrellas.*/")}                        },
    {"type": "Categoría",      "name": "4 Estrellas",             "value":{"VALORESINDICADORESLISTA": regexp("/.*4 estrellas.*/")}                        },
    {"type": "Categoría",      "name": "5 Estrellas",             "value":{"VALORESINDICADORESLISTA": regexp("/.*5 estrellas.*/")}                        },
    {"type": "Accesibilidad",  "name": "Accesible",               "value":{"VALORESINDICADORESLISTA": regexp("/.*Accesible.*/")}                          },
    {"type": "Servicios",      "name": "Piscina",                 "value":{"VALORESINDICADORESLISTA": regexp("/.*Piscina.*/")}                            },
    {"type": "Servicios",      "name": "Tarjeta de crédito",      "value":{"VALORESINDICADORESLISTA": regexp("/.*Admite pago por tarjeta de crédito.*/")} },
    {"type": "Servicios",      "name": "Aire Acondicionado",      "value":{"VALORESINDICADORESLISTA": regexp("/.*Aire Acondicionado.*/")}                 }
]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser>
    <div flex="100" layout="row" layout-wrap layout-align="center">
        <md-menu ng-repeat="(type, filters) in node.selector_filters | groupBy: 'type'">
            <md-button ng-click="$mdMenu.open($event)">{{ type }}</md-button>
            <md-menu-content width="4">
                <md-menu-item ng-repeat="filter in filters">
                    <md-button ng-class="{'md-primary': filter.active}" ng-click="toggle_filter('$and', filter.value); filter.active = !filter.active" ng-init="filter.active = filter.active === undefined ? false : filter.active">{{ filter.name }}</md-button>
                </md-menu-item>
            </md-menu-content>
        </md-menu>
    </div>
    <div flex="100" flex-gt-sm="50" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
