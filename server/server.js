// Import the WebSocket library
const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Function to generate random data for a given device ID
function generateData(deviceId) {
    const v = Math.floor(Math.random() * 100); // Random voltage between 0–99
    const c = Math.floor(Math.random() * 100); // Random current between 0–99
    const t = Math.floor(Math.random() * 100); // Random temperature between 0–99
    return `${deviceId}V${v}C${c}T${t}`; // Format: D1VxxCyyTzz
}

// When a client connects to the WebSocket server
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send random data for D1 and D2 every 1.5 seconds
    setInterval(() => {
        ws.send(generateData('D1')); // Send data for Device 1
        ws.send(generateData('D2')); // Send data for Device 2
    }, 1500);
});
