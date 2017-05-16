---
id: "agencias_de_viaje"
title: "agencias_de_viaje"
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser ng-controller="resourcePaginatorCtrl">
    <div class="medium-6 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
