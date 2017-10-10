def load_image()
    output = nil
    if Dir.exist?(@image_folder) then
        path = Dir.glob(@image_folder + '/main.{png,jpg}').first
        if path != nil then
            require 'base64'

            path = 'img/' + $parameters['collection'] + '/' + @doc['id'].to_s + '/' + File.basename(path)

            image = {
                'filename': File.basename(path),
                'path': path,
                'mimetype': IO.popen(["file", "--brief", "--mime-type", '../' + path], in: :close, err: :close) { |io| io.read.chomp },
                'encoding': 'base64',
                'last_modified': File.mtime('../' + path).utc,
                'data': Base64.encode64( File.open('../' + path, "rb").read )
            }

            @doc['image'] = image
            $db[$parameters['collection']].update_one({ "_id": @doc["_id"] }, {"$set": {"image": image}})

            output = image
        end
    end
    output
end

@image_folder = '../img/' + $parameters['collection'] + '/' + @doc['id'].to_s
@image_path = Dir.glob(@image_folder + '/main.{png,jpg}').first
@image_last_modified = File.mtime(@image_path).utc

@image = nil
if @doc.has_key? 'image' then
    @image = @doc['image']
    @image = load_image if @image[:last_modified].to_s != @image_last_modified.to_s
else
    @image = load_image
end
@image = ('data:' + @image[:mimetype].to_s + ';' + @image[:encoding].to_s + ',' + @image[:data].to_s ) if @image != nil
@custom_value = (@image == nil) ? nil : @image
