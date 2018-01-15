---
id: "historia_de_arona"
title: "historia_de_arona"
view: "descriptive"
"collection": "descriptivos"
"filters": {"CODAREAS":16,"CODSUBAREAS":278,"CODSUBTIPOCONT":329}
"values_view": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"]
---
<div class="row">
    <div flex="100" layout="column" layout-gt-sm="row" class="large-10 large-offset-1 columns">
        <app-accordion flex="100" flex-gt-sm="25"></app-accordion>
        <app-paginator-browser flex="100" flex-gt-sm="75" layout="column">
            <div flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
