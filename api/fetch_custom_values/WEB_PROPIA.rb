if @doc.has_key? @value then
    resource = $resources.find({ "CODRECURSO": @doc[@value] }).sort("RECURSO" => -1).first
    @custom_value = resource == nil ? nil : resource["RECURSO"]
end
