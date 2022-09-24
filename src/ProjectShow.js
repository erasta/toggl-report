import moment from "moment";
import 'moment-duration-format';
import { EmailCsv } from "./EmailCsv.js";
import { TableShow } from "./TableShow.js";

export const ProjectShow = ({ projectId, projectName, times }) => {
    const header = ['description', 'start_time', 'stop_time', 'duration_time', 'hours_number'];
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
            header.join(','), // header row first
            ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ];
        return csvLines;
    }

    const makeCsv = () => {
        const lines = [];
        // lines.push(`Working hours for,${projectName}`);
        // lines.push(``);
        lines.push(...jsonToCsvLines(times, header));
        lines.push(``);
        lines.push(`total time:,,,${totalTimeForm},${totalTimeHours}`);
        const csv = lines.join('\n');
        return csv;
    }

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        element.href = URL.createObjectURL(new Blob([makeCsv()], {type: 'text/plain'}));
        element.download = `${projectName}.csv`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }

    return (
        <div key={projectId} style={{ border: '2px solid grey', paddingBlockEnd: '1em', margin: 2 }}>
            <h4 style={{ marginBlockEnd: 0 }}>{projectName}</h4>
            total time: {totalTimeForm}&nbsp;
            as hours: {totalTimeHours}
            <TableShow fields={header} rows={times}></TableShow>
            <br />
            <button onClick={downloadTxtFile}>Download CSV</button>

            {/* <EmailCsv projectId={projectId} projectName={projectName} header={header} times={times} totalTime={totalTime}></EmailCsv> */}
        </div>
    )
}