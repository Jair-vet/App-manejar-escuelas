import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router'

import { TableStudentStyled, TableBody } from '../StudentStyled'

import { ActiveValueStyled, InactiveValueStyled } from '@/Common/Components/Tables/TableCustom/TableCustomStyled'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'

const TableStudentsBySchool = ({ items }) => {
  const navigate = useNavigate()

  return (
    <TableStudentStyled>
      <TableBody>
        { items.length > 0
          ? <>
            {items && items.map((value, index) => {
              return (
                <tr key={index} className='row'>
                  <td className="value">{value.tag_id}</td>
                  <td className="value">{value.name + ' ' + value.last_name + ' ' + value.second_surname}</td>
                  {value.section_name != null ? <td className="value">{value.section_name}</td> : <td className="value">Aún no inscrito</td>}
                  <td className='value'>
                    {value.level_name != null ? <ActiveValueStyled> {value.level_name + ' ' + value.group_name } </ActiveValueStyled> : <InactiveValueStyled> Aún no inscrito </InactiveValueStyled>}
                  </td>
                  <td className="value actions">
                    <FiEdit className="edit actions" onClick={() => navigate(`${routesNamesInstitution.onlyStudentDetail}${value.id}`)} />
                  </td>
                </tr>
              )
            })}
          </>
          : <span className='tbl-not-data'>Sin alumnos, filtra por ciclo escolar o agrega uno</span>
          }
      </TableBody>
    </TableStudentStyled>
  )
}

TableStudentsBySchool.propTypes = {
  items: PropTypes.array.isRequired
}

export default TableStudentsBySchool
