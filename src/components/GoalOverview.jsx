import React from 'react';

function GoalOverview({ goals }) {
  const totalGoals = goals.length;

  const totalSaved = goals.reduce((sum, goal) => sum + (goal.amountSaved || 0), 0);

  const totalTarget = goals.reduce((sum, goal) => sum + (goal.targetAmount || 0), 0);

  const completedGoals = goals.filter(goal => (goal.amountSaved || 0) >= (goal.targetAmount || 0)).length;

  return (
    <div className="goal-overview">
      <h2>Goal Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: KES {totalSaved.toLocaleString()}</p>
      <p>Total Target: KES {totalTarget.toLocaleString()}</p>
      <p>Completed Goals: {completedGoals}</p>
    </div>
  );
}

export default GoalOverview;
