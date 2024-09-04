import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changeStudent } from '@/Redux/studentSlice'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import StudentService from '@/services/student.service'

/**
 * HOOK QUE MANEJA LOGICA PARA  MOSTRAR, EDITAR DETALLE DE UN ALUMNO *
 * @param {string} formMethods - funciones de react hooks a utilizar en  el hook, ejemplo setValue.
 * @returns {Map} - Un objeto con propiedades y métodos relacionados con el hook.
 */

const useDetailStudentHandling = (formMethods, handleErrors) => {
  const studentDetailStore = useSelector((state) => state.student)
  const idSchool = localStorage.getItem(lsSchoolId)
  const dispatch = useDispatch()

  const editStudent = async (id, data) => {
    const response = await StudentService.editStudent(id, idSchool, data)
    dispatch(changeStudent(response))
  }
  const createStudent = async (data) => {
    const response = await StudentService.createStudent(idSchool, data)
    dispatch(changeStudent(response))
  }
  useEffect(() => {
    // Limpia
    return () => {
    }
  }, [])

  return {
    studentDetailStore,
    editStudent,
    createStudent
  }
}

export default useDetailStudentHandling
