---
"title": "inicio"
---

<div id="apparona"           ng-include="'assets/atoms/main/apparona.htm'"           class="main-row"></div>
<div id="cuadricula"         ng-include="'assets/atoms/main/cuadricula.htm'"         class="main-row"></div>
<div id="vive_tu_estancia"   ng-include="'assets/atoms/main/vive_tu_estancia.htm'"   class="main-row"></div>
<div class="hide-for-medium main-row">
    <div class="row">
        <div class="large-10 large-offset-1 columns">
            <div layout="row">
                <div flex flex-gt-xs="33" flex-offset-gt-xs="33">
                    <div class="text-center">
                        <a class="button opaque full-width" href="#/{{ lang() }}/vive_tu_estancia"><span>{{ translate('pagina.titulo_disfruta_de_arona') }}</span></a>
                    </div>
                </div>
                <div flex flex-xs="15" flex-sm="15" class="text-left" style="margin-left: 0.2em;">
                    <a class="button" href="#/{{ lang() }}/galeria" style="padding: 0.45rem;"><md-icon style="color:white;" class="material-icons">camera_alt</md-icon></a>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="playas_de_arona"    ng-include="'assets/atoms/main/playas_de_arona.htm'"    class="main-row"></div>
<div id="conjunto_historico" ng-include="'assets/atoms/main/conjunto_historico.htm'" class="main-row show-for-large"></div>
<div id="actividades"        ng-include="'assets/atoms/main/actividades.htm'"        class="main-row" ng-controller="resourcePaginatorCtrl"></div>
<div class="row collapse">
    <div class="large-10 large-offset-1 columns">
        <div class="medium-3 small-6 columns text-center" style="margin-bottom: 2em;"> <a href="http://www.arona.org">
                <img src="img/logoA.png">
            </a>
        </div>
        <div class="medium-3 small-6 columns text-center" style="margin-bottom: 2em;"> <a href="http://www.arona.org/auditorio">
                <img src="img/logoB.png">
            </a>
        </div>
        <div class="medium-3 small-6 columns text-center" style="margin-bottom: 2em;"> <a href="https://www.tripadvisor.es/Tourism-g230096-Arona_Tenerife_Canary_Islands-Vacations.html">
                <img src="img/logoC.png">
            </a>
        </div>
        <div class="medium-3 small-6 columns text-center" style="margin-bottom: 2em;"> <a href="/#/es/vive_tu_estancia/actividades_recomendadas/compras/22215">
                <img src="img/logoD.png">
            </a>
        </div>
    </div>
</div>
