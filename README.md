# RevoGreen Desktop App

A real-time device monitoring dashboard application built with React, Vite, and WebSocket. The application displays live data from multiple devices including voltage, current, and temperature readings in an interactive dashboard.

## Features

- Real-time data monitoring
- Interactive charts using Recharts
- Material-UI based responsive design
- Data grid for historical data viewing
- Multi-device support
- WebSocket-based real-time communication

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v16 or higher)
- npm (Node Package Manager)

## Project Structure

The project consists of two main parts:
- Frontend: React application built with Vite
- Server: WebSocket server for real-time data transmission

## Installation

1. Clone the repository:
```bash
git clone https://github.com/rajat-dhanure/revogreen-test.git
cd revogreen-test
```

2. Install the root dependencies:
```bash
npm install ws
```

3. Install the frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

You need to run both the WebSocket server and the frontend development server simultaneously.

1. Start the WebSocket server (from the root directory):
```bash
cd revogreen-test/server
node server.js
```

2. In a new terminal, start the frontend development server:
```bash
cd revogreen-test/frontend
npm run dev
```

The application will be available at `http://localhost:5173` by default.

