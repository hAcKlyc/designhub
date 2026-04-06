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
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 bg-neutral-800 rounded-lg p-0.5">
        {hasDemo && (
          <button
            onClick={() => setViewMode('demo')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'demo' ? 'bg-neutral-700 text-neutral-100 shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Demo Preview
          </button>
        )}
        <button
          onClick={() => setViewMode('system')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            viewMode === 'system' ? 'bg-neutral-700 text-neutral-100 shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Design System
        </button>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 transition-all"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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
                // Only apply real-site overrides when mode matches the design's default
                baseStyle?.cssOverrides && params.mode === baseStyle.params.mode
                  ? baseStyle.cssOverrides
                  : undefined
              }
            />
          )}
        </div>

        {/* Control Panel — fixed, scrolls independently */}
        <div style={{ width: '320px', flexShrink: 0, overflowY: 'auto', borderLeft: '1px solid #2a2a2a', background: '#0a0a0a' }}>
          <div className="p-4 border-b border-neutral-800">
            <button
              onClick={() => navigate('/')}
              className="text-neutral-500 hover:text-neutral-300 text-sm mb-2 flex items-center gap-1"
            >
              ← Gallery
            </button>
            <h2 className="text-neutral-100 font-semibold text-lg">{styleName}</h2>
            <p className="text-neutral-500 text-xs mt-1">{styleDesc}</p>
            {hasDemo && (
              <div className="mt-2 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400 text-[10px] uppercase tracking-wider font-medium">Featured Demo</span>
              </div>
            )}
          </div>

          {baseStyle && (
            <>
              <ControlPanel params={params} onChange={updateParam} />
              <div className="p-4 border-t border-neutral-800">
                <button onClick={() => setShowExport(true)} className="w-full bg-brand hover:bg-brand-hover text-white py-2.5 rounded-lg font-medium text-sm transition-colors">
                  Export DESIGN.md
                </button>
                <button onClick={() => setParams(baseStyle.params)} className="w-full mt-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 py-2 rounded-lg text-sm transition-colors">
                  Reset to Default
                </button>
              </div>
            </>
          )}

          {!baseStyle && referenceDesign && (
            <div className="p-4 text-neutral-500 text-sm">
              <p className="mb-3">Featured reference design based on the real {referenceDesign.name} website.</p>
              <a href={referenceDesign.demoUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-2 rounded-lg text-sm transition-colors">
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
