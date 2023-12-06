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
      // eslint-disable-next-line no-unused-vars
      this.setState((state) => ({ min: minutes, sec: '59' }));
    } else {
      const newSec = Number(sec - 1);
      const newSecToString = newSec < 10 ? `0${newSec}` : newSec;
      // eslint-disable-next-line no-unused-vars
      this.setState((state) => ({
        sec: newSecToString,
      }));
    }
  };

  playTimer = () => {
    // eslint-disable-next-line no-unused-vars
    this.setState((state) => ({
      play: true,
    }));
  };

  pauseTimer = () => {
    // eslint-disable-next-line no-unused-vars
    this.setState((state) => ({
      play: false,
    }));
  };

  componentDidMount() {
    this.timer();
    this.interval = setInterval(this.timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.play !== prevState.play) {
      this.timer();
    }
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
