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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <div>
            <h3 className="text-neutral-100 font-semibold">Export DESIGN.md</h3>
            <p className="text-neutral-500 text-xs mt-0.5">{style.name} — 9-section format</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                copied
                  ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                  : 'bg-brand hover:bg-brand-hover text-white'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={download}
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors"
            >
              Download .md
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-auto p-4">
          <pre className="text-neutral-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
            {markdown}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-800 text-center">
          <span className="text-neutral-600 text-xs">
            {Math.round(markdown.length / 1024)}KB — Drop this file as DESIGN.md in your project root for AI agents to read.
          </span>
        </div>
      </div>
    </div>
  );
}
