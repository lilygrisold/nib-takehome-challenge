require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
  config.hook_into :webmock
  config.ignore_localhost = true
  
  # Hide API keys if you add any later
  config.filter_sensitive_data('<API_KEY>') { ENV['MEALDB_API_KEY'] }
  
  # Allow tests to explicitly allow real HTTP for new endpoints
  config.allow_http_connections_when_no_cassette = false
end