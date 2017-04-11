if @doc.has_key? 'COD' + @value then
    doc_resources = @doc['COD' + @value]

    if doc_resources.is_a? String then
        doc_resources = doc_resources.split '&'
        doc_resources.map! { |i| i.to_i }
    elsif doc_resources.is_a? Int then
        doc_resources = [doc_resources]
    end
    doc_resources.map! { |i|
        resource = $resources.find({ "IDIOMA": "es", "CODRECURSO": i, "MULTIIDIOMA": 1 }).sort("RECURSO" => -1).first
        resource = $resources.find({ "IDIOMA": @doc["IDIOMA"], "CODRECURSO": i }).sort("RECURSO" => -1).first if resource == nil
        resource
    }
    doc_resources = nil if doc_resources.size == 0

    @custom_value = doc_resources
end
