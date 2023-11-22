import PropTypes from 'prop-types';
import { Component } from 'react';

import TasksFilter from '../tasks-filter';

export default class Footer extends Component {
  static defaultProps = {
    toDo: 0,
    filter: 'All',
  };

  static propTypes = {
    toDo: PropTypes.number,
    clearCompleted: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
  };

  render() {
    const { toDo, changeFilter, filter, clearCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{toDo} items left</span>
        <TasksFilter filter={filter} changeFilter={changeFilter} />
        <button onClick={clearCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
