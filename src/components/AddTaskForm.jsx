import Field from './Field';
import Button from './Button';

const AddTaskForm = (props) => {
	const { addTask, newTaskTitle, setNewTaskTitle } = props;

	const onSubmit = (event) => {
		event.preventDefault(), addTask();
	};

	return (
		<form className="todo__form" onSubmit={onSubmit}>
			<Field
				className="todo__field"
				label="Новая задача"
				id="new-task"
				value={newTaskTitle}
				onInput={(event) => setNewTaskTitle(event.target.value)}
			/>
			<Button type="submit">Добавить</Button>
		</form>
	);
};

export default AddTaskForm;
