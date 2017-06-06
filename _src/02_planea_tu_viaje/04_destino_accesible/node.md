---
id: "destino_accesible"
title: "destino_accesible"
view: "descriptive"
"collection": "descriptivos"
"filters": {"CODCONTENIDO": 2106}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
limit: 100
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="small-12 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
