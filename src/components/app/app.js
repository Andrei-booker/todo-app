import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../app-footer';

import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react';

// import './app.css'

export default class App extends Component {
	id = 1;

	created = () => {
		return formatDistanceToNow(new Date(), { includeSeconds: true })
	}

	state = {
		todoData: [
			this.createTask('Completed task'),
			this.createTask('Editing task'),
			this.createTask('Active task'),
		],
	}

	createTask(label) {
		return {
			label: label,
			created: `${this.created()}`,
			completed: false,
			editing: false,
			id: this.id++,
		}
	}

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

	completeTask = id => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'completed')
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

	render() {
    const {todoData} = this.state;
    const doneCount = todoData.filter(el => el.completed).length;
    const todoCount = todoData.length - doneCount;
    
		return (
			<section className='todoapp'>
				<header className='header'>
					<h1>todos</h1>
					<NewTaskForm onTaskAdded={this.addTask} />
				</header>
				<TaskList
					todos={this.state.todoData}
					onCompleted={this.completeTask}
					onEditing={this.editTask}
					onDeleted={this.deleteTask}
					onTaskChanged={this.changeTask}
				/>
				<Footer toDo={todoCount} />
			</section>
		)
	}
};