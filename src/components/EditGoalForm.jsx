import React, { useState, useEffect } from 'react';
import './EditGoalForm.css';

function EditGoalForm({ goal, onSave, onClose }) {
  const [editedGoal, setEditedGoal] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    targetAmount: '',
    deadline: '',
    savedAmount: 0
  });

  useEffect(() => {
    if (goal) {
      setEditedGoal({
        id: goal.id,
        name: goal.name || '',
        description: goal.description || '',
        category: goal.category || '',
        targetAmount: goal.targetAmount || 0,
        deadline: goal.deadline || '',
        savedAmount: goal.savedAmount || 0
      });
    }
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal({ ...editedGoal, [name]: name === 'targetAmount' ? parseFloat(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedGoal);
  };

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h3>Edit Goal</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedGoal.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={editedGoal.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={editedGoal.category}
              onChange={handleChange}
              required
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
            <label>Target Amount:</label>
            <input
              type="number"
              name="targetAmount"
              value={editedGoal.targetAmount}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={editedGoal.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGoalForm;