import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#0A0A0A',
        borderTop: '0.5px solid rgba(255,255,255,0.06)',
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <p
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#E8E5DE',
          opacity: 0.3
        }}
      >
        © 2026 Ajay Yadav. All rights reserved.
      </p>
      <p
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#E8E5DE',
          opacity: 0.3
        }}
      >
        ajay.design
      </p>
    </footer>
  );
};

export default Footer;
