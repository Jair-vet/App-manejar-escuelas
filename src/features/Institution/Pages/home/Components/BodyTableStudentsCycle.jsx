import PropTypes from 'prop-types'

import { ActiveValueStyled, InactiveValueStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'

export const TableBodyStudentsCycle = ({ items, edit, onViewStudents }) => {
  // const navigate = useNavigate()
  return (<>
    {items.length > 0
      ? <div className='container'>
        {items && items.map((value, index) => {
          return (
            <tr key={index} className='row'>
              <td className="value">{value.tag_id}</td>
              <td className="value">{value.name + ' ' + value.last_name + ' ' + value.second_surname}</td>
              <td className="value">{value.section_name}</td>
              <td className='value'>
                {value.level_name != null ? <ActiveValueStyled> {value.level_name + ' ' + value.group_name} </ActiveValueStyled> : <InactiveValueStyled> Aún no inscrito </InactiveValueStyled>}
              </td>
              {/* <td className="value actions">
                <HiMiniArrowTopRightOnSquare className="edit actions" onClick={onViewStudents} />
              </td> */}
            </tr>
          )
        })}
      </div>
      : (<div className='table-not-data-cycle'>
        <span className='tbl-not-data'>No se contraron alumnos inscritos en este ciclo</span>
      </div>
        )
    }
  </>)
}

TableBodyStudentsCycle.propTypes = {
  items: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  onViewStudents: PropTypes.func.isRequired
}
