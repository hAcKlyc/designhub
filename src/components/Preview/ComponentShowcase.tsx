export function ComponentShowcase() {
  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Content wrapper with max-width */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 40px' }}>

        {/* Color Palette */}
        <Section title="Color Palette">
          <ColorGroup label="Primary" prefix="primary" />
          <ColorGroup label="Neutral" prefix="neutral" />
          <ColorGroup label="Accent" prefix="accent" count={6} steps={[1,2,3,8,9,11]} />

          {/* Semantic tokens */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>Semantic Tokens</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { label: 'Background', color: 'var(--bg)', border: true },
                { label: 'Elevated', color: 'var(--bg-elevated)', border: true },
                { label: 'Inset', color: 'var(--bg-inset)', border: true },
                { label: 'Primary', color: 'var(--primary)' },
                { label: 'Text', color: 'var(--text)' },
                { label: 'Secondary', color: 'var(--text-secondary)' },
                { label: 'Muted', color: 'var(--text-muted)' },
                { label: 'Border', color: 'var(--border)', border: true },
                { label: 'Success', color: 'var(--color-success)' },
                { label: 'Warning', color: 'var(--color-warning)' },
                { label: 'Error', color: 'var(--color-error)' },
                { label: 'Info', color: 'var(--color-info)' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', flexShrink: 0,
                    background: s.color, border: s.border ? '1px solid var(--border)' : '1px solid transparent',
                  }} />
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography Scale">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { label: 'Hero', size: 'var(--text-hero)', weight: 700, family: 'var(--font-heading)', ls: 'var(--heading-letter-spacing)' },
              { label: '3XL', size: 'var(--text-3xl)', weight: 600, family: 'var(--font-heading)', ls: 'var(--heading-letter-spacing)' },
              { label: '2XL', size: 'var(--text-2xl)', weight: 600, family: 'var(--font-heading)', ls: 'var(--heading-letter-spacing)' },
              { label: 'XL', size: 'var(--text-xl)', weight: 600, family: 'var(--font-heading)', ls: 'var(--heading-letter-spacing)' },
              { label: 'LG', size: 'var(--text-lg)', weight: 400, family: 'var(--font-body)', ls: 'normal' },
              { label: 'Base', size: 'var(--text-base)', weight: 400, family: 'var(--font-body)', ls: 'normal' },
              { label: 'SM', size: 'var(--text-sm)', weight: 400, family: 'var(--font-body)', ls: 'normal' },
              { label: 'XS', size: 'var(--text-xs)', weight: 400, family: 'var(--font-body)', ls: 'normal' },
              { label: 'Mono', size: 'var(--text-sm)', weight: 400, family: 'var(--font-mono)', ls: 'normal' },
            ].map(t => (
              <div key={t.label} style={{
                display: 'flex', alignItems: 'baseline', gap: '12px',
                padding: '6px 0', borderBottom: '1px solid var(--border-subtle)',
              }}>
                <span style={{
                  fontSize: '10px', fontFamily: 'var(--font-mono)',
                  color: 'var(--text-faint)', width: '36px', flexShrink: 0,
                }}>{t.label}</span>
                <span style={{
                  fontSize: t.size, fontWeight: t.weight,
                  fontFamily: t.family, color: 'var(--text)',
                  letterSpacing: t.ls, lineHeight: 1.2,
                }}>
                  The quick brown fox
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Components — two columns */}
        <Section title="Components">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Left column */}
            <div>
              {/* Buttons */}
              <SubSection title="Buttons">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                    <Btn bg="var(--primary)" color="var(--primary-text)">Primary</Btn>
                    <Btn bg="var(--bg-elevated)" color="var(--text-secondary)" border>Secondary</Btn>
                    <Btn bg="transparent" color="var(--text-muted)">Ghost</Btn>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                    <Btn bg="var(--accent)" color="var(--primary-text)">Accent</Btn>
                    <Btn bg="var(--color-error)" color="#fff">Danger</Btn>
                    <Btn bg="var(--primary)" color="var(--primary-text)" pill>Pill</Btn>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                    <Btn bg="var(--primary)" color="var(--primary-text)" small>Small</Btn>
                    <Btn bg="var(--bg-elevated)" color="var(--text-secondary)" border small>Small</Btn>
                  </div>
                </div>
              </SubSection>

              {/* Badges */}
              <SubSection title="Badges & Tags">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Badge>Default</Badge>
                  <Badge accent>Accent</Badge>
                  <Badge success>Success</Badge>
                  <Badge warning>Warning</Badge>
                  <Badge error>Error</Badge>
                </div>
              </SubSection>

              {/* Toggle & Checkbox */}
              <SubSection title="Controls">
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <Toggle on />
                  <Toggle />
                  <Checkbox checked />
                  <Checkbox />
                </div>
              </SubSection>
            </div>

            {/* Right column */}
            <div>
              {/* Cards */}
              <SubSection title="Cards">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Card title="Standard Card" desc="Basic card with border and shadow." />
                  <Card title="Elevated Card" desc="Higher shadow elevation." elevated />
                </div>
              </SubSection>

              {/* Inputs */}
              <SubSection title="Form Inputs">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Input label="Text Input" placeholder="Enter text..." />
                  <Input label="Disabled" placeholder="Disabled" disabled />
                  <textarea readOnly placeholder="Textarea..." rows={2} style={{
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', padding: '8px 12px',
                    fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)',
                    color: 'var(--text)', outline: 'none', resize: 'vertical',
                    width: '100%', boxSizing: 'border-box',
                  }} />
                </div>
              </SubSection>
            </div>
          </div>
        </Section>

        {/* Spacing Scale */}
        <Section title="Spacing Scale">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { label: 'space-1', var: 'var(--space-1)' },
              { label: 'space-2', var: 'var(--space-2)' },
              { label: 'space-3', var: 'var(--space-3)' },
              { label: 'space-4', var: 'var(--space-4)' },
              { label: 'space-8', var: 'var(--space-8)' },
              { label: 'space-12', var: 'var(--space-12)' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', width: '60px', flexShrink: 0 }}>
                  {s.label}
                </span>
                <div style={{
                  height: '16px', width: s.var,
                  background: 'var(--primary)', borderRadius: '2px', opacity: 0.6,
                }} />
              </div>
            ))}
          </div>
        </Section>

        {/* Elevation & Shadows + Border Radius side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <Section title="Elevation & Shadows">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {['var(--shadow-xs)', 'var(--shadow-sm)', 'var(--shadow-md)', 'var(--shadow-lg)'].map((s, i) => (
                <div key={i} style={{
                  height: '64px',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: s,
                  border: '1px solid var(--border-subtle)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                }}>
                  {['XS', 'SM', 'MD', 'LG'][i]}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Border Radius">
            <div style={{ display: 'flex', gap: '12px', alignItems: 'end', flexWrap: 'wrap' }}>
              {[
                { label: 'SM', var: 'var(--radius-sm)' },
                { label: 'MD', var: 'var(--radius-md)' },
                { label: 'LG', var: 'var(--radius-lg)' },
                { label: 'XL', var: 'var(--radius-xl)' },
                { label: 'Full', var: 'var(--radius-full)' },
              ].map(r => (
                <div key={r.label} style={{ textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: r.var, opacity: 0.8 }} />
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>{r.label}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h4 style={{
        fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: '0.12em', color: 'var(--text-muted)',
        marginBottom: '16px', paddingBottom: '8px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>{title}</h4>
      {children}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '10px' }}>{title}</div>
      {children}
    </div>
  );
}

function ColorGroup({ label, prefix, count = 12, steps }: { label: string; prefix: string; count?: number; steps?: number[] }) {
  const indices = steps || Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>{label}</div>
      <div style={{ display: 'flex', gap: '3px' }}>
        {indices.map((step, i) => (
          <div key={step} style={{
            flex: 1, height: '36px',
            background: `var(--color-${prefix}-${step})`,
            borderRadius: i === 0 ? '6px 0 0 6px' : i === indices.length - 1 ? '0 6px 6px 0' : '0',
          }} />
        ))}
      </div>
    </div>
  );
}

function Btn({ bg, color, border, children, small, pill }: {
  bg: string; color: string; border?: boolean; children: React.ReactNode; small?: boolean; pill?: boolean;
}) {
  return (
    <div style={{
      background: bg, color,
      padding: small ? '5px 12px' : '8px 18px',
      borderRadius: pill ? 'var(--radius-full)' : 'var(--radius-md)',
      fontSize: small ? 'var(--text-sm)' : 'var(--text-base)',
      fontWeight: 500, fontFamily: 'var(--font-body)',
      border: border ? '1px solid var(--border)' : '1px solid transparent',
      cursor: 'pointer', display: 'inline-block',
    }}>{children}</div>
  );
}

function Badge({ children, accent, success, warning, error: isError }: {
  children: React.ReactNode; accent?: boolean; success?: boolean; warning?: boolean; error?: boolean;
}) {
  const bg = success ? 'rgba(45,138,94,0.12)' : isError ? 'rgba(220,38,38,0.12)' : warning ? 'rgba(217,119,6,0.12)' : accent ? 'var(--color-accent-2)' : 'var(--primary-bg)';
  const fg = success ? 'var(--color-success)' : isError ? 'var(--color-error)' : warning ? 'var(--color-warning)' : accent ? 'var(--accent)' : 'var(--primary)';
  return (
    <span style={{ background: bg, color: fg, padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 500 }}>
      {children}
    </span>
  );
}

function Card({ title, desc, elevated }: { title: string; desc: string; elevated?: boolean }) {
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', padding: '16px',
      boxShadow: elevated ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    }}>
      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{title}</h4>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

function Input({ label, placeholder, disabled }: { label: string; placeholder: string; disabled?: boolean }) {
  return (
    <div>
      <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>{label}</label>
      <input type="text" placeholder={placeholder} readOnly disabled={disabled} style={{
        background: disabled ? 'var(--bg-inset)' : 'var(--bg)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
        padding: '8px 12px', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)',
        color: disabled ? 'var(--text-faint)' : 'var(--text)',
        width: '100%', boxSizing: 'border-box', outline: 'none', opacity: disabled ? 0.6 : 1,
      }} />
    </div>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <div style={{
      width: '40px', height: '22px', borderRadius: 'var(--radius-full)',
      background: on ? 'var(--primary)' : 'var(--border)', position: 'relative', cursor: 'pointer',
      transition: 'background 200ms',
    }}>
      <div style={{
        width: '16px', height: '16px', borderRadius: '50%',
        background: '#fff', position: 'absolute', top: '3px',
        left: on ? '21px' : '3px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)', transition: 'left 200ms',
      }} />
    </div>
  );
}

function Checkbox({ checked }: { checked?: boolean }) {
  return (
    <div style={{
      width: '18px', height: '18px', borderRadius: 'var(--radius-sm)',
      background: checked ? 'var(--primary)' : 'transparent',
      border: checked ? 'none' : '2px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
    }}>
      {checked && <span style={{ color: 'var(--primary-text)', fontSize: '12px', lineHeight: 1 }}>✓</span>}
    </div>
  );
}
