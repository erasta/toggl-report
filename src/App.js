import logo from './logo.svg';
import './App.css';
import { TextKey } from './TextKey.js';
import { useState } from 'react';
import useLocalStorage from 'use-local-storage';

function App() {
  const [togglApiKey, setTogglApiKey] = useLocalStorage("togglApiKey", "");

  return (
    <div>
      <header className="App-header">
        <p>
          Toggl Reports
        </p>
      </header>
      <TextKey name="Toggl API key" value={togglApiKey} setValue={setTogglApiKey}></TextKey>
    </div>
  );
}

export default App;
