if @doc.has_key? @value then
    resource = $resources.find({ "CODRECURSO": @doc[@value] }).sort("RECURSO" => -1).first
    resource = nil if resource["RECURSO"] == -1
    @custom_value = resource == nil ? nil : resource["RECURSO"]
end
