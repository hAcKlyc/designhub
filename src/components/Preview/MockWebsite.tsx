export function MockWebsite() {
  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-body)',
      padding: 'var(--space-12)',
    }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
        <div style={{
          display: 'inline-block',
          background: 'var(--primary-bg)',
          color: 'var(--primary)',
          fontSize: 'var(--text-sm)',
          fontWeight: 500,
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          marginBottom: 'var(--space-4)',
          border: '1px solid var(--color-primary-6)',
        }}>
          New Release v2.0
        </div>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-hero)',
          fontWeight: 'var(--heading-weight)' as unknown as number,
          letterSpacing: 'var(--heading-letter-spacing)',
          lineHeight: 'var(--heading-line-height)',
          color: 'var(--text)',
          margin: '0 0 var(--space-4)',
          maxWidth: '700px',
          marginInline: 'auto',
        }}>
          Build beautiful products faster
        </h1>
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--text-secondary)',
          maxWidth: '500px',
          margin: '0 auto var(--space-8)',
          lineHeight: 'var(--body-line-height)',
        }}>
          A complete design system for modern applications. Consistent, accessible, and delightful.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <button style={{
            background: 'var(--primary)',
            color: 'var(--primary-text)',
            border: 'none',
            padding: '10px 24px',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-base)',
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
          }}>
            Get Started
          </button>
          <button style={{
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            padding: '10px 24px',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-base)',
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
          }}>
            Documentation
          </button>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{ padding: 'var(--space-12) 0' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--heading-weight)' as unknown as number,
          letterSpacing: 'var(--heading-letter-spacing)',
          lineHeight: 'var(--heading-line-height)',
          color: 'var(--text)',
          textAlign: 'center',
          marginBottom: 'var(--space-8)',
        }}>
          Everything you need
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-4)',
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: i === 0 ? 'var(--primary-bg)' : i === 1 ? 'var(--color-accent-2)' : 'var(--bg-inset)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-3)',
                fontSize: '18px',
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: 'var(--space-2)',
                letterSpacing: 'var(--heading-letter-spacing)',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)',
                lineHeight: 'var(--body-line-height)',
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section style={{
        padding: 'var(--space-12)',
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        maxWidth: '480px',
        margin: '0 auto',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-xl)',
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: 'var(--space-4)',
          letterSpacing: 'var(--heading-letter-spacing)',
        }}>
          Get in touch
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <input
            type="text"
            placeholder="Your name"
            readOnly
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-body)',
              color: 'var(--text)',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="email"
            placeholder="Email address"
            readOnly
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-body)',
              color: 'var(--text)',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <textarea
            placeholder="Your message..."
            readOnly
            rows={3}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-body)',
              color: 'var(--text)',
              outline: 'none',
              resize: 'vertical',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button style={{
            background: 'var(--primary)',
            color: 'var(--primary-text)',
            border: 'none',
            padding: '10px 24px',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-base)',
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            width: '100%',
          }}>
            Send Message
          </button>
        </div>
      </section>
    </div>
  );
}

const FEATURES = [
  { icon: '🎨', title: 'Design Tokens', desc: 'A unified set of design tokens that power every component and ensure visual consistency across your entire application.' },
  { icon: '⚡', title: 'Performance', desc: 'Optimized for speed with minimal runtime overhead. Every component is tree-shakable and lazy-loadable.' },
  { icon: '🔒', title: 'Accessible', desc: 'Built with WCAG 2.1 AA compliance in mind. Keyboard navigation, screen readers, and color contrast — all covered.' },
];
