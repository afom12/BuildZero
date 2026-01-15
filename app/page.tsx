'use client';

import { useState, useEffect, useCallback } from 'react';
import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { Component, Page, Breakpoint, Project } from '@/types';
import { createComponent, addComponent, updateComponent, deleteComponent, generateId } from '@/lib/utils';
import { useHistory } from '@/hooks/useHistory';
import ComponentLibrary from '@/components/ComponentLibrary';
import Canvas from '@/components/Canvas';
import PropertyPanel from '@/components/PropertyPanel';
import PreviewRenderer from '@/components/PreviewRenderer';
import CSSEditor from '@/components/CSSEditor';
import PageManager from '@/components/PageManager';
import BreakpointSelector from '@/components/BreakpointSelector';
import Marketplace from '@/components/Marketplace';
import VersionControl from '@/components/VersionControl';
import CloudStoragePanel from '@/components/CloudStoragePanel';
import LayerPanel from '@/components/LayerPanel';
import ProjectSettings from '@/components/ProjectSettings';
import KeyboardShortcutsPanel from '@/components/KeyboardShortcutsPanel';
import MediaLibrary from '@/components/MediaLibrary';
import WebsiteTemplates from '@/components/WebsiteTemplates';
import FormBuilder from '@/components/FormBuilder';
import AdvancedSEOTools from '@/components/AdvancedSEOTools';
import AlignmentGuides from '@/components/AlignmentGuides';
import FontManager from '@/components/FontManager';
import CodeEditor from '@/components/CodeEditor';
import ThemeBuilder from '@/components/ThemeBuilder';
import { exportToReact, exportToVue, generateHTML } from '@/lib/exporters';
import { sanitizeProps } from '@/lib/security';
import ToastContainer from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import DeploymentPanel from '@/components/DeploymentPanel';
import { copyComponent, pasteComponent, hasClipboard } from '@/lib/clipboard';
import { Eye, Download, Undo2, Redo2, Code, ChevronDown, Store, GitBranch, Cloud, Users, Layers, Settings, Keyboard, Copy, Clipboard, Image, Layout, FileText, Search, Ruler, Type, Palette, Rocket } from 'lucide-react';

export default function Home() {
  const [project, setProject] = useState<Project>({
    id: 'current',
    name: 'My Project',
    pages: [{
      id: generateId(),
      name: 'Home',
      components: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }],
    currentPageId: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const currentPage = project.pages.find(p => p.id === project.currentPageId) || project.pages[0];
  const [components, setComponents] = useState<Component[]>(currentPage?.components || []);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showCSSEditor, setShowCSSEditor] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showVersionControl, setShowVersionControl] = useState(false);
  const [showCloudStorage, setShowCloudStorage] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showProjectSettings, setShowProjectSettings] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showWebsiteTemplates, setShowWebsiteTemplates] = useState(false);
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [showAdvancedSEO, setShowAdvancedSEO] = useState(false);
  const [showAlignmentGuides, setShowAlignmentGuides] = useState(false);
  const [alignmentEnabled, setAlignmentEnabled] = useState(false);
  const [showFontManager, setShowFontManager] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [showThemeBuilder, setShowThemeBuilder] = useState(false);
  const [showDeploymentPanel, setShowDeploymentPanel] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');
  
  const toast = useToast();

  const history = useHistory(components);

  // Initialize currentPageId on mount
  useEffect(() => {
    if (!project.currentPageId && project.pages.length > 0) {
      setProject(prev => ({ ...prev, currentPageId: prev.pages[0].id }));
    }
  }, []);

  // Update components when page changes
  useEffect(() => {
    if (currentPage) {
      setComponents(currentPage.components || []);
      setSelectedComponent(null);
    }
  }, [project.currentPageId]);

  // Load project from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('no-code-project');
    if (saved) {
      try {
        const savedProject = JSON.parse(saved);
        if (savedProject.pages && savedProject.pages.length > 0) {
          setProject(savedProject);
          if (savedProject.currentPageId) {
            const page = savedProject.pages.find((p: Page) => p.id === savedProject.currentPageId);
            if (page) {
              setComponents(page.components || []);
            }
          }
        }
      } catch (e) {
        console.error('Failed to load project:', e);
      }
    }
  }, []);

  // Save project to localStorage whenever it changes
  useEffect(() => {
    const updatedProject = {
      ...project,
      pages: project.pages.map(p => 
        p.id === currentPage?.id 
          ? { ...p, components, updatedAt: new Date().toISOString() }
          : p
      ),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem('no-code-project', JSON.stringify(updatedProject));
  }, [components, project.pages.length]);

  const updateComponents = useCallback((newComponents: Component[]) => {
    setComponents(newComponents);
    history.pushToHistory(newComponents);
    
    // Update project
    setProject(prev => ({
      ...prev,
      pages: prev.pages.map(p =>
        p.id === currentPage?.id
          ? { ...p, components: newComponents, updatedAt: new Date().toISOString() }
          : p
      ),
    }));
  }, [currentPage?.id, history]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    let newComponents = [...components];

    if (active.id.toString().startsWith('component-')) {
      const componentType = active.data.current?.type as Component['type'];
      const newComponent = createComponent(componentType);
      
      if (over.id === 'canvas') {
        newComponents = [...components, newComponent];
      } else {
        const parentId = typeof over.id === 'string' ? over.id : null;
        newComponents = addComponent(components, parentId, newComponent);
      }
    } else if (active.id.toString().startsWith('template-')) {
      const template = active.data.current?.template as Component;
      if (template) {
        // Deep clone template and regenerate IDs
        const cloneTemplate = (comp: Component): Component => ({
          ...comp,
          id: generateId(),
          children: comp.children?.map(cloneTemplate),
        });
        const clonedTemplate = cloneTemplate(template);
        
        if (over.id === 'canvas') {
          newComponents = [...components, clonedTemplate];
        } else {
          const parentId = typeof over.id === 'string' ? over.id : null;
          newComponents = addComponent(components, parentId, clonedTemplate);
        }
      }
    }

    updateComponents(newComponents);
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleUpdateComponent = (updates: Partial<Component>) => {
    if (!selectedComponent) return;
    
    // Sanitize props if they exist
    if (updates.props) {
      updates.props = sanitizeProps(updates.props);
    }
    
    const newComponents = updateComponent(components, selectedComponent.id, updates);
    updateComponents(newComponents);
    setSelectedComponent({ ...selectedComponent, ...updates });
    toast.success('Component updated');
  };

  const handleDeleteComponent = () => {
    if (!selectedComponent) return;
    
    const newComponents = deleteComponent(components, selectedComponent.id);
    updateComponents(newComponents);
    setSelectedComponent(null);
    toast.success('Component deleted');
  };

  const handleUndo = () => {
    const previousState = history.undo();
    if (previousState) {
      setComponents(previousState);
    }
  };

  const handleRedo = () => {
    const nextState = history.redo();
    if (nextState) {
      setComponents(nextState);
    }
  };

  const handlePageSelect = (pageId: string) => {
    setProject(prev => ({ ...prev, currentPageId: pageId }));
  };

  const handlePageAdd = () => {
    const newPage: Page = {
      id: generateId(),
      name: `Page ${project.pages.length + 1}`,
      components: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProject(prev => ({
      ...prev,
      pages: [...prev.pages, newPage],
      currentPageId: newPage.id,
    }));
  };

  const handlePageDelete = (pageId: string) => {
    if (project.pages.length <= 1) return;
    
    setProject(prev => {
      const newPages = prev.pages.filter(p => p.id !== pageId);
      return {
        ...prev,
        pages: newPages,
        currentPageId: newPages[0]?.id || '',
      };
    });
  };

  const handlePageRename = (pageId: string, newName: string) => {
    setProject(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === pageId ? { ...p, name: newName } : p),
    }));
  };

  const handleExport = (format: 'html' | 'react' | 'vue') => {
    try {
      let content = '';
      let filename = '';
      let mimeType = '';

      if (format === 'html') {
        content = generateHTML(components, project);
        filename = 'website.html';
        mimeType = 'text/html';
      } else if (format === 'react') {
        content = exportToReact(components);
        filename = 'component.jsx';
        mimeType = 'text/javascript';
      } else if (format === 'vue') {
        content = exportToVue(components);
        filename = 'component.vue';
        mimeType = 'text/plain';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      setShowExportMenu(false);
      toast.success(`${format.toUpperCase()} file exported successfully`);
    } catch (error: any) {
      toast.error(`Export failed: ${error.message}`);
    }
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
        case 'section':
          return `<section style="${styleString}">${comp.children?.map(renderComponent).join('') || ''}</section>`;
        case 'heading':
          return `<h1 style="${styleString}">${comp.props.text || 'Heading'}</h1>`;
        case 'text':
          return `<p style="${styleString}">${comp.props.text || 'Text'}</p>`;
        case 'button':
          return `<button style="${styleString}">${comp.props.text || 'Button'}</button>`;
        case 'image':
          return `<img src="${comp.props.src || ''}" alt="${comp.props.alt || ''}" style="${styleString}" />`;
        case 'input':
          return `<div style="${styleString}"><label>${comp.props.label || ''}</label><input type="${comp.props.type || 'text'}" placeholder="${comp.props.placeholder || ''}" /></div>`;
        case 'textarea':
          return `<div style="${styleString}"><label>${comp.props.label || ''}</label><textarea placeholder="${comp.props.placeholder || ''}"></textarea></div>`;
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
          return `<a href="${comp.props.href || '#'}" style="${styleString}">${comp.props.text || 'Link'}</a>`;
        case 'divider':
          return `<hr style="${styleString}" />`;
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

  const getCanvasWidth = () => {
    switch (currentBreakpoint) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showExportMenu && !(event.target as Element).closest('.relative')) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showExportMenu]);

  // Expose functions to window for PropertyPanel access
  useEffect(() => {
    (window as any).openMediaLibrary = () => setShowMediaLibrary(true);
    (window as any).openFormBuilder = (comp: Component) => {
      setSelectedComponent(comp);
      setShowFormBuilder(true);
    };
    (window as any).openCodeEditor = (comp: Component) => {
      setSelectedComponent(comp);
      setShowCodeEditor(true);
    };
    return () => {
      delete (window as any).openMediaLibrary;
      delete (window as any).openFormBuilder;
      delete (window as any).openCodeEditor;
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      // Copy (Ctrl+C)
      if (e.ctrlKey && e.key === 'c' && selectedComponent) {
        e.preventDefault();
        copyComponent(selectedComponent);
      }

      // Paste (Ctrl+V)
      if (e.ctrlKey && e.key === 'v' && hasClipboard()) {
        e.preventDefault();
        const pasted = pasteComponent();
        if (pasted) {
          updateComponents([...components, pasted]);
        }
      }

      // Duplicate (Ctrl+D)
      if (e.ctrlKey && e.key === 'd' && selectedComponent) {
        e.preventDefault();
        const duplicated = { ...selectedComponent, id: generateId() };
        updateComponents([...components, duplicated]);
      }

      // Delete (Delete/Backspace)
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedComponent) {
        e.preventDefault();
        handleDeleteComponent();
      }

      // Escape (Deselect)
      if (e.key === 'Escape') {
        setSelectedComponent(null);
      }

      // Preview (Ctrl+P)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        setIsPreviewMode(!isPreviewMode);
      }

      // Keyboard shortcuts panel (Ctrl+/)
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setShowKeyboardShortcuts(true);
      }

      // Settings (Ctrl+,)
      if (e.ctrlKey && e.key === ',') {
        e.preventDefault();
        setShowProjectSettings(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent, components, isPreviewMode]);

  if (isPreviewMode) {
    return (
      <div className="h-screen flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Preview Mode - {currentPage?.name}</h1>
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
            <BreakpointSelector
              currentBreakpoint={currentBreakpoint}
              onBreakpointChange={setCurrentBreakpoint}
            />
            <button
              onClick={handleUndo}
              disabled={!history.canUndo}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={18} />
            </button>
            <button
              onClick={handleRedo}
              disabled={!history.canRedo}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={18} />
            </button>
            {selectedComponent && (
              <button
                onClick={() => setShowCSSEditor(true)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                title="Edit CSS"
              >
                <Code size={18} />
              </button>
            )}
            <button
              onClick={() => setShowMarketplace(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              title="Component Marketplace"
            >
              <Store size={18} />
            </button>
            <button
              onClick={() => setShowVersionControl(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              title="Version Control"
            >
              <GitBranch size={18} />
            </button>
            <button
              onClick={() => setShowCloudStorage(!showCloudStorage)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                showCloudStorage
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Cloud Storage"
            >
              <Cloud size={18} />
            </button>
            <button
              onClick={() => setShowCollaboration(!showCollaboration)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                showCollaboration
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Collaboration"
            >
              <Users size={18} />
            </button>
            <button
              onClick={() => setShowLayerPanel(!showLayerPanel)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                showLayerPanel
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Layer Panel"
            >
              <Layers size={18} />
            </button>
            <button
              onClick={() => setShowProjectSettings(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              title="Project Settings (Ctrl+,)"
            >
              <Settings size={18} />
            </button>
            <button
              onClick={() => setShowKeyboardShortcuts(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              title="Keyboard Shortcuts (Ctrl+/)"
            >
              <Keyboard size={18} />
            </button>
            <button
              onClick={() => setShowMediaLibrary(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              title="Media Library"
            >
              <Image size={18} />
            </button>
            <button
              onClick={() => setShowWebsiteTemplates(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              title="Website Templates"
            >
              <Layout size={18} />
            </button>
            <button
              onClick={() => setShowAdvancedSEO(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              title="Advanced SEO Tools"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setShowAlignmentGuides(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                alignmentEnabled
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Alignment Guides"
            >
              <Ruler size={18} />
            </button>
            <button
              onClick={() => setShowFontManager(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              title="Font Manager"
            >
              <Type size={18} />
            </button>
            <button
              onClick={() => setShowThemeBuilder(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              title="Theme Builder"
            >
              <Palette size={18} />
            </button>
            {selectedComponent && (
              <>
                <button
                  onClick={() => {
                    copyComponent(selectedComponent);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  title="Copy (Ctrl+C)"
                >
                  <Copy size={18} />
                </button>
                {hasClipboard() && (
                  <button
                    onClick={() => {
                      const pasted = pasteComponent();
                      if (pasted) {
                        updateComponents([...components, pasted]);
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    title="Paste (Ctrl+V)"
                  >
                    <Clipboard size={18} />
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => setIsPreviewMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
            >
              <Eye size={18} />
              Preview
            </button>
            <button
              onClick={() => setShowDeploymentPanel(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              title="Deploy Website"
            >
              <Rocket size={18} />
              Deploy
            </button>
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                <Download size={18} />
                Export
                <ChevronDown size={16} />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button
                    onClick={() => handleExport('html')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Export as HTML
                  </button>
                  <button
                    onClick={() => handleExport('react')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Export as React
                  </button>
                  <button
                    onClick={() => handleExport('vue')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Export as Vue
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Manager */}
        <PageManager
          pages={project.pages}
          currentPageId={project.currentPageId || project.pages[0]?.id || ''}
          onPageSelect={handlePageSelect}
          onPageAdd={handlePageAdd}
          onPageDelete={handlePageDelete}
          onPageRename={handlePageRename}
        />

        {/* Main Editor */}
        <div className="flex-1 flex overflow-hidden">
          {showLayerPanel ? (
            <LayerPanel
              components={components}
              selectedComponent={selectedComponent}
              onSelect={setSelectedComponent}
              onUpdate={(id, updates) => {
                const newComponents = updateComponent(components, id, updates);
                updateComponents(newComponents);
              }}
              onDelete={(id) => {
                const newComponents = deleteComponent(components, id);
                updateComponents(newComponents);
                if (selectedComponent?.id === id) {
                  setSelectedComponent(null);
                }
              }}
            />
          ) : (
            <ComponentLibrary />
          )}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ 
            maxWidth: currentBreakpoint === 'desktop' ? '100%' : getCanvasWidth(),
            margin: currentBreakpoint !== 'desktop' ? '0 auto' : '0'
          }}>
            <Canvas
              components={components}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
            />
          </div>
          {showCloudStorage ? (
            <CloudStoragePanel
              currentProject={project}
              onProjectLoad={(loadedProject) => {
                setProject(loadedProject);
                if (loadedProject.currentPageId) {
                  const page = loadedProject.pages.find(p => p.id === loadedProject.currentPageId);
                  if (page) {
                    setComponents(page.components || []);
                  }
                }
              }}
              onClose={() => setShowCloudStorage(false)}
            />
          ) : (
            <PropertyPanel
              selectedComponent={selectedComponent}
              onUpdate={handleUpdateComponent}
              onClose={() => setSelectedComponent(null)}
              onDelete={handleDeleteComponent}
            />
          )}
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="p-3 bg-white rounded-lg border border-primary-500 shadow-lg">
            Dragging...
          </div>
        ) : null}
      </DragOverlay>

      {showCSSEditor && selectedComponent && (
        <CSSEditor
          component={selectedComponent}
          onUpdate={(css) => {
            // Parse CSS and update component
            const styleObj: React.CSSProperties = {};
            const lines = css.split('\n');
            lines.forEach((line) => {
              const trimmed = line.trim();
              if (trimmed && trimmed.includes(':')) {
                const [key, ...valueParts] = trimmed.split(':');
                const value = valueParts.join(':').trim().replace(/;$/, '');
                const camelKey = key.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                (styleObj as any)[camelKey] = value;
              }
            });
            handleUpdateComponent({ style: styleObj });
            setShowCSSEditor(false);
          }}
          onClose={() => setShowCSSEditor(false)}
        />
      )}

      {showMarketplace && (
        <Marketplace
          onClose={() => setShowMarketplace(false)}
          onImport={(component) => {
            const newComponent = { ...component, id: generateId() };
            updateComponents([...components, newComponent]);
            setShowMarketplace(false);
          }}
          onExport={(component) => {
            // In real app, this would upload to marketplace
            toast.info('Component exported to marketplace! (This is a demo)');
          }}
        />
      )}

      {showVersionControl && (
        <VersionControl
          project={project}
          onVersionSelect={(version) => {
            setProject(version.project);
            if (version.project.currentPageId) {
              const page = version.project.pages.find(p => p.id === version.project.currentPageId);
              if (page) {
                setComponents(page.components || []);
              }
            }
            setShowVersionControl(false);
          }}
          onVersionCreate={(name, description, branch) => {
            // Version creation is handled in VersionControl component
            setShowVersionControl(false);
          }}
          onClose={() => setShowVersionControl(false)}
        />
      )}

      {showCollaboration && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Users size={18} />
              Collaboration
            </h3>
            <button
              onClick={() => setShowCollaboration(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Real-time collaboration features coming soon! This will allow multiple users to edit projects simultaneously.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>You (Online)</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Share link: <code className="bg-gray-100 px-1 rounded">coming-soon</code>
            </div>
          </div>
        </div>
      )}

      {showProjectSettings && (
        <ProjectSettings
          project={project}
          onUpdate={(updates) => {
            setProject({ ...project, ...updates });
          }}
          onClose={() => setShowProjectSettings(false)}
        />
      )}

      {showKeyboardShortcuts && (
        <KeyboardShortcutsPanel
          onClose={() => setShowKeyboardShortcuts(false)}
        />
      )}

      {showMediaLibrary && (
        <MediaLibrary
          onSelect={(media) => {
            if (selectedComponent && selectedComponent.type === 'image') {
              handleUpdateComponent({
                props: {
                  ...selectedComponent.props,
                  src: media.url,
                  alt: media.name,
                },
              });
            }
            setShowMediaLibrary(false);
          }}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}

      {showWebsiteTemplates && (
        <WebsiteTemplates
          onSelect={(template) => {
            setProject({
              ...project,
              pages: template.pages,
              currentPageId: template.pages[0]?.id || '',
            });
            if (template.pages[0]) {
              setComponents(template.pages[0].components || []);
            }
            setShowWebsiteTemplates(false);
          }}
          onClose={() => setShowWebsiteTemplates(false)}
        />
      )}

      {showFormBuilder && selectedComponent && (
        <FormBuilder
          component={selectedComponent}
          onUpdate={handleUpdateComponent}
          onClose={() => setShowFormBuilder(false)}
        />
      )}

      {showAdvancedSEO && (
        <AdvancedSEOTools
          project={project}
          onUpdate={(updates) => setProject({ ...project, ...updates })}
          onClose={() => setShowAdvancedSEO(false)}
        />
      )}

      {showAlignmentGuides && (
        <AlignmentGuides
          components={components}
          selectedComponent={selectedComponent}
          enabled={alignmentEnabled}
          onToggle={setAlignmentEnabled}
          onClose={() => setShowAlignmentGuides(false)}
        />
      )}

      {showFontManager && (
        <FontManager
          onSelect={(font) => {
            if (selectedComponent) {
              handleUpdateComponent({
                style: {
                  ...selectedComponent.style,
                  fontFamily: font.family,
                },
              });
            }
            setShowFontManager(false);
          }}
          onClose={() => setShowFontManager(false)}
        />
      )}

      {showCodeEditor && selectedComponent && (
        <CodeEditor
          component={selectedComponent}
          onUpdate={handleUpdateComponent}
          onClose={() => setShowCodeEditor(false)}
        />
      )}

      {showThemeBuilder && (
        <ThemeBuilder
          onSelect={(palette) => {
            // Apply theme colors globally or to selected component
            // This is a simplified implementation
            document.documentElement.style.setProperty('--primary-color', palette.colors.primary);
            document.documentElement.style.setProperty('--secondary-color', palette.colors.secondary);
            setShowThemeBuilder(false);
          }}
          onClose={() => setShowThemeBuilder(false)}
        />
      )}
    </DndContext>
  );
}
