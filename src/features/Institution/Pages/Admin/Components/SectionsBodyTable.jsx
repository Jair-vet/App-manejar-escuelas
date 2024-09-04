import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'

import LoaderComponent from '@/common/Components/LoaderComponent'
import PageStatus from '@/common/Models/Enums'

const TableBodySections = ({ items, edit, tableStatus, message }) => {
  return tableStatus !== PageStatus.SUCCESS
    ? (
      <LoaderComponent message={message} status={tableStatus}/>)
    : (<>
      { items.length > 0
        ? <>
          {items && items.map((value, index) => {
            return (
              <tr key={index} className='row'>
                <td className="value with-img">
                  {value.name}
                </td>
                <td className="value actions">
                  <FiEdit className="edit actions" onClick={() => edit(value)}/>
                </td>
              </tr>
            )
          })}
        </>
        : <span className='tbl-not-data'>No se encontraron secciones, agrega una</span>
          }</>)
}

TableBodySections.propTypes = {
  items: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  tableStatus: PropTypes.oneOf([PageStatus.SUCCESS]).isRequired,
  message: PropTypes.string.isRequired

}

export default TableBodySections
