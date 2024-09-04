import PropTypes from 'prop-types'
// import { FiEdit } from 'react-icons/fi'

const TableBodyGroups = ({ items, edit }) => {
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
                {value.name_level}
              </td>
              <td className="value">
                {value.name_section}
              </td>
            </tr>
          )
        })}
      </>
      : <span className='tbl-not-data'>No se contraron grupos</span>
          }
  </>)
}

TableBodyGroups.propTypes = {
  items: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired
}

export default TableBodyGroups
