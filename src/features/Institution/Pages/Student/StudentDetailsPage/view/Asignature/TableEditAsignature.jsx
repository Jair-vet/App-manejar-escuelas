import PropTypes from 'prop-types'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FiEdit, FiCheck } from 'react-icons/fi'

import { ContainerIcons, ContainerValue, EditingValue } from './TableEditStyled'

import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import StudentService from '@/Services/student.service'

const TableEditAsignature = ({ items, detailsAsignature }) => {
  const idSchool = localStorage.getItem(lsSchoolId)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editedQualification, setEditedQualification] = useState('')

  const handleEditStart = (index, qualificacion) => {
    setEditingIndex(index)
    setEditedQualification(qualificacion)
  }

  const handleQualificationChange = (event) => {
    setEditedQualification(event.target.value)
  }

  const handleEditSave = async (id) => {
    try {
      await StudentService.editRatingMatter(idSchool, id, editedQualification)
      detailsAsignature()
      setEditingIndex(null)
    } catch (e) {
      toast.error(e.message)
    }
  }
  return (
    <>
      {
        items.length > 0
          ? items.map((item, index) => (
            <tr key={index} className={index === editingIndex ? 'row editing' : 'row'}>
              <td className="value">{item.matter_name}</td>
              <td className="value" >
                {index === editingIndex
                  ? (
                    <EditingValue>
                      <div className='value-edit'>
                        <input
                    className='change-value'
                      type="text"
                      value={editedQualification}
                      onChange={handleQualificationChange}
                    />
                      </div>
                      <ContainerIcons>
                        <FiCheck className='icon-checked' onClick={() => handleEditSave(item.id)} />
                      </ContainerIcons>
                    </EditingValue>
                    )
                  : (
                    <ContainerValue>
                      {item.qualification}
                      <FiEdit className='icon' onClick={() => handleEditStart(index, item.qualification)} style={{ cursor: 'pointer', marginLeft: '5px' }} />
                    </ContainerValue>
                    )}
              </td>
            </tr>
          ))
          : <span className='tbl-not-data'>No se encontraron calificaciones, agrega una</span> }

    </>)
}

TableEditAsignature.propTypes = {
  items: PropTypes.array,
  detailsAsignature: PropTypes.func
}

export default TableEditAsignature
