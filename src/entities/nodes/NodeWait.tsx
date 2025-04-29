import  { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Pencil, Save, Trash2 } from 'lucide-react';

interface NodeWaitProps {
  id: string;
  data: {
    duration: number;
    isEditing?: boolean;
  };
  updateNode: (id: string, updatedData: any) => void;
  deleteNode: (id: string) => void;
}

const NodeWait = ({ id, data, updateNode, deleteNode }: NodeWaitProps) => {
  const [editedDuration, setEditedDuration] = useState(data.duration);

  const handleEditClick = () => {
    updateNode(id, { isEditing: true });
  };

  const handleSaveClick = () => {
    updateNode(id, { duration: editedDuration, isEditing: false });
  };

  const handleDeleteClick = () => {
    deleteNode(id);
  };

  return (
    <div
      className={`p-4 rounded border w-72 transition-all duration-300
        ${data.isEditing ? 'bg-yellow-300 border-yellow-500 scale-105 shadow-lg' : 'bg-yellow-200 border-yellow-400'}
      `}
    >
      <Handle type="target" position={Position.Top} />

      {data.isEditing ? (
        <div className="space-y-2">
          <input
            type="number"
            value={editedDuration}
            onChange={(e) => setEditedDuration(Number(e.target.value))}
            placeholder="Duración en segundos"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />
          <div className="flex justify-end pt-2">
            <button onClick={handleSaveClick} title="Guardar" className="transition-transform hover:scale-110">
              <Save className="w-5 h-5 text-green-600 hover:text-green-800" />
            </button>
            <button onClick={handleDeleteClick} title="Borrar" className="transition-transform hover:scale-110 ml-2">
              <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-center">Wait {data.duration || 0}hrs</h3>
          <div className="flex justify-end pt-2">
            <button onClick={handleEditClick} title="Editar" className="transition-transform hover:scale-110">
              <Pencil className="w-5 h-5 text-yellow-600 hover:text-yellow-800" />
            </button>
            <button onClick={handleDeleteClick} title="Borrar" className="transition-transform hover:scale-110 ml-2">
              <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
            </button>
          </div>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default NodeWait;
