import React from 'react';
import { useMouse3D } from '../../hooks/useMouse3D';

const ThreeDCard = ({ 
  children, 
  className = '', 
  variant = 'glass',
  withShadow = true,
  withGlow = true,
  ...props 
}) => {
  const [cardRef, mousePosition] = useMouse3D();

  const getCardClass = () => {
    let baseClass = 'card-3d';
    
    if (variant === 'glass') {
      baseClass += ' card-3d-glass';
    } else if (variant === 'tilt') {
      baseClass += ' card-3d-tilt';
    } else if (variant === 'lift') {
      baseClass += ' card-3d-lift';
    }
    
    if (withShadow) {
      baseClass += ' card-3d-shadow';
    }
    
    if (withGlow) {
      baseClass += ' card-3d-glow';
    }
    
    return `${baseClass} ${className}`;
  };

  return (
    <div 
      ref={cardRef}
      className={getCardClass()}
      {...props}
    >
      <div className="card-3d-content">
        {children}
      </div>
    </div>
  );
};

export default ThreeDCard;