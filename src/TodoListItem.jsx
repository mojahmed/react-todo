

// TodoListItem.jsx


const TodoListItem = (props) => {
    return (
        <li>
            <div>Title: {props.todo.title}</div>
            <div>Time: {props.todo.Time}</div>
        </li>
    );
}
export default TodoListItem;



