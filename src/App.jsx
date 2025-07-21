import React, { useEffect, useState } from 'react';
import GoalList from './components/GoalList';
import DepositForm from './components/DepositForm'; // Optional if you use it

function App() {
  const [goals, setGoals] = useState([]);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Fetch goals from json-server on mount
  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched goals:', data);  // For debugging
        setGoals(data);
      })
      .catch(err => console.error('Error fetching goals:', err));
  }, []);

  // Delete goal by id
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setGoals(prev => prev.filter(goal => goal.id !== id));
      })
      .catch(err => console.error('Error deleting goal:', err));
  };

  // Open deposit form for a selected goal
  const openDepositForm = (goal) => {
    setSelectedGoal(goal);
    setShowDepositForm(true);
  };

  // Close deposit form modal
  const closeDepositForm = () => {
    setShowDepositForm(false);
    setSelectedGoal(null);
  };

  // Deposit money into goal
  const handleDeposit = (id, amount) => {
    const goalToUpdate = goals.find(goal => goal.id === id);
    if (!goalToUpdate) return;

    const updatedGoal = {
      ...goalToUpdate,
      amountSaved: goalToUpdate.amountSaved + amount,
    };

    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountSaved: updatedGoal.amountSaved }),
    })
      .then(res => res.json())
      .then(updated => {
        setGoals(prev => prev.map(g => (g.id === id ? updated : g)));
        closeDepositForm();
      })
      .catch(err => console.error('Error updating goal:', err));
  };

  // Stub for edit (expand later)
  const handleEdit = (id) => {
    alert(`Edit not implemented yet for goal id: ${id}`);
  };

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>

      {showDepositForm && selectedGoal && (
        <DepositForm
          goal={selectedGoal}
          onDeposit={handleDeposit}
          onClose={closeDepositForm}
        />
      )}

      <GoalList
        goals={goals}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onDeposit={openDepositForm}  // opens deposit form modal
      />
    </div>
  );
}

export default App;
