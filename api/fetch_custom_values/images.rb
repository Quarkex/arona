image_folder = '../img/' + $parameters['collection'] + '/' + @doc['id'].to_s
if Dir.exist?(image_folder) then
    require 'base64'
    output = []
    Dir.glob(image_folder + '/*.{jpg,png}').each do | file |
        basename = File.basename(file)
        mimetype = IO.popen(["file", "--brief", "--mime-type", file], in: :close, err: :close) { |io| io.read.chomp }
        output.push( 'data:' + mimetype + ';base64,' + Base64.encode64( File.open(file, "rb").read) )
    end
    @custom_value = output.size == 0 ? nil : output.sort
else
    @custom_value = nil
end
