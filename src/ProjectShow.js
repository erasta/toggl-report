import moment from "moment";
import 'moment-duration-format';
import { EmailCsv } from "./EmailCsv.js";
import { TableShow } from "./TableShow.js";

export const ProjectShow = ({ projectId, projectName, times }) => {
    const header = ['description', 'start_time', 'stop_time', 'duration_time'];
    const allDiffs = times.map(row => moment(row.stop).diff(moment(row.start)));
    const totalTime = allDiffs.reduce((pv, cv) => pv + cv, 0);
    return (
        <div key={projectId} style={{ border: '2px solid grey', paddingBlockEnd: '1em', margin: 2 }}>
            <h4 style={{ marginBlockEnd: 0 }}>{projectName}</h4>
            total time: {moment.duration(totalTime).format('HH:mm:ss')}&nbsp;
            as hours: {Math.round(moment.duration(totalTime).asHours() * 100) / 100}
            <TableShow fields={header} rows={times}></TableShow>
            <br />
            <EmailCsv projectId={projectId} projectName={projectName} header={header} times={times} totalTime={totalTime}></EmailCsv>
        </div>
    )
}