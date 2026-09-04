import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import { TaskCardDetail } from './TaskCardDetail';
import type { Task } from '../types';

interface Props {
  tasks: Task[];
  filter: string;
  onFilterChange: (status: string) => void;
  onStatusChange?: (taskId: number, newStatus: string) => void;
  onDeleteTask?: (taskId: number) => void;
}

export function TaskList({ tasks, filter, onFilterChange, onStatusChange, onDeleteTask }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Tareas ({tasks.length})</Typography>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel id="status-filter-label">Estado</InputLabel>
          <Select
            labelId="status-filter-label"
            value={filter || 'TODAS'}
            label="Estado"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <MenuItem value="TODAS">Todas</MenuItem>
            <MenuItem value="TODO">Por hacer</MenuItem>
            <MenuItem value="IN_PROGRESS">En progreso</MenuItem>
            <MenuItem value="DONE">Completada</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {tasks.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No hay tareas en este estado.
        </Typography>
      ) : (
        tasks.map((task) => (
          <TaskCardDetail
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDeleteTask}
          />
        ))
      )}
    </Paper>
  );
}