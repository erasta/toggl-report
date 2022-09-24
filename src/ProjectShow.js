import moment from "moment";
import 'moment-duration-format';
import { TableShow } from "./TableShow.js";

export const ProjectShow = ({project, projectName, times, header}) => {
    const allDiffs = times.map(row => moment(row.stop).diff(moment(row.start)));
    const totalTime = allDiffs.reduce((pv, cv) => pv + cv, 0);
    return (
        <div key={project}>
            <h4>{projectName}</h4>
            total time: {moment.duration(totalTime).format('HH:mm:ss')}&nbsp;
            as hours: {Math.round(moment.duration(totalTime).asHours() * 100) / 100}
            <TableShow fields={header} rows={times}></TableShow>
        </div>
    )
}