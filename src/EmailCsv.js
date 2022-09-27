import useLocalStorage from "use-local-storage";

export const EmailCsv = ({ projectId, projectName, times, header, totalTime }) => {
    const [emailAddress, setEmailAddress] = useLocalStorage("emailAddress" + projectId, "dest@email.addr");
    const [emailText, setEmailText] = useLocalStorage("emailText" + projectId, "Hello,\nAttached are my working hours");

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
                // console.log(makeCsv());
            }}>Send Mail</button>
        </div>
    )
}