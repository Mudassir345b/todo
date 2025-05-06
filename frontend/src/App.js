import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>React + Django To-Do App</h1>
      <TodoForm refresh={refresh} setRefresh={setRefresh} />
      <TodoList refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
}

export default App;
