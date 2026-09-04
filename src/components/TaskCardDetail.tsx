import { Card, CardContent, Typography, Chip, Box, IconButton, Select, MenuItem, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Task } from '../types';

interface Props {
  task: Task;
  onStatusChange?: (taskId: number, newStatus: string) => void;
  onDelete?: (taskId: number) => void;
}

export function TaskCardDetail({ task, onStatusChange, onDelete }: Props) {
  const renderStatus = (status: string) => {
    if (status === 'DONE' || status === 'COMPLETADA') return <Chip label="Completada" color="success" size="small" />;
    if (status === 'IN_PROGRESS' || status === 'EN_PROGRESO') return <Chip label="En progreso" color="warning" size="small" />;
    return <Chip label="Por hacer" color="default" size="small" />;
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {task.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {renderStatus(task.status)}
            {onDelete && (
              <IconButton size="small" color="error" onClick={() => onDelete(task.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
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

          {onStatusChange && (
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
                sx={{ height: 30, fontSize: '0.8rem' }}
              >
                <MenuItem value="TODO">Por hacer</MenuItem>
                <MenuItem value="IN_PROGRESS">En progreso</MenuItem>
                <MenuItem value="DONE">Completada</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}