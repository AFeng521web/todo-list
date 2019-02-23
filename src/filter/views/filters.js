import React, {Component} from 'react';
import Link from './link.js';
import {connect} from 'react-redux';
import {FilterTypes} from '../../constants.js'

import './style.css';

class Filters extends Component {

  constructor(props, context) {
    super(props, context);
    
  }
  

  render() {

    // 实时获取todos的数量
    var statistics = {
      todoCount: this.props.todos.length || 0,
      todoCompleteCount: this.props.todos.filter((todo) => {
        return todo.completed
      }).length
    }

    return (
      <p className="filters">
        <Link filter={FilterTypes.COMPLETED}> {FilterTypes.COMPLETED} {statistics.todoCompleteCount} </Link>
        <Link filter={FilterTypes.ALL}> {FilterTypes.ALL} {statistics.todoCount}</Link>
        <Link filter={FilterTypes.UNCOMPLETED}> {FilterTypes.UNCOMPLETED} </Link>
      </p>
    );
  }  
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  }
}

export default connect(mapStateToProps, null)(Filters);

