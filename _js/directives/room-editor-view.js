app.directive('appRoomEditorView', function () {

    var template = [
        '<div ng-repeat="room in elements()">',
            '<div ng-include="\'assets/forms/room_editor.htm\'"></div>',
        '</div>'
    ].join(' ');

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});

