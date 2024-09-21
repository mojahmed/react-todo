import { useState, useRef } from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './AddTodoForm.module.css'; // Import CSS Module

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");
  const inputRef = useRef(null); // Create the ref using useRef

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle); // Update the todoTitle state
  }

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({
      title: todoTitle,
      id: Date.now(), // Generate a unique identifier
    });
    setTodoTitle(""); // Clear the input by resetting the state
    inputRef.current.focus(); // Focus the input field after adding a todo
  }

  return (
    <div className={styles.addTodoForm}>
      <form onSubmit={handleAddTodo}>
        <InputWithLabel
          id="todoTitle"
          inputType="text"
          value={todoTitle} 
          onChange={handleTitleChange} 
          ref={inputRef} 
        >
          Title
        </InputWithLabel>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
