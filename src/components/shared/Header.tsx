import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  centerContent?: ReactNode;
}

export function Header({ centerContent }: Props) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      background: 'rgba(250,250,248,0.85)',
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      borderBottom: '1px solid #F0F0ED',
    }}>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          flexShrink: 0,
        }}
      >
        <span style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: '20px',
          fontWeight: 400,
          color: '#1A1A1A',
          letterSpacing: '-0.01em',
        }}>
          design-system
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '14px',
          fontWeight: 400,
          color: '#2D6A4F',
        }}>
          .md
        </span>
      </Link>

      {centerContent && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {centerContent}
        </div>
      )}

      <nav style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: centerContent ? '0' : 'auto' }}>
        <a
          href="https://github.com/hAcKlyc/designhub"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#7A7A7A',
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'color 200ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1A1A1A')}
          onMouseLeave={e => (e.currentTarget.style.color = '#7A7A7A')}
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
