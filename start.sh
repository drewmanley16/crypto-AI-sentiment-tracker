#!/bin/bash

# Crypto Mood Tracker Startup Script
echo "🚀 Starting Crypto Mood Tracker..."

# Colors for output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    lsof -ti:$1 > /dev/null
    return $?
}

# Kill existing processes on the ports
echo -e "${YELLOW}Cleaning up existing processes...${NC}"
if check_port 3001; then
    echo "Killing process on port 3001..."
    lsof -ti:3001 | xargs kill -9 2>/dev/null || true
fi

if check_port 5173; then
    echo "Killing process on port 5173..."
    lsof -ti:5173 | xargs kill -9 2>/dev/null || true
fi

# Start backend server
echo -e "${CYAN}Starting backend server on port 3001...${NC}"
cd "$(dirname "$0")"
node server/index.js &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to initialize..."
sleep 3

# Check if backend is running
if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Backend server started successfully (PID: $BACKEND_PID)${NC}"
else
    echo -e "${RED}❌ Failed to start backend server${NC}"
    exit 1
fi

# Start frontend server
echo -e "${CYAN}Starting frontend development server on port 5173...${NC}"
cd client
npm run dev &
FRONTEND_PID=$!

echo -e "${GREEN}🎉 Crypto Mood Tracker is starting up!${NC}"
echo -e "Backend API: ${CYAN}http://localhost:3001${NC}"
echo -e "Frontend App: ${CYAN}http://localhost:5173${NC}"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
