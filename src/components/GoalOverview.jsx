import React from 'react';
import './GoalOverview.css';

function GoalOverview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + (goal.savedAmount || 0), 0);
  const totalTarget = goals.reduce((sum, goal) => sum + (goal.targetAmount || 0), 0);
  
  // Calculate different goal statuses
  const today = new Date();
  
  const completedGoals = goals.filter(goal => (goal.savedAmount || 0) >= (goal.targetAmount || 0));
  const completedCount = completedGoals.length;
  
  const overdueGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    return deadlineDate < today && (goal.savedAmount || 0) < (goal.targetAmount || 0);
  });
  const overdueCount = overdueGoals.length;
  
  const upcomingGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    const timeDiff = deadlineDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft >= 0 && (goal.savedAmount || 0) < (goal.targetAmount || 0);
  });
  const upcomingCount = upcomingGoals.length;
  
  // Calculate overall progress percentage
  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  return (
    <div className="goal-overview">
      <h2>Goal Overview</h2>
      
      <div className="overview-stats">
        <div className="stat-item">
          <span className="stat-value">{totalGoals}</span>
          <span className="stat-label">Total Goals</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-value">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-value">{overdueCount}</span>
          <span className="stat-label">Overdue</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-value">{upcomingCount}</span>
          <span className="stat-label">Deadline Soon</span>
        </div>
      </div>
      
      <div className="overview-financial">
        <div>
          <p>Total Saved: <span className="amount">KES {totalSaved.toLocaleString()}</span></p>
          <p>Total Target: <span className="amount">KES {totalTarget.toLocaleString()}</span></p>
          <p>Overall Progress: <span className="amount">{overallProgress}%</span></p>
        </div>
        
        <div className="overall-progress-bar">
          <div 
            className="overall-progress-fill"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default GoalOverview;
