
import { useState, useEffect } from 'react';
import InputWithLabel from './InputWithLabel'; 
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo, onToggleSortOrder, onChangeSortField, sortOrder }) {
  const [todoTitle, setTodoTitle] = useState("");
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
    <div className="addTodoForm">
      <form onSubmit={handleAddTodo}>
        <InputWithLabel
          id={inputId}
          value={todoTitle} 
          onChange={handleTitleChange}
        >
          Title
        </InputWithLabel>
        <button type="submit">Add</button>
      </form>
      <div className="button-container">
        <button className="button sort" onClick={onToggleSortOrder}>
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
        <button className="button sort" onClick={() => onChangeSortField('title')}>
          Sort by Title
        </button>
        <button className="button sort" onClick={() => onChangeSortField('createdTime')}>
          Sort by Created Time
        </button>
      </div>
    </div>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  onToggleSortOrder: PropTypes.func.isRequired,
  onChangeSortField: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

export default AddTodoForm;

