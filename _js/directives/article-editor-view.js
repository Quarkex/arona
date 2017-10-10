app.directive('appArticleEditorView', function () {

    var template = '' + 
    '<form method="POST" enctype="multipart/form-data" action="api/publish_article.rb">' +
        '<md-content class="md-padding" ng-repeat="article in elements()">' +

            '<md-toolbar ng-init="article.date = Date(article.date);" class="md-menu-toolbar">' +
                '<div layout="row">' +
                    '<div flex="100" layout="row" layout-wrap>' +
                        '<h2 md-truncate flex="100" class="md-toolbar-tools" ng-click="toolbar.changeName(article, $event)">{{ article.title }}</h2>' +

                        '<md-menu-bar flex="100">' +

                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()">' +
                                    'Noticia' +
                                '</button>' +
                                '<md-menu-content>' +

                                    '<md-menu-item>' +
                                        '<md-button ng-click="toolbar.changeName(article, $event)">' +
                                            'Modificar título' +
                                        '</md-button>' +
                                    '</md-menu-item>' +

                                    '<md-menu-item>' +
                                        '<md-button ng-click="toolbar.changeExcerpt(article, $event)">' +
                                            'Modificar resumen' +
                                        '</md-button>' +
                                    '</md-menu-item>' +

                                    '<md-menu-item>' +
                                        '<md-button ng-click="toolbar.changeDate(article, $event)">' +
                                            'Modificar fecha' +
                                        '</md-button>' +
                                    '</md-menu-item>' +

                                '</md-menu-content>' +
                            '</md-menu>' +

                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()">' +
                                    'Visibilidad' +
                                '</button>' +
                                '<md-menu-content width="3">' +

                                    '<md-menu-item type="checkbox" ng-model="article.published">Publicado</md-menu-item>' +

                                    '<md-menu-item type="checkbox" ng-model="article.event">Evento</md-menu-item>' +

                                    '<md-menu-item type="checkbox" ng-model="article.slider">Slider</md-menu-item>' +

                                    '<md-menu-item type="checkbox" ng-model="article.showcaser">Showcaser</md-menu-item>' +

                                '</md-menu-content>' +
                            '</md-menu>' +

                            '<md-menu>' +
                                '<button ng-click="$mdMenu.open()">' +
                                    'Archivos' +
                                '</button>' +
                                '<md-menu-content width="3">' +

                                    '<md-menu-item>' +
                                        '<md-button ng-click="toolbar.changeVideo($event)">' +
                                            'Modificar vídeo' +
                                        '</md-button>' +
                                    '</md-menu-item>' +

                                    '<md-menu-divider></md-menu-divider>' +
                                    '<md-menu-item>' +
                                        '<span style="white-space: nowrap;">Imagen: <input name="article_image" type="file"></span>' +
                                    '</md-menu-item>' +

                                    '<md-menu-divider></md-menu-divider>' +
                                    '<md-menu-item>' +
                                        '<span style="white-space: nowrap;">Poster: <input name="event_image" type="file"></span>' +
                                    '</md-menu-item>' +

                                '</md-menu-content>' +
                            '</md-menu>' +

                        '</md-menu-bar>' +

                    '</div>' +

                '</div>' +
            '</md-toolbar>' +
            '<div flex layout="row" layout-wrap>' +
                '<div layout="row" flex="100">' +
                    '<div style="min-height: 50vh; width: 100%; padding: 1em;" class="article-content md-whiteframe-1dp" ng-model="article.content" ckeditor="options" ready="onReady()" contenteditable="true"></div>' +
                    '<input type="hidden" name="title" value="{{ article.title }}">' +
                    '<input type="hidden" name="excerpt" value="{{ article.excerpt }}">' +
                    '<input type="hidden" name="day" value="{{ article.date.getDate() }}">' +
                    '<input type="hidden" name="month" value="{{ article.date.getMonth() + 1 }}">' +
                    '<input type="hidden" name="year" value="{{ article.date.getFullYear() }}">' +
                    '<input type="hidden" name="published" value="{{ article.published }}">' +
                    '<input type="hidden" name="event" value="{{ article.event }}">' +
                    '<input type="hidden" name="slider" value="{{ article.slider }}">' +
                    '<input type="hidden" name="showcaser" value="{{ article.showcaser }}">' +
                    '<input type="hidden" name="video" value="{{ article.video }}">' +
                    '<input type="hidden" name="id" value="{{ article.id }}">' +
                    '<input type="hidden" name="content" value="{{ article.content }}">' +
                '</div>' +
                '<div layout="row" flex="100" layout-align="center">' +
                    '<span ng-click="toolbar.changeDate(article, $event)">{{ article.date | date }}</span>' +
                '</div>' +
                '<div layout="row" flex="100" layout-align="end">' +
                    '<input class="md-button" type="submit" value="Guardar">' +
                '</div>' +
            '</div>' +

        '</md-content>' +
    '</form>';

    return {
        restrict: 'E',
        scope: false,
        template: template
    };
});


