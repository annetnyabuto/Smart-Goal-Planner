import React from 'react';
import './NavBar.css';

function NavBar({ onAddGoalClick, activeSection, onSectionChange }) {
  const handleNavClick = (section, e) => {
    e.preventDefault();
    onSectionChange(section);
    
    if (section === 'add-goal') {
      onAddGoalClick();
    }
  };
  
  return (
    <nav className={activeSection === 'home' ? 'navbar-transparent' : 'navbar-default'}>
      <ul>
        <li>
          <a 
            href="#home" 
            className={activeSection === 'home' ? 'active' : ''}
            onClick={(e) => handleNavClick('home', e)}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#goals" 
            className={activeSection === 'goals' ? 'active' : ''}
            onClick={(e) => handleNavClick('goals', e)}
          >
            Goals
          </a>
        </li>
        <li>
          <a 
            href="#add-goal" 
            className={activeSection === 'add-goal' ? 'active' : ''}
            onClick={(e) => handleNavClick('add-goal', e)}
          >
            Add Goal
          </a>
        </li>
        <li>
          <a 
            href="#overview" 
            className={activeSection === 'overview' ? 'active' : ''}
            onClick={(e) => handleNavClick('overview', e)}
          >
            Overview
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
