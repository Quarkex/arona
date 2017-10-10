app.service('slideshow', ["language", "$resource", ResourcePaginator]);
app.controller("slideshowCtrl", function($rootScope, $scope, slideshow) {

    slideshow.expose_interface($scope);

    slideshow.set_values({
        "language": $scope.lang(),
        "pub": false,
        "collection": "rooms",
        "filters": {"slider": true, "published": true},
        "values": ["id", "name", "price", "map_image", "image_path"],
        "offset": 0,
        "limit": 5
    });

    $rootScope['slideshow_status'] = slideshow.element_status;

});
