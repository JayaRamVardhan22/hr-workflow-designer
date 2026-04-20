import { ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import WorkflowCanvas from './components/WorkflowCanvas'
import Sidebar from './components/Sidebar'
import NodeFormPanel from './components/NodeFormPanel'
import SandboxPanel from './components/SandboxPanel'
import { useWorkflowStore } from './store/workflowStore'
import './index.css'

function App() {
  const { sandboxOpen } = useWorkflowStore()

  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', height: '100vh', background: '#0f1117' }}>
        <Sidebar />
        <div style={{ flex: 1, position: 'relative' }}>
          <WorkflowCanvas />
          <NodeFormPanel />
          {sandboxOpen && <SandboxPanel />}
        </div>
      </div>
    </ReactFlowProvider>
  )
}

export default App