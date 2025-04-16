import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper', textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} Bug Bounty Platform &mdash; Crafted with passion. | 
      <Link href="https://owasp.org/" target="_blank" rel="noopener" underline="hover">OWASP</Link>
    </Typography>
  </Box>
);

export default Footer;
