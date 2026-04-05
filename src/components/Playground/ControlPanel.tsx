import { useState } from 'react';
import type { DesignParams, SaturationLevel, SpacingDensity, DepthStyle, ThemeMode } from '../../types';
import { FONT_PAIRS } from '../../data/fonts';

interface Props {
  params: DesignParams;
  onChange: <K extends keyof DesignParams>(key: K, value: DesignParams[K]) => void;
}

export function ControlPanel({ params, onChange }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="p-4 space-y-5">
      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
        Core
      </div>

      {/* Primary Hue */}
      <ControlGroup label="Primary Color">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0} max={360} step={1}
            value={params.primaryHue}
            onChange={e => onChange('primaryHue', Number(e.target.value))}
            className="flex-1 accent-brand"
            style={{
              background: `linear-gradient(to right, hsl(0,70%,50%), hsl(60,70%,50%), hsl(120,70%,50%), hsl(180,70%,50%), hsl(240,70%,50%), hsl(300,70%,50%), hsl(360,70%,50%))`,
              height: '6px',
              borderRadius: '3px',
              WebkitAppearance: 'none',
            }}
          />
          <span className="text-neutral-400 text-xs font-mono w-8 text-right">{params.primaryHue}°</span>
        </div>
      </ControlGroup>

      {/* Font Pair */}
      <ControlGroup label="Font Pairing">
        <select
          value={params.fontPair}
          onChange={e => onChange('fontPair', e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-sm text-neutral-200 outline-none focus:border-neutral-500"
        >
          {FONT_PAIRS.map(fp => (
            <option key={fp.id} value={fp.id}>{fp.name}</option>
          ))}
        </select>
      </ControlGroup>

      {/* Border Radius */}
      <ControlGroup label="Border Radius">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0} max={24} step={1}
            value={params.borderRadius > 24 ? 24 : params.borderRadius}
            onChange={e => onChange('borderRadius', Number(e.target.value))}
            className="flex-1 accent-brand"
          />
          <span className="text-neutral-400 text-xs font-mono w-8 text-right">{params.borderRadius}px</span>
        </div>
      </ControlGroup>

      {/* Spacing Density */}
      <ControlGroup label="Spacing">
        <SegmentControl<SpacingDensity>
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'default', label: 'Default' },
            { value: 'spacious', label: 'Spacious' },
          ]}
          value={params.spacingDensity}
          onChange={v => onChange('spacingDensity', v)}
        />
      </ControlGroup>

      {/* Depth Style */}
      <ControlGroup label="Depth">
        <SegmentControl<DepthStyle>
          options={[
            { value: 'flat', label: 'Flat' },
            { value: 'subtle', label: 'Subtle' },
            { value: 'elevated', label: 'Elevated' },
            { value: 'glass', label: 'Glass' },
          ]}
          value={params.depthStyle}
          onChange={v => onChange('depthStyle', v)}
        />
      </ControlGroup>

      {/* Advanced Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full text-left text-neutral-500 hover:text-neutral-300 text-xs flex items-center gap-1.5 py-1"
      >
        <span style={{ transform: showAdvanced ? 'rotate(90deg)' : undefined, transition: 'transform 150ms', display: 'inline-block' }}>
          ▶
        </span>
        Advanced
      </button>

      {showAdvanced && (
        <div className="space-y-5 pl-2 border-l border-neutral-800">
          {/* Saturation */}
          <ControlGroup label="Saturation">
            <SegmentControl<SaturationLevel>
              options={[
                { value: 'muted', label: 'Muted' },
                { value: 'medium', label: 'Medium' },
                { value: 'vivid', label: 'Vivid' },
              ]}
              value={params.saturation}
              onChange={v => onChange('saturation', v)}
            />
          </ControlGroup>

          {/* Mode */}
          <ControlGroup label="Theme">
            <SegmentControl<ThemeMode>
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ]}
              value={params.mode}
              onChange={v => onChange('mode', v)}
            />
          </ControlGroup>

          {/* Type Scale Ratio */}
          <ControlGroup label="Type Scale">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1.125} max={1.618} step={0.001}
                value={params.typeScaleRatio}
                onChange={e => onChange('typeScaleRatio', Number(e.target.value))}
                className="flex-1 accent-brand"
              />
              <span className="text-neutral-400 text-xs font-mono w-10 text-right">
                {params.typeScaleRatio.toFixed(3)}
              </span>
            </div>
          </ControlGroup>

          {/* Heading Letter Spacing */}
          <ControlGroup label="Heading Spacing">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={-0.05} max={0.2} step={0.005}
                value={params.headingLetterSpacing}
                onChange={e => onChange('headingLetterSpacing', Number(e.target.value))}
                className="flex-1 accent-brand"
              />
              <span className="text-neutral-400 text-xs font-mono w-12 text-right">
                {params.headingLetterSpacing.toFixed(3)}em
              </span>
            </div>
          </ControlGroup>

          {/* Accent Hue */}
          <ControlGroup label="Accent Color">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0} max={360} step={1}
                value={params.accentHue}
                onChange={e => onChange('accentHue', Number(e.target.value))}
                className="flex-1 accent-brand"
                style={{
                  background: `linear-gradient(to right, hsl(0,70%,50%), hsl(60,70%,50%), hsl(120,70%,50%), hsl(180,70%,50%), hsl(240,70%,50%), hsl(300,70%,50%), hsl(360,70%,50%))`,
                  height: '6px',
                  borderRadius: '3px',
                  WebkitAppearance: 'none',
                }}
              />
              <span className="text-neutral-400 text-xs font-mono w-8 text-right">{params.accentHue}°</span>
            </div>
          </ControlGroup>
        </div>
      )}
    </div>
  );
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-neutral-400 text-xs font-medium mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function SegmentControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex bg-neutral-800 rounded-md p-0.5 gap-0.5">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-1 px-2 text-xs font-medium rounded transition-all ${
            value === opt.value
              ? 'bg-neutral-700 text-neutral-100 shadow-sm'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
