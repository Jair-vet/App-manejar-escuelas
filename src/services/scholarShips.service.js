/* eslint-disable no-debugger */
import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getScholarShipsByCycle = async (idSchool, idCycle) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/cycles/scholarships/by-cycle/${idCycle}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    return response.data.data.results
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado' + e.toString()
    )
  }
}

const createScholarShip = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/cycles/scholarships`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    return response.data.data
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado' + e.toString()
    )
  }
}

const addScholarShipToStudent = async (idSchool, students, idScolarShip) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/students/scholarships`,
      {
        students,
        id_scholarship: idScolarShip
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    return response.data.data
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado' + e.toString()
    )
  }
}

const getStudentsCycleAndSkipScolarShip = async (idSchool, idCycle, idScolarShip) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/cycles/students/skip-scolarship/`,
      {
        id_cycle: idCycle,
        id_scolarship: idScolarShip
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    return response.data.data.results
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado' + e.toString()
    )
  }
}

const getStudentsbyScolarShip = async (idSchool, idScolarShip) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/students/by-scholarship/${idScolarShip}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    return response.data.data.results
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado' + e.toString()
    )
  }
}
const ScholarShipsService = {
  getScholarShipsByCycle,
  createScholarShip,
  addScholarShipToStudent,
  getStudentsCycleAndSkipScolarShip,
  getStudentsbyScolarShip
}

export default ScholarShipsService
