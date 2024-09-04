import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const createTutor = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    console.log(data)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/tutors/create`,
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

const getDetailsTutorsByStudent = async (idSchool, id) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.get(
      `institutions/institution/${idSchool}/tutors/by-student/${id}`, {
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
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const getDetailTutor = async (idSchool, id) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/tutors/tutor/${id}`,
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
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const editTutor = async (idSchool, id, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(
      `/institutions/institution/${idSchool}/tutors/edit/${id}`,
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
      } else if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new Error(message)
    }
    console.error(e)
    throw new Error(e.message.toString())
  }
}

const searchTutor = async (idSchool, id, searchText) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.post(
      `/institutions/institution/${idSchool}/tutors/search/by-student/${id}`, { text_search: searchText }, {
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
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}
const searchTutorSchool = async (idSchool, searchText) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.post(
      `/institutions/institution/${idSchool}/tutors/search/by-school`, { text_search: searchText }, {
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
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const getTutorBySchool = async (idSchool) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/tutors/by-school`,
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
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const addTutorStudent = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    console.log(data)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/tutors/assing-student`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
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
    throw new Error(
      e.message.toString()
    )
  }
}

const sendEmailAppAccess = async (idSchool, idTutor) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/tutors/send-email/${idTutor}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response
    }
    throw new Error(response.message.toString())
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message
      } else if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new Error(message)
    }
    console.error(e)
    throw new Error(e.message.toString())
  }
}

const TutorService = {
  createTutor,
  getDetailsTutorsByStudent,
  getDetailTutor,
  editTutor,
  searchTutor,
  searchTutorSchool,
  getTutorBySchool,
  addTutorStudent,
  sendEmailAppAccess
}

export default TutorService
