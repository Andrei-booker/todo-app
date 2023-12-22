import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Task({ timerId, label, date, onEditing, onDeleted, checked, onCompleted, startTimer, setTimerId, min, sec }) {
  const [play, setPlay] = useState(false);

  let timer = timerId;

  const playTimer = () => {
    if (play) return;
    timer = setInterval(() => {
      startTimer();
    }, 1000);
    setTimerId(timer);
    setPlay(true);
  };

  const pauseTimer = () => {
    setTimerId(null);
    clearInterval(timer);
    setPlay(false);
  };

  const onChange = (e) => {
    onCompleted(e);
    setTimerId(null);
    clearInterval(timer);
    setPlay(false);
  };

  const onDelete = () => {
    clearInterval(timer);
    onDeleted();
  };

  return (
    <div className="view">
      <input checked={checked} className="toggle" type="checkbox" onChange={onChange} />
      <label>
        <span className="title">{label}</span>
        <span className="description">
          <button className="icon icon-play" onClick={playTimer} />
          <button className="icon icon-pause" onClick={pauseTimer} />
          {min}:{sec}
        </span>
        <span className="description">
          created{' '}
          {formatDistanceToNow(date, {
            includeSeconds: true,
            addSuffix: true,
          })}
        </span>
      </label>
      <button className="icon icon-edit" onClick={onEditing} />
      <button className="icon icon-destroy" onClick={onDelete} />
    </div>
  );
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onCompleted: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Task;
