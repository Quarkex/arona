---
id: "deportes_vernaculos"
title: "deportes_vernaculos"
"collection": "descriptivos"
"filters": {"CODAREAS": 16,"CODSUBAREAS":157,"CODSUBTIPOCONT":490}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="medium-6 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
