if @doc.has_key? 'COD' + @value then
    doc_resources = @doc['COD' + @value]

    if doc_resources.is_a? String then
        doc_resources = doc_resources.split '&'
        doc_resources = doc_resources[0].split ';' if doc_resources.size == 1
        doc_resources.map! { |i| i.to_i }
    elsif doc_resources.is_a? Integer then
        doc_resources = [doc_resources]
    end
    doc_resources = [] if doc_resources == nil
    doc_resources.map! { |i|
        resource = $resources.find({ "IDIOMA": "es", "CODRECURSO": i, "MULTIIDIOMA": 1, "F_INICIO": {"$lt": DateTime.now}, "F_FIN": {"$gte": DateTime.now} }).sort("RECURSO" => -1).first
        resource = $resources.find({ "IDIOMA": @doc["IDIOMA"], "CODRECURSO": i, "F_INICIO": {"$lt": DateTime.now}, "F_FIN": {"$gte": DateTime.now} }).sort("RECURSO" => -1).first if resource == nil
        resource
    }
    doc_resources = nil if doc_resources.size == 0

    availible_resources = []
    doc_resources.each do | resource |
        availible_resources.push(resource) unless resource == nil
    end if doc_resources != nil
    availible_resources = nil if availible_resources.size == 0

    @custom_value = availible_resources
end
