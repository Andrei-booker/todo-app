import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';

function Footer({ toDo, changeFilter, filter, clearCompleted }) {
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

Footer.defaultProps = {
  toDo: 0,
  filter: 'All',
};

Footer.propTypes = {
  toDo: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default Footer;
