if @doc.keys.include?('CODIGOSINDICADORES')\
    && @doc.keys.include?('VALORESINDICADORESLISTA')\
    && @doc.keys.include?('ETIQUETAINDICADORES')\
    && @doc.keys.include?('VALORESINDICADORES')\
    then
    def slugify( string )
        string = string.to_s.downcase
        string.gsub!(/[ ]+/, "_")
        string.gsub!(/á/, 'a')
        string.gsub!(/é/, 'e')
        string.gsub!(/í/, 'i')
        string.gsub!(/ó/, 'o')
        string.gsub!(/ú/, 'u')
        string.gsub!(/ñ/, 'n')
        string
    end

    def buildIndicators( doc )
        indicadores = {}
        codigosindicadores      = doc["CODIGOSINDICADORES"]     == nil ? '' : doc["CODIGOSINDICADORES"]
        etiquetaindicadores     = doc["ETIQUETAINDICADORES"]    == nil ? '' : doc["ETIQUETAINDICADORES"]
        valoresindicadoreslista = doc["VALORESINDICADORESLISTA"]== nil ? '' : doc["VALORESINDICADORESLISTA"]
        valoresindicadores      = doc["VALORESINDICADORES"]     == nil ? '' : doc["VALORESINDICADORES"]

        codigosindicadores      = codigosindicadores.split('&')      if not codigosindicadores.kind_of?(Array)
        etiquetaindicadores     = etiquetaindicadores.split('&')     if not etiquetaindicadores.kind_of?(Array)
        valoresindicadoreslista = valoresindicadoreslista.split('&') if not valoresindicadoreslista.kind_of?(Array)
        valoresindicadores      = valoresindicadores.split('&')      if not valoresindicadores.kind_of?(Array)

        if codigosindicadores != nil and etiquetaindicadores != nil then
            etiquetaindicadores.each_with_index do | key, j |
                indicadores[slugify key] = {"code": codigosindicadores[j], "contents": [] } if indicadores != nil
            end
            if valoresindicadores != nil and valoresindicadoreslista != nil then
                valoresindicadores.each_with_index do | valor, j |
                    key = slugify etiquetaindicadores[j]
                    label = slugify valoresindicadoreslista[j]
                    indicador = {"code": valor.to_i, "label": label }
                    indicadores[key][:contents].push(indicador) if indicadores[key] != nil
                end
            end
        else
            indicadores = nil
        end
        indicadores
    end

    @custom_value = buildIndicators @doc
else
    @custom_value = nil
end
