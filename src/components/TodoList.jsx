import Icon from './Icon.jsx';
import TodoItem from './TodoItem.jsx';

const EMPTY_STATES = {
  all: { icon: 'sparkles', title: 'No tasks yet', text: 'Add your first task above to get started.' },
  active: { icon: 'checkCircle', title: 'All caught up!', text: 'You have no active tasks right now.' },
  completed: { icon: 'listChecks', title: 'Nothing completed yet', text: 'Tasks you complete will show up here.' },
};

function TodoList({ todos, filter, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    const emptyState = EMPTY_STATES[filter];
    return (
      <div className="empty-state">
        <span className="empty-state__icon">
          <Icon name={emptyState.icon} size={26} />
        </span>
        <h3>{emptyState.title}</h3>
        <p>{emptyState.text}</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TodoList;
