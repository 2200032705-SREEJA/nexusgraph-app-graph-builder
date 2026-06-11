import { memo, useCallback } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { NodeData } from '@/types';
import { cn } from '@/lib/utils';

const KIND_ICONS: Record<string, string> = {
  service: '⚡',
  database: '🗄️',
  gateway: '🔀',
  queue: '📬',
};

const PROVIDER_BADGE: Record<string, string> = {
  aws: 'AWS',
  gcp: 'GCP',
  azure: 'Azure',
};

const STATUS_CONFIG = {
  healthy: { label: 'Success', color: 'bg-green-500/20 text-green-400 border border-green-500/30', dot: 'bg-green-500' },
  degraded: { label: 'Degraded', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30', dot: 'bg-yellow-500' },
  down: { label: 'Error', color: 'bg-red-500/20 text-red-400 border border-red-500/30', dot: 'bg-red-500' },
  unknown: { label: 'Unknown', color: 'bg-gray-500/20 text-gray-400 border border-gray-500/30', dot: 'bg-gray-500' },
};

const TABS = ['CPU', 'Memory', 'Disk', 'Region'] as const;

export const ServiceNode = memo(({ data, selected }: NodeProps & { data: NodeData }) => {
  const status = STATUS_CONFIG[data.status];

  const handleTabClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      className={cn(
        'node-card w-[300px] rounded-xl border bg-[hsl(222_22%_10%)] transition-all duration-150',
        selected ? 'border-purple-500/60 shadow-lg shadow-purple-500/20' : 'border-[hsl(222_20%_16%)]',
      )}
    >
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-purple-500 !border-0" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-purple-500 !border-0" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(222_20%_16%)]">
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">{KIND_ICONS[data.kind]}</span>
          <span className="font-semibold text-sm text-white">{data.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-md">
            {data.costPerHour}
          </span>
          <button
            className="text-[hsl(215_15%_55%)] hover:text-white transition-colors"
            onClick={handleTabClick}
            aria-label="Settings"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-around px-3 py-2 border-b border-[hsl(222_20%_16%)]">
        <span className="text-xs font-mono text-[hsl(215_15%_55%)]">{data.cpuUsage}</span>
        <span className="text-xs font-mono text-[hsl(215_15%_55%)]">{data.memoryGb} GB</span>
        <span className="text-xs font-mono text-[hsl(215_15%_55%)]">{data.diskGb}.00 GB</span>
        <span className="text-xs font-mono text-[hsl(215_15%_55%)]">{data.replicas}</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-[hsl(222_20%_16%)]" onClick={handleTabClick}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors',
              i === 0
                ? 'bg-[hsl(222_20%_20%)] text-white'
                : 'text-[hsl(215_15%_55%)] hover:text-white',
            )}
          >
            <span className="opacity-60 text-[10px]">
              {tab === 'CPU' ? '⚙' : tab === 'Memory' ? '💾' : tab === 'Disk' ? '💿' : '🌐'}
            </span>
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="px-3 py-2 border-b border-[hsl(222_20%_16%)] flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full overflow-hidden bg-[hsl(222_20%_16%)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            style={{ width: `${data.sliderValue}%` }}
          />
        </div>
        <span className="text-xs font-mono text-[hsl(215_15%_55%)] w-8 text-right">{data.cpuUsage}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <span className={cn('flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md', status.color)}>
          {data.status !== 'down' ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 5l1.5 1.5L7 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 2v4M5 7.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          {status.label}
        </span>
        <div className="flex items-center gap-1 opacity-70">
          <div className="text-[10px] font-bold tracking-wider text-orange-400">
            {PROVIDER_BADGE[data.provider]}
          </div>
        </div>
      </div>
    </div>
  );
});

ServiceNode.displayName = 'ServiceNode';
