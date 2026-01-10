export interface Component {
  id: string;
  type: ComponentType;
  props: ComponentProps;
  children?: Component[];
  style?: React.CSSProperties;
  animation?: AnimationConfig;
}

export interface AnimationConfig {
  type?: AnimationType;
  duration?: string;
  delay?: string;
  easing?: string;
  trigger?: AnimationTrigger;
}

export type AnimationType = 
  | 'fadeIn'
  | 'fadeOut'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideInDown'
  | 'zoomIn'
  | 'zoomOut'
  | 'bounce'
  | 'rotate'
  | 'pulse'
  | 'shake'
  | 'none';

export type AnimationTrigger = 'onLoad' | 'onHover' | 'onClick' | 'onScroll';

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
  settings?: ProjectSettings;
}

export interface ProjectSettings {
  siteTitle?: string;
  siteDescription?: string;
  siteKeywords?: string;
  favicon?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
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

export interface ComponentMarketplaceItem {
  id: string;
  name: string;
  description: string;
  author: string;
  thumbnail?: string;
  component: Component;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  createdAt: string;
}

export interface ProjectVersion {
  id: string;
  version: string;
  name: string;
  description?: string;
  project: Project;
  createdAt: string;
  createdBy: string;
  branch?: string;
}

export interface CollaborationSession {
  id: string;
  projectId: string;
  participants: CollaborationParticipant[];
  createdAt: string;
}

export interface CollaborationParticipant {
  id: string;
  name: string;
  color: string;
  cursor?: { x: number; y: number };
}

