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
import * as projectService from '../services/projectService';
import type { Project } from '../types';

export function DashboardPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { projects, loading, error } = useProjects();
  const { tasks, filteredTasks, statusFilter, setStatusFilter, reloadTasks } = useTasks(selectedProjectId);
  const projectForm = useProjectForm();

  const handleRefresh = () => {
    reloadTasks();
  };

  const handleDeleteProject = async (id: number) => {
    const service = projectService as any;
    if (service.deleteProject) {
      await service.deleteProject(id);
    } else if (service.delete) {
      await service.delete(id);
    } else if (service.removeProject) {
      await service.removeProject(id);
    }

    if (selectedProjectId === id) setSelectedProjectId(null);
    reloadTasks();
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setEditName(project.name);
    setEditDescription(project.description || '');
  };

  const handleSaveEdit = async () => {
    if (!editingProject) return;
    const service = projectService as any;
    const payload = { name: editName, description: editDescription };

    if (service.updateProject) {
      await service.updateProject(editingProject.id, payload);
    } else if (service.update) {
      await service.update(editingProject.id, payload);
    }

    setEditingProject(null);
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
            tasks={filteredTasks}
            filter={statusFilter}
            onFilterChange={setStatusFilter}
          />
        </Grid>
      </Grid>

      {/* Modal para Editar Proyecto (PUT) */}
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