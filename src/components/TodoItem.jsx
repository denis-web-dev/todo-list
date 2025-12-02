import { useState } from 'react';

const TodoItem = (props) => {
	const { className = '', id, title, isDone, onDellTaskButtonClick, onTaskCompleteChange, onEditTask } = props;

	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(title);

	const handleEditClick = () => {
		setIsEditing(true);
		setEditTitle(title);
	};

	const handleSave = () => {
		if (editTitle.trim() !== '' && editTitle !== title) {
			onEditTask(id, editTitle);
		}
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditTitle(title);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSave();
		} else if (e.key === 'Escape') {
			handleCancel();
		}
	};

	return (
		<li className={`todo-item ${className} ${isEditing ? 'todo-item--editing' : ''}`}>
			<input
				className="todo-item__checkbox"
				id={id}
				type="checkbox"
				checked={isDone}
				onChange={({ target }) => onTaskCompleteChange(id, target.checked)}
				disabled={isEditing}
			/>

			{isEditing ? (
				<div className="todo-item__edit-container">
					<input
						className="todo-item__edit-input"
						type="text"
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
						onKeyDown={handleKeyDown}
						autoFocus
					/>
					<div className="todo-item__edit-buttons">
						<button className="todo-item__save-button" onClick={handleSave} aria-label="Save" title="Save">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M13.3334 4L6.00002 11.3333L2.66669 8"
									stroke="white"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<button
							className="todo-item__cancel-button"
							onClick={handleCancel}
							aria-label="Cancel"
							title="Cancel"
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 4L4 12M4 4L12 12"
									stroke="white"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>
			) : (
				<>
					<label className="todo-item__label" htmlFor={id}>
						{title}
					</label>
					<div className="todo-item__actions">
						<button
							className="todo-item__edit-button"
							aria-label="Edit"
							title="Edit"
							onClick={handleEditClick}
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11.3333 2.00001C11.5084 1.82492 11.7163 1.686 11.945 1.59079C12.1737 1.49559 12.4189 1.4458 12.6667 1.4458C12.9144 1.4458 13.1596 1.49559 13.3883 1.59079C13.617 1.686 13.8249 1.82492 14 2.00001C14.1751 2.17509 14.314 2.38298 14.4092 2.61173C14.5044 2.84048 14.5542 3.08566 14.5542 3.33334C14.5542 3.58102 14.5044 3.8262 14.4092 4.05495C14.314 4.2837 14.1751 4.49159 14 4.66668L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00001Z"
									stroke="#757575"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<button
							className="todo-item__delete-button"
							aria-label="Delete"
							title="Delete"
							onClick={() => onDellTaskButtonClick(id)}
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15 5L5 15M5 5L15 15"
									stroke="#757575"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</>
			)}
		</li>
	);
};

export default TodoItem;
