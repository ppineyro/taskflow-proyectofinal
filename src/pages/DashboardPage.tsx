import { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Navbar } from '../components/Navbar';
import { DashboardMetrics } from '../components/DashboardMetrics';
import { ProjectForm } from '../components/ProjectForm';
import { ProjectList } from '../components/ProjectList';
import { TaskList } from '../components/TaskList';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { useProjectForm } from '../hooks/useProjectForm';

export function DashboardPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const { projects, loading, error } = useProjects();
  const { tasks, filteredTasks, statusFilter, setStatusFilter, reloadTasks } = useTasks(selectedProjectId);
  const projectForm = useProjectForm();

  const handleRefresh = () => {
    reloadTasks();
  };

  const inProgress = tasks.filter((t) => t.status === 'EN_PROGRESO' || t.status === 'IN_PROGRESS').length;
  const completed = tasks.filter((t) => t.status === 'COMPLETADA' || t.status === 'DONE').length;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Navbar />

      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', my: 3 }}>
        Tablero de Proyectos y Tareas
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button startIcon={<RefreshIcon />} variant="outlined" size="small" onClick={handleRefresh}>
          ACTUALIZAR
        </Button>
      </Box>

      <DashboardMetrics
        projectsCount={projects.length}
        totalTasks={tasks.length}
        inProgressTasks={inProgress}
        completedTasks={completed}
      />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Columna izquierda */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <ProjectForm {...projectForm} />
            <ProjectList
              projects={projects}
              loading={loading}
              error={error}
              selectedProjectId={selectedProjectId}
              onSelectProject={(id) =>
                setSelectedProjectId(id === selectedProjectId ? null : id)
              }
            />
          </Box>
        </Grid>

        {/* Columna derecha */}
        <Grid size={{ xs: 12, md: 7 }}>
          <TaskList
            tasks={filteredTasks}
            filter={statusFilter}
            onFilterChange={setStatusFilter}
          />
        </Grid>
      </Grid>
    </Container>
  );
}