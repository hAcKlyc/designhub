import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-semibold text-neutral-100 text-[15px] tracking-tight">
            DesignHub
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <a
            href="https://github.com/hAcKlyc/designhub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-200 text-sm transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
