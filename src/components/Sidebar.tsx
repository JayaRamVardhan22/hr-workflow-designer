import { useWorkflowStore } from '../store/workflowStore'

const nodeTypes = [
  { type: 'start', label: 'Start Node', color: '#10b981', icon: '▶' },
  { type: 'task', label: 'Task Node', color: '#3b82f6', icon: '📋' },
  { type: 'approval', label: 'Approval Node', color: '#f59e0b', icon: '✅' },
  { type: 'automated', label: 'Automated Step', color: '#8b5cf6', icon: '⚙️' },
  { type: 'end', label: 'End Node', color: '#ef4444', icon: '⏹' },
]

export default function Sidebar() {
  const { nodes, setNodes, setSandboxOpen } = useWorkflowStore()

  const addNode = (type: string) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 250 + Math.random() * 100, y: 100 + Math.random() * 200 },
      data: { title: type.charAt(0).toUpperCase() + type.slice(1) },
    }
    setNodes([...nodes, newNode])
  }

  return (
    <div style={{
      width: '220px',
      background: '#13151f',
      borderRight: '1px solid #1e2130',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      gap: '8px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
          🔧 HR Workflow
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
          Designer
        </div>
      </div>

      {/* Node Types */}
      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>
        Drag & Add Nodes
      </div>

      {nodeTypes.map((node) => (
        <button
          key={node.type}
          onClick={() => addNode(node.type)}
          style={{
            background: '#1a1d2e',
            border: `1px solid ${node.color}`,
            borderRadius: '8px',
            padding: '10px 12px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = node.color + '22'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = '#1a1d2e'
          }}
        >
          <span>{node.icon}</span>
          <span>{node.label}</span>
        </button>
      ))}

      {/* Divider */}
      <div style={{ borderTop: '1px solid #1e2130', margin: '8px 0' }} />

      {/* Test Workflow Button */}
      <button
        onClick={() => setSandboxOpen(true)}
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '13px',
        }}
      >
        ▶ Test Workflow
      </button>
    </div>
  )
}