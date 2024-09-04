import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { ActiveValueStyled, InactiveValueStyled } from '../TableCustom/TableCustomStyled'
import TableStyled from '../TableStyled'

import { constantImageUrlUsers } from '@/Common/constants/constants'
import { lsUserName } from '@/Common/constants/localStorageConstants'
import { routesNamesDashboard } from '@/features/Dashboard/Routes/routesNames'

const TableUser = ({ items, username }) => {
  const navigate = useNavigate()

  const userName = localStorage.getItem(lsUserName)
  const filteredItems = items.filter(item => item.username !== userName)
  console.log(username)
  return (
    <>
      <TableStyled>
        <table className='container-tables'>
          <thead className='header-table'>
            <tr>
              <th className='items id'>#</th>
              <th className='items name'>Nombre</th>
              <th className='items email'>usuario</th>
              <th className='items rol'>Rol</th>
              <th className='items status'>Status</th>
              <th className='items action'>Acciones</th>
            </tr>
          </thead>
          <tbody className='container-values'>
            {filteredItems && filteredItems.map((value, index) => {
              return (
                <tr key={index}>
                  <td className="value">{value.id}</td>
                  <td className="value">
                    {' '}
                    <img src={value.profile_photo.includes('https') ? value.profile_photo : constantImageUrlUsers + value.profile_photo } alt="" />
                    {value.name}
                  </td>
                  <td className="value">{value.username}</td>
                  <td className='value'>{value.rol}</td>
                  <td className='value'>
                    {value.is_active ? <ActiveValueStyled> Activo </ActiveValueStyled> : <InactiveValueStyled> Inactivo </InactiveValueStyled>}
                  </td>
                  <td className="value actions">
                    <FiEdit className="edit actions" onClick={() => navigate(routesNamesDashboard.onlyDetailUser + value.id)}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </TableStyled>
    </>

  )
}

TableUser.propTypes = {
  items: PropTypes.array,
  username: PropTypes.string
}
export default TableUser
