import { useState } from 'react';
import { useApps } from '@/hooks/useQueries';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';

const KIND_ICONS: Record<string, string> = {
  service: '⚡',
  database: '🗄️',
  gateway: '🔀',
  queue: '📬',
};

const KIND_COLORS: Record<string, string> = {
  service: 'bg-indigo-500',
  database: 'bg-purple-500',
  gateway: 'bg-red-500',
  queue: 'bg-pink-500',
};

export function AppSelector() {
  const { data: apps, isLoading } = useApps();
  const { selectedAppId, setSelectedAppId } = useAppStore();
  const [search, setSearch] = useState('');

  const filtered = apps?.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border-b border-[hsl(222_20%_16%)]">
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-xs font-semibold text-[hsl(215_15%_55%)] uppercase tracking-widest mb-3">
          Application
        </h2>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[hsl(215_15%_45%)]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="w-full bg-[hsl(222_20%_14%)] border border-[hsl(222_20%_18%)] rounded-md pl-8 pr-3 py-1.5 text-sm text-white placeholder-[hsl(215_15%_45%)] focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-md flex items-center justify-center text-white transition-colors text-lg font-light shrink-0"
            aria-label="New app"
          >
            +
          </button>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="w-7 h-7 rounded-lg bg-[hsl(222_20%_16%)] animate-pulse" />
                <div className="flex-1 h-4 rounded bg-[hsl(222_20%_16%)] animate-pulse" />
              </div>
            ))
          : filtered?.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left',
                  selectedAppId === app.id
                    ? 'bg-[hsl(222_20%_16%)]'
                    : 'hover:bg-[hsl(222_20%_14%)]',
                )}
              >
                <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0', KIND_COLORS[app.kind])}>
                  {KIND_ICONS[app.kind]}
                </div>
                <span className="text-sm text-[hsl(210_20%_85%)] truncate font-mono">{app.name}</span>
                <svg className="ml-auto shrink-0 text-[hsl(215_15%_40%)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
      </div>
    </div>
  );
}
