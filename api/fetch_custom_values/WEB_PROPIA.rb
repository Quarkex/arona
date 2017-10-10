if @doc.has_key? @value then
    resource = $resources.find({ "CODRECURSO": @doc[@value] }).sort("RECURSO" => -1).first
    if resource == nil then
        resource = nil
    else
        resource = nil if resource["RECURSO"] == -1
    end
    @custom_value = resource == nil ? nil : resource["RECURSO"]
end
