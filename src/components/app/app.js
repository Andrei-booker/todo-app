import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../app-footer';

import { formatDistanceToNow } from 'date-fns'

// import './app.css'

const App = () => {

  const created = formatDistanceToNow(
    new Date(),
    {includeSeconds: true}
  )

  const todoData = [
    { label: 'Completed task', created: `${created}`, completed: true, editing: false, id: 1 },
    { label: 'Editing task', created: `${created}`, completed: false, editing: true, id: 2 },
    { label: 'Active task', created: `${created}`, completed: false, editing: false, id: 3 }
  ];

  const toDoCount = todoData.reduce((acc, current) => {
    if(!current.completed) acc++
    return acc;
  }, 0)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <TaskList todos={todoData} />
      <Footer toDo={toDoCount} />
    </section>
  );
};

export default App;