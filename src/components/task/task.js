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
    play: false,
  };

  timer = this.props.timerId;

  playTimer = () => {
    if (this.state.play) return;
    const { startTimer, setTimerId } = this.props;
    this.timer = setInterval(() => {
      startTimer();
    }, 1000);
    setTimerId(this.timer);
    this.setState({ play: true });
  };

  pauseTimer = () => {
    const { setTimerId } = this.props;
    setTimerId(null);
    clearInterval(this.timer);
    this.setState({ play: false });
  };

  onChange = (e) => {
    const { onCompleted } = this.props;
    onCompleted(e);
    this.props.setTimerId(null);
    clearInterval(this.timer);
  };

  delete = () => {
    clearInterval(this.timer);
    this.props.onDeleted();
  };

  render() {
    const { label, date, onEditing, checked, min, sec } = this.props;
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
        <button className="icon icon-destroy" onClick={this.delete} />
      </div>
    );
  }
}
