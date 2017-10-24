---
id: "alquiler_de_temporada"
filters: {"published": true, "type": "seasonal_rent"}
collection: "rooms"
limit: 10
title: "Alquiler de temporada"
view: "hotel"
pub: false
language: false
toggleable_filters:
    -
        label: 'pool'
        target: 'pool'
        object: true
        status: false
    -
        label: 'stairs'
        target: 'stairs'
        object: true
        status: false
    -
        label: 'elevator'
        target: 'elevator'
        object: true
        status: false
    -
        label: 'community'
        target: 'community'
        object: true
        status: false
    -
        label: 'storage'
        target: 'storage'
        object: true
        status: false
values_list: 
    - "name"
    - "id"
    - "image_path"
    - "excerpt"
    - "price"
values_view: 
    - "address"
    - "bedrooms"
    - "building_floors"
    - "building_status"
    - "community"
    - "description"
    - "elevator"
    - "energy_cert"
    - "furniture"
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
    - "price"
    - "restroom"
    - "stairs"
    - "storage"
    - "tel_or_wifi"
    - "type"
    - "views"
    - "year"
---

<div flex="100" layout="column" layout-align="center strech">
    <div layout="row" layout-padding>
        <app-paginator-browser>
            <div flex-gt-xs="50" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="'#!/' + lang()"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
