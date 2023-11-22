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

  render() {
    const { label, date, onCompleted, onEditing, onDeleted, checked } = this.props;

    return (
      <div className="view">
        <input checked={checked} className="toggle" type="checkbox" onChange={onCompleted} />
        <label>
          <span className="description">{label}</span>
          <span className="created">
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
