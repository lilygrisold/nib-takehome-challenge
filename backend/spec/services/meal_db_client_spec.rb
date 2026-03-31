require 'rails_helper'

RSpec.describe MealDbClient, type: :service do
  let(:client) { described_class.new }
  
  describe '#search' do
    it 'returns meals matching the query', :vcr do
      results = client.search('beef')
      
      expect(results).not_to be_empty
      expect(results.first).to have_key('strMeal')
    end
    
    it 'returns empty array for no matches', :vcr do
      results = client.search('xyznonexistent')
      
      expect(results).to eq([])
    end
  end
  
  describe '#random' do
    it 'returns a random meal', :vcr do
      meal = client.random
      
      expect(meal).to be_a(Hash)
      expect(meal).to have_key('idMeal')
    end
  end
end
