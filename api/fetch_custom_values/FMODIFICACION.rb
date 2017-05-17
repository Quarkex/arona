@custom_value = @doc[@value].iso8601 if @doc[@value] != DateTime.parse("9999-12-30 00:00:00 UTC")
