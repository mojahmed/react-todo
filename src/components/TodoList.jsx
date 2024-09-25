
import styles from './TodoList.module.css';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

// const todoList = [
//     { id: 1, title: "Complete assignment"},
//     { id: 2, title: "Go grocery shopping" },
//     { id: 3, title: "Eat my meal"}
// ];

const TodoList = ({todoList,  onRemoveTodo}) => (
    <div className={styles.todoList}>
    <ul>
         {todoList.map((todo) => (
            <TodoListItem key={todo.id} todo={todo}  onRemoveTodo={onRemoveTodo} />
        ))}
    </ul>
    </div>
);
TodoList.prototypes ={
    onRemoveTodo: PropTypes.func.isRequired,
};



export default TodoList;
