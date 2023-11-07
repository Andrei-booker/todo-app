// import './app-header.css'

import { Component } from "react";
import TasksFilter from "../tasks-filter";

export default class Footer extends Component {
  render () {
    const {toDo} = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{toDo} items left</span>
        <TasksFilter />
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
};