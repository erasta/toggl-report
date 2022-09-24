import moment from "moment";
import 'moment-duration-format';
import useLocalStorage from "use-local-storage";
import { TableShow } from "./TableShow.js";

export const ProjectShow = ({ projectId, projectName, times, header }) => {
    const [emailAddress, setEmailAddress] = useLocalStorage("emailAddress" + projectId, "dest@email.addr");
    const [emailText, setEmailText] = useLocalStorage("emailText" + projectId, "Hello,\nAttached are my working hours");

    const allDiffs = times.map(row => moment(row.stop).diff(moment(row.start)));
    const totalTime = allDiffs.reduce((pv, cv) => pv + cv, 0);
    return (
        <div key={projectId} style={{ border: '2px solid grey', paddingBlockEnd: '1em', margin: 2 }}>
            <h4 style={{ marginBlockEnd: 0 }}>{projectName}</h4>
            total time: {moment.duration(totalTime).format('HH:mm:ss')}&nbsp;
            as hours: {Math.round(moment.duration(totalTime).asHours() * 100) / 100}
            <TableShow fields={header} rows={times}></TableShow>
            <br />
            <div>
                <input type="text"
                    value={emailAddress}
                    onChange={e => setEmailAddress(e.target.value)}
                ></input>
                <br />
                <textarea
                    value={emailText}
                    onChange={e => setEmailText(e.target.value)}
                    rows={3}
                    cols={40}
                ></textarea>
                <br />
                <button onClick={() => { }}>Send Mail</button>
            </div>
        </div>
    )
}