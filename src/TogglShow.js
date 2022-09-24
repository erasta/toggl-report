import { useEffect, useState } from "react";
import { ProjectShow } from "./ProjectShow.js";
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

    const shownProjects = Array.from(new Set(timeEntries.map(x => x.project_id)));
    shownProjects.sort((a, b) => findProjectName(a).localeCompare(findProjectName(b)));

    return (
        <div style={{margin: 2}}>
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
        </div>
    )
}