import React, { useState } from 'react';

function GoalItem({ goal, onDelete, onEdit, onDeposit }) {
  const { id, title, description, targetAmount, amountSaved, deadline } = goal;
  const [depositAmount, setDepositAmount] = useState('');

  const progressPercent = Math.min(
    Math.round((amountSaved / targetAmount) * 100),
    100
  );

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      onDeposit(id, amount); 
      setDepositAmount(''); 
    }
  };

  return (
    <div className="goal-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Target: KES {targetAmount}</p>
      <p>Saved: KES {amountSaved}</p>
      <p>Deadline: {deadline}</p>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <p>Progress: {progressPercent}%</p>

      <form onSubmit={handleDeposit}>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="Enter deposit amount"
          min="1"
          required
        />
        <button type="submit">Deposit</button>
      </form>

      <button id="DeleteBtn" onClick={() => onDelete(id)}>Delete</button>
      <button id="EditBtn" onClick={() => onEdit(id)}>Edit</button>
    </div>
  );
}

export default GoalItem;
