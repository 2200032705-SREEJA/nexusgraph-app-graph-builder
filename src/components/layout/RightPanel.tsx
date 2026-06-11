import { useAppStore } from '@/store';
import { AppSelector } from '../inspector/AppSelector';
import { NodeInspector } from '../inspector/NodeInspector';

export function RightPanel() {
  const { isMobilePanelOpen, setMobilePanelOpen } = useAppStore();

  return (
    <>
      {/* Desktop panel */}
      <aside className="hidden lg:flex w-72 flex-col border-l border-[hsl(222_20%_16%)] bg-[hsl(222_25%_8%)] shrink-0 overflow-hidden">
        <AppSelector />
        <NodeInspector />
      </aside>

      {/* Mobile drawer overlay */}
      {isMobilePanelOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="drawer-overlay absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobilePanelOpen(false)}
          />
          <aside className="drawer-panel ml-auto w-80 max-w-full h-full bg-[hsl(222_25%_8%)] border-l border-[hsl(222_20%_16%)] flex flex-col z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(222_20%_16%)]">
              <span className="text-sm font-medium text-white">Panel</span>
              <button
                onClick={() => setMobilePanelOpen(false)}
                className="text-[hsl(215_15%_55%)] hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <AppSelector />
            <NodeInspector />
          </aside>
        </div>
      )}
    </>
  );
}
