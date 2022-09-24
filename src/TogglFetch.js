import moment from "moment";
import 'moment-duration-format';
export class TogglFetch {
    constructor(togglApiKey) {
        this.auth = btoa(togglApiKey + `:api_token`);
        this.getparams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${this.auth}`
            }
        };
    }

    async fetchTimes(start, end) {
        const geturl = `https://api.track.toggl.com/api/v9/me/time_entries?start_date=${start}&end_date=${end}`;
        const resp = await fetch(geturl, this.getparams);
        const json = await resp.json();
        return json;
    }

    async fetchProjects() {
        const geturl = `https://api.track.toggl.com/api/v9/me/projects`;
        const resp = await fetch(geturl, this.getparams);
        const json = await resp.json();
        return json;
    }

    async getTimes(start, end) {
        const times = await this.fetchTimes(start, end);
        // console.log(Object.keys(json[0]).join(','));
        // console.log(Object.values(json[0]).join(','));
        const projects = await this.fetchProjects();
        times.forEach(row => {
            row.projectName = projects.find(proj => proj.id === row.project_id).name;
            row.start_time = moment(row.start).format('YYYY.MM.DD HH:mm:ss');
            row.stop_time = moment(row.stop).format('YYYY.MM.DD HH:mm:ss');
            row.duration_time = moment.utc(moment(row.stop).diff(moment(row.start))).format('HH:mm:ss');
        })
        return { times, projects };
    }

    static jsonToCsv(items, fields) {
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
}