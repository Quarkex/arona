app.service('slider', ["language", "$resource", ResourcePaginator]);
app.controller("sliderCtrl", function($rootScope, $scope, slider) {

    slider.expose_interface($scope);

    slider.set_values({
        "language": '',
        "pub": false,
        "collection": "slider",
        "filters": {},
        "values": [ "content" ],
        "offset": 0,
        "limit": 0
    });

    $rootScope['slider_status'] = slider.element_status;
});
