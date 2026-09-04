import { useState } from 'react';
import { Stack, TextField, Button, Typography, Alert, MenuItem, FormControl, InputLabel, Paper, Select } from '@mui/material';
import type { Project } from '../types';

interface TaskFormProps {
  projects: Project[];
  onSubmit: (taskData: { title: string; description: string; priority: string; projectId: number }) => Promise<void>;
}

export function TaskForm({ projects, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIA');
  const [projectId, setProjectId] = useState<number | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) {
      setError('Selecciona un proyecto.');
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await onSubmit({ title, description, priority, projectId: Number(projectId) });
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Error al crear la tarea');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Nueva Tarea
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          size="small"
        />

        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={2}
          size="small"
        />

        <FormControl size="small" fullWidth required>
          <InputLabel>Proyecto</InputLabel>
          <Select
            value={projectId}
            label="Proyecto"
            onChange={(e) => setProjectId(Number(e.target.value))}
          >
            {projects.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth>
          <InputLabel>Prioridad</InputLabel>
          <Select
            value={priority}
            label="Prioridad"
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="BAJA">Baja</MenuItem>
            <MenuItem value="MEDIA">Media</MenuItem>
            <MenuItem value="ALTA">Alta</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" disabled={submitting || !title || !projectId}>
          {submitting ? 'Guardando…' : 'Crear Tarea'}
        </Button>
      </Stack>
    </Paper>
  );
}