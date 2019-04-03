import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";

// const todoItems = [
//   {
//     id: 1,
//     task: "Hello",
//     timeTaskl: "06:00:00",
//     // completed: false
//   },
//   {
//     id: 2,
//     task: "Hiiiii",
//     timeTaskl: "12:00:00",
//     // completed: false
//   },
//   {
//     id: 3,
//     task: "Hellooo",
//     timeTaskl: "18:20:00",
//     // completed: false
//   }
// ];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     viewCompleted: false,
     activeItem:{
       task:"",
       timeTaskl:"",
       dateEvent: "",

     },
      todoList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList());
  };
  handleCompleted=item=>{
    if (item.completed){
      item.completed =false;
      this.setState({item})
      axios
        .patch(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    else{
    item.completed =true;
    this.setState({item})
    axios
        .patch(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { task: "", timeTaskl: "00:00:00"};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.task}
        >
          
          {item.task}---{item.dateEvent}---{item.timeTaskl} 
        </span>
        <span>
          <button 
            onClick={()=> this.editItem(item)}
            className="btn btn-secondary mr-2"> Edit Task </button>
            {/* console.log(item) */}
          <button
            onClick={()=> this.handleDelete(item)} 
            className="btn btn-danger">Delete Task</button>
          <button
            onClick={()=> this.handleCompleted(item)}
            className="btn btn-secondary mr-2">Complete</button>
        </span>
      </li>
    ));
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button
                  onClick={this.createItem} 
                  className="btn btn-primary">Add task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ?(
          <Modal
            activeItem={this.state.activeItem}
            toggle = {this.toggle}
            onSave={this.handleSubmit}
            />
        ):null}
      </main>
    );
  }
}
export default App;