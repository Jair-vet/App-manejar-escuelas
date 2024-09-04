import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'

const TableBodyTeachers = ({ items, edit }) => {
  return (<>
    { items.length > 0
      ? <>
        {items && items.map((value, index) => {
          return (
            <tr key={index} className='row'>
              <td className="value">{value.id}</td>
              <td className="value">
                {' '}
                <img
                    src={value.profile_photo}
                    alt="photo-user"
                    className="photo-user"
                  />
                {value.name}
              </td>
              <td className="value">{value.email}</td>
              <td className="value ">{value.is_active ? 'Activo' : 'Inactivo'}</td>
              <td className="value actions">
                <FiEdit className="edit actions" onClick={() => edit(value)}/>
              </td>
            </tr>
          )
        })}
      </>
      : <span className='tbl-not-data'>No se contraron ciclos escolares</span>
          }
  </>)
}

TableBodyTeachers.propTypes = {
  items: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired
}

export default TableBodyTeachers
