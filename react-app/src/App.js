import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (controller) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://127.0.0.1:8000/data", {signal: controller.signal});

      setData(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller);

    return () => {
      controller.abort();
    };
  }, []);

  if(loading) 
    return <div>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>

  if(error)
    return <div>Error...{error.message}</div>
  
  if(!data)
    return null;
  
  const menuCategories = ["rice", "soup_stew", "main_dish", "side_dish1", "side_dish2", "side_dish3", "kimchi"];
  const daysOfWeek = Object.keys(data.weekly_menu);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            {daysOfWeek.map(day => (
              <TableCell key={day}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {menuCategories.map(category => (
            <TableRow key={category}>
              <TableCell>{category}</TableCell>
              {daysOfWeek.map(day => (
                <TableCell key={day + category}>
                  {data.weekly_menu[day][category] || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}

export default App;