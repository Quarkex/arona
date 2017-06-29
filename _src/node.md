---
"title": "inicio"
"values_list": ["TITULO", "F_INICIO", "CODCONTENIDO", "IMAGEN"]
"values_view": ["DESCRIPCION", "DESCRIPCION_COMUN", "DIRECCION", "EMAIL", "FAX", "HORARIO", "IMAGEN", "MAPA_IFRAME", "TELEFONO", "TEXTO", "TITULO", "WEB_PROPIA" ]
"filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 595}
"collection": "actividades"
"limit": 3
"language": true
---

<div flex="100" flex-gt-xs="80" layout-gt-xs="row" layout-align="center center" layout="row"    id="apparona"           ng-include="'assets/atoms/main/apparona.htm'"           ></div>
<div flex="100" flex-gt-xs="80" layout-gt-xs="row" layout-align="center center" layout="row"    id="cuadricula"         ng-include="'assets/atoms/main/cuadricula.htm'"         ></div>
<div flex="100" flex-gt-xs="80" layout-gt-xs="row" layout-align="center center" layout="row"    id="vive_tu_estancia"   ng-include="'assets/atoms/main/vive_tu_estancia.htm'"   ></div>
<div flex="100" flex-gt-xs="80" layout-gt-xs="row" layout-align="center center" layout="row"    hide-gt-xs>
    <div flex layout="row" layout-align="center center">
        <div flex="80" layout="column" layout-padding>
            <div layout="row" layout-padding>
                <div flex style="padding-right: 0;">
                    <div class="text-center">
                        <a class="button opaque" style="width: 100%; margin-bottom: 0;" href="#!/{{ lang() }}/vive_tu_estancia"><span>{{ translate('pagina.titulo_disfruta_de_arona') }}</span></a>
                    </div>
                </div>
                <div>
                    <a class="button" href="#!/{{ lang() }}/galeria" style="padding: 0.45rem; margin-bottom: 0;"><md-icon style="color:white;" class="material-icons">camera_alt</md-icon></a>
                </div>
            </div>
        </div>
    </div>
</div>
<div flex="100" flex-gt-xs="80" layout-gt-xs="row" layout-align="center center" layout="row"    id="playas_de_arona"    ng-include="'assets/atoms/main/playas_de_arona.htm'"    ></div>
<div flex="100" flex-gt-xs="80" layout-gt-xs="row" layout-align="center center" layout="row"    id="conjunto_historico" ng-include="'assets/atoms/main/conjunto_historico.htm'" class="show-for-large"></div>
<div flex="100" flex-gt-xs="80"                                                 layout="column" id="actividades"        ng-include="'assets/atoms/main/actividades.htm'"        ></div>
<div flex="100" flex-gt-xs="80" layout-gt-xs="row" layout-align="center center" layout="row">
    <div flex="100" flex-gt-xs="80" layout-align="center center" layout="row" layout-wrap>
        <div layout="column" style="margin-bottom: 2em;" flex="100" flex-gt-xs="50" flex-gt-sm="25" layout-align="center center">
            <div layout="row" layout-padding><a href="http://www.arona.org"><img src="img/logoA.png"></a></div>
        </div>
        <div flex></div>
        <div layout="column" style="margin-bottom: 2em;" flex="100" flex-gt-xs="50" flex-gt-sm="25" layout-align="center center">
            <div layout="row" layout-padding><a href="http://www.arona.org/auditorio"><img src="img/logoB.png"></a></div>
        </div>
        <div flex></div>
        <div layout="column" style="margin-bottom: 2em;" flex="100" flex-gt-xs="50" flex-gt-sm="25" layout-align="center center">
            <div layout="row" layout-padding><a href="https://www.tripadvisor.es/Tourism-g230096-Arona_Tenerife_Canary_Islands-Vacations.html"><img src="img/logoC.png"></a></div>
        </div>
        <div flex></div>
        <div layout="column" style="margin-bottom: 2em;" flex="100" flex-gt-xs="50" flex-gt-sm="25" layout-align="center center">
            <div layout="row" layout-padding><a href="#!/es/vive_tu_estancia/actividades_recomendadas/compras/22215"><img src="img/logoD.png"></a></div>
        </div>
    </div>
</div>
