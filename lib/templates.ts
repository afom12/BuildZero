import { ComponentTemplate } from '@/types';
import { createComponent } from './utils';

export const componentTemplates: ComponentTemplate[] = [
  {
    id: 'hero-section',
    name: 'Hero Section',
    description: 'A beautiful hero section with heading, text, and CTA button',
    category: 'Sections',
    component: {
      id: 'template-hero',
      type: 'section',
      props: {},
      style: {
        padding: '80px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
      },
      children: [
        {
          id: 'template-hero-heading',
          type: 'heading',
          props: { text: 'Welcome to Our Platform' },
          style: { fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' },
          children: [],
        },
        {
          id: 'template-hero-text',
          type: 'text',
          props: { text: 'Build amazing websites without writing a single line of code. Start creating today!' },
          style: { fontSize: '20px', marginBottom: '30px', opacity: 0.9 },
          children: [],
        },
        {
          id: 'template-hero-button',
          type: 'button',
          props: { text: 'Get Started' },
          style: { padding: '12px 32px', fontSize: '18px' },
          children: [],
        },
      ],
    },
  },
  {
    id: 'card-template',
    name: 'Feature Card',
    description: 'A card component with image, heading, and text',
    category: 'Cards',
    component: {
      id: 'template-card',
      type: 'card',
      props: {},
      style: {
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#ffffff',
        maxWidth: '300px',
      },
      children: [
        {
          id: 'template-card-image',
          type: 'image',
          props: {
            src: 'https://via.placeholder.com/300x200',
            alt: 'Feature image',
          },
          style: { width: '100%', borderRadius: '4px', marginBottom: '16px' },
          children: [],
        },
        {
          id: 'template-card-heading',
          type: 'heading',
          props: { text: 'Feature Title' },
          style: { fontSize: '24px', marginBottom: '12px' },
          children: [],
        },
        {
          id: 'template-card-text',
          type: 'text',
          props: { text: 'This is a description of the feature. It explains what makes this feature great.' },
          style: { fontSize: '16px', color: '#666666' },
          children: [],
        },
      ],
    },
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'A complete contact form with name, email, and message fields',
    category: 'Forms',
    component: {
      id: 'template-form',
      type: 'form',
      props: {},
      style: {
        padding: '32px',
        borderRadius: '8px',
        backgroundColor: '#f9fafb',
        maxWidth: '500px',
      },
      children: [
        {
          id: 'template-form-heading',
          type: 'heading',
          props: { text: 'Contact Us' },
          style: { fontSize: '32px', marginBottom: '24px' },
          children: [],
        },
        {
          id: 'template-form-name',
          type: 'input',
          props: { label: 'Name', placeholder: 'Enter your name', type: 'text' },
          style: { marginBottom: '16px' },
          children: [],
        },
        {
          id: 'template-form-email',
          type: 'input',
          props: { label: 'Email', placeholder: 'Enter your email', type: 'email' },
          style: { marginBottom: '16px' },
          children: [],
        },
        {
          id: 'template-form-message',
          type: 'textarea',
          props: { label: 'Message', placeholder: 'Enter your message' },
          style: { marginBottom: '24px' },
          children: [],
        },
        {
          id: 'template-form-button',
          type: 'button',
          props: { text: 'Send Message' },
          style: {},
          children: [],
        },
      ],
    },
  },
  {
    id: 'navigation-bar',
    name: 'Navigation Bar',
    description: 'A responsive navigation bar with logo and menu items',
    category: 'Navigation',
    component: {
      id: 'template-nav',
      type: 'navigation',
      props: {},
      style: {
        padding: '16px 32px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      children: [
        {
          id: 'template-nav-logo',
          type: 'text',
          props: { text: 'Logo' },
          style: { fontSize: '24px', fontWeight: 'bold' },
          children: [],
        },
        {
          id: 'template-nav-links',
          type: 'container',
          props: {},
          style: { display: 'flex', gap: '24px' },
          children: [
            {
              id: 'template-nav-link-1',
              type: 'link',
              props: { text: 'Home', href: '#' },
              style: {},
              children: [],
            },
            {
              id: 'template-nav-link-2',
              type: 'link',
              props: { text: 'About', href: '#' },
              style: {},
              children: [],
            },
            {
              id: 'template-nav-link-3',
              type: 'link',
              props: { text: 'Contact', href: '#' },
              style: {},
              children: [],
            },
          ],
        },
      ],
    },
  },
];

