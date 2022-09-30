import axios from "axios";
import moment from "moment";
import 'moment-duration-format';
export class TogglFetch {
    constructor(togglApiKey) {
        this.auth = btoa(togglApiKey + `:api_token`);
        this.instance = axios.create({
            baseURL: 'https://api.track.toggl.com/api/v9',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Basic ${this.auth}`
            },
        });
        // this.getparams = {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     }
        // };
    }

    async fetchTimes(start, end) {
        const resp = await this.instance.get('me/time_entries', { params: {
            start_date: start,
            end_date: end,
        } });
        // const geturl = `https://api.track.toggl.com/api/v9/me/time_entries?start_date=${start}&end_date=${end}`;
        // const resp = await axios.get(geturl, {}, this.getparams.headers);
        const json = await resp.data;
        return json;
    }

    async fetchProjects() {
        const resp = await this.instance.get('me/projects');
        // const geturl = `https://api.track.toggl.com/api/v9/me/projects`;
        // const resp = await axios.get(geturl, {}, this.getparams.headers);
        const json = await resp.data;
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
            const duration = moment.duration(moment(row.stop).diff(moment(row.start)));
            row.duration_time = duration.format('HH:mm:ss');
            row.duration_hours = Math.round(duration.asHours() * 100) / 100;
        })
        return { times, projects };
    }
}