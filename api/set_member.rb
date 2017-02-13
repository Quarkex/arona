#!/usr/bin/env ruby

require "cgi"
require 'json'
require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'cbcanarias')
db = client.database
collection = client["team"]

cgi = CGI.new("html4")
begin
    $member = {}
    $id = nil
    $language = 'es'
    $image_name = nil
    $name = nil
    $type = nil
    $number = nil
    $seasons = nil
    $origin = nil
    $birthdate = nil
    $position = nil
    $height = nil
    $link = nil
    $image = nil
    cgi.params.keys.each do |param|
        case param
        when "ID"
            $id = cgi[param].to_i if cgi[param] != nil
        when "IDIOMA"
            $language = cgi[param] if cgi[param] != nil
        when "image_name"
            $image_name = cgi[param] if cgi[param] != nil and cgi[param] != ''
        when "name"
            $name = cgi[param] if cgi[param] != nil
        when "type"
            $type = cgi[param] if cgi[param] != nil
        when "number"
            $number = cgi[param].to_i if cgi[param] != nil
        when "seasons"
            $seasons = cgi[param].to_i if cgi[param] != nil
        when "origin"
            $origin = cgi[param] if cgi[param] != nil
        when "birthdate"
            $birthdate = cgi[param] if cgi[param] != nil
        when "position"
            $position = cgi[param] if cgi[param] != nil
        when "height"
            $height = cgi[param] if cgi[param] != nil
        when "link"
            $link = cgi[param] if cgi[param] != nil
        when "upload"
            $image = cgi[param] if cgi[param] != nil and cgi[param] != ''
        end
    end
    if $id != nil then
        $member = collection.find( { "ID": $id } ).first
    else
        $member['ID'] = collection.find().count + 1
    end
    $member['test'] = "foo"
    $member['IDIOMA'] = $language if $language != nil
    $member['name'] = $name if $name != nil
    $member['type'] = $type if $type != nil
    $member['number'] = $number if $number != nil
    $member['seasons'] = $seasons if $seasons != nil
    $member['origin'] = $origin if $origin != nil
    $member['birthdate'] = $birthdate if $birthdate != nil
    $member['position'] = $position if $position != nil
    $member['height'] = $height if $height != nil
    $member['link'] = $link if $link != nil

    if $image != nil and $image_name != nil then
        fileName = "../img/team/" + $image_name + File.extname($image.original_filename)
        File.open( fileName,"w"){|sf| sf.puts $image.read }
    end

    collection.find_one_and_update({ ID: $member['ID']}, { "$set" => $member}, :upsert => true)

    puts cgi.header("status" => "REDIRECT", "Location"=>'/#/es/equipo')
rescue Exception => e
    headers = "documentType=application/json; charset=utf-8"
    content = {"error": {"message": e.message, "backtrace": e.backtrace, "object_status": $image.inspect}}
    cgi.out(headers){content.to_json}
end
