import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { DesignParams } from '../../types';
import { PreviewFrame } from '../Preview/PreviewFrame';
import { ControlPanel } from './ControlPanel';
import { ExportModal } from './ExportModal';
import { Header } from '../shared/Header';
import { buildGoogleFontsUrl, getFontPair } from '../../data/fonts';
import { DESIGN_STYLES } from '../../data/styles/index';
import { REFERENCE_DESIGNS } from '../../data/references';

type ViewMode = 'demo' | 'system';

export function PlaygroundPage() {
  const { styleId } = useParams<{ styleId: string }>();
  const navigate = useNavigate();
  const [showExport, setShowExport] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('demo');

  const baseStyle = DESIGN_STYLES.find(s => s.id === styleId);
  const referenceDesign = REFERENCE_DESIGNS.find(r => r.id === styleId);
  const hasDemo = !!referenceDesign;

  useEffect(() => {
    if (!hasDemo) setViewMode('system');
  }, [hasDemo]);

  const [params, setParams] = useState<DesignParams>(
    baseStyle?.params ?? {
      primaryHue: 220, saturation: 'medium', mode: 'light', fontPair: 'clean-system',
      borderRadius: 8, spacingDensity: 'default', depthStyle: 'subtle',
      typeScaleRatio: 1.25, headingLetterSpacing: -0.02, accentHue: 280,
    }
  );

  useEffect(() => { if (baseStyle) setParams(baseStyle.params); }, [baseStyle]);

  // Lock body scroll on playground
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => { document.body.style.overflow = ''; document.body.style.height = ''; };
  }, []);

  useEffect(() => {
    const pair = getFontPair(params.fontPair);
    const url = buildGoogleFontsUrl(pair);
    const id = 'designhub-fonts';
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.id = id; link.rel = 'stylesheet'; document.head.appendChild(link); }
    link.href = url;
  }, [params.fontPair]);

  const updateParam = useCallback(<K extends keyof DesignParams>(key: K, value: DesignParams[K]) => {
    setParams(prev => ({ ...prev, [key]: value }));
  }, []);

  const styleName = baseStyle?.name ?? referenceDesign?.name ?? 'Unknown';
  const styleDesc = baseStyle?.description ?? referenceDesign?.description ?? '';

  if (!baseStyle && !referenceDesign) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex items-center justify-center h-96 text-neutral-500">
          Style not found.{' '}
          <button onClick={() => navigate('/')} className="text-brand ml-2 hover:underline">Back to gallery</button>
        </div>
      </div>
    );
  }

  const isDark = params.mode === 'dark';
  const toggleTheme = () => updateParam('mode', isDark ? 'light' : 'dark');

  // Tab switcher + theme toggle for header center
  const tabSwitcher = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: '#F4F4F1', borderRadius: '10px', padding: '3px' }}>
        {hasDemo && (
          <button
            onClick={() => setViewMode('demo')}
            style={{
              padding: '6px 16px', borderRadius: '8px', border: 'none', fontSize: '13px',
              fontWeight: 500, cursor: 'pointer', transition: 'all 200ms',
              background: viewMode === 'demo' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'demo' ? '#1A1A1A' : '#7A7A7A',
              boxShadow: viewMode === 'demo' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            Demo
          </button>
        )}
        <button
          onClick={() => setViewMode('system')}
          style={{
            padding: '6px 16px', borderRadius: '8px', border: 'none', fontSize: '13px',
            fontWeight: 500, cursor: 'pointer', transition: 'all 200ms',
            background: viewMode === 'system' ? '#FFFFFF' : 'transparent',
            color: viewMode === 'system' ? '#1A1A1A' : '#7A7A7A',
            boxShadow: viewMode === 'system' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          Design System
        </button>
      </div>

      <button
        onClick={toggleTheme}
        style={{
          width: '32px', height: '32px', borderRadius: '8px', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '14px', transition: 'all 200ms',
          background: 'transparent', color: '#7A7A7A',
        }}
        title={isDark ? 'Light Mode' : 'Dark Mode'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  );

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header centerContent={tabSwitcher} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Preview Area — scrolls independently */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {viewMode === 'demo' && referenceDesign ? (
            <iframe
              src={referenceDesign.demoUrl}
              className="w-full border-0"
              style={{ height: '100%' }}
              title={`${styleName} Demo`}
            />
          ) : (
            <PreviewFrame
              params={params}
              cssOverrides={
                params.mode === 'dark'
                  ? baseStyle?.cssOverridesDark
                  : baseStyle?.cssOverrides
              }
            />
          )}
        </div>

        {/* Control Panel — fixed, scrolls independently */}
        <div style={{ width: '320px', flexShrink: 0, overflowY: 'auto', borderLeft: '1px solid #E8E8E5', background: '#FFFFFF' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #F0F0ED' }}>
            <button
              onClick={() => navigate('/')}
              style={{ color: '#7A7A7A', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              ← Gallery
            </button>
            <h2 className="font-serif" style={{ fontSize: '20px', fontWeight: 400, color: '#1A1A1A', margin: 0 }}>{styleName}</h2>
            <p style={{ color: '#7A7A7A', fontSize: '12px', marginTop: '4px' }}>{styleDesc}</p>
            {hasDemo && (
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2D6A4F' }} />
                <span style={{ color: '#2D6A4F', fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontWeight: 600 }}>Featured</span>
              </div>
            )}
          </div>

          {baseStyle && (
            <>
              <ControlPanel params={params} onChange={updateParam} />
              <div style={{ padding: '16px', borderTop: '1px solid #F0F0ED' }}>
                <button
                  onClick={() => setShowExport(true)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: '#2D6A4F', color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer', transition: 'background 200ms' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#245A42')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#2D6A4F')}
                >
                  Export DESIGN.md
                </button>
                <button
                  onClick={() => setParams(baseStyle.params)}
                  style={{ width: '100%', marginTop: '8px', padding: '8px', borderRadius: '10px', border: '1px solid #E8E8E5', background: 'transparent', color: '#7A7A7A', fontSize: '13px', cursor: 'pointer', transition: 'all 200ms' }}
                >
                  Reset to Default
                </button>
              </div>
            </>
          )}

          {!baseStyle && referenceDesign && (
            <div style={{ padding: '16px', color: '#7A7A7A', fontSize: '13px' }}>
              <p style={{ marginBottom: '12px' }}>Featured reference design based on {referenceDesign.name}.</p>
              <a href={referenceDesign.demoUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', border: '1px solid #E8E8E5', color: '#4A4A4A', padding: '8px', borderRadius: '10px', fontSize: '13px', textDecoration: 'none', transition: 'all 200ms' }}>
                Open Full Page ↗
              </a>
            </div>
          )}
        </div>

        {showExport && baseStyle && (
          <ExportModal style={baseStyle} params={params} onClose={() => setShowExport(false)} />
        )}
      </div>
    </div>
  );
}
