if @doc.has_key? "video" then
    figure = @doc["video"]
    #figure = '<iframe src="' + figure + '" allowfullscreen="" width="300" height="230" frameborder="0"></iframe>'
    src =  figure.split('?')[0].gsub!('www.youtube.com', 'img.youtube.com').gsub!('embed', 'vi') + '/0.jpg'
    figure = '<a href="' + figure + '" target="_blank"><img src="' + src + '" style="width: 100%;"></a>'
    figure = '<div style="width: 100%;">' + figure + '</div>'
else
    if @doc.has_key? "image" then
        figure = '<div style="width: 100%;"><img src="' + @doc['image'] + '" style="width: 100%;"></div>'
    else
        figure = '<div style="width: 100%;"><img src="img/default_horizontal.png" style="width: 100%;"></div>'
    end
end
figure = '<div class="flex-video">' + figure + '</div>'

@custom_value = figure
