---
id: "actividades"
title: "actividades"
view: "activity"
"language": true
"collection": "actividades"
"filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 595}
"values_view": ["TITULO", "TELEFONO", "CODCONTENIDO", "F_INICIO", "F_FIN", "IMAGEN", "WEB_PROPIA", "DESCRIPCION_COMUN", "TAQUILLA", "ORGANIZACION", "DONDE", "PRECIO", "RECURSOS", "CONTENIDOS_RELACIONADOS"]
"values_list": ["IMAGEN","TITULO","CODCONTENIDO","DIRECCION","EMAIL","WEB_PROPIA","CONTACTO","MAPA","HORARIO"]
"limit": 100
---
<app-paginator-browser >
    <div flex="100" flex-gt-sm="50" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
