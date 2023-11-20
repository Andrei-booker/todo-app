import Task from '../task';
import EditingTaskForm from './editing-task-form';

const TaskList = ({
	todos,
	onCompleted,
	onEditing,
	onDeleted,
	onTaskChanged
}) => {
	const elements = todos.map(task => {
		const { id, completedTask, editing, ...taskProps } = task
		let className = ''
		if (completedTask) className = 'completed'
		else if (editing) className = 'editing'

		return (
			<li key={id} className={className}>
				<Task
					{...taskProps}
					checked={completedTask}
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