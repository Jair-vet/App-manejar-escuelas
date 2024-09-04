/* eslint-disable no-debugger */
import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getGroups = async (idSchool, page) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/groups?page=${page}`,
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
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}
const getGroupsByLevel = async (idSchool, idLevel) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/groups/by-level/${idLevel}`,
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
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}

const searchGroupsByLevel = async (idSchool, idLevel, textSearch) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/groups/search/by-level/${idLevel}`,
      {
        text_search: textSearch
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
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}
const createGroup = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/groups/create`,
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
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}

const SchoolsGroupsService = {
  createGroup,
  getGroups,
  getGroupsByLevel,
  searchGroupsByLevel

}

export default SchoolsGroupsService
