import { Box, TextField } from "@mui/material"

export const TextKey = ({ name, value, setValue }) => {
    return (
        <Box style={{ textAlign: 'right' }}>
            <TextField
                id="api_key"
                label={name}
                type="password"
                size="small"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </Box>
    )
}