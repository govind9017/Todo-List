import React from "react";
import "./App.css";
import shortid from "shortid";

export default class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text: this.state.newTask,
      isCompleted: false
    });
    this.setState({ newTask: "" });
  }

  render() {
    return (
      <div className='inputText'>
        <form onSubmit={this.handleSubmit}>
          <input
            className='textplace'
            type='text'
            placeholder='What needs to be done?'
            name='newTask'
            value={this.state.newTask}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
