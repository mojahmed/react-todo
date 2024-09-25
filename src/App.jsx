import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList'; 
import AddTodoForm from './components/AddTodoForm'; 

function App() {
  const initialTodoList = [];
  const [todoList, setTodoList] = useState(initialTodoList);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` },
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title
      }));

      setTodoList(todos);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTodoToAirtable(newTodo) {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title
        }
      })
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        id: data.id,
        title: data.fields.title
      };
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async function deleteTodoFromAirtable(id) {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function addTodo(newTodo) {
    const addedTodo = await addTodoToAirtable(newTodo);
    if (addedTodo) {
      setTodoList([...todoList, addedTodo]);
    }
  }

  const removeTodo = async (id) => {
    await deleteTodoFromAirtable(id); // Delete from Airtable first
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList); // Then update state
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  return (
    <>
      <h1>Todo List</h1>
      <div className="center-container">
        <AddTodoForm onAddTodo={addTodo} />
        
        {isLoading ? (
          <p>Loading...</p> 
        ) : (
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        )}
        
      </div>
    </>
  );
}

export default App;
