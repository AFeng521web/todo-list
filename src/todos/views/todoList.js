import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TodoItem from './todoItem.js';
import {toggleTodo, removeTodo} from '../actions.js';
import {FilterTypes} from '../../constants.js';

const TodoList = ({todos, onToggleTodo, onRemoveTodo}) => {
  return (
    <ul className="todo-list">
    {
      // 动态渲染不确定数量的子组件
      todos.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          completed={item.completed}
          // 这里父组件通过props传递一个函数，当子组件被用户点击时，
          // 执行这个函数，在这个函数内部，调用了能够派发action的函数。
          onToggle={() => onToggleTodo(item.id)}
          onRemove={() => onRemoveTodo(item.id)}
        />
        ))
    }
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

// 根据filter过滤条件，显示符合条件的todos列表。
const selectVisibleTodos = (todos, filter) => {
  switch (filter) {
    case FilterTypes.ALL:
      return todos;
    case FilterTypes.COMPLETED:
    // filter这个高阶函数，接收一个函数作为参数，并且把数组的每一项作用于这个函数，
    // 最后返回为true的数组项组成的新数组。注意这个操作不会改变原数组。
      return todos.filter(item => item.completed);
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed);
    default:
      throw new Error('unsupported filter');
  }
}

// 将state映射到props上
const mapStateToProps = (state) => {
  return {
    todos: selectVisibleTodos(state.todos, state.filter)
  };
}

// 将action映射到props上
const mapDispatchToProps = (dispatch) => {
  return {
    // 派发action的函数
    onToggleTodo: (id) => {
      dispatch(toggleTodo(id));
    },
    onRemoveTodo: (id) => {
      dispatch(removeTodo(id));
    }
  };
};

// 导出容器组件
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

