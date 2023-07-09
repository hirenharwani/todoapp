import React from "react";
import { deleteToDo, updateToDo } from "../apis";

class ToDo extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: {},
    };
  }

  componentDidMount() {
    const todo = this.props.todo;
    this.setState({
      todo: todo,
    });
  }

  componentWillReceiveProps(nextProps) {
    const todo = nextProps.todo;
    this.setState({
      todo: todo,
    });
  }

  handleClick = () => {
    this.setState((prevState) => {
      let todo = Object.assign({}, prevState.todo);
      todo.isOpen = !todo.isOpen;
      return { todo };
    });
  };

  handlEdit = () => {
    this.setState((prevState) => {
      let todo = Object.assign({}, prevState.todo);
      todo.isEditing = true;
      return { todo };
    });
  };

  onChangeHeading = (event) => {
    this.setState((prevState) => {
      let todo = Object.assign({}, prevState.todo);
      todo.title = event.target.value;
      return { todo };
    });
  };

  onChangePara = (event) => {
    this.setState((prevState) => {
      let todo = Object.assign({}, prevState.todo);
      todo.body = event.target.value;
      return { todo };
    });
  };

  render() {
    const todo = this.state.todo;
    const isOpen = this.state.todo.isOpen;
    const isEditing = this.state.todo.isEditing;
    return (
      <>
        <div className="to-do" key={todo.id}>
          {isEditing || todo.isnew ? (
            <input
              type="text"
              className="edit-heading"
              value={todo.title}
              onChange={this.onChangeHeading}
            />
          ) : (
            <h3 onClick={this.handleClick}>{todo.title}</h3>
          )}
          {isOpen || todo.isnew ? (
            <div className="">
              {isEditing || todo.isnew ? (
                <textarea
                  className="edit-para"
                  required
                  rows="4"
                  cols="50"
                  value={todo.body}
                  onChange={this.onChangePara}
                />
              ) : (
                <p>{todo.body}</p>
              )}
              <div className="actions-wrapper">
                {isEditing || todo.isnew ? (
                  <>
                    <button onClick={() => this.props.handleUpdate(todo)}>
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => this.handlEdit(todo.id)}>
                      Edit
                    </button>
                    <button onClick={() => this.props.handleDelete(todo.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default ToDo;
