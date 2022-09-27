import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

export const DateRange = ({ range, setRange }) => {
    const timesMonth = (monthOffset = 0) => {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth() + monthOffset;
        const start = new Date(Date.UTC(y, m, 1)).toISOString().substring(0, 10);
        const end = new Date(Date.UTC(y, m + 1, 1)).toISOString().substring(0, 10);
        return { start, end };
    }

    useEffect(() => {
        if (!range) setRange(timesMonth());
    })

    return (
        <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" spacing={1}>
            <Grid item>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button style={{ textTransform: 'none' }} onClick={() => setRange(timesMonth())}>This month</Button>
                    <Button style={{ textTransform: 'none' }} onClick={() => setRange(timesMonth(-1))}>Prev month</Button>
                </ButtonGroup>
            </Grid>
            {range ?
                <Grid item>
                    <Typography variant="body1" gutterBottom>
                        {range.start}
                        &nbsp;-&nbsp;
                        {range.end}
                    </Typography>
                </Grid>
                : null
            }
        </Grid>
    )
}