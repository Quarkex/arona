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

api_key = "AIzaSyCZgh8qgEhKEsZNchyy3bBjIXoZxWHPlH0"
map = "https://www.google.com/maps/embed/v1/place?key=" + api_key + "&q=" + address

@custom_value = '<iframe width="600" height="450" frameborder="0" style="border:0" src="' + map + '" allowfullscreen></iframe>' if address != ""
