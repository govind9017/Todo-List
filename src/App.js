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

  deleteAll(){
    console.log(this.state.aallTask,"allTask");
    this.setState({allTask: this.state.allTask.filter(item=>
            item.isCompleted===false
        )
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
  getTodos(){
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
    console.log(event.target.value, currTask);
    this.setState({
      allTask: this.state.allTask.filter(item => {
        if (item.id === currTask.id) {
          item.text = event.target.value;
        }
          return item;
      })
    });
  }

  // updateTask = (todo) => {
  //   this.setState({
  //     allTask: this.state.allTask
  //   });
  // }

  renderList = () => {
    const todos  = this.getTodos();
    let todoList = [];
    todos.map((task, index) => {
      todoList.push(
        <div keys = {task.id} className='tasktab2' >
          <input
            type='checkBox'
            checked={task.isCompleted}
            onChange={() => {
              this.completedTask(task.id);
            }}
          />

          <EditTask currTask={task} handleChange={this.handleChange} />

          <button
            className='Destroy'
            type='button'
            onClick={() => {
              this.delTask(task.id);
            }}
          >
            {" "}
            X{" "}
          </button>
        </div>
      );
      // todoList.push(todoItem);
    });
    return todoList;
  };
  render() {
    // console.log(this.props.tasks, this.state.allTask, "props and state")
    const todos  = this.getTodos();

    return (
      <div>
        <h1 className='heading'>Todos</h1>
        <div className='tasktab'>
          <div className='tasktab2'>
            <button className='toggle' type='button' onClick={this.selectAll}>
              {" "}
              ✓{" "}
            </button>
            <AddTask onSubmit={this.addTask} />
            <button onClick={this.deleteAll}>
              {""}
              ✘{""}
            </button>
          </div>
          {this.renderList()}
          <label>
            {" "}
            {todos.filter(task => !task.isCompleted).length} items left{" "}
          </label>
          <button onClick={() => this.updateTodoToShow("All")}>All </button>
          <button onClick={() => this.updateTodoToShow("Active")}>
            Active{" "}
          </button>
          <button onClick={() => this.updateTodoToShow("Completed")}>
            Completed{" "}
          </button>
        </div>
      </div>
    );
  }
}

//
// this.state = {
//     tasks: [
//         {id:'task1', name:'task1', isCompleted: false}
//     ]
// }

// var newTask= {
//     id: '',
//     name: e.target.value,
//     isCompleted: false
// }

// this.setState({
//     tasks:[...this.state.tasks, newTask]
// })

// newState = [
//     ...this.state.tasks.splice(0,1),
//     newUpdated
//     ...this.state.tasks.splice(index, lengh)
// ]
