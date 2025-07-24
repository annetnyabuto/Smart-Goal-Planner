import React, { useState } from 'react';

function GoalItem({ goal, onDelete, onEdit, onDeposit }) {
  const { id, name, description, targetAmount, savedAmount, deadline, category } = goal;
  const [depositAmount, setDepositAmount] = useState('');

  const progressPercent = Math.min(
    Math.round((savedAmount / targetAmount) * 100),
    100
  );
  
  const remainingAmount = Math.max(targetAmount - savedAmount, 0);
  
  // Calculate days left until deadline
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  // Determine goal status
  const isCompleted = savedAmount >= targetAmount;
  const isOverdue = daysLeft < 0 && !isCompleted;
  const isWarning = daysLeft <= 30 && daysLeft >= 0 && !isCompleted;

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      // Call the onDeposit function with the goal object
      onDeposit(goal);
      setDepositAmount('');
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <div className={`goal-item ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} ${isWarning ? 'warning' : ''}`}>
      <div className="goal-header">
        <h3>{name}</h3>
        {isCompleted && <span className="status completed">Completed</span>}
        {isOverdue && <span className="status overdue">Overdue</span>}
        {isWarning && <span className="status warning">Deadline Soon</span>}
      </div>
      
      {description && <p>{description}</p>}
      <p>Category: {category}</p>
      <p>Target: KES {targetAmount.toLocaleString()}</p>
      <p>Saved: KES {savedAmount.toLocaleString()}</p>
      <p>Remaining: KES {remainingAmount.toLocaleString()}</p>
      <p>Deadline: {deadline}</p>
      <p className="days-left">
        {daysLeft > 0 ? `${daysLeft} days left` : isCompleted ? 'Goal achieved' : 'Deadline passed'}
      </p>

      <div className="progress-bar">
        <div
          className={`progress-bar-fill ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <p>Progress: {progressPercent}%</p>

      <button className="deposit-button" onClick={() => onDeposit(goal)}>Make Deposit</button>

      <div className="button-group">
        <button id="EditBtn" onClick={() => onEdit(id)}>Edit</button>
        <button id="DeleteBtn" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default GoalItem;
