# todoList(待办事项列表及任务管理器)

# 主要技术栈
1. react
2. redux
3. react-redux

# 项目启动
1. 克隆项目并安装环境
```
git clone https://github.com/AFeng521web/todo-list.git
cd todo-list
npm install
```

2. 直接运行
```
npm start
```

**** 

# 项目总结：
整个项目划分为两个大的组件todos和filter,其中todos负责添加待办项，以及渲染todos中已存在的待办项。filter负责根据过滤条件渲染特定的待办项，并且实现同步跟踪待办项状态以及统计个数的功能。

项目采用按功能组织代码的设计方式，摒弃了传统MVC中，按照角色组织代码的方式。

项目中的一些核心实现：
* 动态渲染不确定数量的子组件
```
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
```
这是因为在JSX中，不能使用js语句，只能使用js表达式。

* 实现同步跟踪待办项状态以及统计个数
```
var statistics = {
      todoCount: this.props.todos.length || 0,
      todoCompleteCount: this.props.todos.filter((todo) => {
        return todo.completed
      }).length
    }
```
这段代码一定要放在组件的render函数中，因为当有action被派发出去后，store的状态就会改变。此时，react-redux中connect函数接收到的state就会跟着改变，从而驱动页面重新渲染，实现联动效果。





