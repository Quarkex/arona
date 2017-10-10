if @doc.has_key? 'CODCONTENIDOSRELACIONADOS' then
    doc_elements = @doc['CODCONTENIDOSRELACIONADOS']

    if doc_elements.is_a? String then
        doc_elements = doc_elements.split '&'
        doc_elements.map! { |i| i.to_i }
    elsif doc_elements.is_a? Integer then
        doc_elements = [doc_elements]
    end
    doc_elements = [] if doc_elements == nil
    doc_elements.map! { |i|
        element = nil
        $db.collections.each do | collection |
            element = collection.find({ "IDIOMA": "es", "CODCONTENIDO": i, "MULTIIDIOMA": 1, "F_INICIO_PUB": {"$lt": DateTime.now}, "F_FIN_PUB": {"$gte": DateTime.now} }).sort("CODCONTENIDO" => -1).first
            element = collection.find({ "IDIOMA": @doc["IDIOMA"], "CODCONTENIDO": i, "F_INICIO_PUB": {"$lt": DateTime.now}, "F_FIN_PUB": {"$gte": DateTime.now} }).sort("CODCONTENIDO" => -1).first if element == nil
            if element != nil
                element['COLLECTION'] = collection.name
                break
            end
        end

        if element.has_key? 'IMAGEN' then
            image = $resources.find({ "IDIOMA": "es", "CODRECURSO": element['IMAGEN'], "MULTIIDIOMA": 1, "F_INICIO_PUB": {"$lt": DateTime.now}, "F_FIN_PUB": {"$gte": DateTime.now} }).sort("RECURSO" => -1).first
            image = $resources.find({ "IDIOMA": @doc["IDIOMA"],"CODRECURSO": element['IMAGEN'], "F_INICIO_PUB": {"$lt": DateTime.now}, "F_FIN_PUB": {"$gte": DateTime.now} }).sort("RECURSO" => -1).first if image == nil
            element['IMAGEN'] = image == nil ? nil : image["RECURSO"]
        end unless element == nil

        element
    }
    doc_elements = nil if doc_elements.size == 0

    availible_elements = []
    doc_elements.each do | element |
        availible_elements.push(element) unless element == nil
    end if doc_elements != nil
    availible_elements = nil if availible_elements.size == 0

    @custom_value = availible_elements
end
