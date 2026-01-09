export interface Component {
  id: string;
  type: ComponentType;
  props: ComponentProps;
  children?: Component[];
  style?: React.CSSProperties;
}

export type ComponentType = 
  | 'container'
  | 'text'
  | 'button'
  | 'image'
  | 'heading'
  | 'input'
  | 'textarea'
  | 'form'
  | 'card'
  | 'navigation'
  | 'footer'
  | 'header'
  | 'section'
  | 'link'
  | 'divider';

export interface ComponentProps {
  [key: string]: any;
  text?: string;
  content?: string;
  src?: string;
  alt?: string;
  href?: string;
  placeholder?: string;
  type?: string;
  label?: string;
  className?: string;
}

export interface Page {
  id: string;
  name: string;
  components: Component[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  pages: Page[];
  currentPageId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditorState {
  selectedComponent: Component | null;
  components: Component[];
  history: Component[][];
  historyIndex: number;
}

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export interface ComponentTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  component: Component;
  category: string;
}

