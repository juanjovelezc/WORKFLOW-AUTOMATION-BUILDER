import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Pencil, Trash2, Save } from 'lucide-react';

interface NodeEmailProps {
  id: string;
  data: {
    title: string;
    content: string;
    isEditing?: boolean;
  };
  updateNode: (id: string, updatedData: any) => void;
  deleteNode: (id: string) => void;
}

const NodeEmail = ({ id, data, updateNode, deleteNode }: NodeEmailProps) => {
  const [editedData, setEditedData] = useState({
    title: data.title,
    content: data.content,
  });

  const handleEditClick = () => {
    updateNode(id, { isEditing: true });
  };

  const handleSaveClick = () => {
    updateNode(id, { ...editedData, isEditing: false });
  };

  const handleDeleteClick = () => {
    deleteNode(id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={`p-4 rounded border w-72 transition-all duration-300
        ${data.isEditing ? 'bg-blue-300 border-blue-500 scale-105 shadow-lg' : 'bg-blue-200 border-blue-400'}
      `}
    >
      <Handle type="target" position={Position.Top} />

      {data.isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="title"
            value={editedData.title}
            onChange={handleChange}
            placeholder="Título"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <input
            type="text"
            name="content"
            value={editedData.content}
            onChange={handleChange}
            placeholder="Contenido"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={handleSaveClick} title="Guardar" className="transition-transform hover:scale-110">
              <Save className="w-5 h-5 text-green-600 hover:text-green-800" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{data.title || 'Title'}</h3>
          <p className="text-sm text-gray-700">{data.content || 'Content'}</p>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={handleEditClick} title="Editar" className="transition-transform hover:scale-110">
              <Pencil className="w-5 h-5 text-blue-600 hover:text-blue-800" />
            </button>
            <button onClick={handleDeleteClick} title="Eliminar" className="transition-transform hover:scale-110">
              <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
            </button>
          </div>
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default NodeEmail;
