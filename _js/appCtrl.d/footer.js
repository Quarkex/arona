app.controller("footerCtrl", function($scope, $mdDialog) {
    $scope.showDialog = function ( ev ){
        $mdDialog.show({
            controller: 'footerCtrl',
            templateUrl: $scope.dialog,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
});
