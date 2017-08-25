if @doc.keys.include?('CODIGOSINDICADORES')\
    && @doc.keys.include?('NOMBRESINDICADORESLISTA')\
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
        nombresindicadoreslista = doc["NOMBRESINDICADORESLISTA"]== nil ? '' : doc["NOMBRESINDICADORESLISTA"]
        valoresindicadoreslista = doc["VALORESINDICADORESLISTA"]== nil ? '' : doc["VALORESINDICADORESLISTA"]
        valoresindicadores      = doc["VALORESINDICADORES"]     == nil ? '' : doc["VALORESINDICADORES"]

        codigosindicadores      = codigosindicadores.to_s               if not codigosindicadores.kind_of?(String) and not codigosindicadores.kind_of?(Array)
        codigosindicadores      = codigosindicadores.split('&')         if not codigosindicadores.kind_of?(Array)
        codigosindicadores      = codigosindicadores[0].split(';')      if codigosindicadores.size == 1

        etiquetaindicadores     = etiquetaindicadores.to_s              if not etiquetaindicadores.kind_of?(String) and not etiquetaindicadores.kind_of?(Array)
        etiquetaindicadores     = etiquetaindicadores.split('&')        if not etiquetaindicadores.kind_of?(Array)
        etiquetaindicadores     = etiquetaindicadores[0].split(';')     if etiquetaindicadores.size == 1

        nombresindicadoreslista = nombresindicadoreslista.to_s          if not nombresindicadoreslista.kind_of?(String) and not nombresindicadoreslista.kind_of?(Array)
        nombresindicadoreslista = nombresindicadoreslista.split('&')    if not nombresindicadoreslista.kind_of?(Array)
        nombresindicadoreslista = nombresindicadoreslista[0].split(';') if nombresindicadoreslista.size == 1

        valoresindicadoreslista = valoresindicadoreslista.to_s          if not valoresindicadoreslista.kind_of?(String) and not valoresindicadoreslista.kind_of?(Array)
        valoresindicadoreslista = valoresindicadoreslista.split('&')    if not valoresindicadoreslista.kind_of?(Array)
        valoresindicadoreslista = valoresindicadoreslista[0].split(';') if valoresindicadoreslista.size == 1

        valoresindicadores      = valoresindicadores.to_s               if not valoresindicadores.kind_of?(String) and not valoresindicadores.kind_of?(Array)
        valoresindicadores      = valoresindicadores.split('&')         if not valoresindicadores.kind_of?(Array)
        valoresindicadores      = valoresindicadores[0].split(';')      if valoresindicadores.size == 1

        if codigosindicadores != nil and etiquetaindicadores != nil then
            etiquetaindicadores.each_with_index do | key, j |
                indicadores[slugify key] = {"code": codigosindicadores[j], "contents": [] } if indicadores != nil
            end
            if valoresindicadores != nil and valoresindicadoreslista != nil then
                valoresindicadores.each_with_index do | valor, j |
                    key = slugify etiquetaindicadores[j]
                    label = valoresindicadoreslista[j]
                    image = slugify nombresindicadoreslista[j]
                    valor = [valor] if not valor.kind_of? Array
                    indicador = {"code": valor[j].to_i, "label": label, "image": '/img/icons/logo-' + key.gsub('_', '-') + '-' + image + '.svg' }
                    indicadores[key][:contents].push(indicador) if indicadores[key] != nil
                end
            end
        else
            indicadores = nil
        end
        indicadores
    end

    output = buildIndicators @doc

    @custom_value = output.empty? ? nil : output
else
    @custom_value = nil
end
