---
id: "destino_accesible"
title: "destino_accesible"
href: "planea_tu_viaje/destino_accesible/playa_de_las_vistas_accesible/2106"
view: "descriptive"
"collection": "descriptivos"
"filters": {"CODCONTENIDO": 2106}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="medium-6 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
