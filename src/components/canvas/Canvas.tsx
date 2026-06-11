import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ServiceNode } from './ServiceNode';
import { useAppStore } from '@/store';
import { useGraph } from '@/hooks/useQueries';
import type { NodeData } from '@/types';

const NODE_TYPES = { serviceNode: ServiceNode };

export function Canvas() {
  const { selectedAppId, setSelectedNodeId, selectedNodeId, setUpdateNodeData } = useAppStore();
  const { data: graphData, isLoading, isError, error } = useGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const prevAppId = useRef<string | null>(null);

  useEffect(() => {
    if (graphData && prevAppId.current !== selectedAppId) {
      prevAppId.current = selectedAppId;
      setNodes(graphData.nodes as Node<NodeData>[]);
      setEdges(graphData.edges as Edge[]);
    }
  }, [graphData, selectedAppId, setNodes, setEdges]);

  // Expose updater to Zustand so inspector can patch ReactFlow nodes directly
  useEffect(() => {
    setUpdateNodeData((nodeId: string, patch: Partial<NodeData>) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, ...patch } } : n
        )
      );
    });
  }, [setUpdateNodeData, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({ ...n, selected: n.id === selectedNodeId }))
    );
  }, [selectedNodeId, setNodes]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
        setEdges((eds) => eds.filter((ed) => ed.source !== selectedNodeId && ed.target !== selectedNodeId));
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId, setNodes, setEdges, setSelectedNodeId],
  );

  const addNewNode = useCallback(() => {
    const id = `n${Date.now()}`;
    const newNode: Node<NodeData> = {
      id,
      type: 'serviceNode',
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
      data: {
        label: 'New Service',
        kind: 'service',
        status: 'unknown',
        description: '',
        cpuUsage: 0.01,
        memoryGb: 0.04,
        diskGb: 10,
        replicas: 1,
        costPerHour: '$0.02/HR',
        provider: 'aws',
        sliderValue: 50,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const stableNodeTypes = useMemo(() => NODE_TYPES, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[hsl(222_25%_6%)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[hsl(215_15%_55%)] font-mono">Loading graph…</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[hsl(222_25%_6%)]">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm px-6">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 text-2xl">⚠</div>
          <p className="text-sm text-red-400 font-mono">{error?.message ?? 'Failed to load graph'}</p>
          <p className="text-xs text-[hsl(215_15%_45%)]">Switch apps or refresh to retry</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative" onKeyDown={onKeyDown} tabIndex={0} style={{ outline: 'none' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={stableNodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        deleteKeyCode={null}
        selectionKeyCode={null}
        multiSelectionKeyCode={null}
        className="bg-[hsl(222_25%_6%)]"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          color="hsl(222 20% 20%)"
        />
        <Controls showInteractive={false} />
      </ReactFlow>

      <button
        onClick={addNewNode}
        className="absolute bottom-6 right-6 z-10 w-10 h-10 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center transition-colors text-xl font-light"
        aria-label="Add node"
        title="Add new node"
      >
        +
      </button>
    </div>
  );
}
