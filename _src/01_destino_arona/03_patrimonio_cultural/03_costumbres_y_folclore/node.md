---
id: "costumbres_y_folclore"
title: "costumbres_y_folclore"
"collection": "descriptivos"
"filters": {"CODAREAS": 16,"CODSUBAREAS":155,"CODSUBTIPOCONT":63}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
limit: 15
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div flex="100"  ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
