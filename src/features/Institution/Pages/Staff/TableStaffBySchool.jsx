import PropTypes from 'prop-types'
import React from 'react'
import { FiEdit } from 'react-icons/fi'

import TutorBodyTableStyled, { TableBody } from '../Tutors/TutorsView/Component/TutorBodyTableStyled'

import { ToltipStyled } from '@/common/Components/Sidenav/SidenavStyled'

const TableStaffBySchool = ({ employees = [], detailEmploye }) => {
  return (
    <TutorBodyTableStyled>
      <TableBody>
        {employees.map((employee, index) => (
          <tr key={index} className='row'>
            <td className="value">{employee.id_payroll}</td>
            <td className="value">{`${employee.name} ${employee.last_name} ${employee.second_surname}`}</td>
            <td className="value">{employee.email}</td>
            <td className="value">{employee.position}</td>
            <td className="value ">
              <div className='action' >
                <ToltipStyled title='Detalle'>
                  <FiEdit className='icons' onClick={() => detailEmploye(employee.id)}/>
                </ToltipStyled>
              </div>
            </td>
          </tr>
        ))}
      </TableBody>
    </TutorBodyTableStyled>
  )
}

TableStaffBySchool.propTypes = {
  employees: PropTypes.array.isRequired,
  detailEmploye: PropTypes.func
}

export default TableStaffBySchool
