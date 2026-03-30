module Api
    module V1
        class RecipesController < ApplicationController
            rescue_from MealDbClient::NotFoundError, with: :not_found
            rescue_from MealDbClient::ApiError, with: :api_error
        def search
            query = params[:query]
        if query.blank?
            return render json: { error: 'Query parameter is required' }, status: :bad_request
        end

        recipes = MealDbClient.search(query)
            render json: { recipes: recipes.map { |r| serialize_recipe(r) } }
        end

        def random
            recipe = MealDbClient.random

            if recipe.nil?
                return render json: { error: 'No recipe found' },status: :not_found
            end

            render json: { recipe: serialize_recipe(recipe) }
        end

        def show
            id = params[:id]

            if id.blank?
            return render json: { error: 'ID parameter is required' }, status: :bad_request
            end

            recipe = MealDbClient.find(id)
            render json: { recipe: serialize_recipe(recipe) }
        end

    private

        def serialize_recipe(recipe)
            return nil if recipe.nil?
            {
                id: recipe['idMeal'],
                title: recipe['strMeal'],
                category: recipe['strCategory'],
                area: recipe['strArea'],
                instructions: recipe['strInstructions'],
                image: recipe['strMealThumb'],
                youtube: recipe['strYoutube'],
                source: recipe['strSource'],
                ingredients: extract_ingredients(recipe)
            }
        end

        def extract_ingredients(recipe)
            ingredients = []

            (1..20).each do |i|
                ingredient = recipe["strIngredient#{i}"]
                measure = recipe["strMeasure#{i}"]

                break if ingredient.blank?
                    ingredients << {
                    name: ingredient.strip,
                    measure: measure&.strip
                    }
                end

                ingredients
        end

        def not_found(error)
            render json: { error: error.message }, status: :not_found
        end

        def api_error(error)
            Rails.logger.error "API Error: #{error.message}"
            render json: { error: 'External API error. Please try again later.' }, status: :service_unavailable
        end
        end
    end
end