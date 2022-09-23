export const TextKey = ({ name, value, setValue }) => {
    return (
        <>
            <label htmlFor="api_key">{name}:</label>
            <input type="password" id="api_key" name="api_key" required size="40"
                value={value}
                onChange={e => setValue(e.target.value)}></input>
        </>
    )
}