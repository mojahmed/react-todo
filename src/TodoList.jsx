

import TodoListItem from './TodoListItem';

const todoList = [
    { id: 1, title: "Complete assignment", Time: "3pm" },
    { id: 2, title: "Go grocery shopping", Time: "5pm" },
    { id: 3, title: "Eat my meal", Time: "7pm" }
];

const TodoList = () => (
    <ul>
        {todoList.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
        ))}
    </ul>
);

export default TodoList;
