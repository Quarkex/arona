if @doc[@value] != nil and @doc[@value].kind_of? String then
    @custom_value = @doc[@value]
else
    require 'nokogiri'
    output = Nokogiri::HTML(@doc['content']).text
    if output.length > 450 then
        output = output.slice(0, 449)
        output = output.split(' ');
        output = output.join(' ');
        output = output + '…'
    end
    @custom_value = output
end
