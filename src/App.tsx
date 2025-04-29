import React, { useCallback, useRef, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  Node,
  Edge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Sidebar } from './widgets/Sidebar';

import NodeStart from './entities/nodes/NodeStart';
import NodeCondition from './entities/nodes/NodeCondition';
import NodeWait from './entities/nodes/NodeWait';
import NodeEmail from './entities/nodes/NodeEmail';

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const nodesRef = useRef<Node[]>(nodes);
  nodesRef.current = nodes;

  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const updateNode = useCallback((id: string, updatedData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...updatedData } }
          : node
      )
    );
  }, [setNodes]);

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  }, [setNodes]);

  const createTrueFalseNodes = useCallback((conditionNode: Node) => {
    const trueNode: Node = {
      id: `${+new Date()}-true`,
      type: 'Email',
      position: { x: conditionNode.position.x + 200, y: conditionNode.position.y },
      data: { title: 'True Node', content: 'This is a true node.' },
    };

    const falseNode: Node = {
      id: `${+new Date()}-false`,
      type: 'Email',
      position: { x: conditionNode.position.x + 200, y: conditionNode.position.y + 100 },
      data: { title: 'False Node', content: 'This is a false node.' },
    };

    setNodes((nds) => nds.concat(trueNode, falseNode));

    // Crear las conexiones
    setEdges((eds) => [
      ...eds,
      { id: `${conditionNode.id}-true`, source: conditionNode.id, target: trueNode.id, label: 'True' },
      { id: `${conditionNode.id}-false`, source: conditionNode.id, target: falseNode.id, label: 'False' },
    ]);
  }, [setNodes, setEdges]);

  const nodeTypes = useMemo(() => ({
    Start: NodeStart,
    Email: (props: any) => (
      <NodeEmail
        {...props}
        updateNode={updateNode}
        deleteNode={deleteNode}
      />
    ),
    Wait: (props: any) => (
      <NodeWait
        {...props}
        updateNode={updateNode}
        deleteNode={deleteNode}
      />
    ),
    Condition: (props: any) => (
      <NodeCondition
        {...props}
        updateNode={updateNode}
        deleteNode={deleteNode}
        createTrueFalseNodes={createTrueFalseNodes}  
      />
    ),
  }), [updateNode, deleteNode, createTrueFalseNodes]);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    if (type === 'Start' && nodesRef.current.some((node) => node.type === 'Start')) {
      alert("Solo puede haber un nodo 'Start'.");
      return;
    }

    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode: Node = {
      id: `${+new Date()}`,
      type,
      position,
      data: { title: '', content: '', duration: 0, condition: '', isEditing: false },
    };

    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
// exportar a json
const exportFlow = () => {
  const data = {
    nodes,
    edges,
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'flow.json';
  a.click();

  URL.revokeObjectURL(url);
};


  return (
    
    <div className="flex h-screen">

      <Sidebar onDragStart={onDragStart} />
      <div className="flex-1 bg-gray-50">
        <div className="w-full h-full relative">
        <button
    onClick={exportFlow}
    className="fixed bottom-6 left-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all z-50"
  >
    Exportar JSON
  </button>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default App;
