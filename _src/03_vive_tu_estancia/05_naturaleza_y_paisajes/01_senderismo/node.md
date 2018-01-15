---
id: senderismo
title: senderismo
"filters": {"$and":[{"CODSUBTIPOCONT":327},{"CODAREAS":16}]}
---
<div class="row">
    <div flex="100" layout="column" layout-gt-md="row" class="large-10 large-offset-1 columns">
        <app-accordion flex="100" flex-gt-sm="25"></app-accordion>
        <app-paginator-browser flex layout="column">
            <div flex="100" ng-class="{'end': $last}" ng-repeat="card in elements()">
                <app-card-standard item="card" prefix="node.href"></app-card-standard>
            </div>
        </app-paginator-browser>
    </div>
</div>
