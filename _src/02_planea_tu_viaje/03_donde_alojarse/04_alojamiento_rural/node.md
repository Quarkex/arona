---
id: "alojamiento_rural"
title: "alojamiento_rural"
view: "hotel"
"filters": {"SUBTIPO_PRINCIPAL": "Alojamiento Rural"}
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="medium-6 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
