app.service('showcase', ["language", "$resource", ResourcePaginator]);
app.controller("showcaseCtrl", function($rootScope, $scope, showcase) {

    showcase.expose_interface($scope);

    showcase.set_values({
        "language": $scope.lang(),
        "pub": false,
        "collection": "articles",
        "filters": {"showcaser": true, "published": true},
        "values": [ "figure", "id", "title", "date", "excerpt" ],
        "offset": 0,
        "limit": 4
    });

    $rootScope['showcase_status'] = showcase.element_status;

});
