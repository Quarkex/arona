---
id: "situacion_orografia_y_vegetacion"
title: "situacion_orografia_y_vegetacion"
"collection": "descriptivos"
"filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 506}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="small-12 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-simple item="card" prefix="node.href"></app-card-simple>
    </div>
</app-paginator-browser>
