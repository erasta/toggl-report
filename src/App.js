import './App.css';
import { TextKey } from './TextKey.js';
import useLocalStorage from 'use-local-storage';
import { TogglShow } from './TogglShow.js';
import { DateRange } from './DateRange.js';
import { useState } from 'react';
import { Box, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [togglApiKey, setTogglApiKey] = useLocalStorage("togglApiKey", "");
    const [range, setRange] = useState();

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box>
                <Typography variant="h3" gutterBottom>
                    Toggl Reports
                </Typography>
                <TextKey name="Toggl API key" value={togglApiKey} setValue={setTogglApiKey}></TextKey>
                <DateRange range={range} setRange={setRange}></DateRange>
                <TogglShow togglApiKey={togglApiKey} range={range}></TogglShow>
            </Box>
        </ThemeProvider>
    );
}

export default App;
