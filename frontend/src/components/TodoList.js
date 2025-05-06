import React, { useEffect, useState } from 'react';
import API from '../api/api';

function TodoList({ refresh, setRefresh }) {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    API.get('todos/')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, [refresh]);

  const toggleComplete = (todo) => {
    API.put(`todos/${todo.id}/`, { ...todo, completed: !todo.completed })
      .then(() => setRefresh(!refresh));
  };

  const deleteTodo = (id) => {
    API.delete(`todos/${id}/`)
      .then(() => setRefresh(!refresh));
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditedTitle(todo.title);
  };

  const saveEdit = (id) => {
    API.put(`todos/${id}/`, { ...todos.find(t => t.id === id), title: editedTitle })
      .then(() => {
        setEditingTodo(null);
        setEditedTitle('');
        setRefresh(!refresh);
      });
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditedTitle('');
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
          
          * {
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }
          
          button {
            transition: all 0.2s ease;
          }
          
          button:hover {
            transform: translateY(-1px);
          }
        `}
      </style>
      <h2 style={styles.header}>Todo List</h2>
      <ul style={styles.list}>
        {todos.map(todo => (
          <li key={todo.id} style={styles.listItem}>
            {editingTodo === todo.id ? (
              <div style={styles.editContainer}>
                <input 
                  type="text" 
                  value={editedTitle}
                  onChange={e => setEditedTitle(e.target.value)}
                  style={styles.editInput}
                />
                <button 
                  onClick={() => saveEdit(todo.id)}
                  style={{...styles.button, ...styles.saveButton}}
                >
                  Save
                </button>
                <button 
                  onClick={cancelEdit}
                  style={{...styles.button, ...styles.cancelButton}}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div style={styles.todoContainer}>
                <span 
                  onClick={() => toggleComplete(todo)}
                  style={{ 
                    ...styles.todoText,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#333',
                  }}
                >
                  {todo.title}
                </span>
                <div style={styles.buttonGroup}>
                  <button 
                    onClick={() => startEditing(todo)}
                    style={{...styles.button, ...styles.editButton}}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    style={{...styles.button, ...styles.deleteButton}}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '600',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: '10px',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  todoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    flex: '1',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
  },
  editContainer: {
    display: 'flex',
    gap: '8px',
  },
  editInput: {
    flex: '1',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
  },
};

export default TodoList;