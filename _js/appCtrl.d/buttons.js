app.service('buttons', ["language", "$resource", ResourcePaginator]);
app.controller("buttonsCtrl", function($rootScope, $scope, buttons) {

    buttons.expose_interface($scope);

    buttons.set_values({
        "language": '',
        "pub": false,
        "collection": "buttons",
        "filters": {},
        "values": [],
        "offset": 0,
        "limit": 0
    });
});
