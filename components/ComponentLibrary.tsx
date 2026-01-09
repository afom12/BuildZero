'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ComponentType, ComponentTemplate } from '@/types';
import { 
  Square, 
  Type, 
  MousePointerClick, 
  Image as ImageIcon, 
  Heading1,
  FileText,
  MessageSquare,
  Layout,
  CreditCard,
  Navigation,
  PanelBottom,
  PanelTop,
  Layers,
  Link as LinkIcon,
  Minus,
  ChevronDown,
  ChevronUp,
  Package
} from 'lucide-react';
import { componentTemplates } from '@/lib/templates';

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

function TemplateItem({ template }: { template: ComponentTemplate }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `template-${template.id}`,
    data: { template: template.component },
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
      className="p-3 bg-white rounded-lg border border-gray-200 cursor-grab active:cursor-grabbing hover:border-primary-500 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-2">
        <Package size={18} className="text-gray-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-700">{template.name}</div>
          <div className="text-xs text-gray-500 mt-1">{template.description}</div>
          <div className="text-xs text-primary-600 mt-1">{template.category}</div>
        </div>
      </div>
    </div>
  );
}

export default function ComponentLibrary() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showComponents, setShowComponents] = useState(true);

  const components: ComponentItemProps[] = [
    { type: 'container', label: 'Container', icon: <Layout size={20} /> },
    { type: 'section', label: 'Section', icon: <Layers size={20} /> },
    { type: 'heading', label: 'Heading', icon: <Heading1 size={20} /> },
    { type: 'text', label: 'Text', icon: <Type size={20} /> },
    { type: 'button', label: 'Button', icon: <MousePointerClick size={20} /> },
    { type: 'image', label: 'Image', icon: <ImageIcon size={20} /> },
    { type: 'input', label: 'Input', icon: <FileText size={20} /> },
    { type: 'textarea', label: 'Textarea', icon: <MessageSquare size={20} /> },
    { type: 'form', label: 'Form', icon: <Square size={20} /> },
    { type: 'card', label: 'Card', icon: <CreditCard size={20} /> },
    { type: 'navigation', label: 'Navigation', icon: <Navigation size={20} /> },
    { type: 'header', label: 'Header', icon: <PanelTop size={20} /> },
    { type: 'footer', label: 'Footer', icon: <PanelBottom size={20} /> },
    { type: 'link', label: 'Link', icon: <LinkIcon size={20} /> },
    { type: 'divider', label: 'Divider', icon: <Minus size={20} /> },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 overflow-y-auto flex-1">
        {/* Components Section */}
        <button
          onClick={() => setShowComponents(!showComponents)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h2 className="text-lg font-semibold text-gray-800">Components</h2>
          {showComponents ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {showComponents && (
          <div className="space-y-2 mb-6">
            {components.map((comp) => (
              <ComponentItem
                key={comp.type}
                type={comp.type}
                label={comp.label}
                icon={comp.icon}
              />
            ))}
          </div>
        )}

        {/* Templates Section */}
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h2 className="text-lg font-semibold text-gray-800">Templates</h2>
          {showTemplates ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {showTemplates && (
          <div className="space-y-2">
            {componentTemplates.map((template) => (
              <TemplateItem key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

