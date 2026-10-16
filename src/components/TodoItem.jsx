import { useRef, useState } from 'react';
import Icon from './Icon.jsx';

function formatCreatedAt(timestamp) {
  const date = new Date(timestamp);
  const isToday = date.toDateString() === new Date().toDateString();
  if (isToday) {
    return `today at ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  // Pressing Enter/Escape closes the input, which can also fire a blur event.
  // This flag makes sure editing is only finished once.
  const hasFinishedRef = useRef(false);

  function startEditing() {
    hasFinishedRef.current = false;
    setDraft(todo.text);
    setIsEditing(true);
  }

  function finishEditing(shouldSave) {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    const trimmedDraft = draft.trim();
    // An empty edit keeps the original text instead of saving a blank task.
    if (shouldSave && trimmedDraft && trimmedDraft !== todo.text) {
      onEdit(todo.id, trimmedDraft);
    }
    setIsEditing(false);
  }

  function handleEditKeyDown(event) {
    if (event.key === 'Enter') finishEditing(true);
    if (event.key === 'Escape') finishEditing(false);
  }

  return (
    <li className={`todo ${todo.completed ? 'todo--done' : ''} ${isEditing ? 'todo--editing' : ''}`}>
      <label className="checkbox-wrap">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'active' : 'completed'}`}
        />
        <span className="checkbox" aria-hidden="true">
          <Icon name="check" size={14} />
        </span>
      </label>

      {isEditing ? (
        <input
          type="text"
          className="todo__edit-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleEditKeyDown}
          onBlur={() => finishEditing(true)}
          aria-label={`Edit "${todo.text}"`}
          autoFocus
        />
      ) : (
        <div className="todo__body" onDoubleClick={startEditing} title="Double-click to edit">
          <span className="todo__text">{todo.text}</span>
          {todo.createdAt && <span className="todo__meta">Added {formatCreatedAt(todo.createdAt)}</span>}
        </div>
      )}

      {!isEditing && (
        <div className="todo__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={startEditing}
            aria-label={`Edit task "${todo.text}"`}
          >
            <Icon name="pencil" />
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete "${todo.text}"`}
          >
            <Icon name="trash" />
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
