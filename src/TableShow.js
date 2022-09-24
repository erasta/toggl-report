export const FieldNameShow = (fieldName) => {
    return fieldName.toLowerCase().replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace('-', ' ').replace('_', ' ')
    ).replace(/(^[a-z])/g, group => group.toUpperCase());
}

export const TableShow = ({ fields, rows }) => {
    return (
        <table border={1}>
            <thead>
                <tr>
                    {fields.map(x => (
                        <th key={x}>
                            {FieldNameShow(x)}
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