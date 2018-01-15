---
id: "noticias_del_sector"
title: "noticias_del_sector"
"collection": "noticias"
"filters": {"CODAREAS": 16}
"values_view": ['TITULO', 'TITULO_CORTO', 'F_PUB_ORIGINAL', 'HREF', 'CODCONTENIDO', 'IMAGEN', 'RESUMEN', 'DESCRIPCION_COMUN','TEXTO', 'FMODIFICACION']
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div flex="100" flex-gt-sm="50" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
