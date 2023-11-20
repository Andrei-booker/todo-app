import { Component } from "react";

export default class Task extends Component {
	render() {
		const { label, created, onCompleted, onEditing, onDeleted, checked } =
			this.props
	
		return (
			<div className='view'>
				<input
					checked={checked}
					className='toggle'
					type='checkbox'
					onChange={onCompleted}
				/>
				<label>
					<span className='description'>{label}</span>
					<span className='created'>created {created}</span>
				</label>
				<button className='icon icon-edit' onClick={onEditing}></button>
				<button className='icon icon-destroy' onClick={onDeleted}></button>
			</div>
		)
	}
};