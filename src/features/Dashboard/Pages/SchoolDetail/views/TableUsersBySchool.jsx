import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'

import { ActiveValueStyled, InactiveValueStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import { constantImageUrlUsers } from '@/common/constants/constants'

const TableUsersBySchool = ({ items, editUser }) => {
  return (
  <>
    {items.length > 0
      ? <>
        {items && items.map((value, index) => {
          return (
            <tr key={index} className='row'>
              <th className="value with-img">
                <img src={value.profile_photo.includes('https') ? value.profile_photo : constantImageUrlUsers + value.profile_photo} alt="" />
                {value.name}
              </th>
              <th className="value">{value.username}</th>
              <th className="value">{value.rol}</th>
              <th className='value'>
                {value.is_active ? <ActiveValueStyled> Activo </ActiveValueStyled> : <InactiveValueStyled> Inactivo </InactiveValueStyled>}
              </th>
              <th className="value actions">
                <FiEdit className="edit actions" onClick={() => editUser(value)} />
              </th>
            </tr>
          )
        })}
      </>
      : <span className='tbl-not-data'>Sin coincidencias</span>
    }
  </>)
}

TableUsersBySchool.propTypes = {
  items: PropTypes.array.isRequired,
  editUser: PropTypes.func.isRequired
}

export default TableUsersBySchool
