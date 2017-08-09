---
id: "buscador"
title: "buscador"
view: "default"
collection: "territoriales"
filters: {"$text": { "$search": "" }}
values_view:
    - "HORARIO"
    - "MAPA_IFRAME"
    - "MAPA"
    - "CODCONTENIDO"
    - "TITULO"
    - "ZONA"
    - "TELEFONO"
    - "FAX"
    - "WEB_PROPIA"
    - "DIRECCION"
    - "EMAIL"
    - "IMAGEN"
    - "DESCRIPCION_COMUN"
    - "RECURSOS"
    - "CONTENIDOS_RELACIONADOS"
values_list:
    - "IMAGEN"
    - "TITULO"
    - "CODCONTENIDO"
    - "DIRECCION"
    - "EMAIL"
    - "WEB_PROPIA"
    - "CONTACTO"
    - "MAPA"
    - "HORARIO"
limit: 100
---
<div flex="100" layout="row" layout-wrap>
    <md-input-container class="md-block" flex-gt-md="70" flex="100" flex-offset-gt-md="15">
        <label>{{ translate('general.', 'buscador_por_texto') | gsub: '_' : ' ' | capitalize }}</label>
        <input ng-model="node.filters.$text.$search"  ng-model-options="{ debounce: 500 }"/>
    </md-input-container>
</div>
<app-paginator-browser>
    <div flex-gt-sm="50" flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
