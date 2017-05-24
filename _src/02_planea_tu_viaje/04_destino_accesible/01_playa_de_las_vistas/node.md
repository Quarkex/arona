---
id: "playa_de_las_vistas_accesible"
title: "playa_de_las_vistas"
href: "planea_tu_viaje/destino_accesible/playa_de_las_vistas_accesible/2106"
view: "documental"
"collection": "descriptivos"
"filters": {"CODCONTENIDO": 2106}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="small-12 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-simple item="card" prefix="node.href"></app-card-simple>
    </div>
</app-paginator-browser>
