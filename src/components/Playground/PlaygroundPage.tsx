import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { DesignParams } from '../../types';
import { PreviewFrame } from '../Preview/PreviewFrame';
import { ControlPanel } from './ControlPanel';
import { ExportModal } from './ExportModal';
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

  // Default to 'system' if no demo available
  useEffect(() => {
    if (!hasDemo) setViewMode('system');
  }, [hasDemo]);

  const [params, setParams] = useState<DesignParams>(
    baseStyle?.params ?? {
      primaryHue: 220,
      saturation: 'medium',
      mode: 'light',
      fontPair: 'clean-system',
      borderRadius: 8,
      spacingDensity: 'default',
      depthStyle: 'subtle',
      typeScaleRatio: 1.25,
      headingLetterSpacing: -0.02,
      accentHue: 280,
    }
  );

  useEffect(() => {
    if (baseStyle) {
      setParams(baseStyle.params);
    }
  }, [baseStyle]);

  useEffect(() => {
    const pair = getFontPair(params.fontPair);
    const url = buildGoogleFontsUrl(pair);
    const id = 'designhub-fonts';
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [params.fontPair]);

  const updateParam = useCallback(<K extends keyof DesignParams>(key: K, value: DesignParams[K]) => {
    setParams(prev => ({ ...prev, [key]: value }));
  }, []);

  // For reference designs without a generated style, show a simplified view
  const styleName = baseStyle?.name ?? referenceDesign?.name ?? 'Unknown';
  const styleDesc = baseStyle?.description ?? referenceDesign?.description ?? '';

  if (!baseStyle && !referenceDesign) {
    return (
      <div className="flex items-center justify-center h-96 text-neutral-500">
        Style not found.{' '}
        <button onClick={() => navigate('/')} className="text-brand ml-2 hover:underline">
          Back to gallery
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Preview Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tab Bar */}
        <div className="flex items-center gap-1 px-4 py-2 bg-neutral-900 border-b border-neutral-800">
          {hasDemo && (
            <button
              onClick={() => setViewMode('demo')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === 'demo'
                  ? 'bg-neutral-700 text-neutral-100'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Demo Preview
            </button>
          )}
          <button
            onClick={() => setViewMode('system')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'system'
                ? 'bg-neutral-700 text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Design System
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-neutral-900">
          {viewMode === 'demo' && referenceDesign ? (
            <iframe
              src={referenceDesign.demoUrl}
              className="w-full h-full border-0"
              title={`${styleName} Demo`}
            />
          ) : (
            <div className="max-w-4xl mx-auto">
              <PreviewFrame params={params} cssOverrides={baseStyle?.cssOverrides} />
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-80 flex-shrink-0 border-l border-neutral-800 bg-neutral-900 overflow-auto">
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
              <span className="text-green-400 text-[10px] uppercase tracking-wider font-medium">
                Featured Demo
              </span>
            </div>
          )}
        </div>

        {baseStyle && (
          <>
            <ControlPanel params={params} onChange={updateParam} />
            <div className="p-4 border-t border-neutral-800">
              <button
                onClick={() => setShowExport(true)}
                className="w-full bg-brand hover:bg-brand-hover text-white py-2.5 rounded-lg font-medium text-sm transition-colors"
              >
                Export DESIGN.md
              </button>
              <button
                onClick={() => setParams(baseStyle.params)}
                className="w-full mt-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 py-2 rounded-lg text-sm transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </>
        )}

        {!baseStyle && referenceDesign && (
          <div className="p-4 text-neutral-500 text-sm">
            <p className="mb-3">This is a featured reference design based on the real {referenceDesign.name} website.</p>
            <a
              href={referenceDesign.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-2 rounded-lg text-sm transition-colors"
            >
              Open Full Page ↗
            </a>
          </div>
        )}
      </div>

      {showExport && baseStyle && (
        <ExportModal
          style={baseStyle}
          params={params}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
