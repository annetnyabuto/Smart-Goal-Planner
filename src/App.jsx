import React, { useEffect, useState } from 'react';
import GoalList from './components/GoalList';
import DepositForm from './components/DepositForm';
import NewGoalForm from './components/NewGoalForm';
import Filter from './components/Filter'; 

function App() {
  const [goals, setGoals] = useState([]);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(data => {
        setGoals(data);
      })
      .catch(err => console.error('Error fetching goals:', err));
  }, []);

  const addGoal = (newGoal) => {
    const goalToAdd = { ...newGoal, amountSaved: 0 };
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalToAdd),
    })
      .then(res => res.json())
      .then(addedGoal => setGoals(prev => [...prev, addedGoal]))
      .catch(err => console.error('Error adding goal:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'DELETE',
    })
      .then(() => setGoals(prev => prev.filter(goal => goal.id !== id)))
      .catch(err => console.error('Error deleting goal:', err));
  };

  const openDepositForm = (goal) => {
    setSelectedGoal(goal);
    setShowDepositForm(true);
  };

  const closeDepositForm = () => {
    setShowDepositForm(false);
    setSelectedGoal(null);
  };

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
      .catch(err => console.error('Error depositing:', err));
  };

  const handleEdit = (id) => {
    alert(`Edit not implemented yet for goal ID: ${id}`);
  };

  const filteredGoals = selectedCategory
    ? goals.filter(goal => goal.category === selectedCategory)
    : goals;

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>

      <NewGoalForm onAddGoal={addGoal} />

      <Filter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {showDepositForm && selectedGoal && (
        <DepositForm
          goal={selectedGoal}
          onDeposit={handleDeposit}
          onClose={closeDepositForm}
        />
      )}

      <GoalList
        goals={filteredGoals}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onDeposit={openDepositForm}
      />
    </div>
  );
}

export default App;
