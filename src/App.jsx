import './App.css';
import { useState } from 'react';
import {  useEffect } from 'react';
import TodoList from './TodoList'; // Import TodoList component
import AddTodoForm from './AddTodoForm'; // Import AddTodoForm component


function useSemiPersistentState(key, initialState) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function App() {
  
  const [todoList, setTodoList] = useSemiPersistentState('savedTodoList', []);

  // Function to add a new todo
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <div className="center-container">
        <AddTodoForm onAddTodo={addTodo} /> {/* Use AddTodoForm component */}
        <TodoList todoList={todoList} /> {/* Pass todoList as a prop */}
      </div>
    </>
  );
}

export default App;
