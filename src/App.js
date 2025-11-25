import React from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingMenu from './components/Shared/FloatingMenu'; // Add this import
import './styles/globals.css';
import './styles/variables.css';
import './styles/animations.css';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  // Add theme toggle event listener for FloatingMenu
  React.useEffect(() => {
    const handleThemeToggle = () => {
      toggleTheme();
    };

    window.addEventListener('toggleTheme', handleThemeToggle);

    return () => {
      window.removeEventListener('toggleTheme', handleThemeToggle);
    };
  }, [toggleTheme]);

  return (
    <div className="App">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingMenu /> {/* Add this line */}
    </div>
  );
}

export default App;