'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { ActionPlanTask } from '@/types/dashboard';

type ActionPlanContextType = {
  tasks: ActionPlanTask[];
  addTask: (task: Omit<ActionPlanTask, 'id' | 'createdAt' | 'status'>) => void;
  updateTask: (id: string, updates: Partial<ActionPlanTask>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
};

const ActionPlanContext = createContext<ActionPlanContextType | undefined>(undefined);

const STORAGE_KEY = 'action-plan-tasks';

const loadTasksFromStorage = (): ActionPlanTask[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveTasksToStorage = (tasks: ActionPlanTask[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Ignore storage errors
  }
};

export const ActionPlanProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ActionPlanTask[]>(loadTasksFromStorage);

  const addTask = useCallback((taskData: Omit<ActionPlanTask, 'id' | 'createdAt' | 'status'>) => {
    const newTask: ActionPlanTask = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setTasks((prev) => {
      const updated = [newTask, ...prev];
      saveTasksToStorage(updated);
      return updated;
    });
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<ActionPlanTask>) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );
      saveTasksToStorage(updated);
      return updated;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => {
      const updated = prev.filter((task) => task.id !== id);
      saveTasksToStorage(updated);
      return updated;
    });
  }, []);

  const completeTask = useCallback((id: string) => {
    updateTask(id, { status: 'completed' });
  }, [updateTask]);

  return (
    <ActionPlanContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
      }}
    >
      {children}
    </ActionPlanContext.Provider>
  );
};

export const useActionPlan = () => {
  const context = useContext(ActionPlanContext);
  if (context === undefined) {
    throw new Error('useActionPlan must be used within an ActionPlanProvider');
  }
  return context;
};

