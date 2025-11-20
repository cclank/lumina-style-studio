import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h1>Test App</h1>
      <p>If you can see this, React is working!</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}