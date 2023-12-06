import { React, Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    // eslint-disable-next-line no-unused-vars
    this.setState((state) => ({
      [name]: value,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, min, sec } = this.state;
    this.props.onTaskAdded(label, min, sec);
    this.setState({ label: '', min: '', sec: '' });
  };

  render() {
    const { min, sec, label } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input name="label" className="new-todo" placeholder="Task" onChange={this.onLabelChange} value={label} />
        <input
          value={min}
          name="min"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onLabelChange}
        />
        <input
          value={sec}
          name="sec"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onLabelChange}
        />
        <button type="submit" />
      </form>
    );
  }
}
