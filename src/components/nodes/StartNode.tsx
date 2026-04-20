import { Handle, Position } from '@xyflow/react'

export default function StartNode({ data }: any) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #10b981, #059669)',
      border: '2px solid #34d399',
      borderRadius: '50px',
      padding: '10px 24px',
      minWidth: '140px',
      textAlign: 'center',
      boxShadow: '0 0 20px rgba(16,185,129,0.3)',
    }}>
      <div style={{ fontSize: '11px', color: '#a7f3d0', marginBottom: '2px' }}>START</div>
      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '13px' }}>
        {data.title || 'Start'}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#34d399' }} />
    </div>
  )
}