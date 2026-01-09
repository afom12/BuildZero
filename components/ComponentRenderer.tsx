'use client';

import { Component } from '@/types';
import { useDraggable } from '@dnd-kit/core';
import { MouseEvent } from 'react';

interface ComponentRendererProps {
  component: Component;
  selectedComponent: Component | null;
  onSelect: (component: Component | null) => void;
}

export default function ComponentRenderer({
  component,
  selectedComponent,
  onSelect,
}: ComponentRendererProps) {
  const isSelected = selectedComponent?.id === component.id;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.id,
    data: { component },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onSelect(component);
  };

  const renderComponent = () => {
    const baseClasses = `relative ${
      isSelected ? 'ring-2 ring-primary-500 ring-offset-2' : ''
    }`;

    switch (component.type) {
      case 'container':
        return (
          <div
            className={`${baseClasses} p-4 border border-gray-200 rounded`}
            style={component.style}
          >
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                selectedComponent={selectedComponent}
                onSelect={onSelect}
              />
            ))}
          </div>
        );

      case 'heading':
        return (
          <h1
            className={`${baseClasses} text-3xl font-bold mb-4`}
            style={component.style}
          >
            {component.props.text || 'Heading'}
          </h1>
        );

      case 'text':
        return (
          <p
            className={`${baseClasses} mb-4`}
            style={component.style}
          >
            {component.props.text || 'Text content'}
          </p>
        );

      case 'button':
        return (
          <button
            className={`${baseClasses} px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors`}
            style={component.style}
          >
            {component.props.text || 'Button'}
          </button>
        );

      case 'image':
        return (
          <img
            src={component.props.src || 'https://via.placeholder.com/400x300'}
            alt={component.props.alt || 'Image'}
            className={`${baseClasses} max-w-full h-auto rounded`}
            style={component.style}
          />
        );

      case 'input':
        return (
          <div className={baseClasses}>
            {component.props.label && (
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {component.props.label}
              </label>
            )}
            <input
              type={component.props.type || 'text'}
              placeholder={component.props.placeholder || 'Enter text...'}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              style={component.style}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className={baseClasses}>
            {component.props.label && (
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {component.props.label}
              </label>
            )}
            <textarea
              placeholder={component.props.placeholder || 'Enter text...'}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
              style={component.style}
            />
          </div>
        );

      case 'form':
        return (
          <form
            className={`${baseClasses} p-4 border border-gray-200 rounded`}
            style={component.style}
            onSubmit={(e) => e.preventDefault()}
          >
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                selectedComponent={selectedComponent}
                onSelect={onSelect}
              />
            ))}
          </form>
        );

      case 'section':
        return (
          <section
            className={baseClasses}
            style={component.style}
          >
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                selectedComponent={selectedComponent}
                onSelect={onSelect}
              />
            ))}
          </section>
        );

      case 'card':
        return (
          <div
            className={`${baseClasses} p-6 border border-gray-200 rounded-lg shadow-sm bg-white`}
            style={component.style}
          >
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                selectedComponent={selectedComponent}
                onSelect={onSelect}
              />
            ))}
          </div>
        );

      case 'header':
        return (
          <header
            className={`${baseClasses} p-4 border-b border-gray-200 bg-white`}
            style={component.style}
          >
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                selectedComponent={selectedComponent}
                onSelect={onSelect}
              />
            ))}
          </header>
        );

      case 'navigation':
        return (
          <nav
            className={`${baseClasses} p-4 border-b border-gray-200 bg-white`}
            style={component.style}
          >
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                selectedComponent={selectedComponent}
                onSelect={onSelect}
              />
            ))}
          </nav>
        );

      case 'footer':
        return (
          <footer
            className={`${baseClasses} p-6 border-t border-gray-200 bg-gray-50`}
            style={component.style}
          >
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                selectedComponent={selectedComponent}
                onSelect={onSelect}
              />
            ))}
          </footer>
        );

      case 'link':
        return (
          <a
            href={component.props.href || '#'}
            className={`${baseClasses} text-primary-600 hover:text-primary-800 underline`}
            style={component.style}
          >
            {component.props.text || 'Link'}
          </a>
        );

      case 'divider':
        return (
          <hr
            className={`${baseClasses} border-gray-300`}
            style={component.style}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className="cursor-move"
    >
      {renderComponent()}
    </div>
  );
}

