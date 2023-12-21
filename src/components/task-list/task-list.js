import PropTypes from 'prop-types';

import EditingTaskForm from '../editing-task-form';
import Task from '../task';

function TaskList({ todos, onCompleted, onEditing, onDeleted, onTaskChanged, startTimer, setTimerId }) {
  const elements = todos.map((task) => {
    const { id, completedTask, editing, ...taskProps } = task;
    let className = '';
    if (completedTask) className = 'completed';
    else if (editing) className = 'editing';

    return (
      <li key={id} className={className}>
        <Task
          {...taskProps}
          setTimerId={(timerId) => setTimerId(id, timerId)}
          startTimer={() => startTimer(id)}
          checked={completedTask}
          onCompleted={() => onCompleted(id)}
          onEditing={() => onEditing(id)}
          onDeleted={() => onDeleted(id)}
        />
        <EditingTaskForm onTaskChanged={(text) => onTaskChanged(id, text)} label={task.label} />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  todos: {},
};

TaskList.propTypes = {
  todos: PropTypes.any,
  onCompleted: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onTaskChanged: PropTypes.func.isRequired,
};

export default TaskList;
