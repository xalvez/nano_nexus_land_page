import React, { useState, useRef, useEffect } from 'react';
import './FloatingMenu.css';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const menuRef = useRef(null);

  // Menu items configuration
  const menuItems = [
  {
    icon: '💬',
    label: 'Chat Support',
    tooltip: 'Start a conversation with our team',
    action: () => window.open('mailto:hello@nanonexus.com', '_blank'),
    color: 'var(--accent-1)'
  },
    {
      icon: '📞',
      label: 'Call Us',
      action: () => window.open('tel:+15551234567', '_blank'),
      color: 'var(--accent-2)'
    },
    {
      icon: '🚀',
      label: 'Get Quote',
      action: () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
      },
      color: 'var(--button-bg)'
    },
    {
      icon: '💼',
      label: 'Our Work',
      action: () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
      },
      color: 'var(--text-primary)'
    },
    {
      icon: isOpen ? '🌙' : '☀️',
      label: 'Toggle Theme',
      action: () => {
        // This will be connected to your theme context
        const event = new CustomEvent('toggleTheme');
        window.dispatchEvent(event);
        setIsOpen(false);
      },
      color: 'var(--text-secondary)'
    }
  ];

  // Handle scroll to show/hide menu
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      
      // Hide menu when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Listen for theme toggle events from navbar
    const handleThemeToggle = () => {
      // Update theme icon
      const themeToggleItem = menuItems.find(item => item.label === 'Toggle Theme');
      if (themeToggleItem) {
        themeToggleItem.icon = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
      }
    };



    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('toggleTheme', handleThemeToggle);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('toggleTheme', handleThemeToggle);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

    const handleMouseEnter = (index) => {
    if (window.innerWidth <= 480) return; // Don't show tooltips on mobile
    setActiveTooltip(index);
  };
  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <div 
      ref={menuRef}
      className={`floating-menu ${isOpen ? 'menu-open' : ''} ${isVisible ? 'menu-visible' : 'menu-hidden'}`}
    >
      {/* Menu Items */}
      {menuItems.map((item, index) => (
<div
  key={index}
  className={`menu-item ${isOpen ? 'item-visible' : ''}`}
  style={{ 
    '--item-color': item.color,
    '--item-delay': `${index * 0.1}s`
  }}
  onClick={item.action}
  onMouseEnter={() => handleMouseEnter(index)}
  onMouseLeave={handleMouseLeave}
>
  <div className="menu-item-icon">{item.icon}</div>
  <span className="menu-item-label">{item.label}</span>
  <div className="menu-item-glow"></div>
  
  {/* Tooltip */}
  {activeTooltip === index && (
    <div className="menu-item-tooltip">
      {item.tooltip}
      <div className="tooltip-arrow"></div>
    </div>
  )}
</div>
      ))}

      {/* Main Toggle Button */}
      <button 
        className={`menu-toggle glass-card glass-card-glow ${isOpen ? 'menu-open' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="menu-toggle-icon">
          <span className={`menu-line line-1 ${isOpen ? 'open' : ''}`}></span>
          <span className={`menu-line line-2 ${isOpen ? 'open' : ''}`}></span>
          <span className={`menu-line line-3 ${isOpen ? 'open' : ''}`}></span>
        </div>
        <div className="menu-toggle-pulse"></div>
      </button>
    </div>
  );
};

export default FloatingMenu;