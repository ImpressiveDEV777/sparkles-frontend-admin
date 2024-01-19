import * as React from 'react'
import { GridFilterInputValueProps } from '@mui/x-data-grid'
import { Box, TextField } from '@mui/material'

export default function StatusFilterInput(props: GridFilterInputValueProps) {
  const { item, applyValue } = props

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        pl: '20px',
      }}
    >
      <TextField
        id="standard-basic"
        label="Value"
        select
        variant="standard"
        placeholder="Filter value"
        value={item.value}
        SelectProps={{
          native: true,
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          applyValue({ ...item, value: event.target.value })
        }}
      >
        <option value="true">Active</option>
        <option value="false">Disabled</option>
      </TextField>
    </Box>
  )
}
