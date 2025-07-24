import React, { useEffect, useState } from 'react';
import GoalList from './components/GoalList';
import DepositForm from './components/DepositForm';
import NewGoalForm from './components/NewGoalForm';
import EditGoalForm from './components/EditGoalForm';
import Filter from './components/Filter'; 
import GoalOverview from './components/GoalOverview';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(data => {
        setGoals(data);
        setError('');
      })
      .catch(err => {
        console.error('Error fetching goals:', err);
        setError('Failed to load goals. Please try again later.');
      });
  }, []);

  const addGoal = (newGoal) => {
    const newId = String(Math.max(...goals.map(g => parseInt(g.id)), 0) + 1);
    
    const goalToAdd = { 
      id: newId,
      ...newGoal, 
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalToAdd),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to add goal: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(addedGoal => {
        setGoals(prev => [...prev, addedGoal]);
        setError('');
      })
      .catch(err => {
        console.error('Error adding goal:', err);
        setError('Failed to add goal. Please try again.');
      });
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
    if (!goalToUpdate) {
      setError('Goal not found. Please try again.');
      return;
    }
    
    const currentAmount = Number(goalToUpdate.savedAmount) || 0;
    const depositAmount = Number(amount);
    const newAmount = currentAmount + depositAmount;
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedAmount: newAmount }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to update goal: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(updated => {
        setGoals(prev => prev.map(g => (g.id === id ? updated : g)));
        closeDepositForm();
        setError('');
      })
      .catch(err => {
        console.error('Error depositing:', err);
        setError('Failed to make deposit. Please try again.');
      });
  };

  const handleEdit = (id) => {
    const goalToEdit = goals.find(goal => goal.id === id);
    if (!goalToEdit) return;
    
    setSelectedGoal(goalToEdit);
    setShowEditForm(true);
  };
  
  const closeEditForm = () => {
    setShowEditForm(false);
    setSelectedGoal(null);
  };
  
  const saveEditedGoal = (editedGoal) => {
    fetch(`http://localhost:3001/goals/${editedGoal.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedGoal),
    })
      .then(res => res.json())
      .then(updated => {
        setGoals(prev => prev.map(g => (g.id === editedGoal.id ? updated : g)));
        closeEditForm();
      })
      .catch(err => console.error('Error updating goal:', err));
  };

  // Filter and sort goals
  const filteredGoals = goals.filter(goal => {
    // Apply category filter
    if (selectedCategory && goal.category !== selectedCategory) {
      return false;
    }
    
    // Apply status filter
    if (selectedStatus) {
      const today = new Date();
      const deadlineDate = new Date(goal.deadline);
      const timeDiff = deadlineDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      const isCompleted = goal.savedAmount >= goal.targetAmount;
      
      if (selectedStatus === 'completed' && !isCompleted) {
        return false;
      }
      
      if (selectedStatus === 'overdue' && !(daysLeft < 0 && !isCompleted)) {
        return false;
      }
      
      if (selectedStatus === 'warning' && !(daysLeft <= 30 && daysLeft >= 0 && !isCompleted)) {
        return false;
      }
      
      if (selectedStatus === 'active' && (isCompleted || daysLeft < 0)) {
        return false;
      }
    }
    
    return true;
  }).sort((a, b) => {
    // Apply sorting
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      case 'progress':
        const progressA = a.savedAmount / a.targetAmount;
        const progressB = b.savedAmount / b.targetAmount;
        return progressB - progressA;
      case 'amount':
        return b.targetAmount - a.targetAmount;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section !== 'add-goal') {
      setShowAddForm(false);
    }
  };

  return (
    <div className="App">
      <NavBar 
        onAddGoalClick={toggleAddForm} 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {showAddForm && (
        <div className="content-section">
          <h1>Create New Goal</h1>
          <NewGoalForm onAddGoal={addGoal} />
        </div>
      )}

      {error && (
        <div className="content-section">
          <div className="error-message">{error}</div>
        </div>
      )}
      
      {showDepositForm && selectedGoal && (
        <DepositForm
          goal={selectedGoal}
          onDeposit={handleDeposit}
          onClose={closeDepositForm}
        />
      )}
      
      {showEditForm && selectedGoal && (
        <EditGoalForm
          goal={selectedGoal}
          onSave={saveEditedGoal}
          onClose={closeEditForm}
        />
      )}
      
      <main>
      {activeSection === 'home' && (
        <div className="hero-section">
          <h2>Achieve Your Financial Dreams</h2>
          <p>Set clear goals, track your progress, and watch your savings grow. Smart Goal Planner helps you turn financial aspirations into reality.</p>
          <div className="hero-actions">
            <button onClick={() => handleSectionChange('goals')}>View Your Goals</button>
            <button onClick={() => {
              handleSectionChange('add-goal');
              toggleAddForm();
            }}>Create New Goal</button>
          </div>
        </div>
      )}
      {activeSection === 'goals' && (
        <div className="content-section">
          <h1>Your Goals</h1>
          <Filter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          
          {filteredGoals.length > 0 ? (
            <GoalList
              goals={filteredGoals}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onDeposit={openDepositForm}
            />
          ) : (
            <div className="no-goals-message">
              <p>No goals match your current filters. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      )}
      {activeSection === 'overview' && (
        <div className="content-section">
          <h1>Goals Overview</h1>
          <GoalOverview goals={goals} />
        </div>
      )}
      </main>
    </div>
  );
}

export default App;
