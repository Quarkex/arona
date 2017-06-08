---
id: "folletos_y_mapas"
title: "folletos_y_mapas"
"collection": "documentales"
"filters": {"CODAREAS":16, "SUBTIPO": "Folletos / Trípticos"}
"values_view": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"]
"limit": 8
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="small-12 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-document item="card" prefix="node.href"></app-card-document>
    </div>
</app-paginator-browser>
