import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(14, 14, 14, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '0.5px solid rgba(255, 255, 255, 0.06)'
      }}
    >
      <div className="flex items-center justify-between px-8 md:px-12 py-4">
        <Link
          to="/"
          className="transition-opacity duration-200 hover:opacity-70"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '15px',
            color: '#E8E5DE',
            textDecoration: 'none'
          }}
        >
          Ajay Yadav
        </Link>

        <div className="flex items-center gap-8">
          {isHome ? (
            <>
              <button
                onClick={() => scrollToSection('work')}
                className="nav-link"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="nav-link"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-link"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
              >
                Contact
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="nav-link cursor-hover"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#E8E5DE',
                opacity: 0.4,
                textDecoration: 'none',
                transition: 'opacity 0.2s ease'
              }}
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>

      <style jsx="true">{`
        .nav-link:hover {
          opacity: 1 !important;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;