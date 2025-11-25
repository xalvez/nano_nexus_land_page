import React from 'react';
import Navbar from './Navbar';
import './Header.css';

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="header">
      <Navbar toggleTheme={toggleTheme} theme={theme} />
    </header>
  );
};

export default Header;