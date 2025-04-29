import React from "react";

interface SidebarProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
}

const nodeTypes = [
  { type: "Start", label: "Start Node", bgColor: "bg-green-300" },
  { type: "Email", label: "Email Node", bgColor: "bg-blue-300" },
  { type: "Wait", label: "Wait Node", bgColor: "bg-yellow-300" },
  { type: "Condition", label: "Condition Node", bgColor: "bg-purple-300" },
];

export const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  return (
    <aside className="w-48 bg-gray-100 p-4 flex flex-col gap-2 border-r">
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className={`p-4 ${node.bgColor} mb-2 rounded cursor-pointer`}
          onDragStart={(e) => onDragStart(e, node.type)}
          draggable
        >
          {node.label}
        </div>
      ))}
    </aside>
  );
};