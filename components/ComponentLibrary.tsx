'use client';

import { useDraggable } from '@dnd-kit/core';
import { ComponentType } from '@/types';
import { 
  Square, 
  Type, 
  MousePointerClick, 
  Image as ImageIcon, 
  Heading1,
  FileText,
  MessageSquare,
  Layout
} from 'lucide-react';

interface ComponentItemProps {
  type: ComponentType;
  label: string;
  icon: React.ReactNode;
}

function ComponentItem({ type, label, icon }: ComponentItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `component-${type}`,
    data: { type },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-grab active:cursor-grabbing hover:border-primary-500 hover:shadow-md transition-all"
    >
      <div className="text-gray-600">{icon}</div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}

export default function ComponentLibrary() {
  const components: ComponentItemProps[] = [
    { type: 'container', label: 'Container', icon: <Layout size={20} /> },
    { type: 'heading', label: 'Heading', icon: <Heading1 size={20} /> },
    { type: 'text', label: 'Text', icon: <Type size={20} /> },
    { type: 'button', label: 'Button', icon: <MousePointerClick size={20} /> },
    { type: 'image', label: 'Image', icon: <ImageIcon size={20} /> },
    { type: 'input', label: 'Input', icon: <FileText size={20} /> },
    { type: 'textarea', label: 'Textarea', icon: <MessageSquare size={20} /> },
    { type: 'form', label: 'Form', icon: <Square size={20} /> },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Components</h2>
      <div className="space-y-2">
        {components.map((comp) => (
          <ComponentItem
            key={comp.type}
            type={comp.type}
            label={comp.label}
            icon={comp.icon}
          />
        ))}
      </div>
    </div>
  );
}

