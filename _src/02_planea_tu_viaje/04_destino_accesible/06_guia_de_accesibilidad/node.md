---
id: "guia_de_accesibilidad"
title: "guia_de_accesibilidad"
"collection": "documentales"
"filters": {"CODSUBTIPOCONT":292,"CODAREAS":16,"CODSUBAREAS":277}
"values_view": ["CODCONTENIDO","DESCRIPCION_COMUN","DOCUMENTO","IMAGEN","PALABRAS_CLAVE","TITULO","RECURSOS","CONTENIDOS_RELACIONADOS"]
"limit": 8
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="small-12 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-simple item="card" prefix="node.href"></app-card-simple>
    </div>
</app-paginator-browser>
