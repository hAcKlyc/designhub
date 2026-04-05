import type { DesignParams } from '../../types';
import { generateCSSVariables } from '../../lib/cssVariables';
import { MockWebsite } from './MockWebsite';
import { ComponentShowcase } from './ComponentShowcase';

interface Props {
  params: DesignParams;
  compact?: boolean; // For gallery thumbnail
}

export function PreviewFrame({ params, compact = false }: Props) {
  const vars = generateCSSVariables(params);
  const style = Object.fromEntries(
    Object.entries(vars).map(([k, v]) => [k, v])
  ) as React.CSSProperties;

  if (compact) {
    return (
      <div className="preview-frame" style={style}>
        <MiniPreview />
      </div>
    );
  }

  return (
    <div className="preview-frame overflow-auto" style={style}>
      <MockWebsite />
      <div style={{ borderTop: '1px solid var(--border)', margin: 'var(--space-12) 0' }} />
      <ComponentShowcase />
    </div>
  );
}

function MiniPreview() {
  return (
    <div style={{
      background: 'var(--bg)',
      padding: '16px',
      fontFamily: 'var(--font-body)',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {/* Mini hero */}
      <div>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--text)',
          letterSpacing: 'var(--heading-letter-spacing)',
          lineHeight: 1.2,
          marginBottom: '4px',
        }}>
          Design System
        </div>
        <div style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          lineHeight: 1.4,
        }}>
          A beautiful interface built with intention.
        </div>
      </div>

      {/* Mini buttons */}
      <div style={{ display: 'flex', gap: '6px' }}>
        <div style={{
          background: 'var(--primary)',
          color: 'var(--primary-text)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-md)',
          fontSize: '10px',
          fontWeight: 500,
        }}>
          Primary
        </div>
        <div style={{
          background: 'var(--bg-elevated)',
          color: 'var(--text-secondary)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-md)',
          fontSize: '10px',
          fontWeight: 500,
          border: '1px solid var(--border)',
        }}>
          Secondary
        </div>
      </div>

      {/* Mini cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {[0, 1].map(i => (
          <div key={i} style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '8px',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{
              width: '100%',
              height: '24px',
              background: i === 0 ? 'var(--primary-bg)' : 'var(--color-accent-2)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '6px',
            }} />
            <div style={{
              fontSize: '9px',
              color: 'var(--text)',
              fontWeight: 500,
              marginBottom: '2px',
            }}>Card Title</div>
            <div style={{
              fontSize: '8px',
              color: 'var(--text-muted)',
            }}>Description text</div>
          </div>
        ))}
      </div>

      {/* Color dots */}
      <div style={{ display: 'flex', gap: '4px', marginTop: 'auto' }}>
        {['var(--primary)', 'var(--accent)', 'var(--text)', 'var(--border)', 'var(--bg-elevated)'].map((c, i) => (
          <div key={i} style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: c,
            border: '1px solid var(--border-subtle)',
          }} />
        ))}
      </div>
    </div>
  );
}
