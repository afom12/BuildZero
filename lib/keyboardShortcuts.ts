export interface KeyboardShortcut {
  key: string;
  description: string;
  category: string;
}

export const keyboardShortcuts: KeyboardShortcut[] = [
  // Editing
  { key: 'Ctrl + Z', description: 'Undo', category: 'Editing' },
  { key: 'Ctrl + Y', description: 'Redo', category: 'Editing' },
  { key: 'Ctrl + C', description: 'Copy component', category: 'Editing' },
  { key: 'Ctrl + V', description: 'Paste component', category: 'Editing' },
  { key: 'Ctrl + D', description: 'Duplicate component', category: 'Editing' },
  { key: 'Delete / Backspace', description: 'Delete selected component', category: 'Editing' },
  { key: 'Ctrl + A', description: 'Select all components', category: 'Editing' },
  
  // Navigation
  { key: 'Esc', description: 'Deselect component', category: 'Navigation' },
  { key: 'Tab', description: 'Select next component', category: 'Navigation' },
  { key: 'Shift + Tab', description: 'Select previous component', category: 'Navigation' },
  
  // View
  { key: 'Ctrl + P', description: 'Toggle preview mode', category: 'View' },
  { key: 'Ctrl + /', description: 'Show keyboard shortcuts', category: 'View' },
  
  // Actions
  { key: 'Ctrl + S', description: 'Save project', category: 'Actions' },
  { key: 'Ctrl + E', description: 'Export project', category: 'Actions' },
];

export function getShortcutsByCategory() {
  const categories: Record<string, KeyboardShortcut[]> = {};
  keyboardShortcuts.forEach(shortcut => {
    if (!categories[shortcut.category]) {
      categories[shortcut.category] = [];
    }
    categories[shortcut.category].push(shortcut);
  });
  return categories;
}

