import { useState } from 'react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: '⌂', label: 'Home', section: 'top' },
  { icon: '🐙', label: 'GitHub', section: 'top' },
  { icon: '🐘', label: 'Postgres', section: 'top' },
  { icon: '🔴', label: 'Redis', section: 'top' },
  { icon: '🌿', label: 'Mongo', section: 'top' },
  { icon: '📦', label: 'Packages', section: 'top' },
  { icon: '⊞', label: 'Graph View', section: 'bottom', defaultActive: true },
  { icon: '⊗', label: 'Settings', section: 'bottom' },
];

export function LeftRail() {
  const [activeLabel, setActiveLabel] = useState('Graph View');
  const [tooltip, setTooltip] = useState<string | null>(null);

  const top = NAV_ITEMS.filter((i) => i.section === 'top');
  const bottom = NAV_ITEMS.filter((i) => i.section === 'bottom');

  const renderButton = (item: typeof NAV_ITEMS[0]) => (
    <div key={item.label} className="relative group">
      <button
        onClick={() => setActiveLabel(item.label)}
        onMouseEnter={() => setTooltip(item.label)}
        onMouseLeave={() => setTooltip(null)}
        className={cn(
          'w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all duration-150',
          activeLabel === item.label
            ? 'bg-[hsl(258_70%_50%/0.25)] text-white ring-1 ring-purple-500/40'
            : 'text-[hsl(215_15%_45%)] hover:text-white hover:bg-[hsl(222_20%_16%)]',
        )}
        aria-label={item.label}
      >
        {item.icon}
      </button>

      {/* Tooltip */}
      {tooltip === item.label && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-[hsl(222_25%_12%)] border border-[hsl(222_20%_20%)] text-white text-xs font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-xl">
            {item.label}
          </div>
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[hsl(222_20%_20%)]" />
        </div>
      )}
    </div>
  );

  return (
    <aside className="w-12 flex flex-col items-center py-3 border-r border-[hsl(222_20%_16%)] bg-[hsl(222_25%_8%)] shrink-0 z-10">
      <div className="flex flex-col gap-1 flex-1">
        {top.map(renderButton)}
      </div>
      <div className="flex flex-col gap-1 mt-auto">
        {bottom.map(renderButton)}
      </div>
    </aside>
  );
}
