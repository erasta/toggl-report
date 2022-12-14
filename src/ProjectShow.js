import { Button, Paper, Typography } from "@mui/material";
import moment from "moment";
import 'moment-duration-format';
import { FieldNameShow, TableShow } from "./TableShow.js";

export const ProjectShow = ({ projectId, projectName, times, range }) => {
    const header = ['description', 'start_time', 'stop_time', 'duration_time', 'duration_hours'];
    const allDiffs = times.map(row => moment(row.stop).diff(moment(row.start)));
    const totalTime = allDiffs.reduce((pv, cv) => pv + cv, 0);
    const totalTimeForm = moment.duration(totalTime).format('HH:mm:ss');
    const totalTimeHours = Math.round(moment.duration(totalTime).asHours() * 100) / 100;

    const jsonToCsvLines = (items, fields) => {
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        let header = Object.keys(items[0]);
        if (fields) {
            header = header.filter(x => fields.includes(x));
        }
        const csvLines = [
            header.map(FieldNameShow).join(','), // header row first
            ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ];
        return csvLines;
    }

    const makeCsv = () => {
        const lines = [];
        lines.push(...jsonToCsvLines(times, header));
        lines.push(``);
        lines.push(`total time:,,,${totalTimeForm},${totalTimeHours}`);
        const csv = lines.join('\n');
        return csv;
    }

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        element.href = URL.createObjectURL(new Blob([makeCsv()], { type: 'text/plain' }));
        element.download = `${projectName}_${range.start}-${range.end}.csv`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    return (
        <Paper key={projectId} elevation={3} sx={{ margin: '10px' }}>
            <Typography variant="h5">{projectName}</Typography>
            total time: {totalTimeForm}&nbsp;
            as hours: {totalTimeHours}
            <TableShow fields={header} rows={times}></TableShow>
            <Button variant="contained" onClick={downloadTxtFile}>Download CSV</Button>
            <hr />
            {/* <EmailCsv projectId={projectId} projectName={projectName} header={header} times={times} totalTime={totalTime}></EmailCsv> */}
        </Paper>
    )
}