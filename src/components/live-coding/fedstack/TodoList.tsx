import React from 'react';
import { Todo } from '.';

const TodoList = ({
  todos,
  toggleTodo,
}: {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}) => {
  return (
    <div>
      {todos.map((elem) => {
        return (
          <div
            style={{
              border: '1px solid black',
              padding: 10,
              borderRadius: 12,
              margin: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: elem.completed ? 'gray' : '',
              color: elem.completed ? 'black' : '',
            }}
          >
            <input
              type="checkbox"
              // value={elem.completed}
              checked={elem.completed}
              onChange={(e) => {
                console.log(e.target.value);
                toggleTodo(elem.id);
              }}
            />
            <h2>{elem.title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
