#!/usr/bin/env ruby
require 'net/http'
require 'uri'
require 'json'

string = '{ "collection": "noticias", "filters": [{"IDIOMA":"es","CODCONTENIDO":71907}], "values": [{"IDIOMA":"es","CODCONTENIDO":71907,"CODSUBTIPOCONT":"349","SUBTIPO":"Inscripciones / Solicitudes","CODCATEGORIA":-1,"CATEGORIA":"-1","IMAGEN":5576,"WEB_PROPIA":-1,"DOCUMENTO":-1,"CODZONA":-1,"ZONA":"-1","F_INICIO_PUB":"20160419130300","F_FIN_PUB":"20170419130300","F_REVISION":null,"F_BAJA":null,"NOVEDAD":0,"F_INICIO_NOV":"00000000000000","F_FIN_NOV":"99999999999999","CODPROPIETARIO":10,"NOMBRE":"Prensa","TITULO":"Ampliación del plazo de inscripciones para Examinar a los aspirantes a obtener el Permiso Municipal de Conducción de Auto Taxi","DESCRIPCION_COMUN":"<p><strong>Inscripciones.</strong></p><ul><li>Modelo 227.</li><li>Plazo: <strong>del&#160;18 al&#160;22&#160;de abril&#160;</strong>de 2016, ambos inclusive.</li><li>Lugar: Oficinas de Atención Ciudadana del Ayuntamiento de Arona.</li></ul>","DATOS_INTERES":null,"PALABRAS_CLAVE":null,"PUBLICADO":-1,"REF_VPORTAL":71906,"TIPO":0,"ORDEN":1,"F_PUB_ORIGINAL":"20160419130300","TITULO_CORTO":"Del 18 al 22 de abril de 2016, ambos inclusive.","RESUMEN":"<p>La concejalía de Transportes del Ayuntamiento de Arona informa de que se<strong> amplia</strong> el plazo de inscripción para el procedimiento que se desarrollará por el Ayuntamiento de Arona para examinar a los aspirantes a obtener el Permiso Municipal de Conducción de Vehículos Auto Taxi.</p>","FUENTE":null,"CODIGOSINDICADORES":null,"ETIQUETAINDICADORES":null,"VALORESINDICADORESLISTA":null,"VALORESINDICADORES":null,"CODAREAS":"44","AREAS":"Transportes y Servicios","CODSUBAREAS":"369","SUBAREAS":"Taxis","SUBTIPOS":null,"CODRECURSOS":"35866","CODCONTENIDOSRELACIONADOS":"15875","CODSECTORESPOBLACION":null,"SECTORESPOBLACION":null,"FMODIFICACION":"20160419132550"}] }'

def aronaAPI( action, body_object )
    output = nil
    uri = URI.parse("http://dev.arona/api/#{action}.json")

    # Create the HTTP objects
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri, {'Content-Type': 'text/json'})
    request.body = body_object.to_json

    # Send the request
    response = http.request(request)

    if response.kind_of? Net::HTTPSuccess then
        output = JSON.parse(response.body)
    else
        output = response.body
    end

    output
end

response = aronaAPI "setter", JSON.parse(string)

puts response

system ("ruby setter.json '" + string + "'")
