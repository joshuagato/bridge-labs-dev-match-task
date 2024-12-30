import React from 'react';
import { SearchBox } from './components/SearchBox';
import { countries } from './data';
// import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <SearchBox suggestions={countries} />
      <p>Press Ctrl/Cmd + K to open search</p>
    </div>
  );
}

export default App;