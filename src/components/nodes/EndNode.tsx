import { Handle, Position } from '@xyflow/react'

export default function EndNode({ data }: any) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      border: '2px solid #f87171',
      borderRadius: '50px',
      padding: '10px 24px',
      minWidth: '140px',
      textAlign: 'center',
      boxShadow: '0 0 20px rgba(239,68,68,0.3)',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#f87171' }} />
      <div style={{ fontSize: '11px', color: '#fecaca', marginBottom: '2px' }}>END</div>
      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '13px' }}>
        {data.endMessage || 'Complete'}
      </div>
    </div>
  )
}