import { Component } from '@/types';
import { generateId } from './utils';

let clipboard: Component | null = null;

export function copyComponent(component: Component): void {
  // Deep clone the component
  clipboard = JSON.parse(JSON.stringify(component));
}

export function pasteComponent(): Component | null {
  if (!clipboard) return null;
  
  // Deep clone and regenerate IDs
  const cloneComponent = (comp: Component): Component => ({
    ...comp,
    id: generateId(),
    children: comp.children?.map(cloneComponent),
  });
  
  return cloneComponent(clipboard);
}

export function hasClipboard(): boolean {
  return clipboard !== null;
}

export function clearClipboard(): void {
  clipboard = null;
}

