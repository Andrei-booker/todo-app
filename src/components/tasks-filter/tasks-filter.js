import PropTypes from 'prop-types';
import { Component } from 'react';

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'All',
  };

  static propTypes = {
    changeFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
  };

  onClick = (e) => {
    const filterItem = e.target.textContent;
    this.props.changeFilter(filterItem);
  };

  render() {
    const { filter } = this.props;

    return (
      <ul className="filters">
        <li>
          <button className={filter === 'All' ? 'selected' : null} onClick={this.onClick}>
            All
          </button>
        </li>
        <li>
          <button className={filter === 'Active' ? 'selected' : null} onClick={this.onClick}>
            Active
          </button>
        </li>
        <li>
          <button className={filter === 'Completed' ? 'selected' : null} onClick={this.onClick}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
