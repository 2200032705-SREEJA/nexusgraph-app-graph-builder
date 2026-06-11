import type { AppItem, GraphData } from '@/types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const APPS: AppItem[] = [
  { id: 'supertokens-golang', name: 'supertokens-golang', kind: 'service', color: '#6366f1' },
  { id: 'supertokens-java', name: 'supertokens-java', kind: 'service', color: '#a855f7' },
  { id: 'supertokens-python', name: 'supertokens-python', kind: 'service', color: '#ef4444' },
  { id: 'supertokens-ruby', name: 'supertokens-ruby', kind: 'database', color: '#8b5cf6' },
  { id: 'supertokens-go', name: 'supertokens-go', kind: 'gateway', color: '#ec4899' },
];

const GRAPHS: Record<string, GraphData> = {
  'supertokens-golang': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 80, y: 60 }, data: { label: 'API Gateway', kind: 'gateway', status: 'healthy', description: 'Main entry point', cpuUsage: 0.02, memoryGb: 0.05, diskGb: 10, replicas: 1, costPerHour: '$0.03/HR', provider: 'aws', sliderValue: 22 } },
      { id: 'n2', type: 'serviceNode', position: { x: 420, y: 40 }, data: { label: 'Postgres', kind: 'database', status: 'healthy', description: 'Primary DB', cpuUsage: 0.02, memoryGb: 0.05, diskGb: 10, replicas: 1, costPerHour: '$0.03/HR', provider: 'aws', sliderValue: 65 } },
      { id: 'n3', type: 'serviceNode', position: { x: 80, y: 320 }, data: { label: 'Redis', kind: 'database', status: 'down', description: 'Cache layer', cpuUsage: 0.02, memoryGb: 0.05, diskGb: 10, replicas: 1, costPerHour: '$0.03/HR', provider: 'aws', sliderValue: 40 } },
      { id: 'n4', type: 'serviceNode', position: { x: 460, y: 340 }, data: { label: 'Mongodb', kind: 'database', status: 'down', description: 'Document store', cpuUsage: 0.02, memoryGb: 0.05, diskGb: 10, replicas: 1, costPerHour: '$0.03/HR', provider: 'aws', sliderValue: 80 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n1', target: 'n3', animated: false },
      { id: 'e3', source: 'n2', target: 'n4', animated: true },
    ],
  },
  'supertokens-java': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 100, y: 80 }, data: { label: 'Auth Service', kind: 'service', status: 'healthy', description: 'JWT auth', cpuUsage: 0.04, memoryGb: 0.12, diskGb: 20, replicas: 2, costPerHour: '$0.06/HR', provider: 'gcp', sliderValue: 55 } },
      { id: 'n2', type: 'serviceNode', position: { x: 450, y: 80 }, data: { label: 'User DB', kind: 'database', status: 'degraded', description: 'User store', cpuUsage: 0.08, memoryGb: 0.25, diskGb: 50, replicas: 1, costPerHour: '$0.09/HR', provider: 'gcp', sliderValue: 30 } },
      { id: 'n3', type: 'serviceNode', position: { x: 260, y: 280 }, data: { label: 'Token Cache', kind: 'queue', status: 'healthy', description: 'Redis cache', cpuUsage: 0.01, memoryGb: 0.04, diskGb: 5, replicas: 1, costPerHour: '$0.02/HR', provider: 'gcp', sliderValue: 70 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n1', target: 'n3', animated: true },
    ],
  },
  'supertokens-python': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 150, y: 100 }, data: { label: 'Flask API', kind: 'service', status: 'degraded', description: 'REST API', cpuUsage: 0.06, memoryGb: 0.18, diskGb: 15, replicas: 3, costPerHour: '$0.07/HR', provider: 'aws', sliderValue: 45 } },
      { id: 'n2', type: 'serviceNode', position: { x: 480, y: 180 }, data: { label: 'Postgres', kind: 'database', status: 'healthy', description: 'Main db', cpuUsage: 0.03, memoryGb: 0.08, diskGb: 30, replicas: 1, costPerHour: '$0.05/HR', provider: 'aws', sliderValue: 60 } },
      { id: 'n3', type: 'serviceNode', position: { x: 200, y: 320 }, data: { label: 'Celery Worker', kind: 'queue', status: 'healthy', description: 'Task queue', cpuUsage: 0.02, memoryGb: 0.06, diskGb: 10, replicas: 2, costPerHour: '$0.04/HR', provider: 'aws', sliderValue: 25 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: false },
      { id: 'e2', source: 'n1', target: 'n3', animated: true },
    ],
  },
};

const DEFAULT_GRAPH: GraphData = {
  nodes: [
    { id: 'n1', type: 'serviceNode', position: { x: 100, y: 100 }, data: { label: 'Service A', kind: 'service', status: 'healthy', description: '', cpuUsage: 0.02, memoryGb: 0.05, diskGb: 10, replicas: 1, costPerHour: '$0.03/HR', provider: 'aws', sliderValue: 50 } },
    { id: 'n2', type: 'serviceNode', position: { x: 420, y: 100 }, data: { label: 'Database B', kind: 'database', status: 'degraded', description: '', cpuUsage: 0.02, memoryGb: 0.05, diskGb: 10, replicas: 1, costPerHour: '$0.03/HR', provider: 'aws', sliderValue: 30 } },
    { id: 'n3', type: 'serviceNode', position: { x: 260, y: 300 }, data: { label: 'Cache C', kind: 'queue', status: 'down', description: '', cpuUsage: 0.02, memoryGb: 0.05, diskGb: 10, replicas: 1, costPerHour: '$0.03/HR', provider: 'aws', sliderValue: 70 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', animated: true },
    { id: 'e2', source: 'n1', target: 'n3', animated: false },
  ],
};

export async function fetchApps(): Promise<AppItem[]> {
  await delay(600);
  return APPS;
}

export async function fetchGraph(appId: string): Promise<GraphData> {
  await delay(800);
  if (Math.random() < 0.05) throw new Error('Network error — graph failed to load');
  return GRAPHS[appId] ?? DEFAULT_GRAPH;
}
