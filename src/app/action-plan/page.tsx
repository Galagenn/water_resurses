'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import { useActionPlan } from '@/contexts/ActionPlanContext';
import type { ActionPlanTask } from '@/types/dashboard';

const priorityColors = {
  low: 'info',
  medium: 'warning',
  high: 'error',
} as const;

const priorityLabels = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
} as const;

const statusLabels = {
  pending: 'Ожидает',
  in_progress: 'В работе',
  completed: 'Завершено',
} as const;

const ActionPlanPage = () => {
  const { tasks, addTask, updateTask, deleteTask, completeTask } = useActionPlan();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusDialogTask, setStatusDialogTask] = useState<ActionPlanTask | null>(null);
  const [nextStatus, setNextStatus] = useState<ActionPlanTask['status']>('in_progress');
  const [statusNote, setStatusNote] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | undefined>();

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        source: 'Ручное добавление',
      });
      setNewTask({ title: '', description: '', priority: 'medium' });
      setOpenDialog(false);
    }
  };

  const openStatusDialog = (task: ActionPlanTask, targetStatus: ActionPlanTask['status']) => {
    setStatusDialogTask(task);
    setNextStatus(targetStatus);
    setStatusNote('');
    setAttachmentName(undefined);
    setStatusDialogOpen(true);
  };

  const handleStatusIconClick = (task: ActionPlanTask) => {
    if (task.status === 'pending') {
      // Переход в работу — запрашиваем опциональный комментарий и файл
      openStatusDialog(task, 'in_progress');
    } else if (task.status === 'in_progress') {
      // Переход в завершено — тоже через диалог
      openStatusDialog(task, 'completed');
    } else {
      // Возврат в ожидание можно делать без диалога
      updateTask(task.id, { status: 'pending' });
    }
  };

  const handleConfirmStatusChange = () => {
    if (!statusDialogTask) return;

    const updates: Partial<ActionPlanTask> = {
      status: nextStatus,
    };

    if (statusNote.trim()) {
      updates.statusNote = statusNote.trim();
    }
    if (attachmentName) {
      updates.attachmentName = attachmentName;
    }

    if (nextStatus === 'completed') {
      completeTask(statusDialogTask.id);
      if (updates.statusNote || updates.attachmentName) {
        // дополняем завершённую задачу метаданными
        updateTask(statusDialogTask.id, updates);
      }
    } else {
      updateTask(statusDialogTask.id, updates);
    }

    setStatusDialogOpen(false);
    setStatusDialogTask(null);
    setStatusNote('');
    setAttachmentName(undefined);
  };

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      inProgress: tasks.filter((t) => t.status === 'in_progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    };
  }, [tasks]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: 1440, px: { xs: 0.75, sm: 2, md: 0 } }}
    >
      <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', lg: 'center' }}
          spacing={{ xs: 1, lg: 3 }}
        >
          <Stack spacing={0.125}>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}
            >
              Управление задачами
            </Typography>
            <Typography 
              variant="h4"
              sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.125rem" } }}
            >
              План действий
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ minHeight: 44 }}
          >
            Добавить задачу
          </Button>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 1, sm: 1.5, md: 2 },
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
            },
          }}
        >
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}>
                Всего задач
              </Typography>
              <Typography variant="h4" sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.125rem" } }}>{stats.total}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}>
                Ожидают
              </Typography>
              <Typography variant="h4" color="warning.main" sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.125rem" } }}>
                {stats.pending}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}>
                В работе
              </Typography>
              <Typography variant="h4" color="info.main" sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.125rem" } }}>
                {stats.inProgress}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}>
                Завершено
              </Typography>
              <Typography variant="h4" color="success.main" sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.125rem" } }}>
                {stats.completed}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Фильтр по статусу</InputLabel>
            <Select
              value={filter}
              label="Фильтр по статусу"
              onChange={(e) =>
                setFilter(e.target.value as 'all' | 'pending' | 'in_progress' | 'completed')
              }
            >
              <MenuItem value="all">Все задачи</MenuItem>
              <MenuItem value="pending">Ожидают</MenuItem>
              <MenuItem value="in_progress">В работе</MenuItem>
              <MenuItem value="completed">Завершено</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack spacing={{ xs: 1, sm: 1.5, md: 2 }}>
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                <Typography variant="body1" color="text.secondary" align="center" sx={{ py: { xs: 2, sm: 3, md: 4 }, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                  {filter === 'all'
                    ? 'Нет задач. Добавьте первую задачу для начала работы.'
                    : `Нет задач со статусом "${statusLabels[filter]}".`}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id}>
              <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                <Stack spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      justifyContent="space-between"
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      spacing={{ xs: 1, sm: 1.5, md: 2 }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                        <IconButton
                          onClick={() => handleStatusIconClick(task)}
                          color={
                            task.status === 'completed'
                              ? 'success'
                              : task.status === 'in_progress'
                              ? 'info'
                              : 'default'
                          }
                        >
                          {task.status === 'completed' ? (
                            <CheckCircleIcon />
                          ) : task.status === 'in_progress' ? (
                            <PlayArrowIcon />
                          ) : (
                            <RadioButtonUncheckedIcon />
                          )}
                        </IconButton>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              textDecoration:
                                task.status === 'completed' ? 'line-through' : 'none',
                              opacity: task.status === 'completed' ? 0.6 : 1,
                            }}
                          >
                            {task.title}
                          </Typography>
                          {task.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mt: 0.5,
                                textDecoration:
                                  task.status === 'completed' ? 'line-through' : 'none',
                                opacity: task.status === 'completed' ? 0.6 : 1,
                              }}
                            >
                              {task.description}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={priorityLabels[task.priority]}
                          color={priorityColors[task.priority]}
                          size="small"
                        />
                        <Chip
                          label={statusLabels[task.status]}
                          size="small"
                          variant="outlined"
                        />
                        <IconButton
                          onClick={() => deleteTask(task.id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                    <Stack spacing={0.5} sx={{ pt: 1, borderTop: '1px solid rgba(148,163,184,0.2)' }}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Создано: {formatDate(task.createdAt)}
                        </Typography>
                        {task.source && (
                          <>
                            <Typography variant="caption" color="text.secondary">
                              •
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Источник: {task.source}
                            </Typography>
                          </>
                        )}
                        {task.region && (
                          <>
                            <Typography variant="caption" color="text.secondary">
                              •
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Регион: {task.region}
                            </Typography>
                          </>
                        )}
                      </Stack>
                      {(task.statusNote || task.attachmentName) && (
                        <Stack spacing={0.5}>
                          {task.statusNote && (
                            <Typography variant="caption" color="text.secondary">
                              Комментарий: {task.statusNote}
                            </Typography>
                          )}
                          {task.attachmentName && (
                            <Typography variant="caption" color="text.secondary">
                              Файл: {task.attachmentName}
                            </Typography>
                          )}
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Stack>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Добавить задачу</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Название задачи"
              fullWidth
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <TextField
              label="Описание"
              fullWidth
              multiline
              rows={4}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Приоритет</InputLabel>
              <Select
                value={newTask.priority}
                label="Приоритет"
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value as 'low' | 'medium' | 'high',
                  })
                }
              >
                <MenuItem value="low">Низкий</MenuItem>
                <MenuItem value="medium">Средний</MenuItem>
                <MenuItem value="high">Высокий</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button onClick={handleAddTask} variant="contained" disabled={!newTask.title.trim()}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {nextStatus === 'in_progress' ? 'Принять задачу в работу' : 'Завершить задачу'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {statusDialogTask && (
              <Typography variant="subtitle1">{statusDialogTask.title}</Typography>
            )}
            <TextField
              label="Комментарий (опционально)"
              fullWidth
              multiline
              rows={3}
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ justifyContent: 'flex-start' }}
            >
              {attachmentName ? `Файл: ${attachmentName}` : 'Прикрепить файл (опционально)'}
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setAttachmentName(file ? file.name : undefined);
                }}
              />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleConfirmStatusChange} variant="contained">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ActionPlanPage;

