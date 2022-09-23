import { useState } from "react";

export const TogglShow = ({ togglApiKey }) => {
    const [timeEntries, setTimeEntries] = useState([]);
    const [projectNames, setProjectNames] = useState([]);

    const timesMonth = (monthOffset = 0) => {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth() + monthOffset;
        const start = new Date(Date.UTC(y, m, 1)).toISOString().substring(0, 10);
        const end = new Date(Date.UTC(y, m + 1, 1)).toISOString().substring(0, 10);
        return { start, end };
    }

    const auth = btoa(togglApiKey + `:api_token`);

    const fetchTimes = async (start, end) => {
        const geturl = `https://api.track.toggl.com/api/v9/me/time_entries?start_date=${start}&end_date=${end}`;
        const resp = await fetch(geturl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${auth}`
            },
        });
        const json = await resp.json();
        return json;
    }

    const fetchProjects = async () => {
        const geturl = `https://api.track.toggl.com/api/v9/me/projects`;
        const resp = await fetch(geturl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${auth}`
            },
        });
        const json = await resp.json();
        return json;
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
        const json = await fetchTimes(start, end);
        console.log(Object.keys(json[0]).join(','));
        console.log(Object.values(json[0]).join(','));
        const projectsJson = await fetchProjects();
        json.forEach(row => {
            row.projectName = projectsJson.find(proj => proj.id === row.project_id).name;
        })
        setProjectNames(projectsJson);
        setTimeEntries(json);
        console.log(jsonToCsv(json, false));
    }

    let header = timeEntries.length ? Object.keys(timeEntries[0]) : [];
    const fields = ['start', 'stop', 'description', 'duration'];
    if (fields) {
        header = header.filter(x => fields.includes(x));
    }

    const projects = Array.from(new Set(timeEntries.map(x => x.project_id)));

    return (
        <div>
            <button onClick={() => run()}>Get</button>
            {projects.map(project => {
                const times = timeEntries.filter(x => x.project_id === project);
                const projectName = projectNames.find(proj => proj.id === project).name;
                return (
                    <>
                        <h3>{projectName}</h3>
                        <table border={1} key={project}>
                            <thead>
                                <tr>
                                    {header.map(x => (
                                        <th key={x}>
                                            {x}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {times.map((row, i) => (
                                    <tr key={i}>
                                        {
                                            header.map(fieldName => (
                                                <td key={fieldName}>
                                                    {row[fieldName]}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )
            })}
        </div>
    )
}