import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Box } from '@mui/material';

const API_BASE = 'http://localhost:8000';

function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/scan/history`)
      .then(res => res.json())
      .then(data => {
        setHistory(data.history || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6">Scan History</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography>Loading history...</Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Scan Type</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Output (truncated)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((job) => (
              <TableRow key={job.job_id}>
                <TableCell>{job.job_id}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>{job.scan_type}</TableCell>
                <TableCell>{job.target}</TableCell>
                <TableCell>
                  <pre style={{maxWidth: 200, whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {job.output?.slice(0, 100) || ''}
                  </pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

export default ScanHistory;
