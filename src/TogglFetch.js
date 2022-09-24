export class TogglFetch {
    constructor(togglApiKey) {
        this.auth = btoa(togglApiKey + `:api_token`);
    }

    async fetchTimes(start, end) {
        const geturl = `https://api.track.toggl.com/api/v9/me/time_entries?start_date=${start}&end_date=${end}`;
        const resp = await fetch(geturl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${this.auth}`
            },
        });
        const json = await resp.json();
        return json;
    }

    async fetchProjects() {
        const geturl = `https://api.track.toggl.com/api/v9/me/projects`;
        const resp = await fetch(geturl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${this.auth}`
            },
        });
        const json = await resp.json();
        return json;
    }
}