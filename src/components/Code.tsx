'use client'

import type { FunctionComponent, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export const Code: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component="span"
      sx={{
        fontFamily: 'Monospace',
        background: '#222',
        p: '5px',
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: 1,
      }}
    >
      {children}
    </Box>
  )
}
