import { useWorkflowStore } from '../store/workflowStore'

export default function NodeFormPanel() {
  const { selectedNode, updateNodeData, deleteNode } = useWorkflowStore()

  if (!selectedNode) return null

  const data = selectedNode.data
  const type = selectedNode.type

  const update = (key: string, value: any) => {
    updateNodeData(selectedNode.id, { [key]: value })
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '280px',
      height: '100%',
      background: '#13151f',
      borderLeft: '1px solid #1e2130',
      padding: '16px',
      overflowY: 'auto',
      zIndex: 10,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>
          Edit Node
        </div>
        <button
          onClick={() => deleteNode(selectedNode.id)}
          style={{ background: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', color: '#fff', cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>

      {/* Common Title Field */}
      {type !== 'end' && (
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Title</label>
          <input
            value={data.title || ''}
            onChange={(e) => update('title', e.target.value)}
            style={inputStyle}
            placeholder="Enter title"
          />
        </div>
      )}

      {/* Start Node Fields */}
      {type === 'start' && (
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Metadata (key=value)</label>
          <input
            value={data.metadata || ''}
            onChange={(e) => update('metadata', e.target.value)}
            style={inputStyle}
            placeholder="e.g. dept=HR, priority=high"
          />
        </div>
      )}

      {/* Task Node Fields */}
      {type === 'task' && (
        <>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={data.description || ''}
              onChange={(e) => update('description', e.target.value)}
              style={{ ...inputStyle, height: '70px', resize: 'none' }}
              placeholder="Describe the task"
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Assignee</label>
            <input
              value={data.assignee || ''}
              onChange={(e) => update('assignee', e.target.value)}
              style={inputStyle}
              placeholder="e.g. John Doe"
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Due Date</label>
            <input
              type="date"
              value={data.dueDate || ''}
              onChange={(e) => update('dueDate', e.target.value)}
              style={inputStyle}
            />
          </div>
        </>
      )}

      {/* Approval Node Fields */}
      {type === 'approval' && (
        <>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Approver Role</label>
            <select
              value={data.approverRole || ''}
              onChange={(e) => update('approverRole', e.target.value)}
              style={inputStyle}
            >
              <option value="">Select role</option>
              <option value="Manager">Manager</option>
              <option value="HRBP">HRBP</option>
              <option value="Director">Director</option>
            </select>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Auto-approve Threshold (%)</label>
            <input
              type="number"
              value={data.threshold || ''}
              onChange={(e) => update('threshold', e.target.value)}
              style={inputStyle}
              placeholder="e.g. 80"
            />
          </div>
        </>
      )}

      {/* Automated Node Fields */}
      {type === 'automated' && (
        <>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Action</label>
            <select
              value={data.action || ''}
              onChange={(e) => update('action', e.target.value)}
              style={inputStyle}
            >
              <option value="">Select action</option>
              <option value="send_email">Send Email</option>
              <option value="generate_doc">Generate Document</option>
            </select>
          </div>
          {data.action === 'send_email' && (
            <>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>To</label>
                <input
                  value={data.to || ''}
                  onChange={(e) => update('to', e.target.value)}
                  style={inputStyle}
                  placeholder="recipient@email.com"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Subject</label>
                <input
                  value={data.subject || ''}
                  onChange={(e) => update('subject', e.target.value)}
                  style={inputStyle}
                  placeholder="Email subject"
                />
              </div>
            </>
          )}
          {data.action === 'generate_doc' && (
            <>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Template</label>
                <input
                  value={data.template || ''}
                  onChange={(e) => update('template', e.target.value)}
                  style={inputStyle}
                  placeholder="Template name"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Recipient</label>
                <input
                  value={data.recipient || ''}
                  onChange={(e) => update('recipient', e.target.value)}
                  style={inputStyle}
                  placeholder="Recipient name"
                />
              </div>
            </>
          )}
        </>
      )}

      {/* End Node Fields */}
      {type === 'end' && (
        <>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>End Message</label>
            <input
              value={data.endMessage || ''}
              onChange={(e) => update('endMessage', e.target.value)}
              style={inputStyle}
              placeholder="e.g. Workflow Complete"
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Show Summary</label>
            <input
              type="checkbox"
              checked={data.summaryFlag || false}
              onChange={(e) => update('summaryFlag', e.target.checked)}
              style={{ marginLeft: '8px', width: '16px', height: '16px' }}
            />
          </div>
        </>
      )}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  color: '#94a3b8',
  marginBottom: '4px',
  textTransform: 'uppercase',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1a1d2e',
  border: '1px solid #2d3148',
  borderRadius: '6px',
  padding: '8px 10px',
  color: '#fff',
  fontSize: '13px',
  outline: 'none',
}