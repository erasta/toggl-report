import { useEffect } from "react";

export const DateRange = ({ range, setRange }) => {
    const timesMonth = (monthOffset = 0) => {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth() + monthOffset;
        const start = new Date(Date.UTC(y, m, 1)).toISOString().substring(0, 10);
        const end = new Date(Date.UTC(y, m + 1, 1)).toISOString().substring(0, 10);
        return { start, end };
    }

    useEffect(() => {
        if (!range) setRange(timesMonth());
    })

    return (
        <>
            <button onClick={() => setRange(timesMonth())}>This month</button>
            <button onClick={() => setRange(timesMonth(-1))}>Prev month</button>
            {range ?
                <>
                    {range.start}
                    -
                    {range.end}
                </>
                : null
            }
        </>
    )
}