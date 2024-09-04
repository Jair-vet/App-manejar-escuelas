import PropTypes from 'prop-types'
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2'
import { useNavigate } from 'react-router'

import Button from '@/common/Components/Buttons'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'

export const TableBodyStudentsToRegisterCycle = ({ items, action }) => {
  const navigate = useNavigate()
  return (<>
    {items.length > 0
      ? <> {items && items.map((value, index) => {
        return (
          <tr key={index} className='row'>
            <td className="value">
              {value.tag_id}
            </td>
            <td className="value">
              {value.name + ' ' + value.last_name + ' ' + value.second_surname}
            </td>
            <td className="value">
              {value.email}
            </td>
            <td className="value ">
              {value.level_name}
            </td>
            <td className="value actions">
              <HiMiniArrowTopRightOnSquare className="edit actions" onClick={() => action(value)} />
            </td>
          </tr>
        )
      })}</>
      : (<div className='table-not-data-cycle'>
        <span className='tbl-not-data'>No se contraron alumnos</span>
        <Button size='large' onClick={() => navigate(routesNamesInstitution.students)}>Agregar alumno</Button>
      </div>
        )
    }
  </>)
}

TableBodyStudentsToRegisterCycle.propTypes = {
  items: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired
}
