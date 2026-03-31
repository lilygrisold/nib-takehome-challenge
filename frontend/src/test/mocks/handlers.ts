import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://www.themealdb.com/api/json/v1/1/search.php', () => {
    return HttpResponse.json({
      meals: [
        {
          idMeal: '123',
          strMeal: 'Beef Stew',
          strCategory: 'Beef',
          strArea: 'British',
          strMealThumb: 'http://example.com/beef.jpg',
          strIngredient1: 'Beef',
          strMeasure1: '500g',
          strIngredient2: 'Carrots',
          strMeasure2: '2 cups',
          strInstructions: 'Cook the beef...',
        },
      ],
    });
  }),
];