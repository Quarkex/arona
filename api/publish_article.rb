#!/usr/bin/env ruby

require "cgi"
require 'json'
require 'date'
require 'mongo'

begin
    Mongo::Logger.logger.level = ::Logger::FATAL

    client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'cbcanarias')

    db = client.database
    cgi = CGI.new("html4")

    collection = client["articles"]
    collection.indexes.create_one( { :id => -1 }, unique: true )

    $doc = {}

    if cgi.params.has_key? 'id' then
        $doc['id'] = cgi['id'].to_i
    else
        $last_db_id = collection.find().sort({"id": -1}).first['id'].to_i
        $doc['id'] = $last_db_id + 1
    end

    target = '/#/es/noticias/' + $doc['id'].to_s

    if cgi.params.has_key? 'year' and cgi.params.has_key? 'month' and cgi.params.has_key? 'day' then
        if cgi['year'] != '' and cgi['month'] != '' and cgi['day'] != '' then
            $current_time = Time.now.strftime("%H:%M:%S")
            $date = cgi['year'].to_s + '-' + cgi['month'].to_s + '-' + cgi['day'].to_s + 'T' + $current_time + 'Z'
            $doc['date'] = $date
        end
    end

    if cgi.params.has_key? 'event' then
        $doc['event'] = cgi['event'] == 'on' ? true : false
    else
        $doc['event'] = false
    end

    if cgi.params.has_key? 'title' then
        $doc['title'] = cgi['title'] unless cgi['title'] == ""
    end

    if cgi.params.has_key? 'video' then
        $doc['video'] = cgi['video'] unless cgi['video'] == ""
    end

    if cgi.params.has_key? 'excerpt' then
        $doc['excerpt'] = cgi['excerpt'] unless cgi['excerpt'] == ""
    end

    if cgi.params.has_key? 'content' then
        $doc['content'] = cgi['content'] unless cgi['content'] == ""
    end

    if cgi.params.has_key? 'article_image' then
        cgi.params["article_image"].each do |file|
            url = '/img/articles/' + file.original_filename
            fileName = '..' + url

            File.open( fileName,"w"){|sf| sf.puts file.read }
            $doc['image'] = url
        end unless cgi["article_image"] == ''
    end

    if cgi.params.has_key? 'event_image' then
        cgi.params["event_image"].each do |file|
            url = '/img/events/' + $doc['id'].to_s + '.png'
            fileName = '..' + url

            File.open( fileName,"w"){|sf| sf.puts file.read }
        end unless cgi["event_image"] == ''
    end

    $doc['IDIOMA'] = 'es'

    collection.find_one_and_update({ id: $doc['id']}, { "$set" => $doc}, :upsert => true)

    puts cgi.header("status" => "REDIRECT", "Location"=>target)
rescue Exception => e
    headers = "documentType=application/json; charset=utf-8"
    content = {"error": {"message": e.message, "backtrace": e.backtrace}}
    cgi.out(headers){content.to_json}
end
