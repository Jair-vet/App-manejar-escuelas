import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../../../../common/Components/Header'
import Sidenav from '../../../../common/Components/Sidenav'

import Institution, { ContainerDataViewStyled, HeaderMenu } from './InstitutionLayoutStyled'

const InstitutionLayout = () => {
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(true)
  // const [showArrow, setShowArrow] = useState(false)

  const toggleDashboard = () => {
    setIsDashboardExpanded(!isDashboardExpanded)
  }

  // useEffect(() => {
  // }, [])

  return (
    <Institution isExpanded={!isDashboardExpanded}>
      <Sidenav toggleDashboard={toggleDashboard} />
      <ContainerDataViewStyled>
        {
          <HeaderMenu isExpanded={isDashboardExpanded}>
            <Header position='relative' left='3rem' showArrow={false} />
          </HeaderMenu>
        }
        <Outlet />
      </ContainerDataViewStyled>
    </Institution>
  )
}

export default InstitutionLayout
