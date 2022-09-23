import './App.css';
import { TextKey } from './TextKey.js';
import useLocalStorage from 'use-local-storage';
import { TogglShow } from './TogglShow.js';

function App() {
  const [togglApiKey, setTogglApiKey] = useLocalStorage("togglApiKey", "");

  return (
    <div>
      <h1>
        Toggl Reports
      </h1>
      <p style={{ textAlign: 'right' }}>
        <TextKey name="Toggl API key" value={togglApiKey} setValue={setTogglApiKey}></TextKey>
      </p>
      <TogglShow togglApiKey={togglApiKey}></TogglShow>
    </div>
  );
}

export default App;
