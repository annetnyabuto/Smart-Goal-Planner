import React, { useEffect, useState } from 'react';
import GoalList from './components/GoalList';
import axios from 'axios';

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch data from your json-server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/goals')
      .then(response => setGoals(response.data))
      .catch(error => console.error('Error fetching goals:', error));
  }, []);

  // Delete a goal
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/goals/${id}`)
      .then(() => setGoals(goals.filter(goal => goal.id !== id)))
      .catch(error => console.error('Error deleting goal:', error));
  };

  const handleEdit = (id) => {
    console.log('Edit goal with id:', id);
  };

  // Deposit handler — increases amountSaved by 5000
  const handleDeposit = (id) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    const updatedGoal = {
      ...goal,
      amountSaved: goal.amountSaved + 5000
    };

    axios.put(`http://localhost:3000/goals/${id}`, updatedGoal)
      .then(() => {
        setGoals(goals.map(g => g.id === id ? updatedGoal : g));
      })
      .catch(error => console.error('Error updating goal:', error));
  };

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>
      <GoalList
        goals={goals}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onDeposit={handleDeposit}
      />
    </div>
  );
}

export default App;
