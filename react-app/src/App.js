import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cellLoading, setCellLoading] = useState(false);

  const fetchData = async (controller) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://127.0.0.1:8000/data", { signal: controller.signal });
      setData(response.data);
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Request canceled', e.message);
      } else {
        setError(e);
      }
    } finally {
      setLoading(false);
    }
  };
 
  const refreshData = async () => {
    setCellLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/data");
      setData(response.data);
    } catch (e) {
      console.error(e.message);
    } finally {
      setCellLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => {
      controller.abort();
    };
  }, []);

  if (loading || !data) {
    return (
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <CircularProgress />
        </Box>
      </div>
    );
  }
  
  if (error)
    return <div>Error...{error?.message}</div>;
  
  const menuCategories = ["밥", "국 또는 찌개", "메인 요리", "반찬 1", "반찬 2", "반찬 3", "김치"];
  const daysOfWeek = Object.keys(data.weekly_menu);

  const renderMenu = (day) => {
    if (cellLoading) {
      return <CircularProgress size={50} />;
    }
    return menuCategories.map((category) => (
      <div key={category}>
        {data.weekly_menu[day][category] || ''}
      </div>
    ));
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          m: 2
        }}>
          <IconButton onClick={refreshData} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RefreshIcon />
          </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {daysOfWeek.map(day => (
                <TableCell key={day} align='center'>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {daysOfWeek.map(day => (
                <TableCell key={day} align='center'>
                  {renderMenu(day)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;