---
id: zonas_de_acampada
title: zonas_de_acampada
"filters": {"$and":[{"CODSUBTIPOCONT":18},{"CODAREAS":16}]}
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex flex-gt-md="25"></app-accordion>
        <app-paginator-browser flex layout="column">
            <div flex ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
