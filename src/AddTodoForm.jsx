
// import React from 'react';

function AddTodoForm(props) {
  function handleAddTodo(event) {
    event.preventDefault();
    const todoTitle = event.target;
    const input = todoTitle.querySelector("input");
    const inputValue = input.value;
     console.log(inputValue);
     props.onAddTodo(inputValue);
    //  to clear the input 
     todoTitle.reset();
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input name="title" type="text" id="todoTitle" />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
