import './App.css';
import { TextKey } from './TextKey.js';
import useLocalStorage from 'use-local-storage';
import { TogglShow } from './TogglShow.js';
import { DateRange } from './DateRange.js';
import { useState } from 'react';

function App() {
  const [togglApiKey, setTogglApiKey] = useLocalStorage("togglApiKey", "");
  const [range, setRange] = useState();

  return (
    <div>
      <h1>
        Toggl Reports
      </h1>
      <p style={{ textAlign: 'right' }}>
        <TextKey name="Toggl API key" value={togglApiKey} setValue={setTogglApiKey}></TextKey>
      </p>
      <DateRange range={range} setRange={setRange}></DateRange>
      <TogglShow togglApiKey={togglApiKey} range={range}></TogglShow>
    </div>
  );
}

export default App;
