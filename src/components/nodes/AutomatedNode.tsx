import { Handle, Position } from '@xyflow/react'

export default function AutomatedNode({ data }: any) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e2130, #252840)',
      border: '2px solid #8b5cf6',
      borderRadius: '12px',
      padding: '12px 16px',
      minWidth: '160px',
      boxShadow: '0 0 20px rgba(139,92,246,0.2)',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#8b5cf6' }} />
      <div style={{ fontSize: '10px', color: '#c4b5fd', marginBottom: '4px', textTransform: 'uppercase' }}>Automated</div>
      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '13px', marginBottom: '4px' }}>
        {data.title || 'Automated Step'}
      </div>
      {data.action && (
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>⚙️ {data.action}</div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: '#8b5cf6' }} />
    </div>
  )
}