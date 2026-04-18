import React from 'react';
import { useNavigate } from 'react-router-dom';
import { projects, studios, processSteps, videos } from '../mock';

const Home = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ImagePlaceholder = ({ filename, aspectRatio = '16/9' }) => (
    <div
      className="flex items-center justify-center"
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

  return (
    <div style={{ background: '#0E0E0E', minHeight: '100vh', paddingTop: '60px' }}>
      {/* SECTION 01 - ENTRY */}
      <section
        className="relative"
        style={{
          height: '100vh',
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
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 2
          }}
        />
        <div
          className="relative z-10 px-8 md:px-16 pb-16"
          style={{ zIndex: 3 }}
        >
          <p
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
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(32px, 6vw, 48px)',
              lineHeight: 1.1,
              color: '#E8E5DE',
              fontWeight: 400,
              marginBottom: '20px'
            }}
          >
            Architect.<br />
            Computational designer.
          </h1>
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ borderLeft: '0.5px solid rgba(255, 255, 255, 0.08)' }}>
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-60 px-6 py-8"
              style={{ borderRight: '0.5px solid rgba(255, 255, 255, 0.08)' }}
            >
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '12px'
                }}
              >
                {project.number}
              </p>
              <h3
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '24px',
                  color: '#E8E5DE',
                  marginBottom: '8px',
                  fontWeight: 400
                }}
              >
                {project.name}
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
                {project.type}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={() => scrollToSection('work')}
            className="transition-opacity duration-200 hover:opacity-70"
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
            className="grid gap-0 pb-4"
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
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="grid gap-0 py-6 cursor-pointer transition-opacity duration-200 hover:opacity-60"
              style={{
                gridTemplateColumns: '60px 1fr 200px 80px',
                minWidth: '600px',
                borderBottom: '0.5px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#E8E5DE', opacity: 0.4 }}>{project.number}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#E8E5DE' }}>{project.name}</div>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#E8E5DE', opacity: 0.4 }}>{project.type}</div>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#E8E5DE', opacity: 0.4 }}>{project.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04 - PROCESS */}
      <section className="px-8 md:px-16 py-24 md:py-32">
        <p
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
          Process
        </p>
        <p
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            fontStyle: 'italic',
            color: '#E8E5DE',
            opacity: 0.45,
            maxWidth: '520px',
            marginBottom: '64px'
          }}
        >
          Every project starts as a rule set. The geometry follows from the logic. The object follows from the geometry.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ borderLeft: '0.5px solid rgba(255, 255, 255, 0.08)' }}>
          {processSteps.map((step) => (
            <div key={step.number} className="px-6 py-8" style={{ borderRight: '0.5px solid rgba(255, 255, 255, 0.08)' }}>
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '12px'
                }}
              >
                {step.number}
              </p>
              <h3
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '20px',
                  color: '#E8E5DE',
                  marginBottom: '16px',
                  fontWeight: 400
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px',
                  color: '#E8E5DE',
                  opacity: 0.45,
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}
              >
                {step.description}
              </p>
              <ImagePlaceholder filename={step.image} aspectRatio="4/3" />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 05 - THE DOOR */}
      <section className="px-8 md:px-16 py-32 md:py-40">
        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '80px' }} />
        <div className="text-center max-w-2xl mx-auto">
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#E8E5DE',
              opacity: 0.4,
              marginBottom: '32px'
            }}
          >
            You've seen the work
          </p>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(28px, 5vw, 40px)',
              lineHeight: 1.2,
              color: '#E8E5DE',
              marginBottom: '24px',
              fontWeight: 400
            }}
          >
            There's more to the story.
          </h2>
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontStyle: 'italic',
              color: '#E8E5DE',
              opacity: 0.45,
              marginBottom: '48px'
            }}
          >
            Studios built. Things made. Ideas written down.
          </p>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => scrollToSection('layer-2')}
              className="transition-opacity duration-200 hover:opacity-70"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                color: '#E8E5DE',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Continue ↓
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="transition-opacity duration-200 hover:opacity-70"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '13px',
                color: '#E8E5DE',
                opacity: 0.4,
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Skip to contact →
            </button>
          </div>
        </div>
        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginTop: '80px' }} />
      </section>

      {/* SECTION 06 - LAYER 2 BEGINS */}
      <section id="layer-2" className="px-8 md:px-16 py-24 md:py-32">
        <p
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
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '20px',
            fontStyle: 'italic',
            color: '#E8E5DE',
            opacity: 0.45,
            maxWidth: '560px'
          }}
        >
          Before the job titles. A studio, a startup, a creative practice — sometimes all three at once.
        </p>
      </section>

      {/* SECTION 07 - STUDIO TIMELINE */}
      <section className="px-8 md:px-16 py-12">
        <div className="space-y-16">
          {studios.map((studio, index) => (
            <div key={index}>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-8">
                <div>
                  <h3
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '28px',
                      color: '#E8E5DE',
                      marginBottom: '8px',
                      fontWeight: 400
                    }}
                  >
                    {studio.name}
                  </h3>
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
                  <p
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '16px',
                      fontStyle: 'italic',
                      color: '#E8E5DE',
                      opacity: 0.45,
                      marginBottom: '24px'
                    }}
                  >
                    {studio.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {studio.images.map((image, imgIndex) => (
                      <ImagePlaceholder key={imgIndex} filename={image} aspectRatio="16/9" />
                    ))}
                  </div>
                </div>
              </div>
              {index < studios.length - 1 && (
                <div style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginTop: '48px' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 08 - ABOUT */}
      <section id="about" className="px-8 md:px-16 py-24 md:py-32">
        <p
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: 1.9,
                color: '#E8E5DE',
                opacity: 0.85
              }}
            >
              <p style={{ marginBottom: '24px' }}>
                I grew up in Lucknow and studied architecture at NIT Hamirpur — five years of building things, breaking definitions, and learning that the distance between an idea and a built object is almost always shorter than people think.
              </p>
              <p style={{ marginBottom: '24px' }}>
                During college I ran a freelance studio with two batchmates. We called it 7day3io. It lasted three years and produced more than a hundred projects. I learned how to work fast, talk to clients, and deliver things that got built.
              </p>
              <p style={{ marginBottom: '24px' }}>
                After graduating I tried building something from scratch — a creative studio, a marketplace, a CGI practice. Some of it worked. All of it taught me something. The thread through all of it was the same: I want to understand how something works, then make it.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Right now I'm a computational designer at a facade practice in Delhi. The work is technical and I like it. But I'm building toward something more: a practice in Europe or the UAE where computation is a design position, not a production step.
              </p>
              <p
                style={{
                  fontStyle: 'italic',
                  opacity: 0.6,
                  marginTop: '32px'
                }}
              >
                Outside the work I read widely — philosophy, evolutionary psychology, the long history of how humans became what we are. It shapes how I see problems. I don't separate the thinking from the making.
              </p>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '40px' }}>
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
                  fontFamily: 'Georgia, serif',
                  fontSize: '15px',
                  color: '#E8E5DE',
                  lineHeight: 1.6
                }}
              >
                B.Arch — NIT Hamirpur<br />
                2018 – 2023
              </p>
            </div>
            <div style={{ marginBottom: '40px' }}>
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
                  fontFamily: 'Georgia, serif',
                  fontSize: '15px',
                  color: '#E8E5DE',
                  lineHeight: 1.6
                }}
              >
                Computational Designer<br />
                Facade practice, New Delhi<br />
                Dec 2025 – present
              </p>
            </div>
            <div style={{ marginBottom: '40px' }}>
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
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#E8E5DE', lineHeight: 1.8 }}>
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
            <div>
              <a
                href="#"
                className="transition-opacity duration-200 hover:opacity-70"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '15px',
                  color: '#E8E5DE',
                  textDecoration: 'none'
                }}
              >
                → Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 09 - CONTENT/VIDEOS */}
      <section className="px-8 md:px-16 py-24 md:py-32">
        <p
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
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '16px',
            fontStyle: 'italic',
            color: '#E8E5DE',
            opacity: 0.45,
            marginBottom: '48px'
          }}
        >
          Architecture, ideas, and the spaces between things.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {videos.map((video, index) => (
            <div key={index}>
              <div
                className="flex items-center justify-center cursor-pointer transition-opacity duration-200 hover:opacity-70"
                style={{
                  background: '#1A1A1A',
                  aspectRatio: '16/9',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '12px solid rgba(255, 255, 255, 0.6)',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      marginLeft: '4px'
                    }}
                  />
                </div>
              </div>
              <p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px',
                  color: '#E8E5DE',
                  opacity: 0.45
                }}
              >
                {video.title}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '11px',
            color: '#E8E5DE',
            opacity: 0.4,
            textAlign: 'center'
          }}
        >
          Videos from Instagram / YouTube. I will replace these with embed links.
        </p>
      </section>

      {/* SECTION 10 - CONTACT */}
      <section id="contact" className="px-8 md:px-16 py-24 md:py-32">
        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '48px' }} />
        <p
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
          className="block transition-opacity duration-200 hover:opacity-70 mb-16"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(28px, 6vw, 44px)',
            color: '#E8E5DE',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          hello@ajay.design
        </a>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12"
          style={{ borderTop: '0.5px solid rgba(255, 255, 255, 0.08)' }}
        >
          <div>
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
                fontFamily: 'Georgia, serif',
                fontSize: '15px',
                color: '#E8E5DE'
              }}
            >
              New Delhi, India
            </p>
          </div>
          <div>
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
              Open To
            </p>
            <p
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '15px',
                color: '#E8E5DE',
                lineHeight: 1.6
              }}
            >
              Netherlands · Germany · UAE<br />
              Full-time · from mid-2027
            </p>
          </div>
          <div>
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
                fontFamily: 'Georgia, serif',
                fontSize: '15px',
                color: '#E8E5DE',
                lineHeight: 1.6
              }}
            >
              <a href="#" className="transition-opacity duration-200 hover:opacity-70" style={{ color: '#E8E5DE', textDecoration: 'none' }}>LinkedIn</a><br />
              Portfolio PDF on request
            </p>
          </div>
        </div>
        <div className="text-center pt-20">
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#E8E5DE',
              opacity: 0.4
            }}
          >
            ajay.design
          </p>
        </div>
      </section>

      <style jsx="true">{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Home;