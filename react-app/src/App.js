import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import './App.css';

const columns = [
  'Day', 
  'Rice', 
  'Soup/Stew', 
  'Main Dish', 
  'Side Dish 1', 
  'Side Dish 2', 
  'Side Dish 3', 
  'Kimchi'
];

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
   try {
      setData(null);
      setLoading(true);
      setError(null);

      const response = await axios.get("http://127.0.0.1:8000/data");

      setData(response.data)
    } catch(e) {
      setError(e);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(loading) 
    return <div>Loading...</div>

  if(error)
    return <div>Error...{error.message}</div>
  
  if(!data)
    return null;
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="weekly menu table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data.weekly_menu).map(([day, menu]) => (
            <TableRow key={day}>
              <TableCell>{day}</TableCell>
              <TableCell>{menu.rice}</TableCell>
              <TableCell>{menu.soup_stew}</TableCell>
              <TableCell>{menu.main_dish}</TableCell>
              <TableCell>{menu.side_dish1}</TableCell>
              <TableCell>{menu.side_dish2}</TableCell>
              <TableCell>{menu.side_dish3}</TableCell>
              <TableCell>{menu.kimchi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;