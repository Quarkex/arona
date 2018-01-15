---
id: "publicaciones_y_revistas"
title: "publicaciones_y_revistas"
"collection": "documentales"
"filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 522}
"values_view": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"]
"limit": 8
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex="100" flex-gt-sm="25"></app-accordion>
        <app-paginator-browser flex layout="column">
            <div flex ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
