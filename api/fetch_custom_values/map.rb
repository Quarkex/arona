def generate_map()
    output = nil
    if @doc['address'] != nil then
        require 'base64'
        require 'open-uri'
        api_key = $config["google_maps_api"]

        map = { 'address': @doc['address'] }

        coordinates = JSON.parse(
            open(
                'https://maps.googleapis.com/maps/api/geocode/json?' +
                'key=' + api_key +
                '&' +
                'address=' + CGI.escape(@doc['address'].to_s),
                "rb").read
        )

        if coordinates["results"] != nil and coordinates["results"].size > 0 then
            coordinates = coordinates["results"][0]["geometry"]["location"]
            coordinates = [coordinates["lat"],coordinates["lng"]]
        else
            coordinates = nil
        end

        map[:image_url] = "https://maps.googleapis.com/maps/api/staticmap?" +
            "zoom=" + "14" +
            '&' +
            "size=" + "602x400" +
            '&' +
            "key=" + api_key +
            '&' +
            "center=" + ( coordinates == nil ? CGI.escape(@doc['address'].to_s) : coordinates.join(',') ) #+
            #+ '&' +
            #&markers=size:mid%7Ccolor:0xff0000%7C' +
            #'label:' + CGI.escape(@doc['address'].to_s) + '%7C' +
            # ( coordinates == nil ? CGI.escape(@doc['address'].to_s) : coordinates.join(',') )

        map[:iframe_url] = "https://www.google.com/maps/embed/v1/view?" +
            "key=" + api_key +
            '&' +
            "zoom=" + "14" +
            '&' +
            "center=" + ( coordinates == nil ? CGI.escape(@doc['address'].to_s) : coordinates.join(',') )

        map[:coordinates] = coordinates if coordinates != nil

        begin
            map[:mimetype] = 'image/png'
            map[:encoding] = 'base64'
            map[:image]    = Base64.encode64( open(map[:image_url], "rb").read ).to_s.chomp.gsub(/[\s]+/, ' ')
        rescue Exception => e
            map[:mimetype] = nil
            map[:encoding] = nil
            map[:image]    = nil
        end

        @doc['map'] = map

        output = map
    end
    output
end

@map = nil
if @doc.has_key? 'map' then
    if @doc[:map][:address].to_s != @doc['address'].to_s then
        @map = generate_map
        $db[$parameters['collection']].update_one({ "_id": @doc["_id"] }, {"$set": {"map": @map}})
    else
        @map = @doc['map']
        if @map[:image] == nil then
            @map = generate_map
        end
    end
else
    @map = generate_map unless @doc['address'] == nil
end

if (@map != nil) then
    if @map[:iframe_url] != nil && @map[:iframe_url] != "" then
        @custom_value = @map[:iframe_url].to_s
    else
        params = ['q=' + CGI.escape(@doc['address'].to_s)]
        params.push('key=' + $config["google_maps_api"].to_s) if $config["google_maps_api"] != nil
        @custom_value = 'https://www.google.com/maps/embed/v1/place?' + params.join('&')
    end
else
    @custom_value = nil
end
