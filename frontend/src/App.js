import React, { useState, useContext } from 'react';
import { CssBaseline, Box, useTheme } from '@mui/material';
import ModernSidebar from './ModernSidebar';
import ScanDashboard from './ScanDashboard';
import ScanHistory from './ScanHistory';
import ThemeContextProvider, { ColorModeContext } from './ThemeContext';
import Header from './Header';
import Footer from './Footer';

function MainApp() {
  const [page, setPage] = useState('dashboard');
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'row', background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #0f172a 60%, #0ea5e9 100%)' : 'linear-gradient(135deg, #e0e7ef 60%, #bae6fd 100%)' }}>
      <CssBaseline />
      <ModernSidebar onNavigate={setPage} selected={page} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header theme={theme} onToggleTheme={colorMode.toggleColorMode} />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, md: 4 }, pt: 10, pb: 6 }}>
          {page === 'dashboard' && <ScanDashboard />}
          {page === 'history' && <ScanHistory />}
          {page === 'plugins' && <Box sx={{ mt: 6, textAlign: 'center', color: 'text.secondary', fontSize: 22, fontWeight: 600 }}>Plugins management coming soon...</Box>}
          {page === 'settings' && <Box sx={{ mt: 6, textAlign: 'center', color: 'text.secondary', fontSize: 22, fontWeight: 600 }}>Settings page coming soon...</Box>}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeContextProvider>
      <MainApp />
    </ThemeContextProvider>
  );
}
