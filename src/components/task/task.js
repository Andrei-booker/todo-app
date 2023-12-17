import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function Task({ timer, label, date, onEditing, onDeleted, checked, onCompleted, updateTime }) {
  const [min, setMin] = useState(timer.min);
  const [sec, setSec] = useState(timer.sec);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!play) return;
      if (sec === '00' && min === '00') return;
      if (sec === '00' && min !== '00') {
        const minutes = min[0] !== '0' && min.length > 1 ? `${min - 1}` : `0${min - 1}`;
        setMin(minutes.padStart(2, '0'));
        setSec('59');
      } else {
        const newSec = Number(sec - 1);
        const newSecToString = newSec < 10 ? `0${newSec}` : newSec;
        setSec(newSecToString);
      }
    }, 1000);
    updateTime(min, sec);
    return () => {
      clearInterval(interval);
    };
  }, [min, play, sec]);

  const onChange = (e) => {
    onCompleted(e);
    setPlay(false);
  };

  return (
    <div className="view">
      <input checked={checked} className="toggle" type="checkbox" onChange={onChange} />
      <label>
        <span className="title">{label}</span>
        <span className="description">
          <button className="icon icon-play" onClick={() => setPlay(true)} />
          <button className="icon icon-pause" onClick={() => setPlay(false)} />
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
      <button className="icon icon-destroy" onClick={onDeleted} />
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
