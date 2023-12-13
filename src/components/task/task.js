import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onCompleted: PropTypes.func.isRequired,
    onEditing: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
  };

  state = {
    min: this.props.timer.min,
    sec: this.props.timer.sec,
    play: false,
  };

  timer = () => {
    const { min, sec, play } = this.state;
    if (!play) return;
    if (sec === '00' && min === '00') return;
    if (sec === '00' && min !== '00') {
      const minutes = min[0] !== '0' ? `${min - 1}` : `0${min - 1}`;
      this.setState({ min: minutes, sec: '59' });
    } else {
      const newSec = Number(sec - 1);
      const newSecToString = newSec < 10 ? `0${newSec}` : newSec;
      this.setState({ sec: newSecToString });
    }
  };

  playTimer = () => {
    this.setState({ play: true });
  };

  pauseTimer = () => {
    this.setState({ play: false });
  };

  updateTime() {
    const { min, sec } = this.state;
    this.props.updateTime(min, sec);
  }

  componentDidMount() {
    this.timer();
    setInterval(this.timer, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { play } = this.state;
    if (this.state !== prevState && play) {
      this.updateTime();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChange = (e) => {
    const { onCompleted } = this.props;
    onCompleted(e);
    this.setState({ play: false });
  };

  render() {
    const { label, date, onEditing, onDeleted, checked } = this.props;
    const { min, sec } = this.state;
    return (
      <div className="view">
        <input checked={checked} className="toggle" type="checkbox" onChange={this.onChange} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={this.playTimer} />
            <button className="icon icon-pause" onClick={this.pauseTimer} />
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
}
