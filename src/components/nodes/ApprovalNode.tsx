import { Handle, Position } from '@xyflow/react'

export default function ApprovalNode({ data }: any) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e2130, #252840)',
      border: '2px solid #f59e0b',
      borderRadius: '12px',
      padding: '12px 16px',
      minWidth: '160px',
      boxShadow: '0 0 20px rgba(245,158,11,0.2)',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#f59e0b' }} />
      <div style={{ fontSize: '10px', color: '#fcd34d', marginBottom: '4px', textTransform: 'uppercase' }}>Approval</div>
      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '13px', marginBottom: '4px' }}>
        {data.title || 'Approval Node'}
      </div>
      {data.approverRole && (
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>🧑‍💼 {data.approverRole}</div>
      )}
      {data.threshold && (
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>⚡ Auto at {data.threshold}%</div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: '#f59e0b' }} />
    </div>
  )
}