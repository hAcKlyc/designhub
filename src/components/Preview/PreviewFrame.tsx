import type { DesignParams, CSSVariableSet } from '../../types';
import { generateCSSVariables } from '../../lib/cssVariables';
import { ComponentShowcase } from './ComponentShowcase';

interface Props {
  params: DesignParams;
  compact?: boolean;
  cssOverrides?: CSSVariableSet;
}

export function PreviewFrame({ params, compact = false, cssOverrides }: Props) {
  const vars = generateCSSVariables(params);
  // Merge overrides on top of generated values
  const merged = cssOverrides ? { ...vars, ...cssOverrides } : vars;
  const style = Object.fromEntries(
    Object.entries(merged).map(([k, v]) => [k, v])
  ) as React.CSSProperties;

  if (compact) {
    return (
      <div className="preview-frame" style={style}>
        <MiniPreview />
      </div>
    );
  }

  return (
    <div className="preview-frame" style={{ ...style, background: 'var(--bg)', minHeight: '100%' }}>
      <ComponentShowcase />
    </div>
  );
}

function MiniPreview() {
  return (
    <div style={{
      background: 'var(--bg)',
      fontFamily: 'var(--font-body)',
      height: '100%',
      minHeight: '220px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Large hero — the visual identity */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '24px 20px 16px',
      }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: 'var(--heading-letter-spacing)',
          lineHeight: 1.1,
          marginBottom: '8px',
        }}>
          Aa
        </div>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--text-secondary)',
          letterSpacing: 'var(--heading-letter-spacing)',
          lineHeight: 1.3,
          marginBottom: '14px',
        }}>
          The quick brown fox jumps
        </div>

        {/* Button + badge row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            background: 'var(--primary)',
            color: 'var(--primary-text)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
          }}>
            Button
          </div>
          <div style={{
            background: 'var(--bg-elevated)',
            color: 'var(--text-muted)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '11px',
            fontWeight: 500,
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-body)',
          }}>
            Ghost
          </div>
        </div>
      </div>

      {/* Bottom color strip — shows palette at a glance */}
      <div style={{
        display: 'flex',
        height: '48px',
        flexShrink: 0,
      }}>
        <div style={{ flex: 2, background: 'var(--primary)' }} />
        <div style={{ flex: 1, background: 'var(--accent)' }} />
        <div style={{ flex: 1, background: 'var(--color-primary-3)' }} />
        <div style={{ flex: 1, background: 'var(--bg-elevated)' }} />
        <div style={{ flex: 1, background: 'var(--text)' }} />
      </div>

      {/* Floating radius indicator */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '32px',
        height: '32px',
        background: 'var(--primary)',
        borderRadius: 'var(--radius-lg)',
        opacity: 0.3,
      }} />
    </div>
  );
}
