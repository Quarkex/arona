---
"filters": {"published": true}
collection: "rooms"
limit: 10
title: "Inicio"
pub: false
language: false
#toggleable_filters:
#    -
#        label: 'pool'
#        target: 'pool'
#        object: true
#        status: false
#    -
#        label: 'stairs'
#        target: 'stairs'
#        object: true
#        status: false
#    -
#        label: 'elevator'
#        target: 'elevator'
#        object: true
#        status: false
#    -
#        label: 'community'
#        target: 'community'
#        object: true
#        status: false
#    -
#        label: 'storage'
#        target: 'storage'
#        object: true
#        status: false
selector_filters: [
    {"type": "Características",  "name": "Con ascensor"          , "value":{"elevator":  true            } },
    {"type": "Características",  "name": "Con escaleras"         , "value":{"stairs":    true            } },
    {"type": "Características",  "name": "Con piscina"           , "value":{"pool":      true            } },
    {"type": "Características",  "name": "Con trastero"          , "value":{"storage":   true            } },
    {"type": "Características",  "name": "Con comunidad"         , "value":{"community": true            } },
    {"type": "Tipo de contrato", "name": "Alquiler de temporada" , "value":{"type":      "seasonal_rent" } },
    {"type": "Tipo de contrato", "name": "Alquiler"              , "value":{"type":      "rent"          } },
    {"type": "Tipo de contrato", "name": "Compra"                , "value":{"type":      "sell"          } }
]
values_list: 
    - "name"
    - "id"
    - "image_path"
    - "excerpt"
    - "price"
    - "map_image"
values_view: 
    - "address"
    - "availible"
    - "bedrooms"
    - "building_floors"
    - "building_status"
    - "community"
    - "community_price"
    - "description"
    - "elevator"
    - "energy_cert"
    - "furniture"
    - "ibi"
    - "id"
    - "image_path"
    - "image_paths"
    - "kitchen"
    - "livingroom"
    - "m2_balcony"
    - "m2_built"
    - "m2_terrain"
    - "map_image"
    - "name"
    - "observations"
    - "parking"
    - "pool"
    - "pool_type"
    - "price"
    - "published"
    - "restroom"
    - "slider"
    - "stairs"
    - "storage"
    - "telephone"
    - "type"
    - "type_of_building"
    - "views"
    - "wifi"
    - "year"
---

<div flex="100" layout="column" layout-align="center strech">
    <div layout="row">
        <app-slideshow flex></app-slideshow>
    </div>
    <div layout="row" layout-padding flex="100">
        <app-paginator-browser flex="100">
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
            <div flex-gt-xs="50" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="'#!/' + lang()"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
