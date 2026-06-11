export type NodeStatus = 'healthy' | 'degraded' | 'down' | 'unknown';
export type NodeKind = 'service' | 'database' | 'gateway' | 'queue';

export interface NodeData {
  label: string;
  kind: NodeKind;
  status: NodeStatus;
  description?: string;
  cpuUsage: number;
  memoryGb: number;
  diskGb: number;
  replicas: number;
  costPerHour: string;
  provider: 'aws' | 'gcp' | 'azure';
  sliderValue: number;
}

export interface AppItem {
  id: string;
  name: string;
  kind: NodeKind;
  color: string;
}

export interface GraphData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowNode {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}
