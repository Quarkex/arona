app.service('patreonsScroll', ["language", "$resource", ResourcePaginator]);
app.controller("patreonsScrollCtrl", function($rootScope, $scope, patreonsScroll) {

    patreonsScroll.expose_interface($scope);

    patreonsScroll.set_values({
        "language": '',
        "pub": false,
        "collection": "patreons",
        "filters": {"scrolleable": true},
        "values": [ "name", "link", "weight" ],
        "offset": 0,
        "limit": 0
    });

    $rootScope['patreons_status'] = patreonsScroll.element_status;
});
