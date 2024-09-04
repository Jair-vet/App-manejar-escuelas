import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getSections = async (idSchool, page) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/sections?page=${page}`,
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}
const searchSections = async (idSchool, textSearch) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/sections/search`,
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}
const getSectionsWithGroups = async (idSchool, page) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/sections/with-groups`,
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}
const getSectionsWithMatters = async (idSchool, levels) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/sections/with-matters`,
      {
        levels
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}
const getLevels = async (idSchool, idSection) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/levels/${idSection}`,
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new Error(e.message)
  }
}

const getLevel = async (idSchool, idLevel) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/levels/level/${idLevel}`,
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}

const createSection = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/sections/create`,
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
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}
const editSection = async (idSchool, data, idSection) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(
      `/institutions/institution/${idSchool}/sections/edit/${idSection}`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if ('message' in e.response.data) {
        message = e.response.data.message.toString()
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

const getSection = async (idSchool, idSection) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/sections/detail/${idSection}`,
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}

const getSectionByCycles = async (idSchool, idCycle) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/cycles/${idCycle}/sections`,
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}

const getPaymentsSection = async (idSchool, idSection) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/sections/pays/get/${idSection}`,
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet')
  }
}

const createOrEditSettingsPays = async (idSchool, idSection, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/sections/pays/${idSection}`,
      data
      ,
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
      } if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new Error(e)
  }
}

const SchoolsSectionsService = {
  getSections,
  createSection,
  getLevels,
  getSectionsWithGroups,
  getSectionsWithMatters,
  getLevel,
  searchSections,
  getSection,
  editSection,
  getSectionByCycles,
  getPaymentsSection,
  createOrEditSettingsPays
}

export default SchoolsSectionsService
