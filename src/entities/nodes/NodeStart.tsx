
import { Handle, Position } from 'reactflow';

const NodeStart = () => {
  return (
    <div className="p-4 rounded border w-72 bg-green-200 border-green-400 text-center shadow-md">
      <Handle type="target" position={Position.Top} />
      <h3 className="font-bold text-lg">Start</h3>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default NodeStart;
