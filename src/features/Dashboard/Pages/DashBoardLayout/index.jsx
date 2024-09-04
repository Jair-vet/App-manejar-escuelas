import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../../../../common/Components/Header'
import Sidenav from '../../../../common/Components/Sidenav'

import DashboardLayoutStyled, { HeaderMenu, ContainerDataViewStyled, Overlay } from './DashboardLayoutStyled'

import SignOff from '@/features/authentication/Pages/SingOff/SingOffStyled'

const DashboardLayout = () => {
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDashboard = () => {
    setIsDashboardExpanded(!isDashboardExpanded)
  }

  useEffect(() => {
    console.log(isMenuOpen)
  }, [isMenuOpen])

  return (
    <>
      {isMenuOpen && <Overlay></Overlay>}
      <DashboardLayoutStyled isExpanded={!isDashboardExpanded}>
        <Sidenav toggleDashboard={toggleDashboard} />
        <ContainerDataViewStyled>
          <HeaderMenu isExpanded={isDashboardExpanded}>
            <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} position='relative' left='3rem' />
          </HeaderMenu>
          <Outlet />
        </ContainerDataViewStyled>
        <SignOff className={toggleMenu}/>
      </DashboardLayoutStyled>
    </>
  )
}

export default DashboardLayout
