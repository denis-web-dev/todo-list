import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';

const Todo = () => {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem('tasks');

		if (savedTasks) {
			return JSON.parse(savedTasks);
		}
		return [
			{ id: 'task-1', title: 'Купить молоко', isDone: false },
			{ id: 'task-2', title: 'Приготовить кофе', isDone: true },
		];
	});
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const dellAllTasks = () => {
		const isConfirmed = confirm('Вы уверены что хотите удалить все задачи?');

		if (isConfirmed) {
			setTasks([]);
		}
	};
	const dellTask = (taskId) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
	};
	const toggleTaskComplete = (taskId, isDone) => {
		setTasks(
			tasks.map((tasks) => {
				if (tasks.id === taskId) {
					return { ...tasks, isDone };
				}
				return tasks;
			})
		);
	};
	const editTask = (taskId, newTitle) => {
		if (newTitle.trim().length === 0) return;

		setTasks(
			tasks.map((task) => {
				if (task.id === taskId) {
					return { ...task, title: newTitle.trim() };
				}
				return task;
			})
		);
	};
	const addTask = () => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(),
				title: newTaskTitle,
				isDone: false,
			};

			setTasks([...tasks, newTask]);
			setNewTaskTitle('');
			setSearchQuery('');
		}
	};

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const clearSearchQuery = searchQuery.trim().toLowerCase();
	const filteredTasks =
		clearSearchQuery.length > 0
			? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
			: null;

	return (
		<div className="todo">
			<h1 className="todo__title">Список задач</h1>
			<AddTaskForm addTask={addTask} newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle} />
			<SearchTaskForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<TodoInfo
				tasks={length}
				done={tasks.filter(({ isDone }) => isDone).length}
				onDellAllButtonClick={dellAllTasks}
			/>
			<TodoList
				tasks={tasks}
				filteredTasks={filteredTasks}
				onDellTaskButtonClick={dellTask}
				onTaskCompleteChange={toggleTaskComplete}
				onEditTask={editTask}
			/>
		</div>
	);
};

export default Todo;
