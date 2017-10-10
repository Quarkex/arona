image_folder = '../img/' + $parameters['collection'] + '/' + @doc['id'].to_s
if Dir.exist?(image_folder) then
    output = []
    Dir.glob(image_folder + '/*.{jpg,png}').each do | file |
        basename = File.basename(file)
        output.push('img/' + $parameters['collection'] + '/' + @doc['id'].to_s + '/' + basename) unless basename == 'main.jpg' or basename == 'main.png'
    end
    @custom_value = output.size == 0 ? nil : output.sort
else
    @custom_value = nil
end
