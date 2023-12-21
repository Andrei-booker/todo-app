import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../app-footer';

export default class App extends Component {
  id = 1;

  timeToString(time) {
    return time.toString().padStart(2, '0');
  }

  state = {
    todoData: [
      this.createTask('Completed task', 12, 25),
      this.createTask('Editing task', 6, 25),
      this.createTask('Active task', 3, 25),
    ],
    filter: 'All',
  };

  createTask(label, min = 0, sec = 0) {
    return {
      label,
      date: new Date(),
      completedTask: false,
      editing: false,
      id: this.id++,
      min: this.timeToString(min),
      sec: this.timeToString(sec),
      timerId: null,
    };
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  completeTask = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completedTask'),
    }));
  };

  editTask = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'editing'),
    }));
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addTask = (text, min, sec) => {
    if (!text) return;
    const newTask = this.createTask(text, min, sec);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];

      return {
        todoData: newArr,
      };
    });
  };

  changeTask = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const changedTask = { ...oldTask, editing: false, label: text };
      const newArr = [...todoData.slice(0, idx), changedTask, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
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
      const changedTask = { ...oldTask, min: this.timeToString(newMin), sec: this.timeToString(newSec) };
      const newArr = [...todoData.slice(0, idx), changedTask, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  setTimerId = (id, timerId) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const changedTask = { ...oldTask, timerId };
      const newArr = [...todoData.slice(0, idx), changedTask, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  changeFilter = (data) => {
    this.setState({ filter: data });
  };

  filteredItems(todoData, filter) {
    if (filter === 'Active') {
      return todoData.filter((todo) => !todo.completedTask);
    }
    if (filter === 'Completed') {
      return todoData.filter((todo) => todo.completedTask);
    }
    return todoData;
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((element) => !element.completedTask) }));
  };

  render() {
    const { todoData, filter } = this.state;
    const doneCount = todoData.filter((el) => el.completedTask).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <TaskList
          startTimer={this.startTimer}
          setTimerId={this.setTimerId}
          todos={this.filteredItems(todoData, filter)}
          onCompleted={this.completeTask}
          onEditing={this.editTask}
          onDeleted={this.deleteTask}
          onTaskChanged={this.changeTask}
        />
        <Footer
          toDo={todoCount}
          changeFilter={this.changeFilter}
          filter={filter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
