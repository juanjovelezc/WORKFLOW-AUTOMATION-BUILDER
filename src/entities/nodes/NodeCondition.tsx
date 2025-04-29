import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Pencil, Save, Trash2 } from 'lucide-react';

interface NodeConditionProps {
  id: string;
  data: {
    condition: string;
    isEditing?: boolean;
  };
  updateNode: (id: string, updatedData: any) => void;
  deleteNode: (id: string) => void;
  createTrueFalseNodes: (conditionNode: any) => void;
}

const NodeCondition = ({
  id,
  data,
  updateNode,
  deleteNode,
  createTrueFalseNodes,
}: NodeConditionProps) => {
  const [editedCondition, setEditedCondition] = useState(data.condition);

  const handleEditClick = () => {
    updateNode(id, { isEditing: true });
  };

  const handleSaveClick = () => {
    updateNode(id, { condition: editedCondition, isEditing: false });

    // Crear nodos para true y false
    createTrueFalseNodes({
      id,
      type: 'Condition',
      position: { x: 0, y: 0 }, 
    });
  };

  const handleDeleteClick = () => {
    deleteNode(id);
  };

  return (
    <div
      className={`p-4 rounded border w-72 transition-all duration-300
        ${data.isEditing ? 'bg-purple-300 border-purple-500 scale-105 shadow-lg' : 'bg-purple-200 border-purple-400'}
      `}
    >
      <Handle type="target" position={Position.Top} />

      {data.isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedCondition}
            onChange={(e) => setEditedCondition(e.target.value)}
            placeholder="Condición"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
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
          <h3 className="font-bold text-lg text-center">{data.condition || 'Condition'}</h3>
          <div className="flex justify-end pt-2">
            <button onClick={handleEditClick} title="Editar" className="transition-transform hover:scale-110">
              <Pencil className="w-5 h-5 text-purple-600 hover:text-purple-800" />
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

export default NodeCondition;
