import { useState, useMemo } from 'react';
import type { DesignParams, DesignStyle } from '../../types';
import { generateDesignMd } from '../../lib/export';

interface Props {
  style: DesignStyle;
  params: DesignParams;
  onClose: () => void;
}

export function ExportModal({ style, params, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const markdown = useMemo(() => generateDesignMd(style, params), [style, params]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DESIGN-${style.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#FFFFFF', border: '1px solid #E8E8E5',
        borderRadius: '16px', width: '100%', maxWidth: '720px',
        maxHeight: '85vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid #F0F0ED',
        }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: '18px', fontWeight: 400, color: '#1A1A1A', margin: 0 }}>
              Export DESIGN.md
            </h3>
            <p style={{ fontSize: '12px', color: '#7A7A7A', marginTop: '2px' }}>
              {style.name} — 9-section format
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={copyToClipboard}
              style={{
                padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 500,
                border: 'none', cursor: 'pointer', transition: 'all 200ms',
                background: copied ? '#F0F7F4' : '#2D6A4F',
                color: copied ? '#2D6A4F' : '#FFFFFF',
              }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <button
              onClick={download}
              style={{
                padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 500,
                border: '1px solid #E8E8E5', cursor: 'pointer', transition: 'all 200ms',
                background: 'transparent', color: '#4A4A4A',
              }}
            >
              Download .md
            </button>
            <button
              onClick={onClose}
              style={{
                width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', borderRadius: '8px', border: 'none',
                cursor: 'pointer', color: '#A0A0A0', background: 'transparent',
                fontSize: '16px', transition: 'all 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F4F4F1'; e.currentTarget.style.color = '#1A1A1A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#A0A0A0'; }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Preview */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <pre style={{
            color: '#4A4A4A', fontSize: '12px',
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            whiteSpace: 'pre-wrap', lineHeight: 1.7, margin: 0,
          }}>
            {markdown}
          </pre>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px', borderTop: '1px solid #F0F0ED',
          textAlign: 'center',
        }}>
          <span style={{ color: '#A0A0A0', fontSize: '12px' }}>
            {Math.round(markdown.length / 1024)}KB — Drop as DESIGN.md in your project root for AI agents.
          </span>
        </div>
      </div>
    </div>
  );
}
