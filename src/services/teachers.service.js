import { AxiosError } from 'axios'

import instance from './baseApi'

import { jsonToUser, userToJson } from '@/common/Models/UserModel'
import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getTeachers = async (idSchool, page) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.get(
      `/institutions/institution/${idSchool}/teachers?page=${page}`, {
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
      if (e.response.data.message !== undefined) {
        throw new ApiError(e.response.data.message, e.response.status)
      }
      throw new ApiError('Respuesta de servidor', e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}
const searchTeachers = async (page, searchText) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.post(
      `/users/search?page=${page}`, { text_search: searchText }, {
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
      if (e.response.data.message !== undefined) {
        throw new ApiError(e.response.data.message, e.response.status)
      }
      throw new ApiError('Respuesta de servidor', e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const createTeacher = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/teachers/create`,
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
      if (e.response.data.message !== undefined) {
        throw new ApiError(e.response.data.message, e.response.status)
      }
      throw new ApiError('Respuesta de servidor', e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const editTeacher = async (id, user) => {
  try {
    const token = localStorage.getItem(lsToken)
    const data = userToJson(user)
    const response = await instance.put(
      `/users/user/edit/${id}`,
      data, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      const user = jsonToUser(response.data.data)
      return user
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response.data.message !== undefined) {
        throw new ApiError(e.response.data.message, e.response.status)
      }
      throw new ApiError('Respuesta de servidor', e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const getTeacher = async (id) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/users/user/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      const user = jsonToUser(response.data.data)
      return user
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response.data.message !== undefined) {
        throw new ApiError(e.response.data.message, e.response.status)
      }
      throw new ApiError('Respuesta de servidor', e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const TeachersService = {
  getTeachers,
  searchTeachers,
  createTeacher,
  editTeacher,
  getTeacher
}

export default TeachersService
