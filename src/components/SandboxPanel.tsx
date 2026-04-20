import { useWorkflowStore } from '../store/workflowStore'

export default function SandboxPanel() {
  const { nodes, edges, sandboxLog, setSandboxLog, setSandboxOpen } = useWorkflowStore()

  const simulate = async () => {
    const log: string[] = []

    // Validate
    const startNodes = nodes.filter((n) => n.type === 'start')
    const endNodes = nodes.filter((n) => n.type === 'end')

    if (startNodes.length === 0) {
      log.push('❌ Error: No Start Node found!')
      setSandboxLog(log)
      return
    }
    if (endNodes.length === 0) {
      log.push('❌ Error: No End Node found!')
      setSandboxLog(log)
      return
    }
    if (nodes.length < 2) {
      log.push('❌ Error: Add more nodes to the workflow!')
      setSandboxLog(log)
      return
    }

    // Simulate step by step
    log.push('🚀 Starting workflow simulation...')
    log.push('─────────────────────────────')

    // Build adjacency
    const nodeMap = new Map(nodes.map((n) => [n.id, n]))
    const visited = new Set<string>()
    let current = startNodes[0]

    while (current) {
      if (visited.has(current.id)) {
        log.push('⚠️ Cycle detected! Stopping.')
        break
      }
      visited.add(current.id)

      const type = current.type
      const data = current.data

      if (type === 'start') {
        log.push(`▶ [START] ${data.title || 'Start'} — Workflow initiated`)
      } else if (type === 'task') {
        log.push(`📋 [TASK] ${data.title || 'Task'} — Assigned to: ${data.assignee || 'Unassigned'}`)
        if (data.dueDate) log.push(`   📅 Due: ${data.dueDate}`)
      } else if (type === 'approval') {
        log.push(`✅ [APPROVAL] ${data.title || 'Approval'} — Approver: ${data.approverRole || 'Not set'}`)
        if (data.threshold) log.push(`   ⚡ Auto-approve threshold: ${data.threshold}%`)
      } else if (type === 'automated') {
        log.push(`⚙️ [AUTOMATED] ${data.title || 'Automated'} — Action: ${data.action || 'None'}`)
        if (data.action === 'send_email') log.push(`   📧 Sending email to: ${data.to || 'unknown'}`)
        if (data.action === 'generate_doc') log.push(`   📄 Generating doc: ${data.template || 'unknown'}`)
      } else if (type === 'end') {
        log.push(`⏹ [END] ${data.endMessage || 'Workflow Complete'}`)
        break
      }

      // Find next node
      const nextEdge = edges.find((e) => e.source === current.id)
      if (!nextEdge) {
        if (type !== 'end') log.push('⚠️ Dead end — no connection from this node.')
        break
      }
      const nextNode = nodeMap.get(nextEdge.target)
      if (!nextNode) break
      current = nextNode
    }

    log.push('─────────────────────────────')
    log.push('✅ Simulation complete!')
    setSandboxLog(log)
  }

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '480px',
      maxHeight: '70vh',
      background: '#13151f',
      border: '1px solid #2d3148',
      borderRadius: '16px',
      padding: '20px',
      zIndex: 100,
      overflowY: 'auto',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '16px' }}>
          ▶ Workflow Sandbox
        </div>
        <button
          onClick={() => setSandboxOpen(false)}
          style={{ background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '6px', padding: '4px 12px', color: '#fff', cursor: 'pointer' }}
        >
          ✕ Close
        </button>
      </div>

      {/* Simulate Button */}
      <button
        onClick={simulate}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '16px',
        }}
      >
        ▶ Run Simulation
      </button>

      {/* Log Output */}
      {sandboxLog.length > 0 && (
        <div style={{
          background: '#0f1117',
          borderRadius: '8px',
          padding: '12px',
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: '1.8',
        }}>
          {sandboxLog.map((line, i) => (
            <div key={i} style={{ color: line.startsWith('❌') ? '#f87171' : line.startsWith('⚠️') ? '#fbbf24' : '#a3e635' }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}