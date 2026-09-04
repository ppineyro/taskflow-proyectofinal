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
  const { filteredTasks, statusFilter, setStatusFilter, reloadTasks } = useTasks();

  const handleCreateTask = async (taskData: { title: string; description: string; priority: string; projectId: number }) => {
    const service = taskService as any;
    if (service.createTask) {
      try {
        await service.createTask(taskData.projectId, taskData);
      } catch {
        await service.createTask(taskData);
      }
    } else if (service.create) {
      await service.create(taskData.projectId, taskData);
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
            tasks={filteredTasks}
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