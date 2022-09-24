export const TableShow = ({ fields, rows }) => {
    return (
        <table border={1}>
            <thead>
                <tr>
                    {fields.map(x => (
                        <th key={x}>
                            {x}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                        {
                            fields.map(fieldName => (
                                <td key={fieldName}>
                                    {row[fieldName]}
                                </td>
                            ))
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}