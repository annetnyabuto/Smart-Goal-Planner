# Smart Goal Planner

A financial goal-tracking app built with React and Tailwind CSS. Users can add, edit, delete, and make deposits toward personal financial goals like travel funds, emergency savings, or education.

## Features

- Create, read, update, and delete financial goals
- Track progress toward each goal with visual progress bars
- Filter goals by category and status
- Sort goals by different criteria
- View overall statistics and summaries

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   npm install

### Running the Application

1. Start the JSON server (database):
   
   npm run server
   

2. In a separate terminal, start the smart goal planner app:
   
   npm run dev
   

3. Open your browser and navigate to http://localhost:5173

## Data Structure

Each goal has the following properties:

  id: Unique identifier
  name: Name of the goal
  TargetAmount: Total amount needed
  savedAmount: Current amount saved
  category: Category of the goal (e.g., Travel, Emergency, Electronics)
  deadline: Target date to complete the goal

## Usage

- **Add a new goal**: Fill out the form
- **Make a deposit**: Use the deposit form on each goal card
- **Edit a goal**: Click the Edit button on a goal card
- **Delete a goal**: Click the Delete button on a goal card
- **Filter goals**: Use the filter options to narrow down your goals
- **Search goals**: Type in the search bar to find specific goals

## API Endpoints

The application uses a JSON server running on `http://localhost:3001` with the following endpoints:

### Goals

- GET/goals - Retrieve all goals
- POST/goals - Create a new goal
- PATCH/goals/:id - Update a specific goal
- DELETE/goals/:id - Delete a specific goal

