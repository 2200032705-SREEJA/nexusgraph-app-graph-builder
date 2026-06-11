import { useCallback, useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { useGraph } from '@/hooks/useQueries';
import { cn } from '@/lib/utils';
import type { NodeData, NodeStatus } from '@/types';

const TABS = [
  { id: 'config', label: 'Config' },
  { id: 'runtime', label: 'Runtime' },
  { id: 'logs', label: 'Logs' },
];

const STATUS_OPTIONS: NodeStatus[] = ['healthy', 'degraded', 'down', 'unknown'];

const STATUS_STYLES: Record<NodeStatus, string> = {
  healthy: 'bg-green-500/15 text-green-400 border-green-500/30',
  degraded: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  down: 'bg-red-500/15 text-red-400 border-red-500/30',
  unknown: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <div className="w-12 h-12 rounded-xl bg-[hsl(222_20%_14%)] flex items-center justify-center text-2xl">
        🔍
      </div>
      <p className="text-sm font-medium text-[hsl(210_15%_65%)]">No node selected</p>
      <p className="text-xs text-[hsl(215_15%_45%)] leading-relaxed">
        Click a node on the canvas to inspect its configuration and runtime metrics.
      </p>
    </div>
  );
}

export function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab, selectedAppId, updateNodeData } = useAppStore();
  const { data: graphData } = useGraph(selectedAppId);

  const selectedNode = graphData?.nodes.find((n) => n.id === selectedNodeId);
  const nodeData = selectedNode?.data as NodeData | undefined;

  const [localData, setLocalData] = useState<NodeData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (nodeData) setLocalData({ ...nodeData });
    setSaved(false);
  }, [selectedNodeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateLocal = useCallback((patch: Partial<NodeData>) => {
    setLocalData((prev) => (prev ? { ...prev, ...patch } : prev));
    setSaved(false);
  }, []);

  const saveChanges = useCallback(() => {
    if (!localData || !selectedNodeId || !updateNodeData) return;
    updateNodeData(selectedNodeId, localData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [localData, selectedNodeId, updateNodeData]);

  if (!selectedNodeId || !localData) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Inspector header */}
      <div className="px-4 pt-4 pb-3 border-b border-[hsl(222_20%_16%)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-[hsl(215_15%_55%)] uppercase tracking-widest">
            Node Inspector
          </h3>
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', STATUS_STYLES[localData.status])}>
            {localData.status}
          </span>
        </div>

        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveInspectorTab(tab.id)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                activeInspectorTab === tab.id
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                  : 'text-[hsl(215_15%_55%)] hover:text-white hover:bg-[hsl(222_20%_16%)]',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {activeInspectorTab === 'config' && (
          <>
            <Field label="Node Name">
              <input
                className="w-full bg-[hsl(222_20%_14%)] border border-[hsl(222_20%_18%)] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
                value={localData.label}
                onChange={(e) => updateLocal({ label: e.target.value })}
              />
            </Field>

            <Field label="Description">
              <textarea
                rows={2}
                className="w-full bg-[hsl(222_20%_14%)] border border-[hsl(222_20%_18%)] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                value={localData.description ?? ''}
                onChange={(e) => updateLocal({ description: e.target.value })}
                placeholder="Short description…"
              />
            </Field>

            <Field label="Status">
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateLocal({ status: s })}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium border transition-all',
                      localData.status === s
                        ? STATUS_STYLES[s]
                        : 'border-[hsl(222_20%_18%)] text-[hsl(215_15%_55%)] hover:text-white',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label={`Allocation — ${localData.sliderValue}`}>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative h-5 flex items-center">
                  <div className="w-full h-2 rounded-full bg-[hsl(222_20%_16%)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all"
                      style={{ width: `${localData.sliderValue}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={localData.sliderValue}
                    onChange={(e) => updateLocal({ sliderValue: Number(e.target.value) })}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                  />
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={localData.sliderValue}
                  onChange={(e) => {
                    const v = Math.min(100, Math.max(0, Number(e.target.value)));
                    updateLocal({ sliderValue: v });
                  }}
                  className="w-14 bg-[hsl(222_20%_14%)] border border-[hsl(222_20%_18%)] rounded-md px-2 py-1.5 text-sm text-white text-center focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
                />
              </div>
            </Field>

            <Field label="Provider">
              <div className="flex gap-2">
                {(['aws', 'gcp', 'azure'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => updateLocal({ provider: p })}
                    className={cn(
                      'px-3 py-1 rounded-md text-xs font-mono font-semibold border transition-all uppercase',
                      localData.provider === p
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                        : 'border-[hsl(222_20%_18%)] text-[hsl(215_15%_55%)] hover:text-white',
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </Field>
          </>
        )}

        {activeInspectorTab === 'runtime' && (
          <>
            <MetricRow label="CPU Usage" value={`${localData.cpuUsage} cores`} />
            <MetricRow label="Memory" value={`${localData.memoryGb} GB`} />
            <MetricRow label="Disk" value={`${localData.diskGb} GB`} />
            <MetricRow label="Replicas" value={String(localData.replicas)} />
            <MetricRow label="Cost" value={localData.costPerHour} accent />
            <div>
              <p className="text-xs font-medium text-[hsl(215_15%_55%)] mb-2">CPU over time</p>
              <MiniChart />
            </div>
          </>
        )}

        {activeInspectorTab === 'logs' && (
          <div className="font-mono text-xs space-y-1">
            {FAKE_LOGS.map((log, i) => (
              <div key={i} className={cn('flex gap-2', log.level === 'error' ? 'text-red-400' : log.level === 'warn' ? 'text-yellow-400' : 'text-[hsl(215_15%_60%)]')}>
                <span className="opacity-50 shrink-0">{log.time}</span>
                <span className="uppercase text-[10px] shrink-0 pt-px">[{log.level}]</span>
                <span>{log.msg}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeInspectorTab !== 'logs' && (
        <div className="px-4 pb-4 pt-2 border-t border-[hsl(222_20%_16%)]">
          <button
            onClick={saveChanges}
            className={cn(
              'w-full text-white text-sm font-medium py-2 rounded-lg transition-all',
              saved
                ? 'bg-green-600 hover:bg-green-500'
                : 'bg-purple-600 hover:bg-purple-500',
            )}
          >
            {saved ? '✓ Changes applied to canvas' : 'Apply Changes'}
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[hsl(215_15%_55%)]">{label}</label>
      {children}
    </div>
  );
}

function MetricRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[hsl(222_20%_14%)]">
      <span className="text-xs text-[hsl(215_15%_55%)]">{label}</span>
      <span className={cn('text-xs font-mono font-medium', accent ? 'text-green-400' : 'text-white')}>{value}</span>
    </div>
  );
}

function MiniChart() {
  const points = Array.from({ length: 20 }, (_, i) => Math.sin(i * 0.5) * 20 + 50 + Math.random() * 10);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const h = 48, w = 200;
  const pts = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12 opacity-80">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke="url(#chartGrad)" strokeWidth="1.5" />
    </svg>
  );
}

const FAKE_LOGS = [
  { time: '14:32:01', level: 'info', msg: 'Health check passed' },
  { time: '14:31:58', level: 'info', msg: 'Connection pool: 12/50 active' },
  { time: '14:31:45', level: 'warn', msg: 'High memory usage: 78%' },
  { time: '14:31:30', level: 'info', msg: 'Request processed in 42ms' },
  { time: '14:31:12', level: 'error', msg: 'Timeout connecting to upstream' },
  { time: '14:30:55', level: 'info', msg: 'Config reloaded successfully' },
];
