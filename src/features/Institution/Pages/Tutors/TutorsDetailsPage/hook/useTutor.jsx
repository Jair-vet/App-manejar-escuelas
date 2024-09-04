import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changeStudent } from '@/Redux/studentSlice'
import TutorService from '@/Services/tutors.service'
import { lsSchoolId } from '@/common/constants/localStorageConstants'

/**
 * HOOK QUE MANEJA LOGICA PARA  MOSTRAR, EDITAR DETALLE DE UN ALUMNO *
 * @param {string} formMethods - funciones de react hooks a utilizar en  el hook, ejemplo setValue.
 * @returns {Map} - Un objeto con propiedades y métodos relacionados con el hook.
 */

const useDetailTutorHandling = (formMethods, handleErrors) => {
  const tutorDetailStore = useSelector((state) => state.tutor)
  const idSchool = localStorage.getItem(lsSchoolId)
  const dispatch = useDispatch()

  const editTutor = async (idStudent, id, data) => {
    const response = await TutorService.editTutor(idStudent, id, data)
    dispatch((response))
  }
  const createTutor = async (data) => {
    const response = await TutorService.createStudent(idSchool, data)
    dispatch(changeStudent(response))
  }
  useEffect(() => {
    return () => {
    }
  }, [])

  return {
    tutorDetailStore,
    editTutor,
    createTutor
  }
}

export default useDetailTutorHandling
