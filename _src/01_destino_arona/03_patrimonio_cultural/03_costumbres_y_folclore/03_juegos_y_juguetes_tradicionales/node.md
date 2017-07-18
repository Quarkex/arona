---
id: "juegos_y_juguetes_tradicionales"
title: "juegos_y_juguetes_tradicionales"
href: "destino_arona/patrimonio_cultural/costumbres_y_folclore/juegos_y_juguetes_tradicionales/22125"
view: "descriptive"
"collection": "descriptivos"
"filters": {"CODCONTENIDO": 22125}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="small-12 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-simple item="card" prefix="node.href"></app-card-simple>
    </div>
</app-paginator-browser>
