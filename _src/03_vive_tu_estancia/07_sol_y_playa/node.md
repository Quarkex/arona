---
"id": "sol_y_playa"
"title": "sol_y_playa"
"collection": "territoriales"
"filters": {"CODSUBTIPOCONT": 154, "CODAREAS": 16, "CODSUBAREAS":156}
"values_view": ["HORARIO", "MAPA_IFRAME", "MAPA", "CODCONTENIDO", "TITULO", "ZONA", "TELEFONO", "FAX", "WEB_PROPIA", "DIRECCION", "EMAIL", "INDICADORES", "IMAGEN", "DESCRIPCION_COMUN", "RECURSOS", "CONTENIDOS_RELACIONADOS"]
"values_list": ["HORARIO","MAPA","CODCONTENIDO","EMAIL","FAX","HORARIO","IMAGEN","TITULO","TELEFONO","WEB_PROPIA","DIRECCION"]
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex flex-gt-md="25"></app-accordion>
        <app-paginator-browser flex >
            <div flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>

