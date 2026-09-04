import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
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
import { deleteProject, updateProject } from '../services/projectService';
import type { Project } from '../types';

export function DashboardPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);

  const { projects = [], loading, error, refetch } = useProjects();
  const { tasks, statusFilter, setStatusFilter, reloadTasks, changeTaskStatus } = useTasks(selectedProjectId);
  const projectForm = useProjectForm();

  const handleRefresh = () => {
    refetch();
    reloadTasks();
  };

  const handleDeleteProject = async (id: number) => {
    try {
      setActionError(null);
      await deleteProject(id);
      if (selectedProjectId === id) setSelectedProjectId(null);
      refetch();
      reloadTasks();
    } catch (err) {
      console.error('Error al eliminar proyecto:', err);
      setActionError('No se pudo eliminar el proyecto.');
    }
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setEditName(project.name);
    setEditDescription(project.description || '');
  };

  const handleSaveEdit = async () => {
    if (!editingProject) return;
    try {
      setActionError(null);
      await updateProject(editingProject.id, { name: editName, description: editDescription });
      setEditingProject(null);
      refetch();
      reloadTasks();
    } catch (err) {
      console.error('Error al editar proyecto:', err);
      setActionError('No se pudo actualizar el proyecto.');
    }
  };

  //filtroooo
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

  const inProgress = tasks.filter((t) => t.status === 'EN_PROGRESO' || t.status === 'IN_PROGRESS').length;
  const completed = tasks.filter((t) => t.status === 'COMPLETADA' || t.status === 'DONE').length;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Navbar />

      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', my: 3 }}>
        Tablero de Proyectos y Tareas
      </Typography>

      {actionError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setActionError(null)}>
          {actionError}
        </Alert>
      )}

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
              onDeleteProject={handleDeleteProject}
              onEditProject={handleOpenEdit}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <TaskList
            tasks={customFilteredTasks}
            filter={statusFilter}
            onFilterChange={setStatusFilter}
            onStatusChange={changeTaskStatus}
          />
        </Grid>
      </Grid>

      <Dialog open={Boolean(editingProject)} onClose={() => setEditingProject(null)} fullWidth maxWidth="xs">
        <DialogTitle>Editar Proyecto</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Nombre"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Descripción"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingProject(null)}>Cancelar</Button>
          <Button onClick={handleSaveEdit} variant="contained" disabled={!editName}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}