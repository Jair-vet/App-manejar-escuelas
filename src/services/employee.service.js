import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/Common/constants/localStorageConstants'
import { ApiError } from '@/Common/erros/errors'

const createEmployee = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    console.log(data)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/employes/create`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 201) {
      return response
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      }
      if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    console.error(e)
    throw new Error(
      e.message.toString()
    )
  }
}

const getEmployeesAll = async (idSchool) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.get(
      `institutions/institution/${idSchool}/employes/all`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data.results
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      }
      if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    console.error(e)
    throw new Error(
      e.message.toString()
    )
  }
}

const editEmployee = async (idSchool, idEmploye, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(
      `/institutions/institution/${idSchool}/employes/edit/${idEmploye}`,
      data, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      }
      if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    console.error(e)
    throw new Error(
      e.message.toString()
    )
  }
}

const searchEmploye = async (idSchool, searchText) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.post(
      `/institutions/institution/${idSchool}/employes/search`, { text_search: searchText }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data.results
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      }
      if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    console.error(e)
    throw new Error(
      e.message.toString()
    )
  }
}

const getDetailEmploye = async (idSchool, idEmploye) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/employes/${idEmploye}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      }
      if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    console.error(e)
    throw new Error(
      e.message.toString()
    )
  }
}
const EmployeeService = {
  createEmployee,
  getEmployeesAll,
  editEmployee,
  searchEmploye,
  getDetailEmploye
}

export default EmployeeService
