import { useAppStore } from '@/store';
import { useApps } from '@/hooks/useQueries';

export function TopBar() {
  const { selectedAppId, toggleMobilePanel } = useAppStore();
  const { data: apps } = useApps();
  const currentApp = apps?.find((a) => a.id === selectedAppId);

  return (
    <header className="h-12 flex items-center px-4 border-b border-[hsl(222_20%_16%)] bg-[hsl(222_25%_8%)] shrink-0 z-20">
      {/* Brand */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">N</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-mono min-w-0">
          <span className="text-[hsl(215_15%_55%)] shrink-0">NexusGraph</span>
          {currentApp && (
            <>
              <span className="text-[hsl(215_15%_35%)]">/</span>
              <span className="text-white truncate">{currentApp.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Chevrons */}
      <div className="flex items-center gap-1 ml-3">
        <button className="text-[hsl(215_15%_45%)] hover:text-white transition-colors p-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <button className="text-[hsl(215_15%_45%)] hover:text-white transition-colors p-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Mobile panel toggle */}
        <button
          className="lg:hidden text-[hsl(215_15%_55%)] hover:text-white transition-colors p-1.5 rounded-md hover:bg-[hsl(222_20%_16%)]"
          onClick={toggleMobilePanel}
          aria-label="Toggle panel"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="18" /><rect x="14" y="3" width="7" height="18" />
          </svg>
        </button>

        <button className="text-[hsl(215_15%_55%)] hover:text-white transition-colors p-1.5 rounded-md hover:bg-[hsl(222_20%_16%)]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>

        <button className="text-[hsl(215_15%_55%)] hover:text-white transition-colors p-1.5 rounded-md hover:bg-[hsl(222_20%_16%)]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      </div>
    </header>
  );
}
