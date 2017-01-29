#!/usr/bin/env ruby

require 'json'
require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'cbcanarias')
db = client.database

collection = client["articles"]

doc = {}
doc["id"] = 'iberostar'
doc["IDIOMA"] = 'es'
doc["title"] = 'El Iberostar Tenerife montará este sábado su tienda oficial en el Pabellón de Las Torres'
doc["tags"] = []
doc["date"] = '2016-09-02T00:00:00Z'
doc["event"] = false
doc["excerpt"] = '<p>El Iberostar Tenerife montará este sábado su tienda oficial en el Pabellón de Las Torres, en Adeje, coincidiendo con la disputa del amistoso ante el Herbalife Gran Canaria (20:30 horas). El club canarista pondrá a la venta la nueva equipación oficial Austral Sport para la temporada 2016-17, amén de un outlet con promociones varias, que incluirá prendas como la camiseta casual.</p>'
doc["content"] = '
<p>El Iberostar Tenerife montará este sábado su tienda oficial en el Pabellón de Las Torres, en Adeje, coincidiendo con la disputa del amistoso ante el Herbalife Gran Canaria (20:30 horas). El club canarista pondrá a la venta la nueva equipación oficial Austral Sport para la temporada 2016-17, amén de un outlet con promociones varias, que incluirá prendas como la camiseta casual.</p>

<p>La nueva equipación oficial, tanto la versión en negro como la amarilla, se pondrá a la venta con un precio de 39,95 euros para público en general; mientras que los abonados podrán adquirirla con un 5% de descuento (37,95 euros). La camisa oficial de juego estará igualmente a la venta desde este lunes día 5 en la sede del Santiago Martín (en el hall), en el horario habitual de atención al público, esto es, de lunes a viernes, de 10 a 14 y de 17 a 20 horas.</p>
'


collection.insert_one(doc)

