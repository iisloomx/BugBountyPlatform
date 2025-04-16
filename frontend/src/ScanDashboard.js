import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Paper, CircularProgress } from '@mui/material';

const API_BASE = 'http://localhost:8000';

function ScanDashboard() {
  const [plugins, setPlugins] = useState([]);
  const [scanType, setScanType] = useState('nmap');
  const [target, setTarget] = useState('');
  const [jobId, setJobId] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/plugins`)
      .then(res => res.json())
      .then(data => setPlugins(data.plugins || []));
  }, []);

  useEffect(() => {
    if (jobId) {
      setLoading(true);
      const interval = setInterval(() => {
        fetch(`${API_BASE}/scan/${jobId}`)
          .then(res => res.json())
          .then(data => {
            setScanResult(data);
            if (data.status === 'completed' || data.status === 'failed') {
              setLoading(false);
              clearInterval(interval);
            }
          });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [jobId]);

  const handleScan = async () => {
    setError('');
    setScanResult(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, scan_type: scanType })
      });
      if (!res.ok) throw new Error('Failed to launch scan');
      const data = await res.json();
      setJobId(data.job_id);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>Launch a Scan</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="scan-type-label">Tool</InputLabel>
          <Select
            labelId="scan-type-label"
            value={scanType}
            label="Tool"
            onChange={e => setScanType(e.target.value)}
          >
            {plugins.map(tool => (
              <MenuItem value={tool} key={tool}>{tool}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Target (domain, IP, or path)"
          fullWidth
          value={target}
          onChange={e => setTarget(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleScan} disabled={loading || !target}>
          Launch Scan
        </Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Paper>
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography>Running scan...</Typography>
        </Box>
      )}
      {scanResult && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6">Scan Result</Typography>
          <Typography variant="subtitle2">Status: {scanResult.status}</Typography>
          <pre style={{maxHeight: 400, overflow: 'auto', background: '#222', color: '#fff', padding: 12}}>
            {scanResult.output}
          </pre>
        </Paper>
      )}
    </Box>
  );
}

export default ScanDashboard;
