import PropTypes from 'prop-types';

function TasksFilter({ filter, changeFilter }) {
  const onClick = (e) => {
    const filterItem = e.target.textContent;
    changeFilter(filterItem);
  };
  return (
    <ul className="filters">
      <li>
        <button className={filter === 'All' ? 'selected' : null} onClick={onClick}>
          All
        </button>
      </li>
      <li>
        <button className={filter === 'Active' ? 'selected' : null} onClick={onClick}>
          Active
        </button>
      </li>
      <li>
        <button className={filter === 'Completed' ? 'selected' : null} onClick={onClick}>
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: 'All',
};

TasksFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default TasksFilter;
