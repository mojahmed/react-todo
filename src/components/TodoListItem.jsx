import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';

export default function TodoListItem({ todo, onRemoveTodo }) {
    return (
      <li className={styles.ListItem}>
        {todo.title}
        <button type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button>
      </li>
    );
  }
  TodoListItem.prototypes ={
    onRemoveTodo: PropTypes.func.isRequired,
  }





