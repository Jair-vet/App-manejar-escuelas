import React from 'react'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from 'styled-components'

import router from '../Routing'

import theme from '@/common/Global-styles/theme'

function App () {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
