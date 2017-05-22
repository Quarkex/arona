---
id: instalaciones_deportivas
title: instalaciones_deportivas
"collection": "territoriales"
"filters": {"$and":[{"CODSUBTIPOCONT":321},{"CODAREAS":15}]}
"values_view": ["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex flex-gt-md="25"></app-accordion>
        <app-paginator-browser flex >
            <div class="small-12 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
