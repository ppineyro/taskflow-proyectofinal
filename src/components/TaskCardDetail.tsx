import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { Task } from '../types';

interface Props {
  task: Task;
}

export function TaskCardDetail({ task }: Props) {
  const renderStatus = (status: string) => {
    if (status === 'DONE' || status === 'COMPLETADA') {
      return <Chip label="Completada" color="success" size="small" />;
    }
    if (status === 'IN_PROGRESS' || status === 'EN_PROGRESO') {
      return <Chip label="En progreso" color="warning" size="small" />;
    }
    return <Chip label="Por hacer" color="default" size="small" />;
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {task.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {renderStatus(task.status)}
            {task.priority && (
              <Chip label={`Prioridad: ${task.priority}`} color="error" size="small" variant="outlined" />
            )}
          </Box>
        </Box>

        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          (ID Proyecto: {task.projectId})
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {task.dueDate ? `Entrega: ${task.dueDate}` : ''}
          </Typography>
          <Button size="small" variant="outlined" endIcon={<OpenInNewIcon />}>
            VER DETALLE
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}