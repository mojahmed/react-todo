import { useState, useEffect } from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './AddTodoForm.module.css'; 
import PropTypes from 'prop-types';
function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");
  // const inputRef = useRef(null); 

  const inputId = "todoTitle";

  function handleTitleChange(event) {
    setTodoTitle(event.target.value);
    
  }

  function handleAddTodo(event) {
    event.preventDefault();
    console.log("Adding Todo:", todoTitle);
    onAddTodo({
      title: todoTitle,
      id: Date.now(), 
    });
    setTodoTitle(""); 
   
  }

  useEffect(() => {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.focus();
    }
  }, [todoTitle]); 

  return (
    <div className={styles.addTodoForm}>
      <form onSubmit={handleAddTodo}>
        <InputWithLabel
          id={inputId}
          // inputType="text"
          value={todoTitle} 
          onChange={handleTitleChange} 
         
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
