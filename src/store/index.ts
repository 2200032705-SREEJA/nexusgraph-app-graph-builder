import { create } from 'zustand';
import type { NodeData } from '@/types';

type NodeUpdater = (nodeId: string, patch: Partial<NodeData>) => void;

interface AppStore {
  selectedAppId: string;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: string;
  updateNodeData: NodeUpdater | null;
  setSelectedAppId: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: string) => void;
  toggleMobilePanel: () => void;
  setUpdateNodeData: (fn: NodeUpdater) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: 'supertokens-golang',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  updateNodeData: null,
  setSelectedAppId: (id) => set({ selectedAppId: id, selectedNodeId: null }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  toggleMobilePanel: () => set((s) => ({ isMobilePanelOpen: !s.isMobilePanelOpen })),
  setUpdateNodeData: (fn) => set({ updateNodeData: fn }),
}));
