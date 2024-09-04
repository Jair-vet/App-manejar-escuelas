import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'

const TableBodyLevels = ({ items, edit }) => {
  return (<>
    { items.length > 0
      ? <>
        {items && items.map((value, index) => {
          return (
            <tr key={index} className='row'>
              <td className="value">
                {value.name}
              </td>
              <td className="value">
                {value.name_section}
              </td>
              <td className="value actions">
                <FiEdit className="edit actions" onClick={() => edit(value)}/>
              </td>
            </tr>
          )
        })}
      </>
      : <span className='tbl-not-data'>No se contraron materias</span>
          }
  </>)
}

TableBodyLevels.propTypes = {
  items: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired
}

export default TableBodyLevels
