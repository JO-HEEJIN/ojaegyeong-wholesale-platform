import React from 'react';
import './App.css';
import OjaegyeongPlatform from './components/OjaegyeongPlatform';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <Chatbot />
      <OjaegyeongPlatform />
    </div>
  );
}

export default App;
