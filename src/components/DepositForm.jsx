import React, { useState } from 'react';

function DepositForm({ goal, onDeposit, onClose }) {
  const [depositAmount, setDepositAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    
    console.log('Submitting deposit:', goal.id, amount);
    
    if (!isNaN(amount) && amount > 0) {
      onDeposit(goal.id, amount);
      setDepositAmount('');
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <div className="deposit-form">
      <h4>Deposit to: {goal.name}</h4>
      <div className="goal-details">
        <p><strong>Category:</strong> {goal.category}</p>
        <p><strong>Target Amount:</strong> KES {goal.targetAmount.toLocaleString()}</p>
        <p><strong>Current Savings:</strong> KES {goal.savedAmount.toLocaleString()}</p>
        <p><strong>Remaining:</strong> KES {Math.max(goal.targetAmount - goal.savedAmount, 0).toLocaleString()}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          min="1"
          required
        />
        <div className="form-buttons">
          <button type="submit" disabled={!depositAmount || parseFloat(depositAmount) <= 0}>
            Deposit
          </button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DepositForm;
