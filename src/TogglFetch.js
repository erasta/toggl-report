import axios from "axios";
import moment from "moment";
import 'moment-duration-format';
export class TogglFetch {
    constructor(togglApiKey) {
        this.auth = btoa(togglApiKey + `:api_token`);
        this.togglAxios = axios.create({
            baseURL: 'https://api.track.toggl.com/api/v9',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Basic ${this.auth}`
            },
        });
    }

    async fetchTimes(start, end) {
        const resp = await this.togglAxios.get('me/time_entries', { params: {
            start_date: start,
            end_date: end,
        } });
        return resp.data;
    }

    async fetchProjects() {
        const resp = await this.togglAxios.get('me/projects');
        return resp.data;
    }

    async getTimes(start, end) {
        const times = await this.fetchTimes(start, end);
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