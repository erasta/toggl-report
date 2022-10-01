import { Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProjectShow } from "./ProjectShow.js";
import { TogglFetch } from "./TogglFetch.js";

const ShowError = () => (
    <>
        <Typography variant="body1" color={'paleturquoise'} align="center" marginTop={1}>
            Please supply a correct&nbsp;
            <Link href="https://toggl.com/app/profile">
                Toggl API key
            </Link>
        </Typography>
    </>
)

const ShowNothing = () => (
    <>
        <Typography variant="body1" color={'paleturquoise'} align="center" marginTop={1}>
            No time entries for this dates
        </Typography>
    </>
)

export const TogglShow = ({ togglApiKey, range }) => {
    const [timeEntries, setTimeEntries] = useState([]);
    const [projectNames, setProjectNames] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (range) {
            (async () => {
                const toggl = new TogglFetch(togglApiKey);
                const { times, projects, error } = await toggl.getTimes(range.start, range.end);
                setError(!!error);
                setProjectNames(projects);
                setTimeEntries(times);
            })()
        } else {
            setProjectNames([]);
            setTimeEntries([]);
        }
    }, [range, togglApiKey]);

    const findProjectName = (id) => projectNames.find(proj => proj.id === id).name;

    const shownProjects = Array.from(new Set(timeEntries.map(x => x.project_id)));
    shownProjects.sort((a, b) => findProjectName(a).localeCompare(findProjectName(b)));

    return (
        <>
            {error ? <ShowError></ShowError> : null}
            {(!error && !shownProjects.length) ? <ShowNothing></ShowNothing> : null}
            {shownProjects.map(project => {
                const times = timeEntries.filter(x => x.project_id === project);
                return (
                    <ProjectShow key={project}
                        projectId={project}
                        projectName={findProjectName(project)}
                        times={times}
                        range={range}
                    ></ProjectShow>
                )
            })}
        </>
    )
}