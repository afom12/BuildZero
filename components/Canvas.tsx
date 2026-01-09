'use client';

import { useDroppable } from '@dnd-kit/core';
import { Component } from '@/types';
import ComponentRenderer from './ComponentRenderer';

interface CanvasProps {
  components: Component[];
  selectedComponent: Component | null;
  onSelectComponent: (component: Component | null) => void;
}

export default function Canvas({
  components,
  selectedComponent,
  onSelectComponent,
}: CanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <div
        ref={setNodeRef}
        className={`min-h-full p-8 transition-colors ${
          isOver ? 'bg-primary-50' : 'bg-white'
        }`}
        style={{ minHeight: '100vh' }}
      >
        <div className="max-w-6xl mx-auto">
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <p className="text-gray-400 text-lg mb-2">
                  Drag components here to start building
                </p>
                <p className="text-gray-300 text-sm">
                  Your canvas is empty. Add components from the left panel.
                </p>
              </div>
            </div>
          ) : (
            components.map((component) => (
              <ComponentRenderer
                key={component.id}
                component={component}
                selectedComponent={selectedComponent}
                onSelect={onSelectComponent}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

