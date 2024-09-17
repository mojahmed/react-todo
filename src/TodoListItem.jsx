import styles from './TodoListItem.module.css';

export default function TodoListItem({ todo, onRemoveTodo }) {
    return (
      <li className={styles.ListItem}>
        {todo.title}
        <button type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button>
      </li>
    );
  }





