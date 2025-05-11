// Import necessary React hooks and MUI components
import { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

// Create a custom Material UI theme
const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' }, // Blue
    secondary: { main: '#f50057' } // Pink
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          width: '100%',
          maxWidth: '100%',
        },
      },
    },
  },
});

// Define table columns for DataGrid
const columns = [
  { field: 'timestamp', headerName: 'Time', width: 150 },
  { field: 'voltage', headerName: 'Voltage', width: 130, type: 'number' },
  { field: 'current', headerName: 'Current', width: 130, type: 'number' },
  { field: 'temperature', headerName: 'Temperature', width: 130, type: 'number' },
];

// Custom TabPanel component to conditionally render content based on tab index
function TabPanel({ children, value, index }) {
  return (
    <div 
      hidden={value !== index} 
      style={{ 
        padding: '20px', 
        height: 'calc(100vh - 140px)',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden' 
      }}
    >
      {value === index && children}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);            // Track active tab
  const [device1Data, setDevice1Data] = useState([]);     // Store Device 1 data
  const [device2Data, setDevice2Data] = useState([]);     // Store Device 2 data

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');       // Open WebSocket connection
    ws.onmessage = (event) => {
      const str = event.data;
      const match = str.match(/(D\d)V(\d+)C(\d+)T(\d+)/);  // Parse message pattern
      if (match) {
        const newData = {
          id: Date.now(),                                  // Unique ID for DataGrid
          timestamp: new Date().toLocaleTimeString(),
          voltage: parseInt(match[2]),
          current: parseInt(match[3]),
          temperature: parseInt(match[4]),
        };

        // Store data in appropriate state based on device ID
        if (match[1] === 'D1') {
          setDevice1Data(prev => [...prev, newData]);
        } else if (match[1] === 'D2') {
          setDevice2Data(prev => [...prev, newData]);
        }
      }
    };
    return () => ws.close(); // Cleanup on unmount
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue); // Update selected tab
  };

  const getLastNPoints = (data, n = 10) => {
    return data.slice(-n); // Return last N data points
  };

  // UI panel for each device, includes summary cards, chart, and data table
  const DevicePanel = ({ data, deviceId }) => (
    <Box sx={{ 
      height: '100%', 
      width: '100%',
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      overflow: 'hidden'
    }}>
      <Typography variant="h5" sx={{ color: 'black' }}>
        Device {deviceId} Real-time Data
      </Typography>
      
      {/* Summary cards for voltage, current, and temperature */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 2,
        width: '100%'
      }}>
        <Paper elevation={1} sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
          <Typography variant="subtitle2">Voltage</Typography>
          <Typography variant="h4">{data[data.length - 1]?.voltage || '0'}</Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
          <Typography variant="subtitle2">Current</Typography>
          <Typography variant="h4">{data[data.length - 1]?.current || '0'}</Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, textAlign: 'center', bgcolor: '#f1f8e9' }}>
          <Typography variant="subtitle2">Temperature</Typography>
          <Typography variant="h4">{data[data.length - 1]?.temperature || '0'}</Typography>
        </Paper>
      </Box>

      {/* Line chart for last 10 data points */}
      <Paper elevation={3} sx={{ p: 2, height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getLastNPoints(data, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              interval="preserveStartEnd"
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="voltage" 
              stroke="#2196f3" 
              name="Voltage" 
              dot={false}
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="#ff9800" 
              name="Current" 
              dot={false}
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#4caf50" 
              name="Temperature" 
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Data table showing all data points */}
      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1,
          width: '100%',
          overflow: 'auto',
          minHeight: '300px',
          '& .MuiDataGrid-root': {
            height: '100%',
            width: '100%',
            maxHeight: '100%',
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'auto !important'
            }
          }
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 100 } },
            sorting: {
              sortModel: [{ field: 'timestamp', sort: 'desc' }],
            },
          }}
          pageSizeOptions={[25, 50, 100]}
          disableRowSelectionOnClick
          density="compact"
          style={{ width: '100%' }}
        />
      </Paper>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        width: '100vw', 
        height: '100vh', 
        maxWidth: '100%',
        bgcolor: '#f5f5f5', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Page title */}
        <Typography variant="h3" sx={{ p: 2, textAlign: 'center', color: 'primary.main' }}>
          Device Monitoring Dashboard
        </Typography>
        
        {/* Tab selector */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Device 1" />
            <Tab label="Device 2" />
          </Tabs>
        </Box>

        {/* Conditional tab content */}
        <Box sx={{ width: '100%', flex: 1, overflow: 'hidden' }}>
          <TabPanel value={tabValue} index={0}>
            <DevicePanel data={device1Data} deviceId={1} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <DevicePanel data={device2Data} deviceId={2} />
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
