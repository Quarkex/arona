---
id: "restaurantes_accesibles"
title: "restaurantes"
"collection": "territoriales"
"filters": {"CODSUBTIPOCONT":30,"CODAREAS":16,"VALORESINDICADORES":{"$in":[37]}}
"values_view": ["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="medium-6 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
