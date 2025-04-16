import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, Tooltip } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const drawerWidth = 220;

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardCustomizeIcon sx={{ color: 'primary.main' }} /> },
  { key: 'history', label: 'Scan History', icon: <HistoryEduIcon sx={{ color: 'info.main' }} /> },
  { key: 'plugins', label: 'Plugins', icon: <ExtensionTwoToneIcon sx={{ color: 'success.main' }} /> },
  { key: 'settings', label: 'Settings', icon: <SettingsSuggestIcon sx={{ color: 'warning.main' }} /> },
];

const ModernSidebar = ({ onNavigate, selected }) => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: 'linear-gradient(135deg, #1e293b 60%, #0ea5e9 100%)', color: '#fff' },
    }}
  >
    <Toolbar />
    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
    <List>
      {navItems.map(item => (
        <Tooltip title={item.label} placement="right" arrow key={item.key}>
          <ListItem button selected={selected === item.key} onClick={() => onNavigate(item.key)} sx={{ my: 1, borderRadius: 2, background: selected === item.key ? 'rgba(255,255,255,0.08)' : 'transparent', transition: 'background 0.2s' }}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} sx={{ fontWeight: 600 }} />
          </ListItem>
        </Tooltip>
      ))}
    </List>
  </Drawer>
);

export default ModernSidebar;
