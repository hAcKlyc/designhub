import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { StyleCategory } from '../../types';
import { CATEGORY_LABELS } from '../../types';
import { PreviewFrame } from '../Preview/PreviewFrame';
import { DESIGN_STYLES } from '../../data/styles/index';

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
    // Force re-render with randomized order via key change — simple approach
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
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-50 mb-3">
          Design System Explorer
        </h1>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto">
          Browse 50+ professional design styles. Customize parameters. Export AI-ready DESIGN.md files.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
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

      {/* Count */}
      <div className="text-neutral-500 text-sm mb-4">
        {filtered.length} style{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* Grid */}
      <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(style => (
          <div
            key={style.id}
            onClick={() => navigate(`/style/${style.id}`)}
            className="group cursor-pointer rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20"
          >
            {/* Preview thumbnail */}
            <div className="h-52 overflow-hidden">
              <PreviewFrame params={style.params} compact />
            </div>

            {/* Info */}
            <div className="p-3.5 bg-neutral-800/50">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-neutral-100 font-medium text-sm truncate">
                  {style.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-400 uppercase tracking-wider font-medium">
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
    </div>
  );
}
