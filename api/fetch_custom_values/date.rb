@custom_value = @doc[@value] if @doc[@value] != nil and @doc[@value] != DateTime.parse("9999-12-30 00:00:00 UTC")
@custom_value = @custom_value.iso8601 if @custom_value.respond_to? :iso8601
