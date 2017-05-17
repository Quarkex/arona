app.value('page', {
    'title': "Arona.travel"
});

app.value('constants', {
    "SUBTIPO_PRINCIPAL": {
        "apartamentos":                           "Apartamentos",
        "hoteles":                                "Hoteles",
        "pensiones":                              "Pensiones",
        "ialojamiento_rural":                     "Alojamiento Rural",
        "aparthoteles":                           "Aparthoteles"
    },
    "SUBTIPO": {
        "panflets":                               "Folletos / Trípticos"
    },
    "CODCONTENIDO": {
        "clima":                                  21687,
        "compromiso_con_la_calidad":              21849,
        "playa_de_las_vistas":                    22539,
        "playa_de_las_vistas_accesible":          2106,
        "playa_de_las_galletas":                  22569,
        "puerto_de_las_galletas":                 489,
        "plaza_de_arona":                         22543,
        "la_conquista_de_canarias":               4180,
        "los_cristianos":                         22573,
        "otras_webcams":                          22585
    },
    'CODSUBTIPOCONT':{
        "agencias_de_viaje":                      48,
        "agencias_de_viaje_accesible":            48,
        "alojamiento_rural":                      15,
        "alquiler_de_ayudas_tecnicas":            669,
        "alquiler_de_vehiculos":                  47,
        "apartahteles":                           659,
        "apartamentos":                           40,
        "arquitectura_tradicional":               490,
        "arona_unica":                            517,
        "arte_y_artesania":                       473,
        "auditorios":                             596,
        "biosphere":                              517,
        "centros_civicos":                        466,
        "centros_culturales":                     146,
        "ciclismo":                               454,
        "compras":                                157,
        "compras_accesible":                      157,
        "costumbres_y_folclore":                  490,
        "deporte_y_aventura":                     454,
        "discotecas_y_pubs":                      249,
        "espacios_naturales":                     327,
        "especialidades_nauticas":                454,
        "espectaculos":                           330,
        "estadisticas":                           592,
        "gimnasia_y_juegos_deportivos":           253,
        "hipica":                                 454,
        "historia_de_arona":                      329,
        "hoteles":                                26,
        "hoteles_accesible":                      26,
        "informacion_portuaria":                  524,
        "instalaciones_deportivas":               321,
        "lugares_de_interes":                     331,
        "motor":                                  454,
        "museos":                                 250,
        "ocio_diurno":                            152, //parques temáticos y atracciones
        "ocio_y_playas":                          454,
        "oficinas_de_informacion":                145,
        "otras_especialidades":                   454,
        "otros_centros_de_congresos_de_tenerife": 398,
        "pastelerias":                            582,
        "pensiones":                              25,
        "por_mar_y_aire":                         150,
        "publicaciones_y_revistas":               522,
        "restaurantes":                           30,
        "restaurantes_accesible":                 30,
        "salud_y_belleza":                        159,
        "senderismo":                             327,
        "situacion_orografia_y_vegetacion":       506,
        "sol_y_playa":                            154,
        "tenis_y_especialidades_con_raqueta":     454,
        "touroperadores":                         251,
        "transporte_publico":                     163,
        "webcam":                                 342,
        "zonas_de_acampada":                      18
    },
    'CODSUBAREAS':{
        "arquitectura_tradicional":               278,
        "biosphere":                              464,
        "ciclismo":                               323,
        "costumbres_y_folclore":                  155,
        "especialidades_nauticas":                169,
        "espectaculos":                           156,
        "hipica":                                 379,
        "motor":                                  268,
        "museos":                                 155,
        "ocio_y_playas":                          156,
        "otras_especialidades":                   174,
        "tenis_y_especialidades_con_raqueta":     175,
        "zonas_de_acampada":                      157
    },
    'CODAREAS':{
        "centros_culturales":                     6,
        "instalaciones_deportivas":               15,
        "ciclismo":                               15,
        "especialidades_nauticas":                15,
        "hipica":                                 15,
        "motor":                                  15,
        "otras_especialidades":                   15,
        "pastelerias":                            null,
        "tenis_y_especialidades_con_raqueta":     15
    },
    "VALORESINDICADORES": {
        "agencias_de_viaje_accesible":            37,
        "compras_accesible":                      37,
        "golf":                                   40,
        "hoteles_accesible":                      37,
        "restaurantes_accesible":                 37
    }
});

app.value('resourceValues', {
    "index": {
        "language": true,
        "collection": "actividades",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 595},
        "values": ["TITULO", "F_INICIO", "CODCONTENIDO", "IMAGEN"],
        "limit": 3
    },

      /////////////////////////////////////////////////////////////////
     // Planea tu viaje                                             //
    /////////////////////////////////////////////////////////////////
    "planea_tu_viaje": {
        "language": true,
        "collection": "actividades",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 595},
        "values": ["TITULO", "F_INICIO", "CODCONTENIDO", "IMAGEN"],
        "limit": 3
    },

    /**********************************/
    /* Cómo llegar                    */
    /**********************************/
    "por_mar_y_aire": {
        "collection": "territoriales",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 150},
        "values": ["HORARIO", "MAPA", "MAPA_IFRAME", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    },
    "agencias_de_viaje": {
        "collection": "territoriales",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 48},
        "values": ["HORARIO", "MAPA", "MAPA_IFRAME", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    },
    "touroperadores": {
        "collection": "territoriales",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 251},
        "values": ["HORARIO", "MAPA", "MAPA_IFRAME", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    },

    /**********************************/
    /* Cómo moverse                   */
    /**********************************/
    "transporte_publico": {
        "collection": "territoriales",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 163},
        "values": ["HORARIO", "MAPA", "MAPA_IFRAME", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    },
    "alquiler_de_vehiculos": {
        "collection": "territoriales",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 47},
        "values": ["HORARIO", "MAPA", "MAPA_IFRAME", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    },
    "informacion_portuaria": {
        "collection": "territoriales",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 524},
        "values": ["HORARIO", "MAPA", "MAPA_IFRAME", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    },

    /**********************************/
    /* Dónde alojarse                 */
    /**********************************/
    "hoteles": {
        "collection": "territoriales",
        "filters": {"SUBTIPO_PRINCIPAL": "Hoteles"},
        "values": ["HORARIO", "MAPA_IFRAME", "MAPA", "CODCONTENIDO", "TITULO", "ZONA", "TELEFONO", "FAX", "WEB_PROPIA", "DIRECCION", "EMAIL", "INDICADORES", "IMAGEN", "DESCRIPCION_COMUN", "RECURSOS", "CONTENIDOS_RELACIONADOS"]
    },
    "aparthoteles": {
        "collection": "territoriales",
        "filters": {"SUBTIPO_PRINCIPAL": "Aparthoteles"},
        "values": ["HORARIO", "MAPA_IFRAME", "MAPA", "CODCONTENIDO", "TITULO", "ZONA", "TELEFONO", "FAX", "WEB_PROPIA", "DIRECCION", "EMAIL", "INDICADORES", "IMAGEN", "DESCRIPCION_COMUN", "RECURSOS", "CONTENIDOS_RELACIONADOS"]
    },
    "apartamentos": {
        "collection": "territoriales",
        "filters": {"SUBTIPO_PRINCIPAL": "Apartamentos"},
        "values": ["HORARIO", "MAPA_IFRAME", "MAPA", "CODCONTENIDO", "TITULO", "ZONA", "TELEFONO", "FAX", "WEB_PROPIA", "DIRECCION", "EMAIL", "INDICADORES", "IMAGEN", "DESCRIPCION_COMUN", "RECURSOS", "CONTENIDOS_RELACIONADOS"]
    },
    "alojamiento_rural": {
        "collection": "territoriales",
        "filters": {"SUBTIPO_PRINCIPAL": "Alojamiento Rural"},
        "values": ["HORARIO", "MAPA_IFRAME", "MAPA", "CODCONTENIDO", "TITULO", "ZONA", "TELEFONO", "FAX", "WEB_PROPIA", "DIRECCION", "EMAIL", "INDICADORES", "IMAGEN", "DESCRIPCION_COMUN", "RECURSOS", "CONTENIDOS_RELACIONADOS"]
    },
    "pensiones": {
        "collection": "territoriales",
        "filters": {"SUBTIPO_PRINCIPAL": "Pensiones"},
        "values": ["HORARIO", "MAPA_IFRAME", "MAPA", "CODCONTENIDO", "TITULO", "ZONA", "TELEFONO", "FAX", "WEB_PROPIA", "DIRECCION", "EMAIL", "INDICADORES", "IMAGEN", "DESCRIPCION_COMUN", "RECURSOS", "CONTENIDOS_RELACIONADOS"]
    },

    /**********************************/
    /* Destino accesible              */
    /**********************************/
    "playa_de_las_vistas_accesible": {
        "collection": "descriptivos",
        "filters": {"CODCONTENIDO": 2106},
        "values": ["TITULO","HREF","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN","TEXTO","RECURSOS","CONTENIDOS_RELACIONADOS"],
    },
    "donde_alojarse_accesible": {
        "collection":"territoriales",
        "filters":{"CODSUBTIPOCONT":26,"CODAREAS":16,"VALORESINDICADORES":{"$in":[37]}},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "restaurantes_accesibles": {
        "collection":"territoriales",
        "filters":{"CODSUBTIPOCONT":30,"CODAREAS":16,"VALORESINDICADORES":{"$in":[37]}},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "compras_accesibles": {
        "collection":"territoriales",
        "filters":{"CODSUBTIPOCONT":157,"CODAREAS":16,"VALORESINDICADORES":{"$in":[37]}},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "agencias_de_viaje_accesible": {
        "collection": "territoriales",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 48, "VALORESINDICADORES":{"$in":[37]}},
        "values": ["HORARIO", "MAPA", "MAPA_IFRAME", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    },
    "guia_de_accesibilidad": {
        "collection":"documentales",
        "filters":{"CODSUBTIPOCONT":292,"CODAREAS":16,"CODSUBAREAS":277},
        "values":["CODCONTENIDO","DESCRIPCION_COMUN","DOCUMENTO","IMAGEN","PALABRAS_CLAVE","TITULO","RECURSOS","CONTENIDOS_RELACIONADOS"],
        "limit":8
    },
    "videos_accesibles": {
        "collection": "descriptivos",
        "filters": {"CODSUBTIPOCONT":441,"CODAREAS":16,"CODSUBAREAS":277},
        "values": ["TITULO","RECURSOS","CODCONTENIDO","IMAGEN","DESCRIPCION_COMUN"],
    },
    "alquiler_de_ayudas_tecnicas": {
        "collection":"territoriales",
        "filters":{"CODSUBTIPOCONT":669,"CODAREAS":16,"VALORESINDICADORES":{"$in":[37]}},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },

    /* Folletos y mapas */
    "folletos_y_mapas": {
        "collection": "documentales",
        "filters": {"SUBTIPO": "Folletos / Trípticos"},
        "values": ["CODCONTENIDO", "DESCRIPCION_COMUN", "DOCUMENTO", "IMAGEN", "PALABRAS_CLAVE", "TITULO"],
            "limit": 8
    },

    /* Oficinas de información */
    "oficinas_de_informacion": {
        "collection": "territoriales",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 145},
        "values": ["HORARIO", "MAPA", "MAPA_IFRAME", "ACCESOS", "CATEGORIA", "CIERRE", "CODCONTENIDO", "CODLOCALIDAD", "DATOS_INTERES", "DESCRIPCION", "DESCRIPCION_COMUN", "DOCUMENTO", "EMAIL", "FAX", "F_BAJA", "F_FIN_NOV", "F_FIN_PUB", "F_INICIO_NOV", "F_INICIO_PUB", "F_REVISION", "HORARIO", "IMAGEN", "TITULO", "NOMBRE_SOCIAL", "NOVEDAD", "PALABRAS_CLAVE", "PUBLICADO", "SERV_PRINCIPALES", "SUBTIPO_PRINCIPAL", "TELEFONO", "TITULO", "VACACIONES", "WEB_PROPIA", "ZONA", "DIRECCION"],
    },

      /////////////////////////////////////////////////////////////////
     // Vive tu estancia                                            //
    /////////////////////////////////////////////////////////////////

    /**********************************/
    /* Actividades recomendadas       */
    /**********************************/

    /* Deporte y aventura */
    "instalaciones_deportivas": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":321},{"CODAREAS":15}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "ciclismo": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":454},{"CODAREAS":15},{"CODSUBAREAS":323}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "especialidades_nauticas": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":454},{"CODAREAS":15},{"CODSUBAREAS":169}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "ocio_y_playas": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":454},{"CODAREAS":16},{"CODSUBAREAS":156}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "tenis_y_especialidades_con_raqueta": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":454},{"CODAREAS":15},{"CODSUBAREAS":175}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "hipica": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":454},{"CODAREAS":15},{"CODSUBAREAS":379}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "motor": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":454},{"CODAREAS":15},{"CODSUBAREAS":268}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "otras_especialidades": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":454},{"CODAREAS":15},{"CODSUBAREAS":174}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "espacios_naturales": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":327},{"CODAREAS":16}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },
    "gimnasia_y_juegos_deportivos": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":253},{"CODAREAS":16}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },

    /**********************************/
    /* Salud y belleza                */
    /**********************************/

    "salud_y_belleza": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":159},{"CODAREAS":16}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },

    /**********************************/
    /* Golf                           */
    /**********************************/

    "golf": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODAREAS":16},{"VALORESINDICADORES":40}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },

    /**********************************/
    /* Ocio diurno                    */
    /**********************************/

    "ocio_diurno": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":152},{"CODAREAS":16}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },

    /**********************************/
    /* Compras                        */
    /**********************************/

    "compras": {
        "collection":"territoriales",
        "filters":{"$and":[{"CODSUBTIPOCONT":157},{"CODAREAS":16}]},
        "values":["HORARIO","MAPA", "MAPA_IFRAME","ACCESOS","CATEGORIA","CIERRE","CODCONTENIDO","CODLOCALIDAD","DATOS_INTERES","DESCRIPCION","DESCRIPCION_COMUN","DOCUMENTO","EMAIL","FAX","F_BAJA","F_FIN_NOV","F_FIN_PUB","F_INICIO_NOV","F_INICIO_PUB","F_REVISION","HORARIO","IMAGEN","TITULO","NOMBRE_SOCIAL","NOVEDAD","PALABRAS_CLAVE","PUBLICADO","SERV_PRINCIPALES","SUBTIPO_PRINCIPAL","TELEFONO","TITULO","VACACIONES","WEB_PROPIA","ZONA","DIRECCION"]
    },

    /**********************************/
    /* Aprende español                */
    /**********************************/

    "aprende_espanol": {
        "collection":"territoriales",
        "filters":{"CODCONTENIDO":{"$in":[null,6854]}},
        "values":["HORARIO","MAPA_IFRAME","MAPA","CODCONTENIDO","TITULO","ZONA","TELEFONO","FAX","WEB_PROPIA","DIRECCION","EMAIL","INDICADORES","IMAGEN","DESCRIPCION_COMUN","RECURSOS","CONTENIDOS_RELACIONADOS"]
    },

      /////////////////////////////////////////////////////////////////
     // Actividades                                                 //
    /////////////////////////////////////////////////////////////////
    "actividades": {
        "language": true,
        "collection": "actividades",
        "filters": {"CODAREAS": 16, "CODSUBTIPOCONT": 595},
        "values": ["TITULO", "TELEFONO", "CODCONTENIDO", "F_INICIO", "F_FIN", "IMAGEN", "DESCRIPCION_COMUN", "TAQUILLA", "ORGANIZACION", "DONDE", "PRECIO", "RECURSOS", "CONTENIDOS_RELACIONADOS"],
        "limit": 10
    },

      /////////////////////////////////////////////////////////////////
     // Galería                                                     //
    /////////////////////////////////////////////////////////////////
    "arona_360": {
        "collection": "recursos",
        "filters": {"TIPO": "Vista 360"},
        "values": ["TITULO", "HREF", "CODCONTENIDO", "IMAGEN"],
        "limit": 6
    },
    "videos": {
        "language": true,
        "collection": "descriptivos",
        "filters": {"CODSUBTIPOCONT": 441, "CODAREAS": 16},
        "values": ["TITULO", "RECURSOS", "CODCONTENIDO", "IMAGEN", "DESCRIPCION_COMUN"],
        "limit": 10
    },
    "albumes": {
        "collection": "descriptivos",
        "filters": {"CODSUBTIPOCONT": 290, "CODAREAS": 16},
        "values": ["TITULO", "HREF", "CODCONTENIDO", "IMAGEN", "DESCRIPCION_COMUN"],
        "limit": 10
    }
});
