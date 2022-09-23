export const TogglShow = ({ togglApiKey }) => {

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

    const run = async () => {
        const { start, end } = timesMonth();
        const json = await fetchTimes(start, end);
        console.log(JSON.stringify(json, null, 2));
    }

    return (
        <>
            <button onClick={() => run()}>Get</button>
        </>
    )
}