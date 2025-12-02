const TodoInfo = (props) => {
	const { done, onDellAllButtonClick } = props;

	return (
		<div className="todo__info">
			<div className="todo__total-tasks">
				Выполнено {done}
			</div>

				<button className="todo__delete-all-button" type="button" onClick={onDellAllButtonClick}>
					Удалить все
				</button>

		</div>
	);
};

export default TodoInfo;
