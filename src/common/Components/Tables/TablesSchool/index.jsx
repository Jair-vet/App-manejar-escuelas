import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import logo from '../../../../Assets/logo-ssusy.png'
import TablesStyled from '../TableStyled'

import { routesNamesDashboard } from '@/features/Dashboard/Routes/routesNames'

const TableSchools = ({ items }) => {
  const navigate = useNavigate()

  return (
    <>
      <TablesStyled >
        <table className="container-tables">
          <thead className="header-table school">
            <tr>
              <th className="items id">#</th>
              <th className="items name">Nombre</th>
              <th className="items email">Clave</th>
              <th className="items phone">Rfc</th>
              <th className="items status">Status</th>
              <th className="items action">Acciones</th>
            </tr>
          </thead>
          <tbody className="container-values">
            {items && items.map((value, index) => {
              return (
                <tr key={index}>
                  <td className="value">{value.id}</td>
                  <td className="value">
                    {' '}
                    <img
                    src={value.logo === '' ? logo : 'https://sgp-web.nyc3.cdn.digitaloceanspaces.com/Ssusy/Institutions/' + value.logo}
                    alt="photo-school"
                    className="phote-school"
                  />
                    {value.name}
                  </td>
                  <td className="value">{value.clave}</td>
                  <th className="value">{value.rfc}</th>
                  <td className="value ">{value.is_active ? 'Activo' : 'Inactivo'}</td>
                  <td className="value actions">
                    <FiEdit className="edit actions" onClick={() => navigate(routesNamesDashboard.onlyDetailSchool + value.id)}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </TablesStyled>
    </>

  )
}

TableSchools.propTypes = {
  items: PropTypes.array
}

export default TableSchools
