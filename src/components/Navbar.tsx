import { Box, Button, Typography, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 2,
        mb: 3,
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        TaskFlow App
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          startIcon={<DashboardIcon />}
          variant={location.pathname === '/dashboard' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => navigate('/dashboard')}
        >
          DASHBOARD
        </Button>
        <Button
          startIcon={<AssignmentIcon />}
          variant={location.pathname === '/tasks' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => navigate('/tasks')}
        >
          TAREAS (/TASKS)
        </Button>
        <Button startIcon={<LogoutIcon />} color="error" size="small" onClick={logout}>
          CERRAR SESIÓN
        </Button>
      </Stack>
    </Box>
  );
}