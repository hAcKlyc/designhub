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
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#A0A0A0', fontWeight: 600 }}>
        Core
      </div>

      {/* Primary Hue */}
      <ControlGroup label="Primary Color">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="range"
            min={0} max={360} step={1}
            value={params.primaryHue}
            onChange={e => onChange('primaryHue', Number(e.target.value))}
            style={{
              flex: 1, accentColor: '#2D6A4F',
              background: `linear-gradient(to right, hsl(0,70%,50%), hsl(60,70%,50%), hsl(120,70%,50%), hsl(180,70%,50%), hsl(240,70%,50%), hsl(300,70%,50%), hsl(360,70%,50%))`,
              height: '6px', borderRadius: '3px', WebkitAppearance: 'none',
            }}
          />
          <span style={{ color: '#7A7A7A', fontSize: '12px', fontFamily: 'monospace', width: '32px', textAlign: 'right' as const }}>{params.primaryHue}°</span>
        </div>
      </ControlGroup>

      {/* Font Pair */}
      <ControlGroup label="Font Pairing">
        <select
          value={params.fontPair}
          onChange={e => onChange('fontPair', e.target.value)}
          style={{ width: '100%', background: '#FFFFFF', border: '1px solid #E8E8E5', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', color: '#1A1A1A', outline: 'none' }}
        >
          {FONT_PAIRS.map(fp => (
            <option key={fp.id} value={fp.id}>{fp.name}</option>
          ))}
        </select>
      </ControlGroup>

      {/* Border Radius */}
      <ControlGroup label="Border Radius">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="range"
            min={0} max={24} step={1}
            value={params.borderRadius > 24 ? 24 : params.borderRadius}
            onChange={e => onChange('borderRadius', Number(e.target.value))}
            style={{ flex: 1, accentColor: '#2D6A4F' }}
          />
          <span style={{ color: '#7A7A7A', fontSize: '12px', fontFamily: 'monospace', width: '32px', textAlign: 'right' as const }}>{params.borderRadius}px</span>
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
        style={{ width: '100%', textAlign: 'left', color: '#7A7A7A', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 0', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ transform: showAdvanced ? 'rotate(90deg)' : undefined, transition: 'transform 150ms', display: 'inline-block' }}>
          ▶
        </span>
        Advanced
      </button>

      {showAdvanced && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '12px', borderLeft: '1px solid #F0F0ED' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="range"
                min={1.125} max={1.618} step={0.001}
                value={params.typeScaleRatio}
                onChange={e => onChange('typeScaleRatio', Number(e.target.value))}
                style={{ flex: 1, accentColor: '#2D6A4F' }}
              />
              <span style={{ color: '#7A7A7A', fontSize: '12px', fontFamily: 'monospace', width: '40px', textAlign: 'right' as const }}>
                {params.typeScaleRatio.toFixed(3)}
              </span>
            </div>
          </ControlGroup>

          {/* Heading Letter Spacing */}
          <ControlGroup label="Heading Spacing">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="range"
                min={-0.05} max={0.2} step={0.005}
                value={params.headingLetterSpacing}
                onChange={e => onChange('headingLetterSpacing', Number(e.target.value))}
                style={{ flex: 1, accentColor: '#2D6A4F' }}
              />
              <span style={{ color: '#7A7A7A', fontSize: '12px', fontFamily: 'monospace', width: '48px', textAlign: 'right' as const }}>
                {params.headingLetterSpacing.toFixed(3)}em
              </span>
            </div>
          </ControlGroup>

          {/* Accent Hue */}
          <ControlGroup label="Accent Color">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="range"
                min={0} max={360} step={1}
                value={params.accentHue}
                onChange={e => onChange('accentHue', Number(e.target.value))}
                style={{
                  flex: 1, accentColor: '#2D6A4F',
                  background: `linear-gradient(to right, hsl(0,70%,50%), hsl(60,70%,50%), hsl(120,70%,50%), hsl(180,70%,50%), hsl(240,70%,50%), hsl(300,70%,50%), hsl(360,70%,50%))`,
                  height: '6px', borderRadius: '3px', WebkitAppearance: 'none',
                }}
              />
              <span style={{ color: '#7A7A7A', fontSize: '12px', fontFamily: 'monospace', width: '32px', textAlign: 'right' as const }}>{params.accentHue}°</span>
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
      <label style={{ color: '#7A7A7A', fontSize: '12px', fontWeight: 500, marginBottom: '6px', display: 'block' }}>{label}</label>
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
    <div style={{ display: 'flex', background: '#F4F4F1', borderRadius: '8px', padding: '3px', gap: '2px' }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1, padding: '5px 8px', fontSize: '12px', fontWeight: 500,
            borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'all 200ms',
            background: value === opt.value ? '#FFFFFF' : 'transparent',
            color: value === opt.value ? '#1A1A1A' : '#7A7A7A',
            boxShadow: value === opt.value ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
