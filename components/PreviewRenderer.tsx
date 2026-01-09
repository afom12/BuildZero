'use client';

import { Component } from '@/types';

interface PreviewRendererProps {
  component: Component;
}

export default function PreviewRenderer({ component }: PreviewRendererProps) {
  const renderComponent = (comp: Component): React.ReactNode => {
    const style = comp.style || {};

    switch (comp.type) {
      case 'container':
        return (
          <div key={comp.id} style={style}>
            {comp.children?.map((child) => renderComponent(child))}
          </div>
        );

      case 'heading':
        return (
          <h1 key={comp.id} style={style}>
            {comp.props.text || 'Heading'}
          </h1>
        );

      case 'text':
        return (
          <p key={comp.id} style={style}>
            {comp.props.text || 'Text content'}
          </p>
        );

      case 'button':
        return (
          <button
            key={comp.id}
            style={style}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
          >
            {comp.props.text || 'Button'}
          </button>
        );

      case 'image':
        return (
          <img
            key={comp.id}
            src={comp.props.src || 'https://via.placeholder.com/400x300'}
            alt={comp.props.alt || 'Image'}
            style={style}
            className="max-w-full h-auto rounded"
          />
        );

      case 'input':
        return (
          <div key={comp.id} style={style}>
            {comp.props.label && (
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {comp.props.label}
              </label>
            )}
            <input
              type={comp.props.type || 'text'}
              placeholder={comp.props.placeholder || 'Enter text...'}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={comp.id} style={style}>
            {comp.props.label && (
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {comp.props.label}
              </label>
            )}
            <textarea
              placeholder={comp.props.placeholder || 'Enter text...'}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
            />
          </div>
        );

      case 'form':
        return (
          <form
            key={comp.id}
            style={style}
            className="p-4 border border-gray-200 rounded"
            onSubmit={(e) => e.preventDefault()}
          >
            {comp.children?.map((child) => renderComponent(child))}
          </form>
        );

      case 'section':
        return (
          <section key={comp.id} style={style}>
            {comp.children?.map((child) => renderComponent(child))}
          </section>
        );

      case 'card':
        return (
          <div
            key={comp.id}
            style={style}
            className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            {comp.children?.map((child) => renderComponent(child))}
          </div>
        );

      case 'header':
        return (
          <header
            key={comp.id}
            style={style}
            className="p-4 border-b border-gray-200 bg-white"
          >
            {comp.children?.map((child) => renderComponent(child))}
          </header>
        );

      case 'navigation':
        return (
          <nav
            key={comp.id}
            style={style}
            className="p-4 border-b border-gray-200 bg-white"
          >
            {comp.children?.map((child) => renderComponent(child))}
          </nav>
        );

      case 'footer':
        return (
          <footer
            key={comp.id}
            style={style}
            className="p-6 border-t border-gray-200 bg-gray-50"
          >
            {comp.children?.map((child) => renderComponent(child))}
          </footer>
        );

      case 'link':
        return (
          <a
            key={comp.id}
            href={comp.props.href || '#'}
            style={style}
            className="text-primary-600 hover:text-primary-800 underline"
          >
            {comp.props.text || 'Link'}
          </a>
        );

      case 'divider':
        return (
          <hr
            key={comp.id}
            style={style}
            className="border-gray-300"
          />
        );

      default:
        return null;
    }
  };

  return <>{renderComponent(component)}</>;
}

