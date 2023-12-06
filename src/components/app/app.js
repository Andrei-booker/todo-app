import { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../app-footer';

export default class App extends Component {
  id = 1;

  state = {
    todoData: [
      this.createTask('Completed task', '12', '25'),
      this.createTask('Editing task', '12', '25'),
      this.createTask('Active task', '12', '25'),
    ],
    filter: 'All',
  };

  createTask(label, min = '00', sec = '00') {
    return {
      label,
      date: new Date(),
      completedTask: false,
      editing: false,
      id: this.id++,
      timer: { min, sec },
    };
  }

  minuteCheck(min) {
    if (!min) return '00';
    if (min.length < 2) return `0${min}`;
    return min;
  }

  secondsCheck(sec) {
    if (!sec) return '00';
    if (sec.length < 2) return `0${sec}`;
    return sec;
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
    const newTask = this.createTask(text, this.minuteCheck(min), this.secondsCheck(sec));
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
