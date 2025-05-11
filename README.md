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
git clone [your-repository-url]
cd revogreen-desktop-app
```

2. Install the root dependencies:
```bash
npm install
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
node server/server.js
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Dependencies

### Server Dependencies
- ws: ^8.18.2 (WebSocket server)

### Frontend Dependencies
- React: ^19.1.0
- React DOM: ^19.1.0
- @mui/material: ^7.1.0
- @mui/x-data-grid: ^8.3.0
- @emotion/react: ^11.14.0
- @emotion/styled: ^11.14.0
- recharts: ^2.15.3

### Development Dependencies
- Vite: ^6.3.5
- ESLint and related plugins
- Tailwind CSS: ^4.1.6
- TypeScript types for React

## Development

The frontend is built using Vite for fast development with HMR (Hot Module Replacement). The project uses:
- ESLint for code linting
- Material-UI for components
- Recharts for data visualization
- Tailwind CSS for styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 