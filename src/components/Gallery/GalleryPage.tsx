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
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return styles;
  }, [activeCategory, searchQuery]);

  const shuffle = () => {
    setActiveCategory('all');
    setSearchQuery('');
    const el = document.querySelector('.gallery-grid');
    if (el) {
      const children = Array.from(el.children);
      children.sort(() => Math.random() - 0.5);
      children.forEach(c => el.appendChild(c));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-50 mb-3">
          Design System Explorer
        </h1>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto">
          Browse 50+ professional design styles. Customize parameters. Export AI-ready DESIGN.md files.
        </p>
      </div>

      {/* Featured Reference Designs */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-neutral-200 font-semibold text-lg">Featured</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-600/20 text-green-400 uppercase tracking-widest font-medium">
            Real-world
          </span>
          <span className="text-neutral-600 text-sm">
            High-fidelity demos from iconic products
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REFERENCE_DESIGNS.map(ref => (
            <div
              key={ref.id}
              onClick={() => navigate(`/style/${ref.id}`)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-black/30"
            >
              {/* Color preview band */}
              <div
                className="h-40 relative overflow-hidden"
                style={{ background: ref.bgColor }}
              >
                {/* Simulated page content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div
                    style={{
                      fontFamily: ref.fontPreview + ', Inter, sans-serif',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: ref.textColor,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      marginBottom: '12px',
                      textAlign: 'center',
                    }}
                  >
                    {ref.name}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: ref.textColor,
                      opacity: 0.5,
                      textAlign: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    {ref.description.split('.')[0]}
                  </div>
                  <div
                    style={{
                      background: ref.accentColor,
                      color: ref.bgColor === '#000000' || ref.bgColor === '#08090a' || ref.bgColor === '#121212' ? '#ffffff' : ref.bgColor,
                      padding: '6px 20px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    View Demo
                  </div>
                </div>

                {/* Accent strip */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: ref.accentColor }}
                />
              </div>

              {/* Info */}
              <div className="p-4 bg-neutral-800/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-neutral-100 font-semibold text-[15px]">{ref.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-600/20 text-green-400 uppercase tracking-wider font-medium">
                    Demo
                  </span>
                </div>
                <span className="text-neutral-500 text-xs">{ref.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-neutral-800 mb-10" />

      {/* All Styles */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-neutral-200 font-semibold text-lg">All Styles</h2>
          <span className="text-neutral-600 text-sm">
            {DESIGN_STYLES.length} customizable design systems
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-brand text-white'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
                }`}
              >
                {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <input
            type="text"
            placeholder="Search styles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-500 w-52"
          />
          <button
            onClick={shuffle}
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700 transition-colors"
          >
            Shuffle
          </button>
        </div>

        <div className="text-neutral-500 text-sm mb-4">
          {filtered.length} style{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Grid */}
        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(style => (
            <div
              key={style.id}
              onClick={() => navigate(`/style/${style.id}`)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-black/30"
            >
              <div className="overflow-hidden">
                <PreviewFrame params={style.params} compact />
              </div>
              <div className="p-4 bg-neutral-800/50">
                <div className="text-neutral-100 font-semibold text-[15px] mb-1 truncate">
                  {style.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-700/80 text-neutral-400 uppercase tracking-widest font-medium">
                    {style.category}
                  </span>
                  <span className="text-neutral-500 text-xs truncate">
                    {style.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-neutral-500">
            No styles match your search.
          </div>
        )}
      </section>
    </div>
  );
}
