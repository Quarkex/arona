select c.codcontenido, rtrim ('"' || c.codsubtipocont || '",' || subtipos.codsubtipos, ',') codsubtipocont, 
sbt.descripcion subtipo_principal, c.codcategoria, ctg.NOMBRE categoria, 
c.imagen, c.WEB_PROPIA, c.documento, c.zona codzona, zn.NOMBRE zona, c.f_inicio_pub, c.f_fin_pub, c.f_revision, c.f_baja, 
c.novedad, c.f_inicio_nov, c.f_fin_nov, c.propietario codpropietario, prop.nombre, ci.titulo, ci.descripcion_comun, 
ci.datos_interes, ci.palabras_clave, loc.codlocalidad, localidad.DESCRIPCION, loc.tipo_via, loc.nombre_via, loc.numero, loc.bloque,
loc.portal, loc.escalera, loc.planta, loc.puerta, loc.local, loc.codigo_postal, loc.telefono, loc.fax, loc.email, 
loci.nombre_social, loci.vacaciones, loci.cierre, loci.horario, loci.accesos, loci.serv_principales, c.publicado, c.REF_VPORTAL,
indic_territorial.CodigosIndicadores, indic_territorial.NombreIndicadores, indic_territorial.EtiquetaIndicadores, indic_territorial.ValoresIndicadoresLista, indic_territorial.NombresIndicadoresLista,
indic_territorial.ValoresIndicadores, areasubarea.codareas, areasubarea.areas, areasubarea.codsubareas, areasubarea.subareas,
subtipos.subtipos, recursos_relacionados.codrecursos, contenidos_relacionados.codcontenidosrelacionados, 
sectores_poblacion.codsectorespoblacion, sectores_poblacion.sectorespoblacion, FModif.FModificacion
from contenido c 
inner join contenido_idioma ci on c.codcontenido = ci.codcontenido
inner join localizativo loc on loc.codcontenido = c.codcontenido
inner join localizativo_idioma loci on c.codcontenido = loci.codcontenido and loci.codidioma = ci.codidioma
inner join subtipo_contenido_idioma sbt on sbt.CODSUBTIPOCONT = c.CODSUBTIPOCONT and sbt.codidioma = 1
inner join categoria_idioma ctg on ctg.codcategoria = c.codcategoria and ctg.codidioma = 1
inner join zona zn on zn.codzona = c.zona 
inner join est_organica prop on prop.codestorg = c.propietario
inner join localidad on localidad.codlocalidad = loc.codlocalidad

inner join (select cas.codcontenido, concat (concat ('"',listagg (cas.codarea, '","') within group (order by ari.descripcion, sri.DESCRIPCION)), '"') codareas, concat (concat ('"', listagg (cas.codsubarea, '","') within group (order by ari.descripcion, sri.DESCRIPCION)), '"') codsubareas,
concat (concat ('"',listagg (ari.descripcion, '","') within group (order by ari.descripcion, sri.DESCRIPCION)), '"') areas, concat (concat ('"',listagg (sri.DESCRIPCION, '","') within group (order by ari.descripcion, sri.DESCRIPCION)), '"') subareas
from CONTENIDOS_AREAS_SUBAREAS cas 
inner join area_idioma ari on ari.codarea = cas.codarea
inner join subarea_idioma sri on sri.codsubarea = cas.codsubarea
where ari.codidioma = 1 and sri.codidioma = 1
group by cas.codcontenido) areasubarea on areasubarea.codcontenido = c.codcontenido

left join (select crec.codcontenido, crec.codidioma, Concat (Concat ('"',listagg (crec.codrecurso, '","') within group (order by crec.codcontenido, crec.codrecurso)), '"') codrecursos
from contenido_recurso crec
group by crec.codcontenido, crec.codidioma) recursos_relacionados on recursos_relacionados.codcontenido = c.codcontenido and ci.codidioma = recursos_relacionados.codidioma

left join (select crel.CODCONTENIDO_ORIGEN, Concat (Concat ('"',listagg (crel.CODCONTENIDO_DESTINO, '","') within group (order by crel.CODCONTENIDO_DESTINO)), '"') codcontenidosrelacionados
from contenidos_relacionados crel
group by crel.CODCONTENIDO_ORIGEN) contenidos_relacionados on contenidos_relacionados.CODCONTENIDO_ORIGEN = c.codcontenido

left join (select cs.codcontenido, Concat (Concat ('"',listagg (csi.CODSUBTIPOCONT, '","') within group (order by csi.descripcion)), '"') codsubtipos,  Concat (Concat ('"',listagg (csi.descripcion, '","') within group (order by csi.descripcion)), '"') subtipos
from CONTENIDOS_SUBTIPOS cs inner join SUBTIPO_CONTENIDO_IDIOMA csi on cs.CODSUBTIPOCONT = csi.CODSUBTIPOCONT
where csi.codidioma = 1
group by cs.codcontenido) subtipos on subtipos.codcontenido = c.codcontenido

left join (select spc.CODCONTENIDO, Concat (Concat ('"',listagg (spc.CODSECTORPOBLAC, '","') within group (order by spc.CODSECTORPOBLAC)), '"') codsectorespoblacion,
Concat (Concat ('"',listagg (spi.NOMBRE, '","') within group (order by spc.CODSECTORPOBLAC)), '"') sectorespoblacion
from sector_poblacion_contenido spc inner join sector_poblacion_idioma spi on spi.CODSECTORPOBLAC = spc.CODSECTORPOBLAC and
  spi.codidioma = spc.codidioma
where spi.codidioma = 1
group by spc.CODCONTENIDO) sectores_poblacion on sectores_poblacion.codcontenido = c.codcontenido

left join (select HWF.CODCONTENIDO, HWFI.CODIDIOMA, MAX (HWF.F_FIN) FModificacion
from HISTORICO_WF HWF INNER JOIN HISTORICO_WF_IDIOMA HWFI ON HWF.CODWF = HWFI.CODWF
WHERE HWFI.CODTAREA = 2 and HWF.CODWF > 0 
group by HWF.CODCONTENIDO, HWFI.CODIDIOMA) FModif on FModif.codcontenido = c.codcontenido + 1 and FModif.codidioma = ci.codidioma

left join (select igc.codcontenido, igc.codidioma, Concat (Concat ('"',Listagg (igc.CODINDICADOR, '","') within group (order by igc.codcontenido, igc.codindicador, igc.codidioma)), '"') CodigosIndicadores,
Concat (Concat ('"', Listagg (igi.NOMBRE, '","') within group (order by igc.codcontenido, igc.codindicador, igc.codidioma)), '"') NombreIndicadores,
Concat (Concat ('"', Listagg (igi.descripcion, '","') within group (order by igc.codcontenido, igc.codindicador, igc.codidioma)), '"') EtiquetaIndicadores,
Concat (Concat ('"', Listagg (igli.descripcion, '","') within group (order by igc.codcontenido, igc.codindicador, igc.codidioma)), '"') ValoresIndicadoresLista,
Concat (Concat ('"', Listagg (igli.nombre, '","') within group (order by igc.codcontenido, igc.codindicador, igc.codidioma)), '"') NombresIndicadoresLista,
Concat (Concat ('"', Listagg (CASE ig.tipo_campo 
  WHEN 1 Then to_char (igc.valor_NUM)
WHEN 2 Then nvl (igc.valor_FECHA, '-1')
WHEN 3 Then nvl (igc.valor_FECHA, '-1')
WHEN 4 Then nvl (igc.valor_TEXTO, '-1')
WHEN 5 Then 'TEXTO_LARGO'
WHEN 6 Then to_char (igc.codlista)
WHEN 7 Then to_char (igc.CODLISTA) 
  END, '","' ) within group (order by igc.codcontenido, igc.codindicador, igc.codidioma)), '"') ValoresIndicadores  
from IND_GESTION_CONTENIDO igc inner join ind_gestion ig on ig.CODINDICADOR = igc.CODINDICADOR
INNER JOIN IND_gESTION_IDIOMA igi on igc.codindicador = igi.codindicador and igc.codidioma = igi.codidioma
inner join contenido on contenido.codcontenido = igc.codcontenido
left join ind_gestion_lista_idioma igli on igli.codlista = igc.codlista and igc.codidioma = igli.codidioma
group by igc.codcontenido, igc.codidioma) indic_territorial on indic_territorial.codcontenido = c.codcontenido 
and ci.codidioma= indic_territorial.codidioma

where ci.codidioma = 1 and c.publicado = 2 and c.ref_vportal = -1