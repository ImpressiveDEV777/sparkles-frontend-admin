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
        height: 56,
        pl: '20px',
      }}
    >
      <TextField
        id="standard-basic"
        label="Value"
        variant="standard"
        placeholder="Filter value"
        value={item.value as string}
        onChange={e => {
          applyValue({ ...item, value: e.target.value })
        }}
      />
    </Box>
  )
}
