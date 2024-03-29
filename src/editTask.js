import React from "react";
import "./App.css";

export default class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.currTask.text !== "") {
      this.setState({
        editable: false
      });
    }
  };

  onDoubleClick() {
    this.setState({ editable: true });
  }

  render() {
    if (this.state.editable === false) {
      return (
        <div className='showDelete'>
          <label
            className={
              this.props.currTask.isCompleted ? "Completed" : "Pending"
            }
            onDoubleClick={this.onDoubleClick}
          >
            {" "}
            {this.props.currTask.text}{" "}
          </label>
          <button
            className='destroy'
            onClick={() => {
              this.props.deleteTask(this.props.currTask.id);
            }}
          />
        </div>
      );
    } else {
      return (
        <div className='Edit'>
          <form onSubmit={this.handleSubmit}>
            <input
              className='edittextplace'
              type='text'
              value={this.props.currTask.text}
              onChange={this.props.handleChange.bind(null, this.props.currTask)}
            />
          </form>
        </div>
      );
    }
  }
}
