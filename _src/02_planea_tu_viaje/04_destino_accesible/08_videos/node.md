---
id: "videos_accesibles"
title: "videos"
"collection": "descriptivos"
"filters": {"CODSUBTIPOCONT":441,"CODAREAS":16,"CODSUBAREAS":277}
"values_view": ["TITULO","RECURSOS","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser>
    <div flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-simple item="card" prefix="node.href"></app-card-simple>
    </div>
</app-paginator-browser>
