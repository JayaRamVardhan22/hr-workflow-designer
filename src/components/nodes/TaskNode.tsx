import { Handle, Position } from '@xyflow/react'

export default function TaskNode({ data }: any) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e2130, #252840)',
      border: '2px solid #3b82f6',
      borderRadius: '12px',
      padding: '12px 16px',
      minWidth: '160px',
      boxShadow: '0 0 20px rgba(59,130,246,0.2)',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#3b82f6' }} />
      <div style={{ fontSize: '10px', color: '#93c5fd', marginBottom: '4px', textTransform: 'uppercase' }}>Task</div>
      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '13px', marginBottom: '4px' }}>
        {data.title || 'Task Node'}
      </div>
      {data.assignee && (
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>👤 {data.assignee}</div>
      )}
      {data.dueDate && (
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>📅 {data.dueDate}</div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: '#3b82f6' }} />
    </div>
  )
}