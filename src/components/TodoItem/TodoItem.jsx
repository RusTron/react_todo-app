import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ items, editTitle, changeStatus, removeItem }) => {
  const [editId, setEditId] = useState(0);
  const [editedTitle, setEditedTitle] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    if (!event.target.value) {
      return removeItem(editId);
    }

    if (event.key === 'Enter' || event.type === 'blur') {
      editTitle(editedTitle, editId);

      return setEditId(0);
    }

    return setEditId(0);
  };

  return (
    <>
      {items.map(item => (
        <li
          key={item.id}
          className={classNames({
            editing: editId === item.id,
            completed: item.completed,
          })}
        >
          {item.id !== editId && (
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={item.completed}
                onChange={() => changeStatus(item.id)}
              />
              <label
                onDoubleClick={() => {
                  setEditId(item.id);
                  setEditedTitle(item.title);
                }}
              >
                {item.title}
              </label>
              <button
                type="button"
                className="destroy"
                onClick={() => removeItem(item.id)}
              />
            </div>
          )}
          {item.id === editId && (
            <input
              type="text"
              className="edit"
              autoFocus
              value={editedTitle}
              onChange={({ target }) => setEditedTitle(target.value.trimLeft())}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Escape') {
                  handleClick(event);
                }
              }
              }
              onBlur={handleClick}
            />
          )}
        </li>
      ))}
    </>
  );
};

TodoItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  editTitle: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
