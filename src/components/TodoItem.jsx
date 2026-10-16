import Icon from './Icon.jsx';

function formatCreatedAt(timestamp) {
  const date = new Date(timestamp);
  const isToday = date.toDateString() === new Date().toDateString();
  if (isToday) {
    return `today at ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo ${todo.completed ? 'todo--done' : ''}`}>
      <label className="todo__main">
        <span className="checkbox-wrap">
          <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
          <span className="checkbox" aria-hidden="true">
            <Icon name="check" size={14} />
          </span>
        </span>
        <span className="todo__body">
          <span className="todo__text">{todo.text}</span>
          {todo.createdAt && <span className="todo__meta">Added {formatCreatedAt(todo.createdAt)}</span>}
        </span>
      </label>

      <button
        type="button"
        className="icon-btn icon-btn--danger todo__delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        <Icon name="trash" />
      </button>
    </li>
  );
}

export default TodoItem;
