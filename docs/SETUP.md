# EduKidz Setup Guide

This guide will help you set up the EduKidz project locally and prepare it for deployment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/iamNarenA/EduKidz.git
cd EduKidz
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
EduKidz/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Footer.tsx      # Site footer
│   │   ├── WorksheetViewer.tsx  # Worksheet player
│   │   └── GamePlayer.tsx  # Game engine
│   ├── pages/              # Main application pages
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── WorksheetsPage.tsx   # Worksheet library
│   │   ├── GamesPage.tsx   # Game library
│   │   └── ProfilePage.tsx # User dashboard
│   ├── context/            # State management
│   │   └── GameContext.tsx # Global app state
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # Type definitions
│   ├── App.tsx             # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── public/                 # Static assets
├── docs/                   # Documentation
├── .github/               # GitHub templates and workflows
└── package.json           # Project configuration
```

## 🎯 Key Features

### Educational Content
- **Interactive Worksheets** - Multiple choice, fill-in-the-blank, drawing activities
- **Educational Games** - Math Monster Mayhem, Word Adventure Quest, Science Explorer
- **Progress Tracking** - Points, badges, streaks, and analytics
- **Multi-Subject Support** - Math, Reading, Science, Art, Social Studies, Music

### Technical Features
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Context API** for state management
- **Responsive Design** for all devices

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow the existing component patterns
- Use Tailwind CSS for styling
- Implement proper error handling
- Write meaningful commit messages

### Component Guidelines
- Keep components focused and reusable
- Use proper TypeScript types
- Implement responsive design
- Follow accessibility best practices
- Add proper documentation

### Educational Content Guidelines
- Ensure age-appropriate material
- Follow educational best practices
- Include clear learning objectives
- Provide engaging interactions
- Test with target age groups

## 🌐 Environment Setup

### Development Environment
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Mobile responsiveness works
- [ ] Worksheets function properly
- [ ] Games work as expected
- [ ] Progress tracking updates
- [ ] Navigation works smoothly

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy automatically on push to main branch

## 🔒 Security Considerations

- All user data is stored locally
- No personal information is collected
- COPPA compliant design
- Safe, ad-free environment for children

## 📊 Performance Optimization

- Lazy loading for components
- Image optimization
- Code splitting
- Efficient state management
- Minimal bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines.

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.