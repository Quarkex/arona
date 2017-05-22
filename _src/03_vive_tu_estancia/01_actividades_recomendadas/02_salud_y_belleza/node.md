---
id: salud_y_belleza
title: salud_y_belleza
"collection": "territoriales"
"filters": {"$and":[{"CODSUBTIPOCONT":159},{"CODAREAS":16}]}
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex flex-gt-md="25"></app-accordion>
        <app-paginator-browser flex >
            <div class="small-12 columns" ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
