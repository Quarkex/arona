---
id: piramide_de_arona
title: piramide_de_arona
href: "vive_tu_estancia/congresos_y_negocios/piramide_de_arona/15307"
"collection": "territoriales"
"filters": {"CODCONTENIDO":{"$in":[null,15307]}}
"values_view": ["HORARIO","MAPA_IFRAME","MAPA","CODCONTENIDO","TITULO","ZONA","TELEFONO","FAX","WEB_PROPIA","DIRECCION","EMAIL","INDICADORES","IMAGEN","DESCRIPCION_COMUN","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex flex-gt-md="25"></app-accordion>
        <app-paginator-browser flex layout="column">
            <div flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
~

