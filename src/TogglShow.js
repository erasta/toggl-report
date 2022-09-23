import { useState } from "react";

export const TogglShow = ({ togglApiKey }) => {
    const [timeEntries, setTimeEntries] = useState([]);

    const timesMonth = (monthOffset = 0) => {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth() + monthOffset;
        const start = new Date(Date.UTC(y, m, 1)).toISOString().substring(0, 10);
        const end = new Date(Date.UTC(y, m + 1, 1)).toISOString().substring(0, 10);
        return { start, end };
    }

    const fetchTimes = async (start, end) => {
        const auth = btoa(togglApiKey + `:api_token`);
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
        setTimeEntries(json);
        const fields = ['start', 'stop', 'description', 'duration'];
        console.log(jsonToCsv(json, fields));
    }

    let header = timeEntries.length ? Object.keys(timeEntries[0]) : [];
    // if (fields) {
    //     header = header.filter(x => fields.includes(x));
    // }

    return (
        <div>
            <button onClick={() => run()}>Get</button>
            {timeEntries.length ?
                <table border={1}>
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
                        {timeEntries.map((row, i) => (
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
                : null}
        </div>
    )
}