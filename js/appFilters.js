app.filter("trust", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);
app.filter("pad", [function() {
    return function(n, width, z){
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
}]);
app.filter("capitalize", [function() {
    return function(input, scope) {
        var output = '';
        if (input!=null) output = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
        return output
    }
}]);
app.filter("gsub", [function() {
    return function(input, pattern, replacement, isRegex) {
        if (isRegex == undefined) isRegex = false;
        if (input != null && pattern != null && replacement != null){
            var output = '';
            if (! isRegex) pattern = pattern.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            if (input!=null) output = input.replace(new RegExp(pattern, "g"), replacement);
            return output;
        } else {
            return '';
        }
    }
}]);
