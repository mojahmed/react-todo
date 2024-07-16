
import './App.css';
import { useState } from 'react';
import TodoList from './TodoList'; // Import TodoList component
import AddTodoForm from './AddTodoForm'; // Import AddTodoForm component

function App() {
  
  const [todoList, setTodoList] = useState([]); 

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <div className="center-container">
        <AddTodoForm onAddTodo={addTodo} /> {/* Use AddTodoForm component */}
       
        <TodoList todoList={todoList} /> {/* Pass todoList as a prop */}
      </div>
    </div>
  );
}

export default App;

