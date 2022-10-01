import './App.css';
import { TextKey } from './TextKey.js';
import useLocalStorage from 'use-local-storage';
import { TogglShow } from './TogglShow.js';
import { DateRange } from './DateRange.js';
import { useState } from 'react';
import { Box, createTheme, CssBaseline, Link, ThemeProvider, Typography } from '@mui/material';

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
                <Box>
                    <TogglShow togglApiKey={togglApiKey} range={range}></TogglShow>
                </Box>
            </Box>
            <footer>
                <Box left={0} right={0}>
                    <Typography variant='body2' align='center'>
                        This app is not Affiliated with Toggl. Your data is used only locally.<br />
                        <Link href="https://github.com/erasta/toggl-report">Source code on github</Link>&nbsp;&copy;2022
                    </Typography>
                </Box>
            </footer>
        </ThemeProvider>
    );
}

export default App;
