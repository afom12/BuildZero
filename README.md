# No-Code Website Development Platform

A powerful drag-and-drop website builder that lets you create beautiful websites without writing a single line of code.

## Features

✨ **Visual Drag-and-Drop Editor**
- Intuitive interface for building websites visually
- Drag components from the library onto your canvas
- Real-time preview of your changes

🎨 **Component Library**
- **Container** - Group and organize content
- **Heading** - Add titles and headings
- **Text** - Add paragraphs and text content
- **Button** - Interactive buttons with customizable text
- **Image** - Add images with URL support
- **Input** - Text inputs with labels and placeholders
- **Textarea** - Multi-line text inputs
- **Form** - Form containers for grouping inputs

⚙️ **Property Panel**
- Edit component properties in real-time
- Customize colors, padding, margins
- Configure text, labels, placeholders, and more
- Delete components with one click

👁️ **Preview Mode**
- See your website exactly as it will appear
- Full-screen preview without editor UI
- Perfect for testing before export

💾 **Auto-Save**
- Projects automatically save to browser localStorage
- Never lose your work
- Resume editing anytime

📥 **Export Functionality**
- Export your website as clean HTML
- Ready to deploy anywhere
- Includes all styles and structure

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
│   ├── page.tsx          # Main editor page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Canvas.tsx        # Main canvas/droppable area
│   ├── ComponentLibrary.tsx  # Component palette
│   ├── ComponentRenderer.tsx # Component rendering logic
│   └── PropertyPanel.tsx     # Property editor panel
├── lib/
│   └── utils.ts          # Utility functions
├── types/
│   └── index.ts          # TypeScript type definitions
└── package.json
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **@dnd-kit** - Modern drag-and-drop library
- **Lucide React** - Beautiful icon library

## Features Roadmap

- [ ] Undo/Redo functionality
- [ ] Multiple pages support
- [ ] Responsive design breakpoints
- [ ] More component types (cards, navigation, footer, etc.)
- [ ] Custom CSS editor
- [ ] Component templates
- [ ] Collaboration features
- [ ] Cloud storage integration
- [ ] Export to various formats (React, Vue, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and TypeScript

