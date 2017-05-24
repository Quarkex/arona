---
id: "la_conquista_de_canarias"
title: "la_conquista_de_canarias"
href: "destino_arona/un_poco_de_historia/la_conquista_de_canarias/4180"
view: "descriptive"
"collection": "descriptivos"
"filters": {"CODCONTENIDO": 4180}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="medium-6 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
