import { httpClient } from './httpClient';
import type { Task } from '../types';

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await httpClient.get('/tasks');
    return response.data;
  },
  getTaskById: async (id: number | string): Promise<Task> => {
    const response = await httpClient.get(`/tasks/${id}`);
    return response.data;
  },
  getTasksByProject: async (projectId: number | string): Promise<Task[]> => {
    const response = await httpClient.get(`/projects/${projectId}/tasks`);
    return response.data;
  },
  createTask: async (projectId: number | string, task: Partial<Task>): Promise<Task> => {
    const response = await httpClient.post(`/projects/${projectId}/tasks`, task);
    return response.data;
  },
  updateTaskStatus: async (taskId: number | string, status: string): Promise<Task> => {
    const response = await httpClient.patch(`/tasks/${taskId}/status`, { status });
    return response.data;
  },
};