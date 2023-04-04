import { useState, useReducer } from 'react';

const todosReducer = (state, action) => {
  const { title, index } = action.payload;

  switch (action.type) {
    case 'ADD_TODO':
      return [...state, title];
    case 'REMOVE_TODO':
      const newState = [...state];
      newState.splice(index, 1);

      return newState;
  }
};

const TodoList = () => {
  const [input, setInput] = useState('');
  const [todos, dispatch] = useReducer(todosReducer, []);

  const handleOnInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddTodo = () => {
    if (input === '') {
      alert('Please provide a todo');
      return;
    }

    dispatch({
      type: 'ADD_TODO',
      payload: {
        title: input
      }
    });
    setInput('');
  };

  const handleRemoveTodo = (index) => {
    dispatch({
      type: 'REMOVE_TODO',
      payload: {
        index: index
      }
    });
  };

  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo}</span>
            <button
              onClick={() => {
                handleRemoveTodo(index);
              }}
            >
              Remove todo
            </button>
          </li>
        ))}
      </ul>

      <input
        type='text'
        name='todo'
        value={input}
        onChange={handleOnInputChange}
      />
      <button onClick={handleAddTodo}>Add todo</button>
    </div>
  );
};

export default TodoList;
