---
id: ciclismo
title: ciclismo
"collection": "territoriales"
"filters": {"$and":[{"CODSUBTIPOCONT":454},{"CODAREAS":15},{"CODSUBAREAS":323}]}
"values_view": ["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex="100" flex-gt-sm="25"></app-accordion>
        <app-paginator-browser flex layout="column">
            <div flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
