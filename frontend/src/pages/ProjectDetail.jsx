import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects } from '../mock';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div style={{ background: '#0E0E0E', minHeight: '100vh', padding: '100px 48px', color: '#E8E5DE' }}>
        <p>Project not found</p>
        <Link to="/" style={{ color: '#E8E5DE' }}>← Back to home</Link>
      </div>
    );
  }

  const nextProject = projects[(project.id % projects.length)];

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
    <div style={{ background: '#0E0E0E', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="px-8 md:px-16">
        {/* Back link */}
        <Link
          to="/#work"
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
          ← Work
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '11px',
              color: '#E8E5DE',
              opacity: 0.4,
              marginBottom: '8px'
            }}
          >
            {project.number}
          </p>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(36px, 8vw, 64px)',
              color: '#E8E5DE',
              fontWeight: 400,
              marginBottom: '16px',
              lineHeight: 1.1
            }}
          >
            {project.name}
          </h1>
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontStyle: 'italic',
              color: '#E8E5DE',
              opacity: 0.45,
              marginBottom: '24px'
            }}
          >
            {project.type}
          </p>
          <div
            className="flex flex-wrap gap-4"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '13px',
              color: '#E8E5DE',
              opacity: 0.4
            }}
          >
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.type}</span>
            {project.location && (
              <>
                <span>·</span>
                <span>{project.location}</span>
              </>
            )}
          </div>
        </div>

        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '64px' }} />

        {/* Hero image */}
        <div className="mb-16">
          <ImagePlaceholder filename={project.heroImage} aspectRatio="16/9" />
        </div>

        {/* Body content */}
        <div className="max-w-3xl mx-auto mb-16">
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#E8E5DE',
              opacity: 0.85,
              marginBottom: '48px'
            }}
          >
            {project.description}
          </p>

          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#E8E5DE',
              opacity: 0.4,
              marginBottom: '16px'
            }}
          >
            Process
          </p>
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#E8E5DE',
              opacity: 0.85
            }}
          >
            {project.process}
          </p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mb-16">
          {project.images.map((image, index) => (
            <ImagePlaceholder key={index} filename={image} aspectRatio="4/3" />
          ))}
        </div>

        {/* Tools */}
        <div className="max-w-3xl mx-auto mb-24">
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '11px',
              color: '#E8E5DE',
              opacity: 0.4
            }}
          >
            Tools —{' '}
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                opacity: 0.6
              }}
            >
              {project.tools}
            </span>
          </p>
        </div>

        {/* Next project */}
        <div className="flex justify-end pb-24">
          <button
            onClick={() => navigate(`/project/${nextProject.id}`)}
            className="transition-opacity duration-200 hover:opacity-70"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              color: '#E8E5DE',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Next → {nextProject.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;