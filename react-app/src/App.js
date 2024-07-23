import { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, IconButton, Modal, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import './App.css';
import EditMenu from './components/edit';
import html2canvas from "html2canvas";
import saveAs from "file-saver";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCellLoading, setIsCellLoading] = useState(false);
  const divRef = useRef(null);
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
    setIsCellLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/data");
      console.log('Data refreshed:', response.data); 
      setData(response.data);
    } catch (e) {
      console.error(e.message);
    } finally {
      setIsCellLoading(false);
    }
  };

  const handleDownload = async () => {

    if (!divRef.current) return;

    const div = divRef.current;
    const canvas = await html2canvas(div, {scale: 2});
    canvas.toBlob((blob) => {
        if (blob !== null) {
            saveAs(blob, "result.png")
        }
    })
  }

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
  
  const daysOfWeek = Object.keys(data.weekly_menu);

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

          <IconButton onClick={handleDownload} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DownloadIcon />
          </IconButton>
      </Box>

      <Modal 
        open={isCellLoading}
        aria-labelledby="modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 200,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 0,
          flexDirection: 'column', 
          alignItems: 'center'
        }}>
          <Typography 
            id="modal-title" 
            align="center"
            sx={{
              marginBottom: 4
            }}
          >
            새로운 메뉴를 불러옵니다
          </Typography>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table ref={divRef}>
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
                  <EditMenu data={data.weekly_menu[day]} />
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