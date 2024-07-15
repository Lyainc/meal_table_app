import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
