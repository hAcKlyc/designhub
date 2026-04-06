import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { StyleCategory } from '../../types';
import { CATEGORY_LABELS } from '../../types';
import { PreviewFrame } from '../Preview/PreviewFrame';
import { DESIGN_STYLES } from '../../data/styles/index';
import { REFERENCE_DESIGNS } from '../../data/references';

export function GalleryPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<StyleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = new Set(DESIGN_STYLES.map(s => s.category));
    return ['all' as const, ...Array.from(cats)] as (StyleCategory | 'all')[];
  }, []);

  const filtered = useMemo(() => {
    let styles = DESIGN_STYLES;
    if (activeCategory !== 'all') {
      styles = styles.filter(s => s.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      styles = styles.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }
    return styles;
  }, [activeCategory, searchQuery]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '80px 0 60px' }}>
        <h1 className="font-serif" style={{
          fontSize: '56px', fontWeight: 400, color: '#1A1A1A',
          letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 16px',
        }}>
          Design Systems,{' '}
          <em style={{ fontStyle: 'italic' }}>curated</em>
        </h1>
        <p style={{
          fontSize: '18px', color: '#7A7A7A', maxWidth: '480px',
          margin: '0 auto', lineHeight: 1.6,
        }}>
          Explore design systems from the world's best products. Customize parameters. Export AI-ready DESIGN.md files.
        </p>
      </div>

      {/* Featured */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <h2 className="font-serif" style={{ fontSize: '24px', fontWeight: 400, color: '#1A1A1A', margin: 0 }}>
            Featured
          </h2>
          <span style={{
            fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const,
            letterSpacing: '0.05em', padding: '3px 8px', borderRadius: '6px',
            background: '#F0F7F4', color: '#2D6A4F',
          }}>
            Real-world
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px',
        }}>
          {REFERENCE_DESIGNS.map(ref => (
            <div
              key={ref.id}
              onClick={() => navigate(`/style/${ref.id}`)}
              style={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                transition: 'transform 300ms ease, box-shadow 300ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)';
              }}
            >
              {/* Preview */}
              <div style={{ height: '180px', background: ref.bgColor, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '24px',
                }}>
                  <div style={{
                    fontFamily: ref.fontPreview + ", 'Inter', sans-serif",
                    fontSize: '32px', fontWeight: 600, color: ref.textColor,
                    letterSpacing: '-0.02em', marginBottom: '8px',
                  }}>
                    {ref.name}
                  </div>
                  <div style={{ fontSize: '13px', color: ref.textColor, opacity: 0.5 }}>
                    {ref.description.split('.')[0]}
                  </div>
                </div>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
                  background: ref.accentColor,
                }} />
              </div>

              {/* Info */}
              <div style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>{ref.name}</span>
                  <span style={{
                    fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em', padding: '2px 6px', borderRadius: '4px',
                    background: '#F0F7F4', color: '#2D6A4F',
                  }}>Demo</span>
                </div>
                <p style={{ fontSize: '13px', color: '#7A7A7A', marginTop: '4px', lineHeight: 1.4 }}>
                  {ref.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: '1px', background: '#F0F0ED', margin: '0 0 48px' }} />

      {/* All Styles */}
      <section style={{ paddingBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <h2 className="font-serif" style={{ fontSize: '24px', fontWeight: 400, color: '#1A1A1A', margin: 0 }}>
            All Styles
          </h2>
          <span style={{ fontSize: '13px', color: '#A0A0A0' }}>
            {DESIGN_STYLES.length} customizable design systems
          </span>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px', borderRadius: '8px', border: 'none',
                  fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                  transition: 'all 200ms',
                  background: activeCategory === cat ? '#2D6A4F' : '#F4F4F1',
                  color: activeCategory === cat ? '#FFFFFF' : '#7A7A7A',
                }}
              >
                {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <input
            type="text"
            placeholder="Search styles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: '#FFFFFF', border: '1px solid #E8E8E5', borderRadius: '10px',
              padding: '8px 14px', fontSize: '13px', color: '#1A1A1A', outline: 'none',
              width: '200px',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#2D6A4F'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(45,106,79,0.1)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#E8E8E5'; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map(style => (
            <div
              key={style.id}
              onClick={() => navigate(`/style/${style.id}`)}
              style={{
                cursor: 'pointer', borderRadius: '16px', overflow: 'hidden',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                transition: 'transform 300ms ease, box-shadow 300ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)';
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <PreviewFrame params={style.params} compact />
              </div>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '4px' }}>
                  {style.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em', padding: '2px 8px', borderRadius: '4px',
                    background: '#F4F4F1', color: '#7A7A7A',
                  }}>
                    {style.category}
                  </span>
                  <span style={{ fontSize: '13px', color: '#A0A0A0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
                    {style.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#A0A0A0' }}>
            No styles match your search.
          </div>
        )}
      </section>
    </div>
  );
}
