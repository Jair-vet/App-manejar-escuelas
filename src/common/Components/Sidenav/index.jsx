import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'

import logo from '../../../Assets/logo-ssusy.png'
import { Divider } from '../Form'

import OptionSidenavModule from './OptionModule'
import SidenavStyled, { ContainerSidenav } from './SidenavStyled'

import { lsSchoolLogo, lsSchoolName } from '@/Common/constants/localStorageConstants'
import { versionApp } from '@/common/constants/constants'
import useCurrentUserHandling from '@/common/hooks/useCurrentUser'

const Sidenav = ({ children, toggleDashboard }) => {
  const [isSidenavOpen, setSidenNavOpen] = useState(true)
  const { modules, loadModules } = useCurrentUserHandling()
  const [logoSchool, setLogoSchool] = useState(logo)
  const [isSchool, setIsSchool] = useState(false)
  const [activeModule, setActiveModule] = useState(null)
  const [schoolName, setSchoolName] = useState('')

  const handleClick = () => {
    setSidenNavOpen(!isSidenavOpen)
    toggleDashboard()
  }

  useEffect(() => {
    const screenWidth = window.innerWidth
    if (screenWidth < 1600 && isSidenavOpen) {
      setSidenNavOpen()
    }

    loadModules()

    const logolocal = localStorage.getItem(lsSchoolLogo)
    const name = localStorage.getItem(lsSchoolName)
    if (logolocal === undefined || logolocal === null || logolocal === 'undefined') {
      setIsSchool(false)
    } else {
      setIsSchool(true)
      const full = 'https://sgp-web.nyc3.cdn.digitaloceanspaces.com/Ssusy/Institutions/' + logolocal
      setLogoSchool(full)
    }
    setSchoolName(name)
  }, [])

  return (
    <SidenavStyled expandSidenav={isSidenavOpen ? 1 : 0}>

      <ContainerSidenav className={` ${isSidenavOpen ? 'open' : ''}`} >
        <div className="container-btn">
          <div className='back-btn-main' onClick={handleClick}>
            {
              isSidenavOpen ? <AiOutlineMenuFold className='btn-Menu' /> : <AiOutlineMenuUnfold className='btn-Menu' />
            }
            {/* <i className={`bx bx-menu bx-md ${isSidenavOpen ? 'open' : ''} btn-Menu`} onClick={handleClick}></i> */}
          </div>
        </div>

        <div className='container-logo'>
          {isSchool ? <img src={logoSchool} alt="logo-ssusy" className='logo-ssusy' /> : <img src={logo} alt="logo-ssusy" className='logo-ssusy' />}
        </div>
        <span className={isSidenavOpen ? 'name-school' : 'name-school name-school-not-show'}>{schoolName}</span>
        <Divider></Divider>
        <div className='modules'>
          {modules && modules.map((value, index) => {
            return (<OptionSidenavModule
              key={index}
              module={value}
              open={isSidenavOpen}
              activeModule={activeModule}
              setActiveModule={setActiveModule}
            >
            </OptionSidenavModule>)
          })}

        </div>
        <div className='version-cont'>
          <span className='version'>version {versionApp}</span>
        </div>
      </ContainerSidenav>
      {children}
    </SidenavStyled>
  )
}

Sidenav.propTypes = {
  children: PropTypes.node,
  toggleDashboard: PropTypes.func
}
export default Sidenav
