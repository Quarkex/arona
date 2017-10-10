address = ""
chunks = [ "TIPO_VIA", "NOMBRE_VIA", "NUMERO", "BLOQUE", "PORTAL", "ESCALERA", "PLANTA", "PUERTA", "LOCAL", "CODIGO_POSTAL", "ZONA" ]

chunks.each do | chunk |
    if @doc.has_key? chunk and @doc[chunk] != nil then
        address = address + ",+" if not address == "" unless chunk == "CODIGO_POSTAL" or chunk == "NOMBRE_VIA"
        address = address + "+"  if chunk == "NOMBRE_VIA" or chunk == "CODIGO_POSTAL" unless address == ""
        address = address + @doc[chunk].to_s.gsub(' ', '+')
        #address = CGI::escape address
    end
end

@custom_value = "https://www.google.es/maps/place/" + address if address != ""
