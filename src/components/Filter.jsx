import React from 'react';

function Filter({ selectedCategory, onCategoryChange, selectedStatus, onStatusChange, sortBy, onSortChange }) {
  return (
    <div className="filter-container">
      <div className="filter">
        <label>Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
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
      
      <div className="filter">
        <label>Status: </label>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="warning">Deadline Soon</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
      
      <div className="filter">
        <label>Sort by: </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="deadline">Deadline (Closest First)</option>
          <option value="progress">Progress (Highest First)</option>
          <option value="amount">Amount (Highest First)</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
