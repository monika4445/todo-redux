import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './todoSlice';

export default function TodoList() {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text !== '') {
      dispatch(addTodo({
        id: Date.now(),
        text,
      }));
      setText('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = () => {
    dispatch(editTodo({
      id: editId,
      text,
    }));
    setText('');
    setEditing(false);
    setEditId(null);
  };

  const handleCancelEdit = () => {
    setText('');
    setEditing(false);
    setEditId(null);
  };

  return (
    <div>
    <h2>Todo List</h2>
    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    {editing ? (
    <div>
    <button onClick={handleEditTodo}>Save</button>
    <button onClick={handleCancelEdit}>Cancel</button>
    </div>
    ) : (
    <button onClick={handleAddTodo}>Add</button>
    )}
    <ul>
    {todos.map(todo => (
    <li key={todo.id}>
    {todo.text}
    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
    <button onClick={() => {
    setText(todo.text);
    setEditing(true);
    setEditId(todo.id);
    }}>Edit</button>
    </li>
    ))}
    </ul>
    </div>
    );
}  
    
    
    
