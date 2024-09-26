import { useState, useRef } from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './AddTodoForm.module.css'; 
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");
  const inputRef = useRef(null); 

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle); 
  }

  function handleAddTodo(event) {
    event.preventDefault();
    console.log("Adding Todo:", todoTitle);
    onAddTodo({
      title: todoTitle,
      id: Date.now(), 
    });
    setTodoTitle(""); 
    inputRef.current.focus();
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

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
