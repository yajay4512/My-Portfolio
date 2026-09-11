import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects, studios, videos, contentPieces } from '../mock';
import Footer from '../components/Footer';

const optimiseCloudinaryUrl = (url) => {
  if (!url || !url.startsWith('https://res.cloudinary.com')) return url;
  if (url.includes('.mp4') || url.includes('.webm') || url.includes('.mov')) return url;
  if (url.includes('q_auto')) return url; // already optimised
  return url.replace('/upload/', '/upload/q_auto,f_auto,w_800/');
};

const ImagePlaceholder = ({ filename, aspectRatio = '16/9', className = '' }) => {
  const isUrl = filename && (filename.startsWith('http://') || filename.startsWith('https://'));
  const isVideo = isUrl && (filename.endsWith('.mp4') || filename.endsWith('.webm') || filename.endsWith('.mov'));
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const el = videoRef.current;
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
            videoObserver.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    videoObserver.observe(el);
    return () => videoObserver.disconnect();
  }, [isVideo]);

  if (isUrl && isVideo) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          aspectRatio: aspectRatio,
          background: '#1A1A1A',
          overflow: 'hidden'
        }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        >
          <source src={filename} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (isUrl) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          aspectRatio: aspectRatio,
          background: '#1A1A1A',
          overflow: 'hidden'
        }}
      >
        <img
          src={optimiseCloudinaryUrl(filename)}
          alt=""
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        background: '#1A1A1A',
        aspectRatio: aspectRatio,
        width: '100%'
      }}
    >
      <span
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '13px',
          color: '#E8E5DE',
          opacity: 0.4,
          letterSpacing: '0.05em'
        }}
      >
        {filename}
      </span>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const observerRef = useRef(null);
  
  // Hover preview state - only for visibility and image src
  const [hoverPreview, setHoverPreview] = useState({
    isVisible: false,
    currentImage: ''
  });
  const previewImageRef = useRef(null);
  const rafIdRef = useRef(null);

  // About section - photo column height should match facts column (B), not bio column (A)
  const factsColumnRef = useRef(null);
  const [photoHeight, setPhotoHeight] = useState(null);

  useEffect(() => {
    if (!factsColumnRef.current) return;
    const el = factsColumnRef.current;
    const updateHeight = () => setPhotoHeight(el.offsetHeight);
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    // Setup Intersection Observer for scroll reveals
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Get stagger delay from data attribute
            const delay = entry.target.dataset.staggerDelay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, parseFloat(delay) * 1000);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    // Layer 2 background shift observer
    const layer2Observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add('layer-two-active');
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    const layer2Element = document.getElementById('layer-2');
    if (layer2Element) {
      layer2Observer.observe(layer2Element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      layer2Observer.disconnect();
      document.body.classList.remove('layer-two-active');
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hover preview handlers - optimized for performance
  const handleRowMouseEnter = (project) => {
    const isUrl = project.heroImage && (project.heroImage.startsWith('http://') || project.heroImage.startsWith('https://'));
    setHoverPreview({
      isVisible: true,
      currentImage: isUrl ? project.heroImage : ''
    });
  };

  const handleRowMouseLeave = () => {
    // Cancel any pending animation frame
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setHoverPreview({
      isVisible: false,
      currentImage: ''
    });
  };

  const handleRowMouseMove = (e) => {
    // Cancel previous frame request
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    
    // Throttle position updates using requestAnimationFrame
    rafIdRef.current = requestAnimationFrame(() => {
      if (previewImageRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        const isRightSide = x > window.innerWidth * 0.6;
        
        // Calculate position offsets
        const offsetX = isRightSide ? x - 444 : x + 24;
        const offsetY = y - 180;
        
        // Directly update transform via DOM - no React re-render
        previewImageRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    });
  };

  return (
    <div style={{ background: '#0E0E0E', minHeight: '100vh', paddingTop: '60px' }}>
      {/* SECTION 01 - ENTRY */}
      <section
        className="relative"
        style={{
          height: '75vh',
          display: 'flex',
          alignItems: 'flex-end'
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        >
          <source src="https://res.cloudinary.com/diqanluvu/video/upload/v1782054351/Landscape_4k_2_final_hunxwo.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.2)',
            zIndex: 2
          }}
        />
        <div
          className="relative z-10 px-8 md:px-16 pb-16"
          style={{ zIndex: 3 }}
        >
          <p
            className="hero-reveal hero-reveal-1"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#E8E5DE',
              opacity: 0.4,
              marginBottom: '16px'
            }}
          >
            Ajay Yadav
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(32px, 6vw, 44px)',
              lineHeight: 1.1,
              color: '#E8E5DE',
              fontWeight: 400,
              marginBottom: '20px'
            }}
          >
            <span className="hero-reveal hero-reveal-2" style={{ display: 'block' }}>Architect.</span>
            <span className="hero-reveal hero-reveal-3" style={{ display: 'block' }}>Computational designer.</span>
          </h1>
          <p
            className="hero-reveal hero-reveal-4"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '21px',
              fontStyle: 'italic',
              color: '#E8E5DE',
              opacity: 0.45
            }}
          >
            Ideas that finish as objects.
          </p>
        </div>
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#E8E5DE',
            opacity: 0.4,
            animation: 'pulse 2s infinite'
          }}
        >
          scroll
        </div>
      </section>

      {/* SECTION 02 - SELECTED WORK */}
      <section className="px-8 md:px-16 py-24 md:py-32">
        <p
          className="reveal section-label-reveal"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#E8E5DE',
            opacity: 0.4,
            marginBottom: '48px'
          }}
        >
          Selected Work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {/* Project 1: LINE rocking chair */}
          <div
            onClick={() => navigate(`/project/1`)}
            className="cursor-pointer cursor-hover transition-opacity duration-200 reveal group"
            style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}
            data-stagger-delay="0"
          >
            <div style={{ position: 'relative' }}>
              <img
                src="https://res.cloudinary.com/diqanluvu/image/upload/v1778848115/Line_slected_works_pemokg.jpg"
                alt="LINE rocking chair"
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                style={{ pointerEvents: 'none' }}
              />
            </div>
            <div style={{ padding: '24px 16px' }}>
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '8px'
                }}
              >
                01
              </p>
              <h3
                className="group-hover:opacity-70 transition-opacity duration-200"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '22px',
                  color: '#E8E5DE',
                  marginBottom: '6px',
                  fontWeight: 400
                }}
              >
                LINE rocking chair
              </h3>
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  letterSpacing: '0.06em'
                }}
              >
                Parametric · Fabricated
              </p>
            </div>
          </div>

          {/* Project 2: LAITLUM wall art */}
          <div
            onClick={() => navigate(`/project/3`)}
            className="cursor-pointer cursor-hover transition-opacity duration-200 reveal group"
            style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}
            data-stagger-delay="0.1"
          >
            <div style={{ position: 'relative' }}>
              <img
                src="https://res.cloudinary.com/diqanluvu/image/upload/v1788719822/L_selected_works_egmvpf.jpg"
                alt="LAITLUM wall art"
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                style={{ pointerEvents: 'none' }}
              />
            </div>
            <div style={{ padding: '24px 16px' }}>
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '8px'
                }}
              >
                03
              </p>
              <h3
                className="group-hover:opacity-70 transition-opacity duration-200"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '22px',
                  color: '#E8E5DE',
                  marginBottom: '6px',
                  fontWeight: 400
                }}
              >
                LAITLUM wall art
              </h3>
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  letterSpacing: '0.06em'
                }}
              >
                Data · CNC · Installed
              </p>
            </div>
          </div>

          {/* Project 3: Mortar House */}
          <div
            onClick={() => navigate(`/project/4`)}
            className="cursor-pointer cursor-hover transition-opacity duration-200 reveal group"
            style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}
            data-stagger-delay="0.2"
          >
            <div style={{ position: 'relative' }}>
              <img
                src="https://res.cloudinary.com/diqanluvu/image/upload/v1781990531/Mortar_house_cover_01_g4sjxq.jpg"
                alt="Mortar House"
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                style={{ pointerEvents: 'none' }}
              />
            </div>
            <div style={{ padding: '24px 16px' }}>
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '8px'
                }}
              >
                04
              </p>
              <h3
                className="group-hover:opacity-70 transition-opacity duration-200"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '22px',
                  color: '#E8E5DE',
                  marginBottom: '6px',
                  fontWeight: 400
                }}
              >
                Mortar House
              </h3>
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  letterSpacing: '0.06em'
                }}
              >
                Interior · Built
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8 reveal" data-stagger-delay="0.3">
          <button
            onClick={() => scrollToSection('work')}
            className="transition-opacity duration-200 hover:opacity-70 cursor-hover"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '11px',
              color: '#E8E5DE',
              opacity: 0.4,
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            View all work ↓
          </button>
        </div>
      </section>

      {/* SECTION 03 - FULL WORK LIST */}
      <section id="work" className="px-8 md:px-16 py-24 md:py-32">
        <p
          className="reveal section-label-reveal"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#E8E5DE',
            opacity: 0.4,
            marginBottom: '48px'
          }}
        >
          Work
        </p>
        <div className="overflow-x-auto">
          <div
            className="grid gap-0 pb-4 reveal"
            style={{
              gridTemplateColumns: '60px 1fr 200px 80px',
              minWidth: '600px',
              borderBottom: '0.5px solid rgba(255, 255, 255, 0.14)'
            }}
          >
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px', textTransform: 'uppercase', color: '#E8E5DE', opacity: 0.4 }}></div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px', textTransform: 'uppercase', color: '#E8E5DE', opacity: 0.4 }}>Project</div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px', textTransform: 'uppercase', color: '#E8E5DE', opacity: 0.4 }}>Type</div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px', textTransform: 'uppercase', color: '#E8E5DE', opacity: 0.4 }}>Year</div>
          </div>
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              onMouseEnter={() => handleRowMouseEnter(project)}
              onMouseLeave={handleRowMouseLeave}
              onMouseMove={handleRowMouseMove}
              className="grid gap-0 py-6 cursor-pointer cursor-hover transition-opacity duration-200 hover:opacity-60 reveal"
              style={{
                gridTemplateColumns: '60px 1fr 200px 80px',
                minWidth: '600px',
                borderBottom: '0.5px solid rgba(255, 255, 255, 0.06)'
              }}
              data-stagger-delay={index * 0.08}
            >
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#E8E5DE', opacity: 0.4 }}>{project.number}</div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '16px', color: '#E8E5DE' }}>{project.shortName || project.name}</div>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#E8E5DE', opacity: 0.4 }}>{project.type}</div>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#E8E5DE', opacity: 0.4 }}>{project.year}</div>
            </div>
          ))}
        </div>
      </section>


      {/* SECTION 05 - THE PAUSE (Replacing "The Door") */}
      <section className="px-8 md:px-16" style={{ padding: '200px 48px' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p
            className="reveal"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '30px',
              fontWeight: 400,
              color: '#E8E5DE',
              opacity: 0.35,
              marginBottom: '16px',
              transform: 'translateY(0)',
              transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            This is the work.
          </p>
          <p
            className="reveal"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '30px',
              fontWeight: 400,
              color: '#E8E5DE',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            data-stagger-delay="0.6"
          >
            But work is never the whole story.
          </p>
        </div>
      </section>

      {/* SECTION 06 - LAYER 2 BEGINS */}
      <section id="layer-2" className="px-8 md:px-16 py-24 md:py-32">
        <p
          className="reveal section-label-reveal"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#E8E5DE',
            opacity: 0.4,
            marginBottom: '24px'
          }}
        >
          The Full Picture
        </p>
        <p
          className="reveal"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '20px',
            fontStyle: 'italic',
            color: '#E8E5DE',
            opacity: 0.45,
            maxWidth: '560px'
          }}
          data-stagger-delay="0.1"
        >
          Other things I built along the way.
        </p>
      </section>

      {/* SECTION 07 - STUDIO TIMELINE */}
      <section className="px-8 md:px-16 py-12">
        <div className="space-y-16">
          {studios.map((studio, index) => (
            <div key={index} className="reveal" data-stagger-delay={index * 0.2}>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-8">
                <div>
                  {studio.website ? (
                    <a
                      href={studio.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity duration-200 hover:opacity-70 cursor-hover"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: '34px',
                        color: '#E8E5DE',
                        marginBottom: '8px',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                    >
                      {studio.name}
                    </a>
                  ) : (
                    <h3
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: '34px',
                        color: '#E8E5DE',
                        marginBottom: '8px',
                        fontWeight: 400,
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {studio.name}
                    </h3>
                  )}
                  <p
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '11px',
                      color: '#E8E5DE',
                      opacity: 0.4
                    }}
                  >
                    {studio.years}
                  </p>
                </div>
                <div>
                  {/* Show description */}
                  <p
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: '17px',
                      fontStyle: 'italic',
                      color: '#E8E5DE',
                      opacity: 0.45,
                      marginBottom: '24px'
                    }}
                  >
                    {studio.description}
                  </p>
                  
                  {/* 3 preview images */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {studio.images.map((image, imgIndex) => (
                      <ImagePlaceholder key={imgIndex} filename={image} aspectRatio="16/9" className="reveal" data-stagger-delay={(imgIndex + 1) * 0.1} />
                    ))}
                  </div>
                  
                  {/* View full gallery link for 7day3io */}
                  {studio.galleryImages && (
                    <div className="mt-6">
                      <button
                        onClick={() => navigate(`/studio/${studio.name.toLowerCase()}`)}
                        className="transition-opacity duration-200 cursor-hover"
                        style={{
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '11px',
                          color: '#E8E5DE',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          animation: 'galleryPulse 2s infinite'
                        }}
                      >
                        View full gallery ({studio.galleryImages.length} projects) →
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {index < studios.length - 1 && (
                <div style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginTop: '48px' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 08 - CONTENT/VIDEOS */}
      <section className="px-8 md:px-16 py-24 md:py-32">
        <p
          className="reveal section-label-reveal"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#E8E5DE',
            opacity: 0.4,
            marginBottom: '24px'
          }}
        >
          Writing & Video
        </p>
        <p
          className="reveal"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '16px',
            fontStyle: 'italic',
            color: '#E8E5DE',
            opacity: 0.45,
            marginBottom: '48px'
          }}
          data-stagger-delay="0.1"
        >
          Architecture, ideas, and the spaces between things.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
          {contentPieces.map((piece, index) => {
            const isImageUrl = piece.thumbnail && (piece.thumbnail.startsWith('http://') || piece.thumbnail.startsWith('https://'));
            
            return (
              <a
                key={piece.id}
                href={piece.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal cursor-hover block group"
                data-stagger-delay={index * 0.1}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    background: '#1A1A1A',
                    overflow: 'hidden',
                    marginBottom: '12px'
                  }}
                >
                  {isImageUrl ? (
                    <img
                      src={piece.thumbnail}
                      alt={piece.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '13px',
                        color: '#E8E5DE',
                        opacity: 0.3,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em'
                      }}
                    >
                      {piece.platform}
                    </div>
                  )}
                  <div
                    className="transition-opacity duration-200"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.25)',
                      opacity: 0,
                      pointerEvents: 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  />
                </div>
                <div style={{ paddingTop: '12px' }}>
                  <p
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      color: '#E8E5DE',
                      opacity: 0.35,
                      marginBottom: '8px'
                    }}
                  >
                    {piece.platform}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: '16px',
                      color: '#E8E5DE',
                      opacity: 0.85,
                      lineHeight: 1.4
                    }}
                  >
                    {piece.title}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
        <div
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            marginTop: '40px'
          }}
          data-stagger-delay="0.4"
        >
          <a
            href="https://www.instagram.com/Yajay9169"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 hover:opacity-70"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#E8E5DE',
              opacity: 0.3,
              textDecoration: 'none'
            }}
          >
            More on Instagram ↗
          </a>
          <a
            href="https://www.linkedin.com/in/ajay-yadav-31b335175/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 hover:opacity-70"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#E8E5DE',
              opacity: 0.3,
              textDecoration: 'none'
            }}
          >
            More on LinkedIn ↗
          </a>
        </div>
      </section>

      {/* SECTION 09 - ABOUT */}
      <section id="about" className="px-8 md:px-16 py-24 md:py-32">
        <p
          className="reveal section-label-reveal"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#E8E5DE',
            opacity: 0.4,
            marginBottom: '48px'
          }}
        >
          About
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1.1fr 1fr',
            columnGap: '64px',
            alignItems: 'stretch'
          }}
        >
          <div style={{ height: '100%' }}>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '15px',
                lineHeight: 1.9,
                color: '#E8E5DE',
                opacity: 0.85
              }}
            >
              <p className="reveal" style={{ marginBottom: '24px' }} data-stagger-delay="0">
                I grew up in Lucknow and studied architecture at NIT Hamirpur, 2018 to 2023. In my second year I started a freelance studio with two batchmates — 7day3io. A hundred-odd projects over three years, mostly 3D visualisation and parametric modelling for small firms and individual clients.
              </p>
              <p className="reveal" style={{ marginBottom: '24px' }} data-stagger-delay="0.15">
                Between that and practice I spent about a year building Grull — a freelancing platform, then a CGI studio. It ran its course and I moved on.
              </p>
              <p className="reveal" style={{ marginBottom: '24px' }} data-stagger-delay="0.3">
                From mid-2024 I worked as an architect on built projects at Logic Design+Build — interiors, custom furniture, a few commercial fit-outs, site delivery. Since the end of 2025 I've been working as a computational designer at a facade practice in Gurugram, scripting parametric systems across a high volume of projects.
              </p>
              <p
                className="reveal"
                style={{
                  fontStyle: 'italic',
                  opacity: 0.6,
                  marginTop: '32px',
                  fontSize: '17px'
                }}
                data-stagger-delay="0.45"
              >
                Outside of work I read — philosophy, psychology, a bit of history. I watch a lot of films.
              </p>
            </div>
          </div>
          <div ref={factsColumnRef} style={{ height: '100%' }}>
            <div className="reveal" style={{ marginBottom: '40px' }}>
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '12px'
                }}
              >
                Education
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '15px',
                  color: '#E8E5DE',
                  lineHeight: 1.6
                }}
              >
                B.Arch — NIT Hamirpur<br />
                2018 – 2023
              </p>
            </div>
            <div className="reveal" style={{ marginBottom: '40px' }} data-stagger-delay="0.1">
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '12px'
                }}
              >
                Currently
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '15px',
                  color: '#E8E5DE',
                  lineHeight: 1.6
                }}
              >
                Computational Designer<br />
                Facade practice, Gurugram<br />
                Dec 2025 – present
              </p>
            </div>
            <div className="reveal" style={{ marginBottom: '40px' }} data-stagger-delay="0.2">
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '12px'
                }}
              >
                Tools
              </p>
              <div class="about-info-text" style={{ fontFamily: "'Instrument Serif', serif", fontSize: '14px', color: '#E8E5DE', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '12px', opacity: 0.7 }}>
                  <span style={{ fontStyle: 'italic', opacity: 0.5, fontSize: '12px' }}>Computational:</span><br />
                  Rhinoceros 3D · Grasshopper · GHPython<br />
                  Lunchbox · Kangaroo · Weaverbird
                </p>
                <p style={{ marginBottom: '12px', opacity: 0.7 }}>
                  <span style={{ fontStyle: 'italic', opacity: 0.5, fontSize: '12px' }}>Fabrication:</span><br />
                  BSolid CNC · V-Ray · Revit · Lumion
                </p>
                <p style={{ opacity: 0.7 }}>
                  <span style={{ fontStyle: 'italic', opacity: 0.5, fontSize: '12px' }}>Visual:</span><br />
                  Photoshop · InDesign · Premiere Pro
                </p>
              </div>
            </div>
            <div className="reveal" style={{ marginBottom: '40px' }} data-stagger-delay="0.3">
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '12px'
                }}
              >
                Elsewhere
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '15px',
                  color: '#E8E5DE',
                  lineHeight: 1.6
                }}
              >
                <a href="#" className="transition-opacity duration-200 hover:opacity-70 cursor-hover" style={{ color: '#E8E5DE', textDecoration: 'none' }}>LinkedIn</a><br />
                <a href="https://collection.cloudinary.com/diqanluvu/bd660be0afd4fc9c977f36b448c23604" target="_blank" rel="noopener noreferrer" className="transition-opacity duration-200 hover:opacity-70 cursor-hover" style={{ color: '#E8E5DE', textDecoration: 'none' }}>Download CV</a> | <a href="#" className="transition-opacity duration-200 hover:opacity-70 cursor-hover" style={{ color: '#E8E5DE', textDecoration: 'none' }}>Request Portfolio</a>
              </p>
            </div>
          </div>
          <div
            className="reveal"
            style={{
              height: photoHeight ? `${photoHeight}px` : 'auto',
              marginLeft: '-40px'
            }}
          >
            <img
              src="https://res.cloudinary.com/diqanluvu/image/upload/v1788721508/Portrait_01_wjtvw8.jpg"
              alt="Ajay Yadav"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>


      {/* SECTION 10 - CONTACT */}
      <section id="contact" className="px-8 md:px-16 py-24 md:py-32">
        <div className="reveal" style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '48px' }} />
        <p
          className="reveal section-label-reveal"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#E8E5DE',
            opacity: 0.4,
            marginBottom: '32px'
          }}
        >
          Get in Touch
        </p>
        <a
          href="mailto:hello@ajay.design"
          className="block transition-opacity duration-200 hover:opacity-70 mb-16 cursor-hover contact-email-reveal reveal"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px, 6vw, 40px)',
            color: '#E8E5DE',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          data-stagger-delay="0.1"
        >
          hello@ajay.design
        </a>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12"
          style={{ borderTop: '0.5px solid rgba(255, 255, 255, 0.08)' }}
        >
          <div className="reveal" data-stagger-delay="0.2">
            <p
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#E8E5DE',
                opacity: 0.4,
                marginBottom: '12px'
              }}
            >
              Location
            </p>
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '15px',
                color: '#E8E5DE'
              }}
            >
              New Delhi, India
            </p>
          </div>
          <div className="reveal" data-stagger-delay="0.4">
            <p
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#E8E5DE',
                opacity: 0.4,
                marginBottom: '12px'
              }}
            >
              Elsewhere
            </p>
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '15px',
                color: '#E8E5DE',
                lineHeight: 1.6
              }}
            >
              <a href="#" className="transition-opacity duration-200 hover:opacity-70 cursor-hover" style={{ color: '#E8E5DE', textDecoration: 'none' }}>LinkedIn</a><br />
              <a href="https://collection.cloudinary.com/diqanluvu/bd660be0afd4fc9c977f36b448c23604" target="_blank" rel="noopener noreferrer" className="transition-opacity duration-200 hover:opacity-70 cursor-hover" style={{ color: '#E8E5DE', textDecoration: 'none' }}>Download CV</a>
            </p>
          </div>
        </div>
      </section>

      {/* Floating hover preview */}
      {hoverPreview.isVisible && (
        <div
          ref={previewImageRef}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '420px',
            aspectRatio: '3/1',
            zIndex: 9000,
            pointerEvents: 'none',
            opacity: hoverPreview.isVisible ? 0.45 : 0,
            transition: `opacity ${hoverPreview.isVisible ? '0.25s' : '0.15s'} ease`
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#111111',
              willChange: 'transform',
              animation: 'floatPreview 3.5s ease-in-out infinite alternate'
            }}
          >
            {hoverPreview.currentImage ? (
              <img
                src={hoverPreview.currentImage}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#1A1A1A'
                }}
              />
            )}
          </div>
        </div>
      )}

      <Footer />

      <style jsx="true">{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        @keyframes galleryPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes floatPreview {
          0% { transform: translateY(-4px); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};

export default Home;
