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
  | 'form';

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

export interface Project {
  id: string;
  name: string;
  components: Component[];
  createdAt: string;
  updatedAt: string;
}

export interface EditorState {
  selectedComponent: Component | null;
  components: Component[];
  history: Component[][];
  historyIndex: number;
}

