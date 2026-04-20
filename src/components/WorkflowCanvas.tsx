import { useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type NodeTypes,
} from '@xyflow/react'
import { useWorkflowStore } from '../store/workflowStore'
import StartNode from './nodes/StartNode'
import TaskNode from './nodes/TaskNode'
import ApprovalNode from './nodes/ApprovalNode'
import AutomatedNode from './nodes/AutomatedNode'
import EndNode from './nodes/EndNode'

const nodeTypes: NodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
}

export default function WorkflowCanvas() {
  const { nodes, edges, setNodes, onConnect, selectNode, deleteEdge } =
    useWorkflowStore()

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: any) => {
      selectNode(node)
    },
    [selectNode]
  )

  const onPaneClick = useCallback(() => {
    selectNode(null)
  }, [selectNode])

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: any) => {
      deleteEdge(edge.id)
    },
    [deleteEdge]
  )

  const onNodesChange = useCallback(
    (changes: any[]) => {
      setNodes(
        nodes
          .map((n) => {
            const change = changes.find((c: any) => c.id === n.id)
            if (change && change.type === 'position' && change.position) {
              return { ...n, position: change.position }
            }
            return n
          })
          .filter((n) => {
            const change = changes.find((c: any) => c.id === n.id)
            return !(change && change.type === 'remove')
          })
      )
    },
    [nodes, setNodes]
  )

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges as any}
        onNodesChange={onNodesChange}
        onEdgesChange={() => {}}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#1e2130" gap={20} />
        <Controls />
        <MiniMap
          style={{ background: '#1a1d2e' }}
          nodeColor="#3b82f6"
        />
      </ReactFlow>
    </div>
  )
}