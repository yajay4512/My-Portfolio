import React, { useEffect } from 'react';

const Lightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (currentIndex === null) return null;

  const currentImage = images[currentIndex];
  const isPlaceholder = currentImage && currentImage.startsWith('placeholder-');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.92)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '32px',
          cursor: 'pointer',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 300,
          lineHeight: 1,
          padding: '8px',
          transition: 'color 0.2s ease',
          zIndex: 10000
        }}
        onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 1)'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
      >
        ×
      </button>

      {/* Previous arrow */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          style={{
            position: 'absolute',
            left: '48px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '28px',
            cursor: 'pointer',
            fontFamily: "'Instrument Serif', serif",
            padding: '16px',
            transition: 'color 0.2s ease',
            zIndex: 10000
          }}
          onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
        >
          ←
        </button>
      )}

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isPlaceholder ? (
          <div
            style={{
              width: '600px',
              height: '450px',
              background: '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              color: '#E8E5DE',
              opacity: 0.4
            }}
          >
            {currentImage.replace('placeholder-', '')}
          </div>
        ) : (
          <img
            src={currentImage}
            alt={`Gallery image ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        )}
      </div>

      {/* Next arrow */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          style={{
            position: 'absolute',
            right: '48px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '28px',
            cursor: 'pointer',
            fontFamily: "'Instrument Serif', serif",
            padding: '16px',
            transition: 'color 0.2s ease',
            zIndex: 10000
          }}
          onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
        >
          →
        </button>
      )}

      {/* Image counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.1em'
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Lightbox;
