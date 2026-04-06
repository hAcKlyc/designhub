import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  centerContent?: ReactNode;
}

export function Header({ centerContent }: Props) {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-semibold text-neutral-100 text-[15px] tracking-tight">
            DesignHub
          </span>
        </Link>

        {/* Center area for tabs */}
        {centerContent && (
          <div className="flex-1 flex justify-center">
            {centerContent}
          </div>
        )}

        <nav className={`flex items-center gap-4 ${centerContent ? '' : 'ml-auto'}`}>
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
