---
"id": "sol_y_playa"
"title": "sol_y_playa"
"collection": "territoriales"
"filters": {"CODSUBTIPOCONT": 154}
"values_view": ["HORARIO", "MAPA_IFRAME", "MAPA", "CODCONTENIDO", "TITULO", "ZONA", "TELEFONO", "FAX", "WEB_PROPIA", "DIRECCION", "EMAIL", "INDICADORES", "IMAGEN", "DESCRIPCION_COMUN", "RECURSOS", "CONTENIDOS_RELACIONADOS"]
"values_list": ["IMAGEN","TITULO","CODCONTENIDO","DIRECCION","EMAIL","WEB_PROPIA","CONTACTO","MAPA","HORARIO"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="medium-6 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
