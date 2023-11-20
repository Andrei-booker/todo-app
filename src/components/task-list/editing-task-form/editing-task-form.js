import { Component } from "react";

export default class EditingTaskForm extends Component {
	state = {
		label: this.props.label,
	}

	onTaskChange = e => {
		this.setState({
			label: e.target.value,
		})
	}

	onSubmit = e => {
		e.preventDefault()
		this.props.onTaskChanged(this.state.label)
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<input
					type='text'
					className='edit'
					autoFocus={true}
					value={this.state.label}
					onChange={this.onTaskChange}
				/>
			</form>
		)
	}
};