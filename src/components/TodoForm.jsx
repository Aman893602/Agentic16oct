import { useState } from 'react';
import Icon from './Icon.jsx';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    onAdd(trimmedText);
    setText('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <Icon name="plus" />
        <input
          type="text"
          className="input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a new task…"
          aria-label="New todo"
        />
      </div>
      <button type="submit" className="btn btn--primary btn--lg" disabled={!text.trim()}>
        Add task
      </button>
    </form>
  );
}

export default TodoForm;
