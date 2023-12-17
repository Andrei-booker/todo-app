import { React, useState } from 'react';

function NewTaskForm({ onTaskAdded }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    const { value } = e.target;
    setLabel(value);
  };

  const onMinChange = (e) => {
    const { value } = e.target;
    setMin(value);
  };

  const onSecChange = (e) => {
    const { value } = e.target;
    setSec(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onTaskAdded(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input name="label" className="new-todo" placeholder="Task" onChange={onLabelChange} value={label} />
      <input value={min} name="min" className="new-todo-form__timer" placeholder="Min" onChange={onMinChange} />
      <input value={sec} name="sec" className="new-todo-form__timer" placeholder="Sec" onChange={onSecChange} />
      <button type="submit" />
    </form>
  );
}

export default NewTaskForm;
