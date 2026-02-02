import { AnimationType } from '@/types';

export const animationStyles: Record<AnimationType, string> = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,
  slideInLeft: `
    @keyframes slideInLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  slideInRight: `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  slideInUp: `
    @keyframes slideInUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  slideInDown: `
    @keyframes slideInDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  zoomIn: `
    @keyframes zoomIn {
      from { transform: scale(0); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `,
  zoomOut: `
    @keyframes zoomOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0); opacity: 0; }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
      40%, 43% { transform: translateY(-30px); }
      70% { transform: translateY(-15px); }
      90% { transform: translateY(-4px); }
    }
  `,
  rotate: `
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `,
  shake: `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
      20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
  `,
  none: '',
};

export function getAnimationClassName(animationType: AnimationType, trigger: string = 'onLoad'): string {
  if (animationType === 'none' || !animationType) return '';
  
  const baseClass = `animate-${animationType}`;
  const triggerClass = trigger === 'onHover' ? 'hover:' : trigger === 'onClick' ? 'active:' : '';
  
  return `${triggerClass}${baseClass}`;
}

export function generateAnimationCSS(animationType: AnimationType, duration: string = '1s', delay: string = '0s', easing: string = 'ease'): string {
  if (animationType === 'none' || !animationType) return '';
  
  const keyframes = animationType.charAt(0).toUpperCase() + animationType.slice(1);
  return `
    animation-name: ${animationType};
    animation-duration: ${duration};
    animation-delay: ${delay};
    animation-timing-function: ${easing};
    animation-fill-mode: both;
  `;
}

