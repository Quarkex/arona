image_folder = '../img/' + $parameters['collection'] + '/' + @doc['id'].to_s
if Dir.exist?(image_folder) then
    output = []
    Dir.glob(image_folder + '/main.{jpg,png}').each do | file |
        basename = File.basename(file)
        output.push 'img/' + $parameters['collection'] + '/' + @doc['id'].to_s + '/' + basename
    end
    @custom_value = output.size == 0 ? nil : output[0]
else
    @custom_value = nil
end
