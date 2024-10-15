

import PropTypes from 'prop-types';


export default function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className="ListItem">
      <div>
        <h3>{todo.title}</h3>
        <p>{new Date(todo.createdTime).toLocaleString()}</p>
      </div>
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdTime: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

