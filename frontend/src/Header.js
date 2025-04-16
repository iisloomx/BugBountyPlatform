import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip, Avatar } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = ({ theme, onToggleTheme }) => (
  <AppBar position="fixed" color="primary" elevation={3} sx={{ zIndex: 1201 }}>
    <Toolbar>
      <BugReportIcon sx={{ mr: 2, fontSize: 32, color: 'secondary.main' }} />
      <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 2 }}>
        Bug Bounty Platform
      </Typography>
      <Tooltip title={theme.palette.mode === 'dark' ? 'Light mode' : 'Dark mode'}>
        <IconButton color="inherit" onClick={onToggleTheme}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
      <Avatar sx={{ ml: 2, bgcolor: 'secondary.main', fontWeight: 700 }}>BB</Avatar>
    </Toolbar>
  </AppBar>
);

export default Header;
