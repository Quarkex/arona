if @doc.has_key? @value then
    resource = $resources.find({ "IDIOMA": "es", "CODRECURSO": @doc[@value] }).sort("RECURSO" => -1).first
    resource = $resources.find({ "CODRECURSO": @doc[@value] }).sort("RECURSO" => -1).first if resource == nil
    @custom_value = resource == nil ? nil : resource["RECURSO"]
end
