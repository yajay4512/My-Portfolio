import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { studios } from '../mock';
import Lightbox from '../components/Lightbox';

const StudioDetail = () => {
  const { id } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(null);
  const studio = studios.find(s => s.name.toLowerCase() === id.toLowerCase());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!studio) {
    return (
      <div style={{ background: '#0E0E0E', minHeight: '100vh', padding: '100px 48px', color: '#E8E5DE' }}>
        <p>Studio not found</p>
        <Link to="/#layer-2" style={{ color: '#E8E5DE' }}>← Back to studios</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#0E0E0E', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="px-8 md:px-16">
        {/* Back link */}
        <Link
          to="/#layer-2"
          className="inline-block mb-12 transition-opacity duration-200 hover:opacity-70"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#E8E5DE',
            opacity: 0.4,
            textDecoration: 'none'
          }}
        >
          ← Studios
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(36px, 8vw, 58px)',
              color: '#E8E5DE',
              fontWeight: 400,
              marginBottom: '16px',
              lineHeight: 1.1
            }}
          >
            {studio.name}
          </h1>
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '13px',
              color: '#E8E5DE',
              opacity: 0.4,
              marginBottom: '24px'
            }}
          >
            {studio.years}
          </p>
        </div>

        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '80px' }} />

        {/* Intro text */}
        {studio.intro && (
          <div className="max-w-3xl mx-auto mb-24 px-8 md:px-16">
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '16px',
                fontStyle: 'italic',
                color: '#E8E5DE',
                opacity: 0.6,
                lineHeight: 1.8
              }}
            >
              {studio.intro}
            </p>
          </div>
        )}

        {/* Gallery grid */}
        {studio.galleryImages && (
          <div className="mb-24 px-8 md:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {studio.galleryImages.map((image, index) => {
                const isPlaceholder = image.startsWith('placeholder-');
                return (
                  <div
                    key={index}
                    className="cursor-pointer transition-all duration-200 group cursor-hover"
                    onClick={() => {
                      setCurrentLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                    style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      overflow: 'hidden'
                    }}
                  >
                    {isPlaceholder ? (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: '#1A1A1A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '12px',
                          color: '#E8E5DE',
                          opacity: 0.4
                        }}
                      >
                        {image.replace('placeholder-', '')}
                      </div>
                    ) : (
                      <img
                        src={image}
                        alt={`${studio.name} project ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                    <div
                      className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-200"
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={studio.galleryImages}
          currentIndex={currentLightboxIndex}
          onClose={() => {
            setLightboxOpen(false);
            setCurrentLightboxIndex(null);
          }}
          onNavigate={(newIndex) => setCurrentLightboxIndex(newIndex)}
        />
      )}
    </div>
  );
};

export default StudioDetail;
