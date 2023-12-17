import { useState } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../app-footer';

function App() {
  let id = Math.random();

  const createTask = (label, min = '00', sec = '00') => {
    return {
      label,
      date: new Date(),
      completedTask: false,
      editing: false,
      id: id++,
      timer: { min, sec },
    };
  };

  const initialState = [
    createTask('Completed task', '12', '25'),
    createTask('Editing task', '12', '25'),
    createTask('Active task', '12', '25'),
  ];

  const [todoData, setTodoData] = useState(initialState);
  const [filter, setFilter] = useState('All');

  const minuteCheck = (min) => {
    if (!min) return '00';
    if (min.length < 2) return `0${min}`;
    return min;
  };

  const secondsCheck = (sec) => {
    if (!sec) return '00';
    if (sec.length < 2) return `0${sec}`;
    return sec;
  };

  const toggleProperty = (arr, itemId, propName) => {
    const idx = arr.findIndex((el) => el.id === itemId);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const completeTask = (itemId) => {
    // eslint-disable-next-line no-shadow
    setTodoData((todoData) => toggleProperty(todoData, itemId, 'completedTask'));
  };

  const editTask = (itemId) => {
    // eslint-disable-next-line no-shadow
    setTodoData((todoData) => toggleProperty(todoData, itemId, 'editing'));
  };

  const deleteTask = (itemId) => {
    // eslint-disable-next-line no-shadow
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === itemId);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return newArray;
    });
  };

  const addTask = (text, min, sec) => {
    if (!text) return;
    const newTask = createTask(text, minuteCheck(min), secondsCheck(sec));
    // eslint-disable-next-line no-shadow
    setTodoData((todoData) => {
      const newArr = [...todoData, newTask];

      return newArr;
    });
  };

  const changeTask = (itemId, text) => {
    // eslint-disable-next-line no-shadow
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === itemId);
      const oldTask = todoData[idx];
      const changedTask = { ...oldTask, editing: false, label: text };
      const newArr = [...todoData.slice(0, idx), changedTask, ...todoData.slice(idx + 1)];
      return newArr;
    });
  };

  const updateTime = (itemId, min, sec) => {
    // eslint-disable-next-line no-shadow
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === itemId);
      const oldTask = todoData[idx];
      const changedTask = { ...oldTask, editing: false, timer: { min, sec } };
      const newArr = [...todoData.slice(0, idx), changedTask, ...todoData.slice(idx + 1)];
      return newArr;
    });
  };

  const changeFilter = (data) => setFilter(data);

  const filteredItems = () => {
    if (filter === 'Active') {
      return todoData.filter((todo) => !todo.completedTask);
    }
    if (filter === 'Completed') {
      return todoData.filter((todo) => todo.completedTask);
    }
    return todoData;
  };

  const clearCompleted = () => {
    // eslint-disable-next-line no-shadow
    setTodoData((todoData) => todoData.filter((element) => !element.completedTask));
  };
  const doneCount = todoData.filter((el) => el.completedTask).length;
  const todoCount = todoData.length - doneCount;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <TaskList
        updateTime={updateTime}
        todos={filteredItems()}
        onCompleted={completeTask}
        onEditing={editTask}
        onDeleted={deleteTask}
        onTaskChanged={changeTask}
      />
      <Footer toDo={todoCount} changeFilter={changeFilter} filter={filter} clearCompleted={clearCompleted} />
    </section>
  );
}

export default App;
