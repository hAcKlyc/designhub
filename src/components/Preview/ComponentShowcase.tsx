export function ComponentShowcase() {
  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-body)',
      padding: 'var(--space-12)',
    }}>
      {/* Color Palette */}
      <Section title="Color Palette">
        <ColorGroup label="Primary" prefix="primary" />
        <ColorGroup label="Neutral" prefix="neutral" />
        <ColorGroup label="Accent" prefix="accent" count={6} steps={[1,2,3,8,9,11]} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          {[
            { label: 'Success', color: 'var(--color-success)' },
            { label: 'Warning', color: 'var(--color-warning)' },
            { label: 'Error', color: 'var(--color-error)' },
            { label: 'Info', color: 'var(--color-info)' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
                background: s.color, border: '1px solid var(--border-subtle)',
              }} />
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Hero', size: 'var(--text-hero)', weight: 700, family: 'var(--font-heading)', ls: 'var(--heading-letter-spacing)' },
            { label: '3XL', size: 'var(--text-3xl)', weight: 600, family: 'var(--font-heading)', ls: 'var(--heading-letter-spacing)' },
            { label: '2XL', size: 'var(--text-2xl)', weight: 600, family: 'var(--font-heading)', ls: 'var(--heading-letter-spacing)' },
            { label: 'XL', size: 'var(--text-xl)', weight: 600, family: 'var(--font-heading)', ls: 'var(--heading-letter-spacing)' },
            { label: 'LG', size: 'var(--text-lg)', weight: 400, family: 'var(--font-body)', ls: 'normal' },
            { label: 'Base', size: 'var(--text-base)', weight: 400, family: 'var(--font-body)', ls: 'normal' },
            { label: 'SM', size: 'var(--text-sm)', weight: 400, family: 'var(--font-body)', ls: 'normal' },
            { label: 'Mono', size: 'var(--text-sm)', weight: 400, family: 'var(--font-mono)', ls: 'normal' },
          ].map(t => (
            <div key={t.label} style={{
              display: 'flex', alignItems: 'baseline', gap: '12px',
              padding: '4px 0', borderBottom: '1px solid var(--border-subtle)',
            }}>
              <span style={{
                fontSize: '10px', fontFamily: 'var(--font-mono)',
                color: 'var(--text-faint)', width: '36px', flexShrink: 0,
              }}>{t.label}</span>
              <span style={{
                fontSize: t.size, fontWeight: t.weight,
                fontFamily: t.family, color: 'var(--text)',
                letterSpacing: t.ls, lineHeight: 1.3,
              }}>
                The quick brown fox
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <Btn bg="var(--primary)" color="var(--primary-text)">Primary</Btn>
          <Btn bg="var(--bg-elevated)" color="var(--text-secondary)" border>Secondary</Btn>
          <Btn bg="var(--accent)" color="var(--accent-text)">Accent</Btn>
          <Btn bg="var(--color-error)" color="#fff">Danger</Btn>
          <Btn bg="transparent" color="var(--text-muted)">Ghost</Btn>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
          <Btn bg="var(--primary)" color="var(--primary-text)" small>Small</Btn>
          <Btn bg="var(--bg-elevated)" color="var(--text-secondary)" border small>Small</Btn>
          <Btn bg="var(--primary)" color="var(--primary-text)" pill>Pill Button</Btn>
        </div>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <Card title="Standard Card" desc="A basic card with subtle border and shadow treatment." />
          <Card title="Elevated Card" desc="Higher elevation with more pronounced shadow." elevated />
        </div>
      </Section>

      {/* Inputs */}
      <Section title="Form Elements">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <Input label="Text Input" placeholder="Enter text..." />
          <Input label="Disabled" placeholder="Disabled input" disabled />
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '12px' }}>
          <Toggle />
          <Badge>Badge</Badge>
          <Badge accent>Accent</Badge>
          <Badge success>Success</Badge>
        </div>
      </Section>

      {/* Shadows */}
      <Section title="Elevation & Shadows">
        <div style={{ display: 'flex', gap: '16px' }}>
          {['var(--shadow-xs)', 'var(--shadow-sm)', 'var(--shadow-md)', 'var(--shadow-lg)'].map((s, i) => (
            <div key={i} style={{
              width: '80px', height: '60px',
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              boxShadow: s,
              border: '1px solid var(--border-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
            }}>
              {['XS', 'SM', 'MD', 'LG'][i]}
            </div>
          ))}
        </div>
      </Section>

      {/* Border Radius */}
      <Section title="Border Radius">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
          {[
            { label: 'SM', var: 'var(--radius-sm)' },
            { label: 'MD', var: 'var(--radius-md)' },
            { label: 'LG', var: 'var(--radius-lg)' },
            { label: 'XL', var: 'var(--radius-xl)' },
            { label: 'Full', var: 'var(--radius-full)' },
          ].map(r => (
            <div key={r.label} style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px', height: '48px',
                background: 'var(--primary)',
                borderRadius: r.var,
              }} />
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                {r.label}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <h4 style={{
        fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: '0.1em', color: 'var(--text-muted)',
        marginBottom: '12px', paddingBottom: '8px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>{title}</h4>
      {children}
    </div>
  );
}

function ColorGroup({ label, prefix, count = 12, steps }: { label: string; prefix: string; count?: number; steps?: number[] }) {
  const indices = steps || Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>{label}</div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {indices.map(i => (
          <div key={i} style={{
            flex: 1, height: '32px',
            background: `var(--color-${prefix}-${i})`,
            borderRadius: i === indices[0] ? 'var(--radius-sm) 0 0 var(--radius-sm)' : i === indices[indices.length - 1] ? '0 var(--radius-sm) var(--radius-sm) 0' : '0',
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

function Card({ title, desc, elevated }: { title: string; desc: string; elevated?: boolean }) {
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)',
      boxShadow: elevated ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    }}>
      <h4 style={{
        fontFamily: 'var(--font-heading)', fontSize: 'var(--text-base)',
        fontWeight: 600, color: 'var(--text)', marginBottom: '4px',
      }}>{title}</h4>
      <p style={{
        fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
        lineHeight: 'var(--body-line-height)',
      }}>{desc}</p>
    </div>
  );
}

function Input({ label, placeholder, disabled }: { label: string; placeholder: string; disabled?: boolean }) {
  return (
    <div>
      <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
        {label}
      </label>
      <input
        type="text" placeholder={placeholder} readOnly disabled={disabled}
        style={{
          background: disabled ? 'var(--bg-inset)' : 'var(--bg)',
          border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
          padding: '8px 12px', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)',
          color: disabled ? 'var(--text-faint)' : 'var(--text)',
          width: '100%', boxSizing: 'border-box', outline: 'none',
          opacity: disabled ? 0.6 : 1,
        }}
      />
    </div>
  );
}

function Toggle() {
  return (
    <div style={{
      width: '40px', height: '22px', borderRadius: 'var(--radius-full)',
      background: 'var(--primary)', position: 'relative', cursor: 'pointer',
    }}>
      <div style={{
        width: '16px', height: '16px', borderRadius: '50%',
        background: '#fff', position: 'absolute', top: '3px', right: '3px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

function Badge({ children, accent, success }: { children: React.ReactNode; accent?: boolean; success?: boolean }) {
  const bg = success ? 'rgba(45,138,94,0.1)' : accent ? 'var(--color-accent-2)' : 'var(--primary-bg)';
  const fg = success ? 'var(--color-success)' : accent ? 'var(--accent)' : 'var(--primary)';
  return (
    <span style={{
      background: bg, color: fg,
      padding: '2px 10px', borderRadius: 'var(--radius-full)',
      fontSize: '11px', fontWeight: 500,
    }}>{children}</span>
  );
}
