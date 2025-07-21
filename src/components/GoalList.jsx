//displays a list of all goals
import React from "react";
import GoalItem from './GoalItem'

function GoalList({goals, onDelete, onEdit, onDeposit}){
    if (!goals || goals.length === 0) return <p>Their are no goals to be shown.</p>;

    return(
        <div>
            <h2>Your Financial Goals</h2>
            <ul className="mygoal-list">
                {goals.map((goal) => (
                    <GoalItem
                      key={goal.id}
                      goal={goal}
                      onDelete={onDelete}
                      onDeposit={onDeposit}
                      onEdit={onEdit}
                    />
                ))}
            </ul>
        </div>
    );
}

export default GoalList;