address = ""
chunks = [ "TIPO_VIA", "NOMBRE_VIA", "NUMERO", "BLOQUE", "PORTAL", "ESCALERA", "PLANTA", "PUERTA", "LOCAL", "CODIGO_POSTAL" ]

chunks.each do | chunk |
    if @doc.has_key? chunk and @doc[chunk] != nil then
        address = address + ",+" if not address == "" unless chunk == "CODIGO_POSTAL" or chunk == "NOMBRE_VIA"
        address = address + "+"  if chunk == "NOMBRE_VIA" or chunk == "CODIGO_POSTAL" unless address == ""
        address = address + @doc[chunk].to_s.gsub(' ', '+')
        #address = CGI::escape address
    end
end

api_key = $config["google_maps_api"] == nil ? nil : $config["google_maps_api"]
query = []
query.push "key=" + api_key if api_key != nil
query.push "q=" + address if address != nil
query = query.join('&')
map = "https://www.google.com/maps/embed/v1/place?" + query

@custom_value = '<iframe width="600" height="450" frameborder="0" style="border:0" src="' + map + '" allowfullscreen></iframe>' if address != ""
