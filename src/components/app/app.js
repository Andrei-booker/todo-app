import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../app-footer';

import { Component } from 'react';

// import './app.css'

export default class App extends Component {
	id = 1;

	state = {
		todoData: [
			this.createTask('Completed task'),
			this.createTask('Editing task'),
			this.createTask('Active task'),
		],
		filter: 'All'
	};

	createTask(label) {
		return {
			label: label,
			date: new Date(),
			completedTask: false,
			editing: false,
			id: this.id++,
		};
	};

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

	completeTask = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'completedTask')
			};
		});
	};

	editTask = id => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'editing'),
			};
		});
	};

	deleteTask = id => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id)

			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

			return {
				todoData: newArray,
			}
		})
	};

  addTask = text => {
    const newTask = this.createTask(text);

    this.setState(({todoData}) => {
      const newArr = [...todoData, newTask];

      return {
        todoData: newArr
      };
    });
  };

  changeTask = (id, text) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex(el => el.id === id);
			const oldTask = todoData[idx];
			const changedTask = {...oldTask, editing: false, label: text};
      const newArr = [...todoData.slice(0, idx),
                      changedTask,
                      ...todoData.slice(idx + 1)];
      return {
        todoData: newArr
      };                 
    });
  };

	changeFilter = (data) => {
		this.setState({filter: data});
	};

	filteredItems = () => {
		const {todoData, filter} = this.state;
		return todoData.filter(({completedTask}) => {
			const all = filter === 'All';
			const completed = filter === 'Completed';
			return all ? true : completed ? completedTask === true : completedTask === false;
		});
	};

clearCompleted = () => {
	this.setState(({todoData}) => ({todoData: todoData.filter((element) => !element.completedTask)}));
}

	render() {
    const {todoData} = this.state;
    const doneCount = todoData.filter(el => el.completedTask).length;
    const todoCount = todoData.length - doneCount;
    
		return (
			<section className='todoapp'>
				<header className='header'>
					<h1>todos</h1>
					<NewTaskForm onTaskAdded={this.addTask} />
				</header>
				<TaskList
					todos={this.filteredItems()}
					onCompleted={this.completeTask}
					onEditing={this.editTask}
					onDeleted={this.deleteTask}
					onTaskChanged={this.changeTask}
				/>
				<Footer
					toDo={todoCount}
					changeFilter={this.changeFilter}
					filter={this.state.filter}
					clearCompleted={this.clearCompleted}
				/>
			</section>
		);
	};
};