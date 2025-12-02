import TodoItem from './TodoItem';

const TodoList = (props) => {
	const { tasks = [], filteredTasks, onDellTaskButtonClick, onTaskCompleteChange, onEditTask } = props;

	const hasTasks = tasks.length > 0;
	const isEmptyFilteredTasks = filteredTasks?.length === 0;

	if (!hasTasks) {
		return <div className="todo__empty-message">Задач пока нет</div>;
	}

	if (hasTasks && isEmptyFilteredTasks) {
		return <div className="todo__empty-message">Задача не найдена</div>;
	}

	return (
		<ul className="todo__list">
			{(filteredTasks ?? tasks).map((task) => (
				<TodoItem
					className="todo__item"
					key={task.id}
					id={task.id}
					title={task.title}
					isDone={task.isDone}
					onDellTaskButtonClick={onDellTaskButtonClick}
					onTaskCompleteChange={onTaskCompleteChange}
					onEditTask={onEditTask}
					{...task}
				/>
			))}
		</ul>
	);
};

export default TodoList;
