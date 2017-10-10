(function(){

var module = angular.module("angular-square-image", [
  'ngSanitize'
]);

module.directive('squareImage', function($sce) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div ng-bind-html="data"></div>',
    scope: {
      'image': '@'
    },
    link: function(scope, elem, attrs) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';

      img.onload = function() {
        if (img.width === img.height) {
          scope.data = $sce.trustAsHtml('<img src="' + img.src + '">');
        } else {
          console.log("Image width is not the same as height");
          var canvas = document.createElement('canvas');
          if (img.width > img.height) {
            canvas.width = img.height;
            canvas.height = img.height;
          } else {
            canvas.width = img.width;
            canvas.height = img.width;
          }
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          scope.data = $sce.trustAsHtml('<img src="' + canvas.toDataURL('image/jpeg',1) + '">');
        }
        scope.$apply();
      };
      
      scope.$watch('image', function(value) {
        img.src = value;
      });
    }
  };
});

})();
