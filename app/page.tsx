'use client';

import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { Component } from '@/types';
import { createComponent, addComponent, updateComponent, deleteComponent } from '@/lib/utils';
import ComponentLibrary from '@/components/ComponentLibrary';
import Canvas from '@/components/Canvas';
import PropertyPanel from '@/components/PropertyPanel';
import PreviewRenderer from '@/components/PreviewRenderer';
import { Eye, Save, Download } from 'lucide-react';

export default function Home() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Load project from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('no-code-project');
    if (saved) {
      try {
        const project = JSON.parse(saved);
        setComponents(project.components || []);
      } catch (e) {
        console.error('Failed to load project:', e);
      }
    }
  }, []);

  // Save project to localStorage whenever components change
  useEffect(() => {
    if (components.length > 0) {
      const project = {
        id: 'current',
        name: 'My Project',
        components,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('no-code-project', JSON.stringify(project));
    }
  }, [components]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (active.id.toString().startsWith('component-')) {
      const componentType = active.data.current?.type as Component['type'];
      const newComponent = createComponent(componentType);
      
      if (over.id === 'canvas') {
        setComponents([...components, newComponent]);
      } else {
        const parentId = typeof over.id === 'string' ? over.id : null;
        setComponents(addComponent(components, parentId, newComponent));
      }
    }
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleUpdateComponent = (updates: Partial<Component>) => {
    if (!selectedComponent) return;
    
    setComponents(updateComponent(components, selectedComponent.id, updates));
    setSelectedComponent({ ...selectedComponent, ...updates });
  };

  const handleDeleteComponent = () => {
    if (!selectedComponent) return;
    
    setComponents(deleteComponent(components, selectedComponent.id));
    setSelectedComponent(null);
  };

  const handleExport = () => {
    const html = generateHTML(components);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateHTML = (comps: Component[]): string => {
    const renderComponent = (comp: Component): string => {
      const styleString = comp.style
        ? Object.entries(comp.style)
            .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
            .join('; ')
        : '';

      switch (comp.type) {
        case 'container':
          return `<div style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</div>`;
        case 'heading':
          return `<h1 style="${styleString}">${comp.props.text || 'Heading'}</h1>`;
        case 'text':
          return `<p style="${styleString}">${comp.props.text || 'Text'}</p>`;
        case 'button':
          return `<button style="${styleString}">${comp.props.text || 'Button'}</button>`;
        case 'image':
          return `<img src="${comp.props.src || ''}" alt="${comp.props.alt || ''}" style="${styleString}" />`;
        case 'input':
          return `<div><label>${comp.props.label || ''}</label><input type="${comp.props.type || 'text'}" placeholder="${comp.props.placeholder || ''}" style="${styleString}" /></div>`;
        case 'textarea':
          return `<div><label>${comp.props.label || ''}</label><textarea placeholder="${comp.props.placeholder || ''}" style="${styleString}"></textarea></div>`;
        case 'form':
          return `<form style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</form>`;
        default:
          return '';
      }
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>
</head>
<body>
  ${comps.map(renderComponent).join('')}
</body>
</html>`;
  };

  if (isPreviewMode) {
    return (
      <div className="h-screen flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Preview Mode</h1>
          <button
            onClick={() => setIsPreviewMode(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Exit Preview
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-white p-8">
          <div className="max-w-6xl mx-auto">
            {components.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                <p className="text-lg">No components to preview</p>
                <p className="text-sm mt-2">Add some components to see them here</p>
              </div>
            ) : (
              components.map((component) => (
                <PreviewRenderer key={component.id} component={component} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">No-Code Platform</h1>
            <span className="text-sm text-gray-500">Build websites without code</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreviewMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
            >
              <Eye size={18} />
              Preview
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <Download size={18} />
              Export HTML
            </button>
          </div>
        </header>

        {/* Main Editor */}
        <div className="flex-1 flex overflow-hidden">
          <ComponentLibrary />
          <Canvas
            components={components}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
          />
          <PropertyPanel
            selectedComponent={selectedComponent}
            onUpdate={handleUpdateComponent}
            onClose={() => setSelectedComponent(null)}
            onDelete={handleDeleteComponent}
          />
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="p-3 bg-white rounded-lg border border-primary-500 shadow-lg">
            Dragging...
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

