import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({
  items,
  setTodos,
  todos,
  setActiveCount,
  activeCount,
}) => {
  const changeStatus = (id) => {
    setTodos(todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    }));

    setActiveCount(items.find(item => item.id === id).completed
      ? activeCount + 1
      : activeCount - 1);
  };

  const changeAll = (value, todoItems) => {
    setTodos(todos.map((item) => {
      if (todoItems.includes(item)) {
        return {
          ...item,
          completed: value,
        };
      }

      return item;
    }));

    setActiveCount(value ? 0 : todos.length);
  };

  const removeItem = (id) => {
    setTodos(items.filter(item => item.id !== id));
    setActiveCount(items.find(item => item.id).completed
      ? activeCount
      : activeCount - 1);
  };

  const editTitle = (value, editId) => {
    setTodos(items.map((item) => {
      if (item.id === editId) {
        return { ...item, title: value };
      }

      return item;
    }));
  };

  return (
    <section className="main">
      {items.length !== 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            readOnly
            checked={activeCount === 0 && items.length}
            onChange={({ target }) => changeAll(target.checked, items)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list">
        {items.map(item => (
          <li key={item.id}>
            <input
              type="text"
              className="edit"
            />
          </li>
        ))}

        <TodoItem
          items={items}
          editTitle={editTitle}
          changeStatus={changeStatus}
          removeItem={removeItem}
        />
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  setActiveCount: PropTypes.func.isRequired,
  activeCount: PropTypes.number.isRequired,
};
