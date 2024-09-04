import PropTypes from 'prop-types'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { OptionSidenav, ToltipStyled } from '../SidenavStyled'

import administration from '@/Assets/administration.svg'
import cycle from '@/Assets/cycle.svg'
import schools from '@/Assets/school.svg'
import students from '@/Assets/students.svg'
import users from '@/Assets/user.svg'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import { routesNamesDashboard } from '@/features/Dashboard/Routes/routesNames'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
import { MdOutlineAttachMoney } from 'react-icons/md'

const OptionSidenavModule = ({ module, open }) => {
  const navigate = useNavigate()

  const location = useLocation()
  const currentPath = location.pathname
  if (module.id === 1) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/dashboard/users/') ? ' selected-option' : '')
    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav
          onClick={() => navigate(routesNamesDashboard.users)}>
          <div className={classIcon}>
            <div className='container-icon'>
              <img src={users} alt='icono-usuarios' className='icons-sidenav' />
            </div>
            <span>{module.label}</span>
          </div>
        </OptionSidenav>
      </ToltipStyled>
    )
  }
  if (module.id === 2) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/dashboard/schools') ? ' selected-option' : '')
    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav onClick={() => navigate(routesNamesDashboard.schools)}>
          <div className={classIcon}>

            <div className='container-icon'>
              <img src={schools} alt="icono-escuela" className='icons-sidenav' />
            </div>
            <span>{module.label}</span>
          </div>

        </OptionSidenav>
      </ToltipStyled>
    )
  }
  if (module.id === 3) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/institution/admin/') ? ' selected-option' : '')

    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav
          onClick={() => navigate(routesNamesInstitution.admin)}>
          <div className={classIcon}>

            <div className='container-icon'>
              <img src={administration} alt="icono-administracion" className='icons-sidenav' />
            </div>
            <span>{module.label}</span>
          </div>

        </OptionSidenav>
      </ToltipStyled>
    )
  }
  if (module.id === 4) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/institution/students/') ? ' selected-option' : '')
    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav onClick={() => navigate(routesNamesInstitution.students)}>
          <div className={classIcon}>
            <div className='container-icon'>
              <img src={students} alt='icono-usuarios' className='icons-sidenav' />
            </div>
            <span>{module.label}</span>
          </div>

        </OptionSidenav>
      </ToltipStyled>
    )
  }
  if (module.id === 5) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/institution/cycles/') ? ' selected-option' : '')
    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav onClick={() => navigate(routesNamesInstitution.home)}>
          <div className={classIcon}>
            <div className='container-icon'>
              <img src={cycle} alt='estudiantes' className='icons-sidenav home' />
            </div>
            <span>{module.label}</span>
          </div>

        </OptionSidenav>
      </ToltipStyled>
    )
  }
  if (module.id === 6) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/institution/tutors/') ? ' selected-option' : '')
    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav onClick={() => navigate(routesNamesInstitution.tutors)}>
          <div className={classIcon}>
            <div className='container-icon'>
              <img src={students} alt="usuarios school" className='icons-sidenav' />
            </div>
            <span>{module.label}</span>
          </div>

        </OptionSidenav>
      </ToltipStyled>
    )
  }
  if (module.id === 7) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/institution/matters/') ? ' selected-option' : '')
    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav onClick={() => navigate(`${routesNamesInstitution.matters}`)}>
          <div className={classIcon}>
            <div className='container-icon'>
              <img src={schools} alt="usuarios school" className='icons-sidenav' />
            </div>
            <span>{module.label}</span>
          </div>
        </OptionSidenav>
      </ToltipStyled>
    )
  }
  if (module.id === 8) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/institution/staff/') ? ' selected-option' : '')
    return (
      <ToltipStyled title="Personal">
        <OptionSidenav onClick={() => navigate(`${routesNamesInstitution.staff}`)}>
          <div className={classIcon}>
            <div className='container-icon'>
              <img src={users} alt="usuarios school" className='icons-sidenav' />
            </div>
            <span>{module.label}</span>
          </div>
        </OptionSidenav>
      </ToltipStyled>
    )
  }
  if (module.id === 9) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/institution/users/') ? ' selected-option' : '')
    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav onClick={() => navigate(`${routesNamesInstitution.users}`)}>
          <div className={classIcon}>
            <div className='container-icon'>
              <img src={users} alt="usuarios school" className='icons-sidenav' />
            </div>
            <span>{module.label}</span>
          </div>
        </OptionSidenav>
      </ToltipStyled>
    )
  }
  if (module.id === 12) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/institution/accounts/') ? ' selected-option' : '')
    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav
          onClick={() => navigate(routesNamesInstitution.accountsPayable)}>
          <div className={classIcon}>
            <div className='container-icon'>
              <MdOutlineAttachMoney className='icons-sidenav' />
              {/* <img src={users} alt='icono-usuarios' className='icons-sidenav' /> */}
            </div>
            <span>{module.label}</span>
          </div>
        </OptionSidenav>
      </ToltipStyled>
    )
  }

  if (module.id === 13) {
    let classIcon = open ? 'cont-icon open' : 'cont-icon'
    classIcon = classIcon + (currentPath.startsWith('/institution/invoice/') ? ' selected-option' : '')
    return (
      <ToltipStyled title={module.label}>
        <OptionSidenav
          onClick={() => navigate(routesNamesInstitution.schoolInvoce)}>
          <div className={classIcon}>
            <div className='container-icon'>
              <MdOutlineAttachMoney className='icons-sidenav' />
            </div>
            <span>{module.label}</span>
          </div>
        </OptionSidenav>
      </ToltipStyled>
    )
  }
  const classIcon = open ? 'cont-icon open' : 'cont-icon'
  return (
    <ToltipStyled title={module.label}>
      <OptionSidenav>
        <div className={classIcon}>
          <div className='container-icon'>
            <img src={students} alt="estudiantes" className='icons-sidenav' />
          </div>
          <span>{module.label}</span>
        </div>

      </OptionSidenav>
    </ToltipStyled>
  )


}

OptionSidenavModule.propTypes = {
  module: PropTypes.object.isRequired,
  open: PropTypes.bool
}
export default OptionSidenavModule
