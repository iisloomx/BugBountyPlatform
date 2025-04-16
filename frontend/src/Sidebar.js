import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import ExtensionIcon from '@mui/icons-material/Extension';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 220;

const Sidebar = ({ onNavigate, selected }) => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <Toolbar />
    <Divider />
    <List>
      <ListItem button selected={selected==='dashboard'} onClick={() => onNavigate('dashboard')}>
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button selected={selected==='history'} onClick={() => onNavigate('history')}>
        <ListItemIcon><HistoryIcon /></ListItemIcon>
        <ListItemText primary="Scan History" />
      </ListItem>
      <ListItem button selected={selected==='plugins'} onClick={() => onNavigate('plugins')}>
        <ListItemIcon><ExtensionIcon /></ListItemIcon>
        <ListItemText primary="Plugins" />
      </ListItem>
      <ListItem button selected={selected==='settings'} onClick={() => onNavigate('settings')}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
