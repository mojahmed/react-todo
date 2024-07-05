import './App.css';
import { useState } from 'react';
import TodoList from './TodoList'; // Import TodoList component
import AddTodoForm from './AddTodoForm'; // Import AddTodoForm component



function  App () {
  const [newTodo, setNewTodo] = useState("");

    return (
    <div className="app-container">
    <h1>Todo List</h1>
    <div className="center-container">
      <AddTodoForm  onAddTodo={setNewTodo}/> {/* Use AddTodoForm component */}
      <p>{ newTodo }</p>
      <TodoList /> {/* Use TodoList component */}
    </div>
  </div>
  );

}
  


export default App;
