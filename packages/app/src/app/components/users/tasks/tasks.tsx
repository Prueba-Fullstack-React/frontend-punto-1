import {
  Box, Button, Checkbox,
  FormControlLabel, Modal, ScreenBackground, TextField
} from '@frontend/components';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Radio, RadioGroup, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, TablePagination, TableRow, useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToggleThemeComponent } from '../../../shared/components/toggleTheme.component';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import { useLoginContext } from '../../../shared/hooks/useLoginStatus';
import {
  createTask,
  deleteTask, getTasks,
  updateTask
} from '../../../shared/services/tasksService';
import { withRedirectIfBlank } from '../../../withRedirectIfBlank';

interface Task {
  id: number;
  title: string;
  state: string;
}

interface TasksProps {
  isUserAuthenticated: string;
}

const Tasks: React.FC<TasksProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskState, setNewTaskState] = useState('activo'); // Added state for new task state
  const [totalNumberOfTasks, setTotalNumberOfTasks] = useState<number>(1);

  const [storedToken, setStoredToken] = useLocalStorage('authToken', '');

  const theme = useTheme();

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fetchData = async (page: number, pageSize: number): Promise<void> => {
    try {
      const data = await getTasks({ page, pageSize }, storedToken);
      setTasks(data.tasks);
      setTotalNumberOfTasks(data.count);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStateChange = async (
    taskId: number,
    newState: string
  ): Promise<void> => {
    try {
      const response = await updateTask(taskId, newState, storedToken);
      if (response) {
        alert('¡Tarea actualizada!');
        fetchData(page, rowsPerPage);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleCheckboxChange = (taskId: number): void => {
    const updatedSelectedTasks = selectedTasks.includes(taskId)
      ? selectedTasks.filter((id) => id !== taskId)
      : [...selectedTasks, taskId];
    setSelectedTasks(updatedSelectedTasks);
  };

  const handleDeleteSelectedTasks = async (): Promise<void> => {
    try {
      await Promise.all(
        selectedTasks.map((taskId) => deleteTask(taskId, storedToken))
      );
      fetchData(page, rowsPerPage);
      setSelectedTasks([]);
    } catch (error) {
      // Handle error
    }
  };

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  const handleCreateTask = async (): Promise<void> => {
    try {
      await createTask(newTaskTitle, newTaskState, storedToken); // Updated to include newTaskState
      fetchData(page, rowsPerPage);
      setNewTaskTitle('');
      setNewTaskState('activo'); // Reset new task state
      handleCloseModal();
    } catch (error) {
      alert("Recuerda que la tarea debe contener como mínimo 5 letras.");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authStatus, setAuthStatus } = useLoginContext();

  const logout = (): void => {
    setStoredToken('notValid');
    setAuthStatus('notAuthenticated');
    navigate('/');
  };

  const goToMoviesPage = (): void => {
    navigate('/movies');
  };

  return (
    <ScreenBackground>
      <ToggleThemeComponent />
      <Button
        onClick={logout}
        variant="contained"
        label="Cerrar Sesión"
        sx={{ width: '50%', marginBottom: '20px' }}
      />
      <Button
        onClick={handleOpenModal}
        variant="contained"
        startIcon={<AddIcon />}
        label="Crear Tarea"
        sx={{ width: '50%', marginBottom: '20px ' }}
      />
      <Button
        onClick={goToMoviesPage}
        variant="contained"
        label="Ir a página de peliculas"
        sx={{ width: '50%', marginBottom: '20px' }}
      />
      <Button
        onClick={handleDeleteSelectedTasks}
        variant="contained"
        label="Borrar tareas seleccionadas"
        color="error" // Use the error color for visual emphasis
        startIcon={<DeleteIcon />}
        sx={{ width: '50%' }}
        disabled={selectedTasks.length === 0} // Disable the button if no tasks are selected
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={
                    selectedTasks.length > 0 &&
                    selectedTasks.length < tasks.length
                  }
                  checked={selectedTasks.length === tasks.length}
                  onChange={() => {
                    const allTaskIds = tasks.map((task) => task.id);
                    setSelectedTasks(
                      selectedTasks.length === tasks.length ? [] : allTaskIds
                    );
                  }}
                />
              </TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.state}</TableCell>
                <TableCell>
                  <RadioGroup
                    row
                    value={task.state}
                    onChange={(e) => handleStateChange(task.id, e.target.value)}
                  >
                    <FormControlLabel
                      value="activo"
                      control={<Radio />}
                      label="Activo"
                    />
                    <FormControlLabel
                      value="pendiente"
                      control={<Radio />}
                      label="Pendiente"
                    />
                  </RadioGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalNumberOfTasks}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        showFirstButton
        showLastButton
      />

      {/* Modal for creating a new task */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            zIndex: 1000,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <TextField
            label="Título de la Tarea"
            value={newTaskTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTaskTitle(e.target.value)
            }
          />
          <RadioGroup
            row
            value={newTaskState}
            onChange={(e) => setNewTaskState(e.target.value)}
          >
            <FormControlLabel
              value="activo"
              control={<Radio />}
              label={
                <span style={{ color: theme.palette.grey[100] }}>Activo</span>
              }
            />
            <FormControlLabel
              value="pendiente"
              control={<Radio />}
              label={
                <span style={{ color: theme.palette.grey[100] }}>
                  Pendiente
                </span>
              }
            />
          </RadioGroup>
          <Button
            onClick={handleCreateTask}
            variant="contained"
            label="Crear Tarea"
          />
        </Box>
      </Modal>
    </ScreenBackground>
  );
};

export default withRedirectIfBlank<TasksProps>({
  redirectCondition: (props: TasksProps) =>
    props.isUserAuthenticated === 'notAuthenticated',
  redirectTo: '/',
})(Tasks);
