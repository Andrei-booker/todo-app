import Task from '../task';
import EditingTaskForm from './editing-task-form';

const TaskList = ({
	todos,
	onCompleted,
	onEditing,
	onDeleted,
	onTaskChanged,
	taskLabel
}) => {
	const elements = todos.map(task => {
		const { id, completed, editing, ...taskProps } = task
		let className = ''
		if (completed) className = 'completed'
		else if (editing) className = 'editing'

		return (
			<li key={id} className={className}>
				<Task
					{...taskProps}
					onCompleted={() => onCompleted(id)}
					onEditing={() => onEditing(id)}
					onDeleted={() => onDeleted(id)}
				/>
				<EditingTaskForm onTaskChanged={(text) => onTaskChanged(id, text)} label={task.label}/>
			</li>
		)
	})
	return <ul className='todo-list'>{elements}</ul>
}

export default TaskList;