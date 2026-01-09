import { Component } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function createComponent(
  type: Component['type'],
  props: Component['props'] = {}
): Component {
  return {
    id: generateId(),
    type,
    props,
    children: [],
    style: {},
  };
}

export function findComponentById(
  components: Component[],
  id: string
): Component | null {
  for (const component of components) {
    if (component.id === id) {
      return component;
    }
    if (component.children) {
      const found = findComponentById(component.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function updateComponent(
  components: Component[],
  id: string,
  updates: Partial<Component>
): Component[] {
  return components.map((component) => {
    if (component.id === id) {
      return { ...component, ...updates };
    }
    if (component.children) {
      return {
        ...component,
        children: updateComponent(component.children, id, updates),
      };
    }
    return component;
  });
}

export function deleteComponent(
  components: Component[],
  id: string
): Component[] {
  return components
    .filter((component) => component.id !== id)
    .map((component) => {
      if (component.children) {
        return {
          ...component,
          children: deleteComponent(component.children, id),
        };
      }
      return component;
    });
}

export function addComponent(
  components: Component[],
  parentId: string | null,
  newComponent: Component
): Component[] {
  if (parentId === null) {
    return [...components, newComponent];
  }

  return components.map((component) => {
    if (component.id === parentId) {
      return {
        ...component,
        children: [...(component.children || []), newComponent],
      };
    }
    if (component.children) {
      return {
        ...component,
        children: addComponent(component.children, parentId, newComponent),
      };
    }
    return component;
  });
}

