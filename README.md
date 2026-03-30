# Recipe Search & Meal Planner

Take-home technical challenge for nib Senior Software Developer position, 
interviewing with Bill Thomas, Dave Cathcart and Camille Addison. 
A Rails 8 API + React TypeScript application that searches recipes via TheMealDB 
API and manages shopping lists in browser localStorage.

## Architecture

- **Backend:** Rails 8.1 API-only, PostgreSQL (for Rails internal), Faraday HTTP client
- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS  
- **Persistence:** Shopping list stored in browser localStorage (not database), 
  enabling offline usage and zero backend state management for user data
- **Pattern:** MVC with Service layer - Rails handles API proxying and data 
  transformation, React manages UI state and client-side persistence

## Prerequisites

- Ruby 3.2+
- Node.js 18+
- PostgreSQL (local development, no password required for default setup)
  
* Configuration

## Backend Setup

  1. Navigate to the backend directory:
  ```bash
  cd backend
  ```

  2. Install Ruby dependencies:
  ```bash
  bundle install
  ```

  3. Set up the database:
  ```bash
  bin/rails db:create
  bin/rails db:migrate
  ```

  4. Start the Rails server:
  ```bash
  bin/rails server
  ```
The frontend will be available at `http://localhost:3001`


