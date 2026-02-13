
/**
 * Security utilities for sanitizing user input and preventing XSS attacks
 */

/**
 * Sanitize HTML string to prevent XSS attacks
 * Simple implementation - in production, use DOMPurify library
 */
export function sanitizeHTML(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Sanitize text input (removes HTML tags)
 */
export function sanitizeText(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validate URL to prevent javascript: and data: protocols
 */
export function sanitizeURL(url: string): string {
  try {
    const parsed = new URL(url);
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    
    if (!allowedProtocols.includes(parsed.protocol)) {
      return '#';
    }
    
    return url;
  } catch {
    // If URL parsing fails, check if it's a relative URL
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      return url;
    }
    return '#';
  }
}

/**
 * Sanitize CSS to prevent injection attacks
 */
export function sanitizeCSS(css: string): string {
  // Remove potentially dangerous CSS expressions
  return css
    .replace(/expression\s*\(/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/@import/gi, '')
    .replace(/behavior\s*:/gi, '')
    .replace(/-moz-binding/gi, '');
}

/**
 * Sanitize component props to prevent XSS
 */
export function sanitizeProps(props: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string') {
      // Sanitize text props
      if (key === 'text' || key === 'content' || key === 'label' || key === 'placeholder') {
        sanitized[key] = sanitizeText(value);
      }
      // Sanitize URL props
      else if (key === 'href' || key === 'src' || key === 'url') {
        sanitized[key] = sanitizeURL(value);
      }
      // Sanitize other string props
      else {
        sanitized[key] = sanitizeText(value);
      }
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate and sanitize form input
 */
export function sanitizeFormInput(input: string, type: 'text' | 'email' | 'url' = 'text'): string {
  const sanitized = sanitizeText(input);
  
  if (type === 'email' && !validateEmail(sanitized)) {
    throw new Error('Invalid email format');
  }
  
  if (type === 'url' && sanitized && !sanitized.startsWith('http')) {
    throw new Error('URL must start with http:// or https://');
  }
  
  return sanitized;
}

/**
 * Content Security Policy helper
 */
export const CSP_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.vercel.com https://api.netlify.com",
  ].join('; '),
};

