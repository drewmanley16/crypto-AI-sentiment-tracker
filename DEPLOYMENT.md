# 🚀 Deployment Guide

## Local Development

### Prerequisites
- Node.js 18+ and npm
- Git

### Setup
```bash
git clone https://github.com/drewmanley16/crypto-AI-sentiment-tracker.git
cd crypto-AI-sentiment-tracker

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys (optional for basic functionality)
```

### Running the Application

#### Option 1: Use the startup script
```bash
chmod +x start.sh
./start.sh
```

#### Option 2: Manual startup
```bash
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend development server
npm run client
```

#### Option 3: Individual commands
```bash
# Backend only
cd /path/to/project
node server/index.js

# Frontend only
cd /path/to/project/client
npm run dev
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## Production Deployment

### Building for Production
```bash
# Build frontend
cd client
npm run build

# The build files will be in client/dist/
```

### Deploy to Vercel (Recommended)

#### Frontend (client/)
1. Connect your GitHub repository to Vercel
2. Set the root directory to `client/`
3. Build command: `npm run build`
4. Output directory: `dist`

#### Backend (server/)
1. Deploy to Vercel as a separate project
2. Set the root directory to `server/`
3. Configure environment variables in Vercel dashboard

### Deploy to Railway

#### Full Stack
1. Connect GitHub repository to Railway
2. Railway will auto-detect the Node.js project
3. Set environment variables in Railway dashboard
4. Deploy both frontend and backend together

### Deploy to Heroku

#### Backend
```bash
# Create Heroku app
heroku create your-crypto-tracker-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=3001

# Deploy
git subtree push --prefix server heroku main
```

#### Frontend
```bash
# Build and deploy to Netlify/Vercel
cd client
npm run build
# Deploy dist/ folder
```

### Environment Variables for Production
```bash
NODE_ENV=production
PORT=3001
TWITTER_BEARER_TOKEN=your_real_token_here
TWITTER_API_KEY=your_real_key_here
TWITTER_API_SECRET=your_real_secret_here
```

### Docker Deployment (Optional)

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY server/ ./server/
EXPOSE 3001
CMD ["node", "server/index.js"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: 
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
  
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   lsof -ti:3001 | xargs kill -9
   lsof -ti:5173 | xargs kill -9
   ```

2. **Tailwind CSS issues**
   ```bash
   cd client
   npm install @tailwindcss/postcss
   ```

3. **Missing dependencies**
   ```bash
   npm install
   cd client && npm install
   ```

### Performance Tips
- Use PM2 for production backend process management
- Enable gzip compression on your web server
- Use CDN for static assets
- Implement Redis for API caching
