import moment from "moment";
import 'moment-duration-format';
import { useEffect, useState } from "react";
import { TableShow } from "./TableShow.js";
import { TogglFetch } from "./TogglFetch.js";

export const TogglShow = ({ togglApiKey, range }) => {
    const [timeEntries, setTimeEntries] = useState([]);
    const [projectNames, setProjectNames] = useState([]);

    useEffect(() => {
        if (range) {
            (async () => {
                const toggl = new TogglFetch(togglApiKey);
                const { times, projects } = await toggl.getTimes(range.start, range.end);
                setProjectNames(projects);
                setTimeEntries(times);
            })()
        } else {
            setProjectNames([]);
            setTimeEntries([]);
        }
    }, [range, togglApiKey]);

    const findProjectName = (id) => projectNames.find(proj => proj.id === id).name;

    const header = ['description', 'start_time', 'stop_time', 'duration_time'];
    const shownProjects = Array.from(new Set(timeEntries.map(x => x.project_id)));
    shownProjects.sort((a, b) => findProjectName( a).localeCompare(findProjectName(b)));

    return (
        <div>
            {shownProjects.map(project => {
                const times = timeEntries.filter(x => x.project_id === project);
                const allDiffs = times.map(row => moment(row.stop).diff(moment(row.start)));
                const totalTime = allDiffs.reduce((pv, cv) => pv + cv, 0);
                return (
                    <div key={project}>
                        <h4>{findProjectName(project)}</h4>
                        total time: {moment.duration(totalTime).format('HH:mm:ss')}&nbsp;
                        as hours: {moment.duration(totalTime).asHours()}
                        <TableShow fields={header} rows={times}></TableShow>
                    </div>
                )
            })}
        </div>
    )
}