import React, { useState } from 'react';
import { Priority, Todo } from '.';
import Dropdown from './Dropdown';

const TodoForm = ({ addTodo }: { addTodo: (newTodo: Todo) => void }) => {
  const [priority, setPriority] = useState<Priority>('Low');
  const [title, setTitle] = useState('');

  const handleSelectPriority = (e) => {
    setPriority(e.target.value);
  };

  const data = {
    id: Math.random() * 0.5,
    title,
    completed: false,
    priority,
    createdAt: new Date(),
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(data);
      }}
    >
      {priority}
      <input onChange={(e) => setTitle(e.target.value)} />

      <Dropdown
        onChange={handleSelectPriority}
        array={['Low', 'Medium', 'High']}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
