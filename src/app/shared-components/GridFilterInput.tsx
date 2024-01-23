import * as React from 'react'
import { GridFilterInputValueProps } from '@mui/x-data-grid'
import { Box, TextField } from '@mui/material'

export default function GridFilterInput(props: GridFilterInputValueProps) {
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
        variant="standard"
        placeholder="Filter value"
        value={item.value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          applyValue({ ...item, value: event.target.value })
        }}
      />
    </Box>
  )
}
