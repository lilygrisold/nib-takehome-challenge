require 'faraday'
require 'json'

class MealDbClient

    BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

    class Error < StandardError; end
    class ApiError < Error; end
    class NotFoundError < Error; end

    def self.search(query)
        new.search(query)
    end

    def self.random
        new.random
    end

    def self.find(id)
        new.find(id)
    end

    def search(query)
        return [] if query.blank?
        response = connection.get('search.php', { s: query })
        handle_response(response)['meals'] || []

    rescue Faraday::Error => e
        Rails.logger.error "MealDB search error: #{e.message}"
        raise ApiError, "Failed to search recipes: #{e.message}"
    end

    def random
        response = connection.get('random.php')
        meals = handle_response(response)['meals']
        meals&.first

    rescue Faraday::Error => e
        Rails.logger.error "MealDB random error: #{e.message}"
        raise ApiError, "Failed to fetch random recipe: #{e.message}"
    end

    def find(id)
        response = connection.get('lookup.php', { i: id })
        meals = handle_response(response)['meals']
        
        if meals.nil? || meals.empty?
            raise NotFoundError, "Recipe not found with ID: #{id}"
        end

        meals.first

    rescue Faraday::Error => e
        Rails.logger.error "MealDB lookup error: #{e.message}"
        
    raise ApiError, "Failed to fetch recipe: #{e.message}"
    end

private

    def connection
        puts "DEBUG: BASE_URL constant = #{BASE_URL.inspect}"
        puts "DEBUG: Creating connection with URL: #{BASE_URL.inspect}"
        @connection ||= Faraday.new(url: BASE_URL) do |faraday|
            faraday.request :url_encoded
            faraday.response :raise_error
            faraday.adapter Faraday.default_adapter
            faraday.options.timeout = 10
            faraday.options.open_timeout = 5
        end
        puts "DEBUG: Connection base_url = #{@connection.url_prefix.inspect}"
        @connection
    end

    def handle_response(response)
        unless response.success?
            raise ApiError, "API request failed with status
                #{response.status}"
        end

        JSON.parse(response.body)

    rescue JSON::ParserError => e
        raise ApiError, "Invalid JSON response: #{e.message}"
    end
end