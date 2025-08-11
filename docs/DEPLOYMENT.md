# Deployment Guide

This guide covers how to deploy EduKidz to various platforms.

## Prerequisites

- Node.js 18 or higher
- npm package manager
- Git

## Build Process

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

This creates a `dist` folder with the production build.

## Deployment Options

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

#### Netlify Configuration

Create a `netlify.toml` file in the root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy automatically on push to main branch

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Use GitHub Actions for deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### AWS S3 + CloudFront

1. Create an S3 bucket for static website hosting
2. Build the project locally
3. Upload the `dist` folder contents to S3
4. Configure CloudFront for CDN distribution

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variables

For production deployments, you may need to set environment variables:

- `VITE_API_URL`: API endpoint URL
- `VITE_APP_VERSION`: Application version
- `VITE_ANALYTICS_ID`: Analytics tracking ID

## Performance Optimization

### Build Optimization

- Enable gzip compression
- Use CDN for static assets
- Implement proper caching headers
- Optimize images and fonts

### Runtime Optimization

- Lazy load components and routes
- Implement service worker for caching
- Use code splitting for better performance
- Monitor Core Web Vitals

## Security Considerations

- Use HTTPS in production
- Implement Content Security Policy (CSP)
- Sanitize user inputs
- Regular security audits

## Monitoring

Set up monitoring for:
- Application performance
- Error tracking
- User analytics
- Uptime monitoring

## Rollback Strategy

- Keep previous builds available
- Use feature flags for gradual rollouts
- Monitor deployment metrics
- Have a quick rollback plan

## Domain Configuration

1. Purchase a domain name
2. Configure DNS settings
3. Set up SSL certificate
4. Configure redirects (www to non-www or vice versa)

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Mobile responsiveness works
- [ ] Forms and interactions function
- [ ] Analytics tracking is active
- [ ] SEO meta tags are present
- [ ] Performance metrics are acceptable
- [ ] Security headers are configured
- [ ] Error monitoring is active