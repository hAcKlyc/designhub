import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { DesignParams } from '../../types';
import { PreviewFrame } from '../Preview/PreviewFrame';
import { ControlPanel } from './ControlPanel';
import { ExportModal } from './ExportModal';
import { buildGoogleFontsUrl, getFontPair } from '../../data/fonts';
import { DESIGN_STYLES } from '../../data/styles/index';

export function PlaygroundPage() {
  const { styleId } = useParams<{ styleId: string }>();
  const navigate = useNavigate();
  const [showExport, setShowExport] = useState(false);

  const baseStyle = DESIGN_STYLES.find(s => s.id === styleId);

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

  // Reset params when style changes
  useEffect(() => {
    if (baseStyle) {
      setParams(baseStyle.params);
    }
  }, [baseStyle]);

  // Load Google Fonts
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

  if (!baseStyle) {
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
      {/* Preview */}
      <div className="flex-1 overflow-auto bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <PreviewFrame params={params} />
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
          <h2 className="text-neutral-100 font-semibold text-lg">{baseStyle.name}</h2>
          <p className="text-neutral-500 text-xs mt-1">{baseStyle.description}</p>
        </div>

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
      </div>

      {showExport && (
        <ExportModal
          style={baseStyle}
          params={params}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
