import React from "react";
import "./App.css";
import AddTask from "./addTask";
import EditTask from "./editTask";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTask: [],
      todoToShow: "All"
    };
    this.addTask = this.addTask.bind(this);
    this.delTask = this.delTask.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.completedTask = this.completedTask.bind(this);
  }
  addTask(todo) {
    if (todo.text !== "") {
      this.setState({
        allTask: [todo, ...this.state.allTask]
      });
    }
  }

  delTask(index) {
    this.setState({ allTask: this.state.allTask.filter(a => a.id !== index) });
  }

  completedTask(index) {
    this.setState({
      allTask: this.state.allTask.filter(item => {
        if (index === item.id) {
          item.isCompleted = !item.isCompleted;
          return item;
        } else {
          return item;
        }
      })
    });
  }

  updateTodoToShow(s) {
    this.setState({ todoToShow: s });
  }

  deleteAll() {
    this.setState({
      allTask: this.state.allTask.filter(item => item.isCompleted === false)
    });
  }

  selectAll() {
    let s = this.state.allTask.some(function(val) {
      return val.isCompleted === false;
    });
    if (s === true) {
      this.setState({
        allTask: this.state.allTask.filter(item => {
          item.isCompleted = true;
          return item;
        })
      });
    } else {
      this.setState({
        allTask: this.state.allTask.filter(item => {
          item.isCompleted = false;
          return item;
        })
      });
    }
  }
  getTodos() {
    let todos = [];
    if (this.state.todoToShow === "All") {
      todos = this.state.allTask;
    } else if (this.state.todoToShow === "Active") {
      todos = this.state.allTask.filter(task => !task.isCompleted);
    } else if (this.state.todoToShow === "Completed") {
      todos = this.state.allTask.filter(task => task.isCompleted);
    }
    return todos;
  }

  handleChange = (currTask, event) => {
    this.setState({
      allTask: this.state.allTask.filter(item => {
        if (item.id === currTask.id) {
          item.text = event.target.value;
        }
        return item;
      })
    });
  };

  // updateTask = (todo) => {
  //   this.setState({
  //     allTask: this.state.allTask
  //   });
  // }

  renderList = () => {
    const todos = this.getTodos();
    let todoList = [];
    todos.map((task, index) => {
      todoList.push(
        <div keys={task.id} className='tasktab2'>
          <div className='round'>
            <input
              type='checkbox'
              id={task.id}
              checked={task.isCompleted}
              onChange={() => {
                this.completedTask(task.id);
              }}
            />
            <label for={task.id} />
          </div>
          <EditTask currTask={task} handleChange={this.handleChange} />

          <button
            className='Destroy'
            type='button'
            onClick={() => {
              this.delTask(task.id);
            }}
          >
            {" "}
            x{" "}
          </button>
        </div>
      );
    });
    return todoList;
  };
  render() {
    const todos = this.getTodos();

    return (
      <div>
        <h1 className='heading'>todos</h1>
        <div className='tasktab'>
          <div className='tasktab2'>
            <button className='toggle' type='button' onClick={this.selectAll}>
              {" "}
              ❯{" "}
            </button>

            <AddTask onSubmit={this.addTask} />
            <button className='destroyAll' onClick={this.deleteAll}>
              {""}✘{""}
            </button>
          </div>
          {this.renderList()}
          <div className='details'>
            {" "}
            {todos.filter(task => !task.isCompleted).length} items left{" "}
            <button onClick={() => this.updateTodoToShow("All")}>All </button>
            <button onClick={() => this.updateTodoToShow("Active")}>
              Active{" "}
            </button>
            <button onClick={() => this.updateTodoToShow("Completed")}>
              Completed{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
