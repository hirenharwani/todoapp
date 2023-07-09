import React from "react";
import "./assets/css/index.scss";
import { getToDos, addToDo, deleteToDo, updateToDo } from "./apis";
import ToDo from "./components/todo";
import Loader from "./components/loader";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      currentPage: 1,
      todosPerPage: 10,
      loading: true,
    };
  }

  componentDidMount() {
    const fetchPosts = async () => {
      const response = await getToDos();
      if (response.success) {
        const updatedData = response.data?.map((obj) => {
          obj = {
            ...obj,
            isEditing: false,
            isOpen: false,
          };
          return obj;
        });
        this.setState({
          todos: updatedData,
          loading: !response.success,
        });
      }
    };
    fetchPosts();
  }

  handlePagination = (event) => {
    this.setState({
      currentPage: event.target.id,
    });
  };

  addNewToDo = () => {
    const todos = this.state.todos;
    const addPosts = async (todo) => {
      const updateToDos = [
        ...this.state.todos,
        {
          userId: 10,
          id: todos.length + 1,
          title: "",
          body: "",
          isnew: true,
        },
      ];
      let lastElement = updateToDos[updateToDos.length - 2];
      if (
        lastElement.isnew &&
        (lastElement.title == "" || lastElement.body == "")
      ) {
        return alert("All fields are required!");
      } else {
      }
      this.setState((prevState) => {
        let todos = Object.assign({}, prevState.todos);
        todos = updateToDos;
        return { todos, currentPage: 1 };
      });
    };
    addPosts();
  };

  handleUpdate = (todo) => {
    const todos = this.state.todos;
    if (todo.isnew) {
      const updateNewToDo = async (todo) => {
        const response = await addToDo(JSON.stringify(todo), todo.id);
        if (response.success) {
          const index = todo.id - 1;
          todos[index] = todo;
          if (todos[index].title == "" || todos[index].body == "") {
            todos[index].isEditing = true;
            alert("All fields are required!");
          } else {
            todo.isnew = false;
            todo.isEditing = false;
            this.setState({
              todos: todos,
            });
          }
        }
      };
      updateNewToDo(todo);
    } else {
      const index = todos.findIndex((obj) => {
        return obj.id === todo.id;
      });
      todos[index].title = todo.title;
      todos[index].body = todo.body;
      if (todos[index].title == "" || todos[index].body == "") {
        todos[index].isEditing = true;
        alert("All fields are required!");
      } else {
        const updatePosts = async () => {
          const response = await updateToDo(JSON.stringify(todo), todo.id);
          if (response.success || todo.id > 100) {
            this.setState(
              {
                todos: todos,
              },
              console.log(this.state)
            );
          }
        };
        updatePosts(todo);
        todos[index].isEditing = false;
      }
    }
  };

  handleDelete = (index) => {
    const todos = this.state.todos;
    const deletePosts = async (index) => {
      const response = await deleteToDo(index);
      if (response.success) {
        const updateToDos = todos.filter((todo) => {
          return todo.id != index;
        });
        this.setState({
          todos: updateToDos,
        });
      }
    };
    deletePosts(index);
  };

  render() {
    const loading = this.state.loading;
    const { todos, currentPage, todosPerPage } = this.state;
    const reverseToDos = todos?.slice(0).reverse();
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const listToDos = reverseToDos?.slice(indexOfFirstTodo, indexOfLastTodo);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos?.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <section className="to-do-list">
        <div className="container">
          <div className="inner-wrapper">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="navbar">
                  <h1> To Dos </h1>
                  <button onClick={() => this.addNewToDo()}> Add New </button>
                </div>
                {listToDos?.map((todo) => {
                  return (
                    <>
                      <ToDo
                        todo={todo}
                        handleDelete={this.handleDelete}
                        handleUpdate={this.handleUpdate}
                        handleAddToDo={this.addNewToDo}
                        key={todo.id}
                      />
                    </>
                  );
                })}
                <div className="pagination">
                  {pageNumbers?.map((number) => {
                    return (
                      <li
                        className={currentPage == number ? "current" : ""}
                        key={number}
                        id={number}
                        onClick={(number) => {
                          this.handlePagination(number);
                        }}
                      >
                        {number}
                      </li>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default App;
