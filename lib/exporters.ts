import { Component, Project } from '@/types';
import { sanitizeHTML, sanitizeURL } from './security';

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

export function generateHTML(components: Component[], project?: Project): string {
  const renderComponent = (comp: Component): string => {
    const styleString = comp.style
      ? Object.entries(comp.style)
          .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
          .join('; ')
      : '';

    const sanitizedProps = {
      text: comp.props.text ? sanitizeHTML(comp.props.text) : '',
      src: comp.props.src ? sanitizeURL(comp.props.src) : '',
      alt: comp.props.alt ? sanitizeHTML(comp.props.alt) : '',
      href: comp.props.href ? sanitizeURL(comp.props.href) : '',
      placeholder: comp.props.placeholder ? sanitizeHTML(comp.props.placeholder) : '',
      label: comp.props.label ? sanitizeHTML(comp.props.label) : '',
    };

    switch (comp.type) {
      case 'container':
        return `<div style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</div>`;
      case 'section':
        return `<section style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</section>`;
      case 'heading':
        return `<h1 style="${styleString}">${sanitizedProps.text || 'Heading'}</h1>`;
      case 'text':
        return `<p style="${styleString}">${sanitizedProps.text || 'Text'}</p>`;
      case 'button':
        return `<button style="${styleString}">${sanitizedProps.text || 'Button'}</button>`;
      case 'image':
        return `<img src="${sanitizedProps.src || ''}" alt="${sanitizedProps.alt || ''}" style="${styleString}" />`;
      case 'input':
        return `<div style="${styleString}"><label>${sanitizedProps.label || ''}</label><input type="${comp.props.type || 'text'}" placeholder="${sanitizedProps.placeholder || ''}" /></div>`;
      case 'textarea':
        return `<div style="${styleString}"><label>${sanitizedProps.label || ''}</label><textarea placeholder="${sanitizedProps.placeholder || ''}"></textarea></div>`;
      case 'form':
        return `<form style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</form>`;
      case 'card':
        return `<div class="card" style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</div>`;
      case 'header':
        return `<header style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</header>`;
      case 'navigation':
        return `<nav style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</nav>`;
      case 'footer':
        return `<footer style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</footer>`;
      case 'link':
        return `<a href="${sanitizedProps.href || '#'}" style="${styleString}">${sanitizedProps.text || 'Link'}</a>`;
      case 'divider':
        return `<hr style="${styleString}" />`;
      default:
        return '';
    }
  };

  const settings = project?.settings || {};
  const siteTitle = settings.siteTitle || project?.name || 'Generated Website';
  const siteDescription = settings.siteDescription || '';
  const siteKeywords = settings.siteKeywords || '';
  const favicon = settings.favicon || '';
  const ogTitle = settings.ogTitle || siteTitle;
  const ogDescription = settings.ogDescription || siteDescription;
  const ogImage = settings.ogImage || '';
  const twitterCard = settings.twitterCard || 'summary';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${sanitizeHTML(siteTitle)}</title>
  ${siteDescription ? `<meta name="description" content="${sanitizeHTML(siteDescription)}">` : ''}
  ${siteKeywords ? `<meta name="keywords" content="${sanitizeHTML(siteKeywords)}">` : ''}
  ${favicon ? `<link rel="icon" href="${sanitizeURL(favicon)}">` : ''}
  
  <!-- Open Graph -->
  <meta property="og:title" content="${sanitizeHTML(ogTitle)}">
  ${ogDescription ? `<meta property="og:description" content="${sanitizeHTML(ogDescription)}">` : ''}
  ${ogImage ? `<meta property="og:image" content="${sanitizeURL(ogImage)}">` : ''}
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="${twitterCard}">
  <meta name="twitter:title" content="${sanitizeHTML(ogTitle)}">
  ${ogDescription ? `<meta name="twitter:description" content="${sanitizeHTML(ogDescription)}">` : ''}
  ${ogImage ? `<meta name="twitter:image" content="${sanitizeURL(ogImage)}">` : ''}
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    * {
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  ${components.map(renderComponent).join('')}
</body>
</html>`;
}

