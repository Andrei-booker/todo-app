import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../app-footer';

import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react';

// import './app.css'

export default class App extends Component {
	created = () => {
		return formatDistanceToNow(new Date(), { includeSeconds: true })
	}

	state = {
		todoData: [
			{
				label: 'Completed task',
				created: `${this.created()}`,
				completed: false,
				editing: false,
				id: 1,
			},
			{
				label: 'Editing task',
				created: `${this.created()}`,
				completed: false,
				editing: false,
				id: 2,
			},
			{
				label: 'Active task',
				created: `${this.created()}`,
				completed: false,
				editing: false,
				id: 3,
			},
		],
	}

	toDoCount = () => {
		return this.state.todoData.reduce((acc, current) => {
			if (!current.completed) acc++;
			return acc;
		}, 0);
	};

	completeTask = id => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id);
			todoData[idx].completed = !todoData[idx].completed;
			return {
				todoData: todoData,
			};
		});
	};

	editTask = id => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id);
			todoData[idx].editing = !todoData[idx].editing;
			return {
				todoData: todoData,
			};
		});
	};

  deleteTask = id => {
    this.setState(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

			return {
				todoData: newArray
			};
		});
  };

	render() {
		return (
			<section className='todoapp'>
				<header className='header'>
					<h1>todos</h1>
					<NewTaskForm />
				</header>
				<TaskList
					todos={this.state.todoData}
					onCompleted={this.completeTask}
					onEditing={this.editTask}
          onDeleted={this.deleteTask}
				/>
				<Footer toDo={this.toDoCount()} />
			</section>
		)
	}
};