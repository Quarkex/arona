---
id: otros_centros_de_congresos_de_tenerife 
title: otros_centros_de_congresos_de_tenerife
"collection": "externos"
"filters": {"CODSUBTIPOCONT":398, "CODAREAS":{"$in":[null,16]}}
"values_list": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"]
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex flex-gt-md="25"></app-accordion>
        <app-paginator-browser flex layout="column">
            <div flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-externals item="card" prefix="node.href"></app-card-externals>
            </div>
        </app-paginator-browser>
    </div>
</div>
