# No-Code Website Development Platform

A powerful drag-and-drop website builder that lets you create beautiful websites without writing a single line of code.

## Features

✨ **Visual Drag-and-Drop Editor**
- Intuitive interface for building websites visually
- Drag components from the library onto your canvas
- Real-time preview of your changes
- Undo/Redo functionality with keyboard shortcuts (Ctrl+Z / Ctrl+Y)

🎨 **Component Library** (15+ Components)
- **Layout**: Container, Section, Header, Footer
- **Content**: Heading, Text, Image, Link, Divider
- **Interactive**: Button, Input, Textarea, Form
- **Advanced**: Card, Navigation

📦 **Component Templates**
- Pre-built templates for common layouts
- Hero sections, feature cards, contact forms, navigation bars
- One-click insertion of complete component groups

⚙️ **Property Panel**
- Edit component properties in real-time
- Customize colors, padding, margins
- Configure text, labels, placeholders, links, and more
- Delete components with one click
- Custom CSS editor for advanced styling

📱 **Responsive Design**
- Breakpoint selector (Mobile, Tablet, Desktop)
- Preview your design at different screen sizes
- Responsive canvas that adapts to selected breakpoint

📄 **Multiple Pages Support**
- Create and manage multiple pages
- Switch between pages seamlessly
- Rename and delete pages
- Each page maintains its own components

👁️ **Preview Mode**
- See your website exactly as it will appear
- Full-screen preview without editor UI
- Perfect for testing before export

💾 **Auto-Save**
- Projects automatically save to browser localStorage
- Never lose your work
- Resume editing anytime

📥 **Export Functionality**
- **HTML Export** - Clean, production-ready HTML
- **React Export** - Generate React components (.jsx)
- **Vue Export** - Generate Vue components (.vue)
- All exports include styles and structure

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd No_code
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. **Add Components**: Drag components from the left sidebar onto the canvas
2. **Select Components**: Click on any component to select it
3. **Edit Properties**: Use the right panel to edit component properties and styles
4. **Preview**: Click the "Preview" button to see your website
5. **Export**: Click "Export HTML" to download your website as an HTML file

## Project Structure

```
├── app/
│   ├── page.tsx              # Main editor page with all features
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Canvas.tsx            # Main canvas/droppable area
│   ├── ComponentLibrary.tsx # Component palette with templates
│   ├── ComponentRenderer.tsx # Component rendering logic
│   ├── PreviewRenderer.tsx   # Preview mode renderer
│   ├── PropertyPanel.tsx    # Property editor panel
│   ├── CSSEditor.tsx         # Custom CSS editor modal
│   ├── PageManager.tsx       # Page management component
│   └── BreakpointSelector.tsx # Responsive breakpoint selector
├── hooks/
│   └── useHistory.ts         # Undo/Redo history management
├── lib/
│   ├── utils.ts              # Utility functions
│   ├── templates.ts          # Component templates library
│   └── exporters.ts          # Export functions (React, Vue, HTML)
├── types/
│   └── index.ts              # TypeScript type definitions
└── package.json
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **@dnd-kit** - Modern drag-and-drop library
- **Lucide React** - Beautiful icon library

## Features Roadmap

- [x] ✅ Undo/Redo functionality
- [x] ✅ Multiple pages support
- [x] ✅ Responsive design breakpoints
- [x] ✅ More component types (cards, navigation, footer, etc.)
- [x] ✅ Custom CSS editor
- [x] ✅ Component templates
- [x] ✅ Export to various formats (React, Vue, etc.)
- [x] ✅ Advanced animations and transitions
- [x] ✅ Component marketplace
- [x] ✅ Version control and branching
- [x] ✅ Cloud storage integration (localStorage with Firebase-ready architecture)
- [x] ✅ Collaboration features (UI ready, WebSocket integration pending)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and TypeScript

