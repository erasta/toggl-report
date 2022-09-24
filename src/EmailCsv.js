import moment from "moment";
import 'moment-duration-format';
import useLocalStorage from "use-local-storage";

export const EmailCsv = ({ projectId, projectName, times, header, totalTime }) => {
    const [emailAddress, setEmailAddress] = useLocalStorage("emailAddress" + projectId, "dest@email.addr");
    const [emailText, setEmailText] = useLocalStorage("emailText" + projectId, "Hello,\nAttached are my working hours");

    const jsonToCsvLines = (items, fields) => {
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        let header = Object.keys(items[0]);
        if (fields) {
            header = header.filter(x => fields.includes(x));
        }
        const csvLines = [
            header.join(','), // header row first
            ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ];
        return csvLines;
    }

    const makeCsv = () => {
        const lines = [];
        lines.push(`Working hours for,${projectName}`);
        lines.push(``);
        lines.push(...jsonToCsvLines(times, header));
        lines.push(``);
        lines.push(`total time:,${moment.duration(totalTime).format('HH:mm:ss')}`);
        lines.push(`number of hours:,${Math.round(moment.duration(totalTime).asHours() * 100) / 100}`);
        const csv = lines.join('\n');
        return csv;
    }

    return (
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
            <button onClick={() => {
                console.log(makeCsv());
            }}>Send Mail</button>
        </div>
    )
}