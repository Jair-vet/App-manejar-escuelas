import PropTypes from 'prop-types'
// import { FiEdit } from 'react-icons/fi'
// import { useNavigate } from 'react-router'

import { ActiveValueStyled, InactiveValueStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
// import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'

const TableStudentsMasiveBySchool = ({ items, columnWidths = [] }) => {
  // const navigate = useNavigate()

  return (
    <>

      { items.length > 0
        ? <>
          {items && items.map((value, index) => {
            return (
              <tr key={index} className='row'>
                <td className="value overflow" style={{ width: columnWidths[0] }}>
                  {value.student.id_group != null ? <ActiveValueStyled> {value.student.id_group + ' / ' + value.student.name_level + value.student.name_group} </ActiveValueStyled> : <InactiveValueStyled> Sin grupo </InactiveValueStyled>}
                </td>
                <td className="value" style={{ width: columnWidths[1] }}>{value.student.name + ' ' + value.student.last_name + ' ' + value.student.second_surname}</td>
                <td className='value' style={{ width: columnWidths[2] }}>{value.student.email}</td>
                <td className='value overflow' style={{ width: columnWidths[3] }}>{value.student.birthday_date}</td>
                <td className='value overflow' style={{ width: columnWidths[4] }}>{value.student.curp}</td>
                <td className='value overflow' style={{ width: columnWidths[5] }}>{value.student.sex}</td>
                <td className='value ' style={{ width: columnWidths[6] }}>{value.tutor.name + ' ' + value.tutor.last_name + ' ' + value.tutor.second_surname}</td>
                <td className='value overflow' style={{ width: columnWidths[7] }}>{value.tutor.email}</td>
                <td className='value overflow' style={{ width: columnWidths[8] }}>{value.tutor.number_phone_movil}</td>
              </tr>
            )
          })}
        </>
        : <span className='tbl-not-data'>Sin alumnos, agrega uno</span>
          }
    </>)
}

TableStudentsMasiveBySchool.propTypes = {
  items: PropTypes.array.isRequired,
  columnWidths: PropTypes.array.isRequired
}

export default TableStudentsMasiveBySchool
