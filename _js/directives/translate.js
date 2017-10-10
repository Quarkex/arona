app.directive('appTranslate', function ($compile, language) {

    return {
        restrict: 'E',
        scope: false,
        link: function(scope, element, attrs){

            var output = "translate( ";
            if (! attrs.namespace === (null || undefined)) output += "'" + attrs.namespace + "', ";
            output += "'" + element.textContent + "'";
            output += " )";
            if (! attrs.capitalize === (null || undefined)) output += " | capitalize";
            output = '{{ ' + output + ' }}';

            element.innerHTML = output;
            console.log(element);
            $compile(element);

        }
    };
});

