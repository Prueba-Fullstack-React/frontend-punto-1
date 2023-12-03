// services/tasksService.ts
import { urlServer } from '../config/config';

interface Task {
  id: number;
  title: string;
  state: string;
}

interface GetTasksParams {
  page: number;
  pageSize: number;
}

export const getTasks = async (
  params: GetTasksParams,
  authToken?: string
): Promise<Task[]> => {
  try {
    const { page, pageSize } = params;
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    const response = await fetch(
      `${urlServer.url}api/v1/task?page=${page}&pageSize=${pageSize}`,
      {
        headers: headers,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (
  taskId: number,
  state: string,
  authToken?: string
): Promise<Response> => {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    console.log('before request');

    const response = await fetch(`${urlServer.url}api/v1/task/${taskId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        state: state,
      }),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (
  taskTitle: string,
  taskState: string,
  authToken?: string
): Promise<Task[]> => {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    const response = await fetch(`${urlServer.url}api/v1/task/create`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        title: taskTitle,
        state: taskState,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (
  taskId: number,
  authToken?: string
): Promise<Response> => {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    const response = await fetch(`${urlServer.url}api/v1/task/${taskId}`, {
      method: 'DELETE',
      headers: headers,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
