import Task from '../task';

const TaskList = ({todos}) => {
  const elements =  todos.map((task) => {
    const {id, editing, completed, ...taskProps} = task;
    let className = '';
    if (completed) className = 'completed';
    else if (editing) className = 'editing';

    return (
      <li key={id} className={className}>
        <Task {...taskProps} />
        <input type="text" className="edit" defaultValue={task.label}></input>
      </li>
    );
  });

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

export default TaskList;