import { Component } from '@/types';

export function exportToReact(components: Component[]): string {
  const renderComponent = (comp: Component, indent: number = 0): string => {
    const indentStr = '  '.repeat(indent);
    const styleObj = comp.style ? JSON.stringify(comp.style, null, 2) : '{}';
    const styleStr = comp.style
      ? Object.entries(comp.style)
          .map(([key, value]) => `${key}: '${value}'`)
          .join(', ')
      : '';

    switch (comp.type) {
      case 'container':
        return `${indentStr}<div style={{${styleStr}}}>\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</div>`;
      
      case 'heading':
        return `${indentStr}<h1 style={{${styleStr}}}>${comp.props.text || 'Heading'}</h1>`;
      
      case 'text':
        return `${indentStr}<p style={{${styleStr}}}>${comp.props.text || 'Text'}</p>`;
      
      case 'button':
        return `${indentStr}<button style={{${styleStr}}}>${comp.props.text || 'Button'}</button>`;
      
      case 'image':
        return `${indentStr}<img src="${comp.props.src || ''}" alt="${comp.props.alt || ''}" style={{${styleStr}}} />`;
      
      case 'input':
        return `${indentStr}<div style={{${styleStr}}}>\n${indentStr}  <label>${comp.props.label || ''}</label>\n${indentStr}  <input type="${comp.props.type || 'text'}" placeholder="${comp.props.placeholder || ''}" />\n${indentStr}</div>`;
      
      case 'textarea':
        return `${indentStr}<div style={{${styleStr}}}>\n${indentStr}  <label>${comp.props.label || ''}</label>\n${indentStr}  <textarea placeholder="${comp.props.placeholder || ''}"></textarea>\n${indentStr}</div>`;
      
      case 'form':
        return `${indentStr}<form style={{${styleStr}}}>\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</form>`;
      
      case 'section':
        return `${indentStr}<section style={{${styleStr}}}>\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</section>`;
      
      case 'card':
        return `${indentStr}<div className="card" style={{${styleStr}}}>\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</div>`;
      
      case 'header':
        return `${indentStr}<header style={{${styleStr}}}>\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</header>`;
      
      case 'navigation':
        return `${indentStr}<nav style={{${styleStr}}}>\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</nav>`;
      
      case 'footer':
        return `${indentStr}<footer style={{${styleStr}}}>\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</footer>`;
      
      case 'link':
        return `${indentStr}<a href="${comp.props.href || '#'}" style={{${styleStr}}}>${comp.props.text || 'Link'}</a>`;
      
      case 'divider':
        return `${indentStr}<hr style={{${styleStr}}} />`;
      
      default:
        return '';
    }
  };

  return `import React from 'react';

export default function GeneratedComponent() {
  return (
    <>
${components.map(c => renderComponent(c, 1)).join('\n')}
    </>
  );
}`;
}

export function exportToVue(components: Component[]): string {
  const renderComponent = (comp: Component, indent: number = 0): string => {
    const indentStr = '  '.repeat(indent);
    const styleStr = comp.style
      ? Object.entries(comp.style)
          .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: '${value}'`)
          .join('; ')
      : '';

    switch (comp.type) {
      case 'container':
        return `${indentStr}<div style="${styleStr}">\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</div>`;
      
      case 'heading':
        return `${indentStr}<h1 style="${styleStr}">${comp.props.text || 'Heading'}</h1>`;
      
      case 'text':
        return `${indentStr}<p style="${styleStr}">${comp.props.text || 'Text'}</p>`;
      
      case 'button':
        return `${indentStr}<button style="${styleStr}">${comp.props.text || 'Button'}</button>`;
      
      case 'image':
        return `${indentStr}<img src="${comp.props.src || ''}" alt="${comp.props.alt || ''}" style="${styleStr}" />`;
      
      case 'input':
        return `${indentStr}<div style="${styleStr}">\n${indentStr}  <label>${comp.props.label || ''}</label>\n${indentStr}  <input type="${comp.props.type || 'text'}" placeholder="${comp.props.placeholder || ''}" />\n${indentStr}</div>`;
      
      case 'textarea':
        return `${indentStr}<div style="${styleStr}">\n${indentStr}  <label>${comp.props.label || ''}</label>\n${indentStr}  <textarea placeholder="${comp.props.placeholder || ''}"></textarea>\n${indentStr}</div>`;
      
      case 'form':
        return `${indentStr}<form style="${styleStr}">\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</form>`;
      
      case 'section':
        return `${indentStr}<section style="${styleStr}">\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</section>`;
      
      case 'card':
        return `${indentStr}<div class="card" style="${styleStr}">\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</div>`;
      
      case 'header':
        return `${indentStr}<header style="${styleStr}">\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</header>`;
      
      case 'navigation':
        return `${indentStr}<nav style="${styleStr}">\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</nav>`;
      
      case 'footer':
        return `${indentStr}<footer style="${styleStr}">\n${comp.children?.map(c => renderComponent(c, indent + 1)).join('\n') || ''}\n${indentStr}</footer>`;
      
      case 'link':
        return `${indentStr}<a href="${comp.props.href || '#'}" style="${styleStr}">${comp.props.text || 'Link'}</a>`;
      
      case 'divider':
        return `${indentStr}<hr style="${styleStr}" />`;
      
      default:
        return '';
    }
  };

  return `<template>
${components.map(c => renderComponent(c, 1)).join('\n')}
</template>

<script setup>
// Vue component logic
</script>

<style scoped>
/* Component styles */
</style>`;
}

