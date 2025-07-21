import React, { useState } from 'react';

function DepositForm({ goal, onDeposit, onClose }) {
  const [depositAmount, setDepositAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      onDeposit(goal.id, amount);
      setDepositAmount('');
      onClose();
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <div className="deposit-form">
      <h4>Deposit to: {goal.title}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          min="1"
          required
        />
        <button type="submit" disabled={!depositAmount || parseFloat(depositAmount) <= 0}>
          Deposit
        </button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default DepositForm;
