
import TodoList from './TodoList'; // Import TodoList component
import AddTodoForm from './AddTodoForm'; // Import AddTodoForm component
import './App.css';

const  App = () =>
   (
    <div className="app-container">
    <h1>Todo List</h1>
    <div className="center-container">
      <AddTodoForm /> {/* Use AddTodoForm component */}
      <TodoList /> {/* Use TodoList component */}
    </div>
  </div>
  );


export default App;
