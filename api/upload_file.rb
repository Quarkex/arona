#!/usr/bin/env ruby

require "cgi"
require 'json'

cgi = CGI.new("html4")
begin
    parameters = {}
    cgi.query_string.split('&').each do |querylet|
        if querylet != nil then
            parameter = querylet.split('=')
            parameters[parameter[0]] = parameter[1].split(',')
        end
    end if cgi.query_string != nil

    response = "json"
    if cgi.params.has_key? "response" then response = cgi.params["response"][0] unless cgi.params["response"] == nil end
    if parameters.has_key? "response" then response = parameters["response"][0] unless parameters["response"] == nil end

    type = "file"
    if cgi.params.has_key? "type" then type = cgi.params["type"][0] unless cgi.params["type"] == nil end
    if parameters.has_key? "type" then type = parameters["type"][0] unless parameters["type"] == nil end

    funcNum = 0
    if cgi.params.has_key? "CKEditorFuncNum" then funcNum = cgi.params["CKEditorFuncNum"][0].to_i unless cgi.params["CKEditorFuncNum"] == nil end
    if parameters.has_key? "CKEditorFuncNum" then funcNum = parameters["CKEditorFuncNum"][0].to_i unless parameters["CKEditorFuncNum"] == nil end

    url = ''

    output = {}
    output['uploaded'] = 0

    # directory where the uploaded files are saved.
    # Remember setting owner and group to www-data.
    case type
    when "file"
        base_dir = "/files/"
    when "image"
        base_dir = "/img/"
    when "ads"
        base_dir = "/img/ads/"
    when "banner"
        base_dir = "/img/banners/"
    when "event_poster"
        base_dir = "/img/events/"
    when "team_member"
        base_dir = "/img/team/"
    when "league_logo"
        base_dir = "/img/logos/leagues/"
    when "team_logo"
        base_dir = "/img/logos/teams/"
    when "article_image"
        base_dir = "/img/articles/"
    end

    if cgi.params.has_key? 'upload' then
        cgi.params["upload"].each do |file|

            url = base_dir + file.original_filename
            fileName = '..' + url

            begin
                File.open( fileName,"w"){|sf| sf.puts file.read }
                output['uploaded'] = 1
                output['fileName'] = file.original_filename
                output['url'] = url
            rescue Exception => e
                output['error'] = {}
                output['error']['message'] = e.message
            end

        end
    else
        output['error'] = {}
        output['error']['message'] = "No file uploaded"
    end

    case response
    when 'json'
        headers = "documentType=application/json; charset=utf-8"
        content = output.to_json
    when 'ckeditor'
        headers = ""
        content = '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction( ' + funcNum.to_s + ', "' + url + '" );</script>'
    end
    cgi.out(headers){content}
rescue Exception => e
    headers = "documentType=application/json; charset=utf-8"
    content = {"error": {"message": e.message}}
    cgi.out(headers){content.to_json}
end
