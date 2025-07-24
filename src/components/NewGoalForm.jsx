import React, { useState } from "react";
import "./NewGoalForm.css";

function NewGoalForm({ onAddGoal }) {
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    category: '',
    targetAmount: '',
    deadline: '',
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ 
      ...newGoal, 
      [name]: name === 'targetAmount' ? (value === '' ? '' : parseFloat(value)) : value 
    });
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newGoal.name.trim()) {
      setFormError('Please enter a goal name');
      return;
    }
    
    if (!newGoal.category) {
      setFormError('Please select a category');
      return;
    }
    
    if (!newGoal.targetAmount || newGoal.targetAmount <= 0) {
      setFormError('Please enter a valid target amount');
      return;
    }
    
    if (!newGoal.deadline) {
      setFormError('Please select a deadline');
      return;
    }
    
    // Convert targetAmount to number
    const goalToSubmit = {
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount)
    };
    
    setIsSubmitting(true);
    
    onAddGoal(goalToSubmit);
    
    // Reset form
    setNewGoal({
      name: '',
      description: '',
      category: '',
      targetAmount: '',
      deadline: '',
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="goal-form-container">
      <form className="goal-form" onSubmit={handleSubmit}>
        <h3>Create New Financial Goal</h3>
        
        {formError && <div className="form-error">{formError}</div>}

        <div className="form-group">
          <label htmlFor="name">Goal Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your goal name"
            value={newGoal.name}
            onChange={handleChange}
            className={formError && !newGoal.name ? 'error' : ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Brief description of your goal"
            value={newGoal.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={newGoal.category}
            onChange={handleChange}
            className={formError && !newGoal.category ? 'error' : ''}
          >
            <option value="">Select category</option>
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Retirement">Retirement</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount (KES)</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            placeholder="Enter target amount"
            value={newGoal.targetAmount}
            onChange={handleChange}
            min="1"
            className={formError && (!newGoal.targetAmount || newGoal.targetAmount <= 0) ? 'error' : ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Target Date</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={newGoal.deadline}
            onChange={handleChange}
            className={formError && !newGoal.deadline ? 'error' : ''}
          />
        </div>

        <button 
          id="AddBtn" 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Goal'}
        </button>
      </form>
    </div>
  );
}

export default NewGoalForm;

