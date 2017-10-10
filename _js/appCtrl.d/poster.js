app.service('poster', ["language", "$resource", ResourcePaginator]);
app.controller("posterCtrl", function($rootScope, $scope, poster) {

    poster.expose_interface($scope);

    poster.set_values({
        "language": $scope.lang(),
        "pub": false,
        "collection": "articles",
        "filters": {'event': true, "published": true},
        "values": ["id","figure", "title"],
        "offset": 0,
        "limit": 1
    });

    $rootScope['poster_status'] = poster.element_status;

});
