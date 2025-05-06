import React, { useState, useEffect } from 'react';
import API from '../api/api';

function TodoForm({ refresh, setRefresh, editTodo, setEditTodo }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
    } else {
      setTitle('');
    }
  }, [editTodo]);

  const handleSubmit = e => {
    e.preventDefault();

    if (editTodo) {
      API.put(`todos/${editTodo.id}/`, {
        title,
        completed: editTodo.completed
      }).then(() => {
        setTitle('');
        setEditTodo(null);
        setRefresh(!refresh);
      });
    } else {
      API.post('todos/', { title, completed: false }).then(() => {
        setTitle('');
        setRefresh(!refresh);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input 
        type="text"
        placeholder={editTodo ? "Edit todo" : "Add new todo"}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={styles.input}
      />
      <button 
        type="submit" 
        style={styles.submitButton}
      >
        {editTodo ? "Update" : "Add"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
  },
};

export default TodoForm;