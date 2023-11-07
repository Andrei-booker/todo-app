import Task from '../task';

const TaskList = ({todos, onCompleted, onEditing, onDeleted}) => {
  const elements = todos.map(task => {
	const { id, completed, editing, ...taskProps } = task
	let className = ''
	if (completed) className = 'completed';
	else if (editing) className = 'editing';

	return (
		<li key={id} className={className}>
			<Task
				{...taskProps}
				onCompleted={() => onCompleted(id)}
				onEditing={() => onEditing(id)}
				onDeleted={() => onDeleted(id)}
			/>
			<input
				type='text'
				className='edit'
				defaultValue={task.label}
			></input>
		</li>
	);
	})
  return <ul className='todo-list'>{elements}</ul>
};

export default TaskList;