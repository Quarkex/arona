---
id: agenda_mensual
title: agenda_mensual
"collection": "documentales"
"filters": {"CODSUBTIPOCONT":586, "CODAREAS":{"$in":[null,16]}, "CODSUBAREAS":{"$in":[null,144]}}
"values_view": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"]
"values_list": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"]
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex flex-gt-md="25"></app-accordion>
        <app-paginator-browser flex layout="column">
            <div flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-document item="card" prefix="node.href"></app-card-document>
            </div>
        </app-paginator-browser>
    </div>
</div>
