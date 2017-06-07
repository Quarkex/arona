---
id: aprende_espanol
title: aprende_español
href: "vive_tu_estancia/actividades_recomendadas/aprende_espanol/244"
"collection": "territoriales"
"filters": {"CODCONTENIDO":{"$in":[null,244]}}
"values_view": ["HORARIO","MAPA_IFRAME","MAPA","CODCONTENIDO","TITULO","ZONA","TELEFONO","FAX","WEB_PROPIA","DIRECCION","EMAIL","INDICADORES","IMAGEN","DESCRIPCION_COMUN","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex flex-gt-md="25"></app-accordion>
        <app-paginator-browser flex layout="column">
            <div flex ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
