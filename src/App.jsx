import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList'; 
import AddTodoForm from './components/AddTodoForm'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const initialTodoList = [];
  const [todoList, setTodoList] = useState(initialTodoList);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('title'); 

  
  async function fetchData() {
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` },
    };

    try {
      const query1 = "?view=Grid%20view";
      const query2 = `&sort[0][field]=${sortField}`; 
      const query3 = `&sort[0][direction]=${sortOrder}`; 

      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}${query1}${query2}${query3}`;
      // console.log(url)

      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`${response.status}`);

      const data = await response.json();
      // console.log(data);
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
        createdTime: todo.createdTime,
      }))
      // todos.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));

      // console.log(todos);

      setTodoList(sortTodos(todos));
    } catch (error) {
      console.log("Error fetching data:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  
  async function addTodoToAirtable(newTodo) {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
        },
      }),
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`${response.status}`);

      const data = await response.json();
      return {
        id: data.id,
        title: data.fields.title,
        createdTime: data.createdTime,
      };
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  //  delete todo from Airtable using delete method
  async function deleteTodoFromAirtable(id) {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`${response.status}`);
    } catch (error) {
      console.log("Error deleting todo:", error.message);
    }
  }

  // Function to remove a todo
  const removeTodo = async (id) => {
    await deleteTodoFromAirtable(id); 
    setTodoList((prevTodoList) => prevTodoList.filter(todo => todo.id !== id)); 
  };

  
  async function addTodo(newTodo) {
    const addedTodo = await addTodoToAirtable(newTodo);
    if (addedTodo) {
      setTodoList((prevTodoList) => {
        const updatedList = [...prevTodoList, addedTodo];
        return sortTodos(updatedList);
      });
    }
  }

  

  // sorting
  const sortTodos = (todos) => {
    return todos.sort((a, b) => {
      const comparison = sortOrder === 'asc' ? 1 : -1;
      return (sortField === 'createdTime' 
        ? new Date(a.createdTime) - new Date(b.createdTime) 
        : a.title.localeCompare(b.title)) * comparison;
    });
  };

  
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  // Change sort field
  const changeSortField = (field) => {
    setSortField(field);
  };

  // Effect to fetch data
  useEffect(() => {
    fetchData();
  }, [sortOrder, sortField]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <h1>Todo List</h1>
            <div className="center-container">
              <AddTodoForm onAddTodo={addTodo} />
              <div className="button-container">
    <button className="button sort" onClick={toggleSortOrder}>
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
    </button>
    <button className="button sort" onClick={() => changeSortField('title')}>
        Sort by Title
    </button>
    <button className="button button sort created-time" onClick={() => changeSortField('createdTime')}>
        Sort by Created Time
    </button>
</div>

              {isLoading ? (
                <p>Loading...</p> 
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} /> 
              )}
            </div>
          </>
        }/>
        <Route path='/new' element={<h1>New To Do List</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
