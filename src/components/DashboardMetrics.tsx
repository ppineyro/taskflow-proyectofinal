import { Box, Paper, Typography, Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/FolderOpen';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
  projectsCount: number;
  totalTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}

export function DashboardMetrics({
  projectsCount,
  totalTasks,
  inProgressTasks,
  completedTasks,
}: Props) {
  const items = [
    { label: 'Proyectos', value: projectsCount, icon: <FolderIcon color="primary" /> },
    { label: 'Tareas Totales', value: totalTasks, icon: <AssignmentIcon color="info" /> },
    { label: 'En Progreso', value: inProgressTasks, icon: <HourglassEmptyIcon color="warning" /> },
    { label: 'Completadas', value: completedTasks, icon: <CheckCircleIcon color="success" /> },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {items.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            {item.icon}
            <Box>
              <Typography variant="caption" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {item.value}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}