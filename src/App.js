import React, { useState, useEffect, useCallback } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

const filters = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

const { active, completed } = filters;

function App() {
  const [todos, setTodos] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [title, setTitle] = useState('');
  const [isSelected, setIsSelected] = useState(filters.all);

  useEffect(() => {
    if (localStorage.todos) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
      setActiveCount(JSON.parse(localStorage.getItem('count')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('count', JSON.stringify(activeCount));
  }, [todos, activeCount]);

  const filteredTodos = useCallback((selected = isSelected) => {
    if (selected === active) {
      return todos.filter(todo => !todo.completed && todo.title);
    }

    if (selected === completed) {
      return todos.filter(todo => todo.completed && todo.title);
    }

    return todos.filter(todo => todo.title);
  }, [todos, isSelected]);

  const addTodo = () => {
    const todo = {
      title,
      id: +new Date(),
      completed: false,
    };

    if (!todo.title) {
      return;
    }

    setTodos([...todos, todo]);
    setTitle('');
    setActiveCount(activeCount + 1);
  };

  const clearComleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>TodoS</h1>

        <form onSubmit={addTodo}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={({ target }) => setTitle(target.value.trimLeft())}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                addTodo();
              }
            }}
          />
        </form>
      </header>
      <TodoList
        items={filteredTodos(isSelected)}
        setTodos={setTodos}
        todos={todos}
        setActiveCount={setActiveCount}
        activeCount={activeCount}
      />
      {todos.length !== 0 && (
        <footer className="footer">
          <span className="todo-count">
            {activeCount === 1 ? `1 item left` : `${activeCount} items left`}
          </span>

          <TodoFilter
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            filteredTodos={filteredTodos}
            filters={filters}
          />
          {activeCount !== todos.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearComleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
}

export default App;
