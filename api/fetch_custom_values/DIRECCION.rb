address = ""
chunks = [ "TIPO_VIA", "NOMBRE_VIA", "NUMERO", "BLOQUE", "PORTAL", "ESCALERA", "PLANTA", "PUERTA", "LOCAL", "CODIGO_POSTAL", "ZONA" ]

chunks.each do | chunk |
    if @doc.has_key? chunk and @doc[chunk] != nil and @doc[chunk] != -1 then
        chunk = chunk.to_s
        address = address + ", " if not address == "" unless chunk == "CODIGO_POSTAL" or chunk == "NOMBRE_VIA"
        address = address + " "  if chunk == "NOMBRE_VIA" unless address == ""
        address = address + ". " if chunk == "CODIGO_POSTAL" unless address == ""
        address = address + @doc[chunk].to_s
    end
end

@custom_value = address if address != ""
