import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Dropdown from './Dropdown';

export type Priority = 'Low' | 'Medium' | 'High';
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
  createdAt: Date;
};

const FedstackInterview = () => {
  //  lazy initialization :
  // The function () => [] runs only once during the initial render

  // Benefits:

  // Performance Optimization: Avoids recreating the initial value unnecessarily

  // Heavy Computations: Useful if initial state requires complex calculations

  // Cleaner Code: Explicitly shows initial state is "static"

  const [todos, setTodos] = useState<Todo[] | any>(() => [
    {
      id: 1,
      title: 'Learn React Hooks',
      completed: false,
      priority: 'High' as Priority,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Complete practice project',
      completed: true,
      priority: 'Medium' as Priority,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const [todoState, setTodoState] = useState<'All' | 'Active' | 'Completed'>(
    'All'
  );

  const [todoPriorities, setTodoPriorities] = useState<
    'All Priorities' | 'Low' | 'Medium' | 'High'
  >('All Priorities');

  const [todoSort, setTodoSort] = useState<'Sort by date' | 'Sort by priority'>(
    'Sort by date'
  );

  const addTodo = (newTodo: Todo) => {
    setTodos((p) => [...p, newTodo]);
  };

  const toggleTodo = (id: number) => {
    const toggled = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(toggled);
  };

  const handleTodoState = (e) => {
    setTodoState(e.target.value);
  };

  // create a callback that filters todos based on their states

  const buildFilters = () => {
    const immutableTodos = [...todos];

    const filtered = immutableTodos.filter((todo) => !todo.completed);
    const filteredCompleteTodos = immutableTodos.filter(
      (todo) => todo.completed
    );
    console.log('filtered ==>', filtered);
    console.log('filteredCompleteTodos ==>', filteredCompleteTodos);
    if (todoState === 'All') return;
    if (todoState === 'Active') setTodos(filtered);
    if (todoState === 'Completed') setTodos(filteredCompleteTodos);
  };

  useEffect(() => {
    buildFilters();
  }, [todoState]);

  return (
    <div
      style={{
        border: '1px solid black',
        borderRadius: 12,
        padding: 12,
      }}
    >
      <Dropdown
        array={['All', 'Active', 'Completed']}
        onChange={handleTodoState}
      />
      <Dropdown
        array={['All Priorities', 'Low', 'Medium', 'High']}
        onChange={console.log}
      />
      <Dropdown
        array={['Sort by date', 'Sort by priority']}
        onChange={console.log}
      />
      {/* TodoForm component */}
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      {/* TodoStats */}
    </div>
  );
};

export default FedstackInterview;
