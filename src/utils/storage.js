// Local storage utility for goals data
const STORAGE_KEY = 'smart-goal-planner-goals';

// Initial data to populate if no data exists
const initialGoals = [
  {
    id: "1",
    name: "Travel Fund - Japan",
    targetAmount: 5000,
    savedAmount: 3200,
    category: "Travel",
    deadline: "2025-12-31",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 10000,
    savedAmount: 7500,
    category: "Emergency",
    deadline: "2026-06-30",
    createdAt: "2023-05-01"
  },
  {
    id: "3",
    name: "New Laptop",
    targetAmount: 1500,
    savedAmount: 1500,
    category: "Electronics",
    deadline: "2024-07-20",
    createdAt: "2024-03-10"
  },
  {
    "id": "4",
    "name": "Down Payment - House",
    "targetAmount": 50000,
    "savedAmount": 12000,
    "category": "Real Estate",
    "deadline": "2027-12-31",
    "createdAt": "2024-02-01"
  },
  {
    "id": "5",
    "name": "Car Maintenance",
    "targetAmount": 800,
    "savedAmount": 600,
    "category": "Vehicle",
    "deadline": "2025-09-15",
    "createdAt": "2024-06-01"
  },
  {
    "id": "6",
    "name": "Education Fund",
    "targetAmount": 20000,
    "savedAmount": 5000,
    "category": "Education",
    "deadline": "2028-01-01",
    "createdAt": "2024-04-20"
  },
  {
    "id": "7",
    "name": "Holiday Gifts",
    "targetAmount": 1000,
    "savedAmount": 300,
    "category": "Shopping",
    "deadline": "2024-08-10",
    "createdAt": "2024-07-01"
  },
  {
    "id": "8",
    "name": "New Phone",
    "targetAmount": 1200,
    "savedAmount": 0,
    "category": "Electronics",
    "deadline": "2025-01-31",
    "createdAt": "2024-07-10"
  },
  {
    "id": "9",
    "name": "Retirement Savings",
    "targetAmount": 100000,
    "savedAmount": 15000,
    "category": "Retirement",
    "deadline": "2035-01-01",
    "createdAt": "2023-01-01"
  },
  {
    "id": "10",
    "name": "Annet",
    "description": "Buy house",
    "category": "Real Estate",
    "targetAmount": 2000000,
    "deadline": "2025-12-31",
    "savedAmount": 0,
    "createdAt": "2025-07-23"
  },
  {
    "id": "13",
    "name": "buy land",
    "description": "buy two acre piece of land",
    "category": "Real Estate",
    "targetAmount": 3000000,
    "deadline": "2026-12-01",
    "savedAmount": 100000,
    "createdAt": "2025-07-23"
  }
];

export const getGoals = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialGoals;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return initialGoals;
  }
};

export const saveGoals = (goals) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addGoal = (goal) => {
  const goals = getGoals();
  const newId = String(Math.max(...goals.map(g => parseInt(g.id)), 0) + 1);
  const newGoal = {
    id: newId,
    ...goal,
    savedAmount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updatedGoals = [...goals, newGoal];
  saveGoals(updatedGoals);
  return newGoal;
};

export const updateGoal = (id, updates) => {
  const goals = getGoals();
  const updatedGoals = goals.map(goal => 
    goal.id === id ? { ...goal, ...updates } : goal
  );
  saveGoals(updatedGoals);
  return updatedGoals.find(goal => goal.id === id);
};

export const deleteGoal = (id) => {
  const goals = getGoals();
  const updatedGoals = goals.filter(goal => goal.id !== id);
  saveGoals(updatedGoals);
  return updatedGoals;
};