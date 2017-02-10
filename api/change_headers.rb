#!/usr/bin/env ruby

require "cgi"
require 'json'
require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

cgi = CGI.new("html4")
begin
    $lines = []
    if cgi.params.has_key? 'line' then
        $id = 0
        cgi.params["line"].each do |line|
            if line != '' then
                $id = $id + 1
                $object = { "content": line, "IDIOMA": "es", "ID": $id }
                $lines.push $object
            end
        end
    end

    if $lines.count > 0 then
        client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'cbcanarias')
        db = client.database
        collection = client["slider"]

        collection.drop
        collection.insert_many($lines)
    end

    puts cgi.header("status" => "REDIRECT", "Location"=>'/')
rescue Exception => e
    headers = "documentType=application/json; charset=utf-8"
    content = {"error": {"message": e.message, "backtrace": e.backtrace}}
    cgi.out(headers){content.to_json}
end
