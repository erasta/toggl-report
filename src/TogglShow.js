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

    const jsonToCsv = (items, fields) => {
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        let header = Object.keys(items[0]);
        if (fields) {
            header = header.filter(x => fields.includes(x));
        }
        const csv = [
            header.join(','), // header row first
            ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\n');
        return csv;
    }

    const run = async () => {
        const { start, end } = timesMonth();
        const json = await toggl.fetchTimes(start, end);
        console.log(Object.keys(json[0]).join(','));
        console.log(Object.values(json[0]).join(','));
        const projectsJson = await toggl.fetchProjects();
        json.forEach(row => {
            row.projectName = projectsJson.find(proj => proj.id === row.project_id).name;
            row.start_time = moment(row.start).format('YYYY.MM.DD HH:mm:ss');
            row.stop_time = moment(row.stop).format('YYYY.MM.DD HH:mm:ss');
            row.duration_time = moment.utc(moment(row.stop).diff(moment(row.start))).format('HH:mm:ss');
        })
        setProjectNames(projectsJson);
        setTimeEntries(json);
        console.log(jsonToCsv(json, false));
    }

    // let header = timeEntries.length ? Object.keys(timeEntries[0]) : [];
    const header = ['description', 'start_time', 'stop_time', 'duration_time'];
    // if (fields) {
    //     header = header.filter(x => fields.includes(x));
    // }

    const projects = Array.from(new Set(timeEntries.map(x => x.project_id)));

    return (
        <div>
            <button onClick={() => run()}>Get Time Entries!</button>
            {projects.map(project => {
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