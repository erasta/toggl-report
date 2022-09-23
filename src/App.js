import './App.css';
import { TextKey } from './TextKey.js';
import useLocalStorage from 'use-local-storage';
import { TogglShow } from './TogglShow.js';

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
      <TogglShow togglApiKey={togglApiKey}></TogglShow>
    </div>
  );
}

export default App;
