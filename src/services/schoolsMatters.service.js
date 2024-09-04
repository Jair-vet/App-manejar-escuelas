import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

// const getMattersByLevels = async (levels) => {
//   try {
//     const token = localStorage.getItem(lsToken)
//     const response = await instance.post(`/institutions/institution/${idSchool}/matters/by-levels?page=${page}`,
//       levels,
//       {
//         headers: {
//           Authorization: 'Bearer ' + token
//         }
//       })
//     return response.data.data.results
//   } catch (e) {
//     if (e instanceof AxiosError) {
//       console.log(e.response.status)
//       throw new ApiError('', e.response.status)
//     }
//     throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
//   }
// }

const createMatter = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/matters/create`,
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
const getMatters = async (idSchool, page) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/matters?page=${page}`,
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
const getMattersBylevel = async (idSchool, idLevel) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/matters/by-level/${idLevel}`,
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

const searchMattersBylevel = async (idSchool, idLevel, textSearch) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/matters/search/by-level/${idLevel}`,
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

const getAspectsMatters= async (idSchool, idMatter) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/matters/aspects/${idMatter}`,
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
    throw new Error(e.message.toString())
  }
}
const SchoolsMattersService = {
  createMatter,
  getMatters,
  getMattersBylevel,
  searchMattersBylevel,
  getAspectsMatters

}

export default SchoolsMattersService
