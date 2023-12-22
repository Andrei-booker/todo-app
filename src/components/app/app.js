import { useState } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../app-footer';

function App() {
  let id = Math.random();

  const timeToString = (time) => {
    return time.toString().padStart(2, '0');
  };

  const createTask = (label, min = 0, sec = 0) => {
    return {
      label,
      date: new Date(),
      completedTask: false,
      editing: false,
      id: id++,
      min: timeToString(min),
      sec: timeToString(sec),
      timerId: null,
    };
  };

  const initialState = [
    createTask('Completed task', 12, 25),
    createTask('Editing task', 12, 25),
    createTask('Active task', 12, 25),
  ];

  const [todoData, setTodoData] = useState(initialState);
  const [filter, setFilter] = useState('All');

  const toggleProperty = (arr, itemId, propName) => {
    const idx = arr.findIndex((el) => el.id === itemId);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const completeTask = (itemId) => {
    setTodoData((todoData) => toggleProperty(todoData, itemId, 'completedTask'));
  };

  const editTask = (itemId) => {
    setTodoData((todoData) => toggleProperty(todoData, itemId, 'editing'));
  };

  const deleteTask = (itemId) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === itemId);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return newArray;
    });
  };

  const addTask = (text, min, sec) => {
    if (!text) return;
    const newTask = createTask(text, min, sec);
    setTodoData((todoData) => {
      const newArr = [...todoData, newTask];
      return newArr;
    });
  };

  const changeTask = (itemId, text) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === itemId);
      const oldTask = todoData[idx];
      const changedTask = { ...oldTask, editing: false, label: text };
      const newArr = [...todoData.slice(0, idx), changedTask, ...todoData.slice(idx + 1)];
      return newArr;
    });
  };

  const startTimer = (itemId) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === itemId);
      const oldTask = todoData[idx];
      const { min, sec } = oldTask;
      let newMin = min;
      let newSec = sec - 1;
      if (newSec < 0) {
        if (newMin <= 0) {
          newMin = 0;
          newSec = 0;
        } else {
          newSec = 59;
          newMin = min - 1;
        }
      }
      const changedTask = { ...oldTask, min: timeToString(newMin), sec: timeToString(newSec) };
      const newArr = [...todoData.slice(0, idx), changedTask, ...todoData.slice(idx + 1)];
      return newArr;
    });
  };

  const setTimerId = (itemId, timerId) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === itemId);
      const oldTask = todoData[idx];
      const changedTask = { ...oldTask, timerId };
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
        startTimer={startTimer}
        setTimerId={setTimerId}
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
