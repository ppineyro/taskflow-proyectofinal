import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types';
import { taskService } from '../services/taskService';

export function useTasks(projectId?: number | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('TODAS');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let data: Task[];
      if (projectId) {
        data = await taskService.getTasksByProject(projectId);
      } else {
        data = await taskService.getAllTasks();
      }
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === 'TODAS') return true;
    return task.status === statusFilter;
  });

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    reloadTasks: fetchTasks,
  };
}