---
id: "playa_de_las_vistas"
title: "playa_de_las_vistas"
"collection": "territoriales"
"filters": {"CODCONTENIDO": 22539}
"values_view": ["WEBCAM","DATOS_INTERES"]
"values_list": ["WEBCAM","DATOS_INTERES"]
limit: 1
---
<div class="row">
    <div layout="column" layout-gt-sm="row" class="large-10 large-offset-1 columns">
        <app-side-nav flex="100" flex-gt-sm="25"></app-side-nav>
        <div flex layout="column" class="webcam-wrapper" >
            <!-- <h1 flex="100" class="element-title">{{ translate( 'pagina.titulo_', current_section() ) }}</h1> -->
            <div flex="100" class="webcam" bind-html-compile="element().WEBCAM"></div>
            <div flex="100" class="webcam-description" bind-html-compile="element().DATOS_INTERES"></div>
            <div flex="100" layout="column" layout-gt-sm="row">
        <!--        <div flex="25" layout="column" layout-gt-xs="row" layout-align="center center" layout-align-gt-sm="begin center">
                    <md-button class="md-button md-primary" ng-href="#!/{{ lang() }}">
                        <md-icon class="material-icons" style="margin-top: -0.25em;">place</md-icon> {{ translate('webcams.', 'ubicacion') }}
                    </md-button>
                </div>
                <div flex layout="column" layout-gt-xs="row" layout-align="center center" layout-align-gt-sm="end center">
                    <md-button class="md-button md-raised md-primary" ng-href="#!/{{ lang() }}">
                        {{ translate('webcams.', 'modo_24_h') }}
                    </md-button>
                    <md-button class="md-button md-raised md-primary" ng-href="#!/{{ lang() }}">
                        {{ translate('webcams.', 'imagen_en_vivo') }}
                    </md-button>
                    <md-button class="md-button md-raised md-primary" ng-href="#!/{{ lang() }}">
                        {{ translate('webcams.', '50') }}
                    </md-button>
                </div> -->
            </div> 
        <!--    <div flex="100" class="webcam-extra-content">
                <h1>{{ translate('general.', 'mas_informacion') }}</h1>
            </div>  -->
            <app-back-bar></app-back-bar>
        </div>
    </div>
</div>
