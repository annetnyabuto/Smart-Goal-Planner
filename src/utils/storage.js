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