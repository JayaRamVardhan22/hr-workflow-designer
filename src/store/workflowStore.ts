import { create } from 'zustand'
import { addEdge } from '@xyflow/react'

export interface WorkflowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: any
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  animated?: boolean
  sourceHandle?: string | null
  targetHandle?: string | null
}

interface WorkflowState {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  selectedNode: WorkflowNode | null
  sandboxOpen: boolean
  sandboxLog: string[]
  setNodes: (nodes: WorkflowNode[]) => void
  setEdges: (edges: WorkflowEdge[]) => void
  onConnect: (connection: any) => void
  selectNode: (node: WorkflowNode | null) => void
  updateNodeData: (id: string, data: object) => void
  deleteNode: (id: string) => void
  deleteEdge: (id: string) => void
  setSandboxOpen: (open: boolean) => void
  setSandboxLog: (log: string[]) => void
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  sandboxOpen: false,
  sandboxLog: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge({ ...connection, animated: true }, state.edges as any) as any,
    })),

  selectNode: (node) => set({ selectedNode: node }),

  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      ),
      selectedNode:
        state.selectedNode?.id === id
          ? { ...state.selectedNode, data: { ...state.selectedNode.data, ...data } }
          : state.selectedNode,
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNode: state.selectedNode?.id === id ? null : state.selectedNode,
    })),

  deleteEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((e) => e.id !== id),
    })),

  setSandboxOpen: (open) => set({ sandboxOpen: open }),
  setSandboxLog: (log) => set({ sandboxLog: log }),
}))