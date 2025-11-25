import { useState, useEffect, useRef } from 'react';

export const useMouse3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
      
      setMousePosition({ x, y });
      
      // Update CSS variables for 3D effect
      element.style.setProperty('--mouse-x', x);
      element.style.setProperty('--mouse-y', y);
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      element.style.setProperty('--mouse-x', 0);
      element.style.setProperty('--mouse-y', 0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [elementRef, mousePosition];
};