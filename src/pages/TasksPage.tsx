import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Navbar } from '../components/Navbar';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { useProjects } from '../hooks/useProjects';
import { taskService } from '../services/taskService';

export function TasksPage() {
  const { projects } = useProjects();
  const { tasks, statusFilter, setStatusFilter, reloadTasks } = useTasks();

  const handleCreateTask = async (taskData: {
    title: string;
    description: string;
    priority: string;
    projectId: number;
    dueDate: string;
  }) => {
    const service = taskService as any;

    const priorityMap: Record<string, string> = {
      'Baja': 'LOW',
      'Media': 'MEDIUM',
      'Alta': 'HIGH',
      'BAJA': 'LOW',
      'MEDIA': 'MEDIUM',
      'ALTA': 'HIGH',
    };

    const payload = {
      title: taskData.title,
      description: taskData.description || '',
      priority: priorityMap[taskData.priority] || 'LOW',
      dueDate: taskData.dueDate,
    };

    if (service.createTask) {
      await service.createTask(taskData.projectId, payload);
    } else if (service.create) {
      await service.create(taskData.projectId, payload);
    }

    reloadTasks();
  };

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    const service = taskService as any;
    if (service.updateTaskStatus) {
      await service.updateTaskStatus(taskId, newStatus);
    } else if (service.updateStatus) {
      await service.updateStatus(taskId, newStatus);
    } else if (service.updateTask) {
      await service.updateTask(taskId, { status: newStatus });
    }
    reloadTasks();
  };

  const handleDeleteTask = async (taskId: number) => {
    const service = taskService as any;
    if (service.deleteTask) {
      await service.deleteTask(taskId);
    } else if (service.delete) {
      await service.delete(taskId);
    } else if (service.removeTask) {
      await service.removeTask(taskId);
    }
    reloadTasks();
  };

  // Normalización del filtrado para emparejar enums de la API con los valores del select
  const customFilteredTasks = tasks.filter((task) => {
    if (!statusFilter || statusFilter === 'TODAS' || statusFilter === 'ALL') {
      return true;
    }
    const currentStatus = String(task.status || '').toUpperCase();

    if (statusFilter === 'POR_HACER' || statusFilter === 'TODO') {
      return currentStatus === 'POR_HACER' || currentStatus === 'TODO' || currentStatus === 'PENDIENTE';
    }
    if (statusFilter === 'EN_PROGRESO' || statusFilter === 'IN_PROGRESS') {
      return currentStatus === 'EN_PROGRESO' || currentStatus === 'IN_PROGRESS';
    }
    if (statusFilter === 'COMPLETADA' || statusFilter === 'DONE') {
      return currentStatus === 'COMPLETADA' || currentStatus === 'DONE';
    }
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Navbar />

      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', my: 3 }}>
        Gestión Integral de Tareas
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TaskForm projects={projects} onSubmit={handleCreateTask} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <TaskList
            tasks={customFilteredTasks}
            filter={statusFilter}
            onFilterChange={setStatusFilter}
            onStatusChange={handleStatusChange}
            onDeleteTask={handleDeleteTask}
          />
        </Grid>
      </Grid>
    </Container>
  );
}