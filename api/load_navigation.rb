#!/usr/bin/env ruby

require 'json'
require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'cbcanarias')
db = client.database

collection = client["navigation"]

doc = {
    "inicio": {"href": "/"},
    "noticias": {"href": "/noticias"},
    "el_club": {"href": "/el_club"},
    "equipo": {"href": "/equipo"},
    "cantera": {"href": "/cantera"},
    "boletin_digital": {"href": "/boletin_digital"},
    "patrocinadores": {"href": "/patrocinadores"},
    "tienda": {"href": "/tienda"},
    "calendario": {"href": "/calendario", "position": "right"}
}

collection.insert_one(doc)
