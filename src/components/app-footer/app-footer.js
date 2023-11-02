// import './app-header.css'

import TasksFilter from "../tasks-filter";

const Footer = ({toDo}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;