import moment from "moment";
import 'moment-duration-format';
import { useState } from "react";
import { TableShow } from "./TableShow.js";
import { TogglFetch } from "./TogglFetch.js";

export const TogglShow = ({ togglApiKey }) => {
    const [timeEntries, setTimeEntries] = useState([]);
    const [projectNames, setProjectNames] = useState([]);

    const toggl = new TogglFetch(togglApiKey);

    const timesMonth = (monthOffset = 0) => {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth() + monthOffset;
        const start = new Date(Date.UTC(y, m, 1)).toISOString().substring(0, 10);
        const end = new Date(Date.UTC(y, m + 1, 1)).toISOString().substring(0, 10);
        return { start, end };
    }

    const run = async () => {
        const { start, end } = timesMonth();
        const {times, projects} = await toggl.getTimes(start, end);
        setProjectNames(projects);
        setTimeEntries(times);
    }

    const header = ['description', 'start_time', 'stop_time', 'duration_time'];
    const shownProjects = Array.from(new Set(timeEntries.map(x => x.project_id)));

    return (
        <div>
            <button onClick={() => run()}>Get Time Entries!</button>
            {shownProjects.map(project => {
                const times = timeEntries.filter(x => x.project_id === project);
                const allDiffs = times.map(row => moment(row.stop).diff(moment(row.start)));
                const totalTime = allDiffs.reduce((pv, cv) => pv + cv, 0);
                const projectName = projectNames.find(proj => proj.id === project).name;
                return (
                    <div key={project}>
                        <h4>{projectName}</h4>
                        total time: {moment.duration(totalTime).format('HH:mm:ss')}&nbsp;
                        as hours: {moment.duration(totalTime).asHours()}
                        <TableShow fields={header} rows={times}></TableShow>
                    </div>
                )
            })}
        </div>
    )
}