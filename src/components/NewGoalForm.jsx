import React, { useState } from "react";

function NewGoalForm({ onAddGoal }) {
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    targetAmount: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGoal(newGoal);
    setNewGoal({
      title: '',
      description: '',
      category: '',
      targetAmount: '',
      deadline: '',
    });
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>

      <input
        type="text"
        name="title"
        placeholder="Goal title"
        value={newGoal.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Short description"
        value={newGoal.description}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={newGoal.category}
        onChange={handleChange}
        required
      >
        <option value="">Select category</option>
        <option value="Health">Health</option>
        <option value="Career">Career</option>
        <option value="Finance">Finance</option>
        <option value="Personal">Personal</option>
        <option value="Education">Education</option>
        <option value="Misc.">Misc.</option>
      </select>

      <input
        type="number"
        name="targetAmount"
        placeholder="Target amount"
        value={newGoal.targetAmount}
        onChange={handleChange}
        min="1"
        required
      />

      <input
        type="date"
        name="deadline"
        value={newGoal.deadline}
        onChange={handleChange}
        required
      />

      <button id="AddBtn" type="submit">Add Goal</button>
    </form>
  );
}

export default NewGoalForm;
