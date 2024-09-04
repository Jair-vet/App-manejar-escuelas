import React from 'react-dom'
import { Outlet } from 'react-router-dom'

import { LayoutAuthStyled } from '../AuthLayout/AuthLayoutStyled'

const AuthLayout = () => {
  return (
    <LayoutAuthStyled >
      <Outlet />
    </LayoutAuthStyled>

  )
}

export default AuthLayout
