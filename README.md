# Recipe Search & Meal Planner

Take-home technical challenge for nib Senior Software Developer position.
A Rails API + React TypeScript application that searches recipes via TheMealDB 
API and manages shopping lists in browser localStorage.

##### Architecture

- **Backend:** Rails 7.1+ API-only, PostgreSQL, Faraday HTTP client, CORS configured
- **Frontend:** React 18 + Vite + TypeScript + styled-components  
- **Persistence:** Shopping list stored in browser localStorage (not database)
- **Pattern:** Service layer for external API integration, custom hooks for client state
- 
##### Project Structure

```
rails-recipe-app/
├── backend/          # Ruby on Rails API
│   ├── app/
│   │   ├── controllers/api/v1/
│   │   │   ├── recipes_controller.rb
│   │   │   └── shopping_lists_controller.rb
│   │   └── models/
│   │       ├── shopping_list.rb
│   │       └── shopping_list_item.rb
│   ├── config/
│   ├── db/
│   └── Gemfile
│
└── frontend/         # React + TypeScript
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── services/
    │   └── types/
    └── package.json
```

## Prerequisites

- Ruby 3.2+
- Rails 7.1+
- Node.js 18+
- PostgreSQL 14+

## Backend Setup

```bash
cd backend
bundle install
rails db:create
rails db:migrate
rails server -p 3001
```
Server runs at http://localhost:3001

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Vite dev server runs at http://localhost:5173

##### API Endpoints

### Recipes
- `GET /api/v1/recipes/search?query=beef` - Search recipes
- `GET /api/v1/recipes/random` - Get random recipe
- `GET /api/v1/recipes/:id` - Get recipe by ID

### Shopping List
- `GET /api/v1/shopping_list` - Get shopping list
- `POST /api/v1/shopping_list/items` - Add ingredients
- `DELETE /api/v1/shopping_list/items/:name` - Remove ingredient
- `DELETE /api/v1/shopping_list/clear` - Clear shopping list

## ✨ Features

### Recipe Search & Display
- Search recipes using TheMealDB API (proxied through Rails)
- Results displayed in a responsive grid
- Click any recipe to view detailed information

### Recipe Detail Modal
- Full ingredient list with measurements
- Step-by-step cooking instructions
- YouTube video link (when available)
- Source link (when available)
- **"Add to My Shopping List"** button

### Shopping List Builder (Database-backed)
- Save ingredients from recipes to PostgreSQL database
- View shopping list from anywhere in the app
- Ingredients sorted alphabetically
- **Smart aggregation** - duplicate ingredients from multiple recipes are combined
- Session-based shopping lists (identified by X-Session-Id header)

### Navigation
- Global navigation bar accessible from all pages
- Quick access to Search, Shopping List, and **"Surprise Me"**
- Surprise Me fetches a random recipe

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Ruby on Rails 7.1** | API framework |
| **PostgreSQL** | Database |
| **Faraday** | HTTP client for TheMealDB API |
| **Rack CORS** | Cross-origin resource sharing |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **TypeScript** | Type-safe development |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **Lucide React** | Icons |

###### Key Implementation Details

### Backend

## Shopping List Aggregation
When adding ingredients from multiple recipes, the Rails backend:
1. Checks if an ingredient already exists (case-insensitive)
2. If it exists, appends the new measure to the existing item
3. If it doesn't exist, creates a new shopping list item
4. Sorts all items alphabetically

## Session Management
Shopping lists are session-based using the `X-Session-Id` header. This allows multiple users to have their own shopping lists without authentication.

### API Response Format
Recipes are formatted with a clean structure:
```json
{
  "id": "52772",
  "name": "Teriyaki Chicken Casserole",
  "thumbnail": "https://...",
  "category": "Chicken",
  "area": "Japanese",
  "instructions": "...",
  "youtube": "https://...",
  "source": "https://...",
  "ingredients": [
    { "name": "Chicken", "measure": "3 cups" },
    ...
  ]
}
```

### Frontend

The frontend is a React application that:
- Consumes the Rails API
- Manages session ID in localStorage
- Shows toast notifications for user feedback
- Uses custom hooks for state management


##### Testing

## Backend
```bash
cd backend
bundle exec rspec spec/services/meal_db_client_spec.rb
```

## Frontend
```bash
cd frontend
npm test
```

##### Deployment

### Backend (Rails)
```bash
cd backend
RAILS_ENV=production bundle exec rails server
```

### Frontend (React)
```bash
cd frontend
npm run build
# Serve the dist/ folder with any static file server
```

## License

MIT License 

---

Built for for Bill Thomas and Dave Cathcart at nib Group