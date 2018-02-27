---
id: "publicaciones_y_revistas"
title: "publicaciones_y_revistas"
"collection": "documentales"
"filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 522}
"values_view": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"]
"limit": 8
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-document item="card" prefix="node.href"></app-card-document>
    </div>
</app-paginator-browser>
