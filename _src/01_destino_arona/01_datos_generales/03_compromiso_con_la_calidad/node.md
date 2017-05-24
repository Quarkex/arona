---
id: "compromiso_con_la_calidad"
title: "compromiso_con_la_calidad"
href: "destino_arona/datos_generales/compromiso_con_la_calidad/21849"
"collection": "descriptivos"
"filters": {"CODCONTENIDO": 21849}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<app-tab-bar></app-tab-bar>
<app-paginator-browser >
    <div class="medium-6 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
        <app-card-standard item="card" prefix="node.href"></app-card-standard>
    </div>
</app-paginator-browser>
