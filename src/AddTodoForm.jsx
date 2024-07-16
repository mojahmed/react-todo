
import { useState } from 'react';

function AddTodoForm(props) {
  const [todoTitle, setTodoTitle] = useState("");
  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle); // to Update the todoTitle state
  }

  function handleAddTodo(event) {
    event.preventDefault();
    props.onAddTodo({
      title: todoTitle,
      id: Date.now(), // Generate a unique identifier
    });
    setTodoTitle(""); // Clear the input by resetting the state 
  }


  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input
        name="title"
        type="text"
        id="todoTitle"
        value={todoTitle} // i Controlled the input by those 2 line 
        onChange={handleTitleChange} // Handle input change
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;

