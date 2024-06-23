const todoList = [
  { id: 1, title: "Complete assignment", Time:"3pm" },
  { id: 2, title: "Go grocery shopping", Time:"5pm" },
  { id: 3, title: "Eat my meal", Time:"7pm" }
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {/* mapping over todoList array */}
        {todoList.map((item) => (
          <li key={item.id}>{item.title} at {item.Time}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
