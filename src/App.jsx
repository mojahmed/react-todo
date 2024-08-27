import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './TodoList'; 
import AddTodoForm from './AddTodoForm'; 

function App() {
  const initialTodoList = [];
  // State to hold the todo list
  const [todoList, setTodoList] = useState(initialTodoList);
  // State to track if data is loading
  const [isLoading, setIsLoading] = useState(true);

  //  fetch todo list data from localStorage 
  useEffect(() => {
    const simulateLoading = new Promise((resolve) => {
      setTimeout(() => {
        const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
        const object = {
          data:{
            todoList: savedTodoList,
          },
        }
        resolve(object); 
      }, 2000); 
    });

    // to Handle the promise
    simulateLoading
      .then((result) => {
        // console.log('Promise resolved with:', result);
        const retrievedTodoList = result.data.todoList;
        setTodoList(retrievedTodoList); 
        setIsLoading(false); // Set loading to false after updating the todo list
      })
      .catch((error) => {
        console.error('Promise rejected:', error);
        setIsLoading(false); // Ensure loading is set to false even if there's an error
      });

  }, []); 

  
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]); 

  // Function to add a new todo
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  // Function to remove a todo
  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <>
      <h1>Todo List</h1>
      <div className="center-container">
        <AddTodoForm onAddTodo={addTodo} /> {/* Use AddTodoForm component */}
        
        {/* Conditional rendering based on isLoading state */}
        {isLoading ? (
          <p>Loading...</p> 
        ) : (
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} /> // Show TodoList if isLoading is false
        )}
        
      </div>
    </>
  );
}

export default App;
