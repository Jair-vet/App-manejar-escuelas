/* eslint-disable no-debugger */
import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getCycles = async (idSchool, page, status) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/cycles?page=${page}`,
      {
        status
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
const activeCycle = async (idSchool, idCycle) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(`/institutions/institution/${idSchool}/cycles/active/${idCycle}`,
      {},
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

const finishCycle = async (idSchool, idCycle) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(`/institutions/institution/${idSchool}/cycles/finish/${idCycle}`,
      {},
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

const createCycle = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/cycles/create`,
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

const getGroupsActiveCycle = async (idSchool) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/cycles/groups`,
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
      'Sucedio algo inesperado' + e.toString()
    )
  }
}

const getDetailGroupCurrentCycles = async (idSchool, id, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/cycles/${id}/groups`,
      data,
      {
        headers: {
          Authorization: ' Bearer ' + token
        }
      }
    )
    if (response.status === 201) {
      return response
    }
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

const getCycleGroupsByLevel = async (idSchool, idLevel) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/cycles/groups/level/${idLevel}`,
      {
        headers: {
          Authorization: ' Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data.results
    }
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

const getCycleLevelsBySection = async (idSchool, idCycle, idSection) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/cycles/${idCycle}/levels/${idSection}`,
      {
        headers: {
          Authorization: ' Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data.results
    }
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

const getCycle = async (idSchool, idCycle) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/cycles/detail/${idCycle}`,
      {
        headers: {
          Authorization: ' Bearer ' + token
        }
      }
    )
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

const getStudentsByCycle = async (idSchool, idCycle) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/cycles/students/${idCycle}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data.results
    }
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

const getDetailSectionByCycle = async (idSchool, idCycle, idSecion) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/cycles/${idCycle}/sections/${idSecion}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data
    }
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

const editSectionCycleLevels = async (idSchool, idCycle, idSecion, data) => {
  /// agrega grado a seccion de ciclo escolar
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(
      `/institutions/institution/${idSchool}/cycles/${idCycle}/sections/edit/${idSecion}`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data
    }
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

const getPeriodsNameByGroupCycle = async (idSchool, idCycleGroup) => {
  /// Retorna los nombres de periodos escolares filtrando por grado  y grupo del ciclo escolar
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/cycles/groups/periods/${idCycleGroup}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data
    }
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

const getPaysCycles = async (idSchool, idCycleGroup) => {
  /// Retorna los nombres de periodos escolares filtrando por grado  y grupo del ciclo escolar
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/cycles/groups/periods/${idCycleGroup}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data
    }
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

const getPaysSettings = async (idSchool, idCycle) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/cycles/settings-pays`,
      {
        cycle: idCycle
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

const getPaymentSettingsBySection = async (idSchool, idCycle, idSection) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/cycles/settings-pays/`,
      {
        cycle: idCycle,
        id_section: idSection
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data.data
    }
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

const editPaysSettings = async (idSchool, idCycle, idSection, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(`/institutions/institution/${idSchool}/cycles/settings-pays/edit`,
      {
        id_section: idSection,
        id_cycle: idCycle,
        settings: data
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

const createPaysSettings = async (idSchool, idCycle, idSection) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/cycles/settings-pays/create/`,
      {
        id_section: idSection,
        id_cycle: idCycle
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
const SchoolsCyclesService = {
  createCycle,
  getCycles,
  getGroupsActiveCycle,
  getDetailGroupCurrentCycles,
  getCycleGroupsByLevel,
  getCycleLevelsBySection,
  activeCycle,
  finishCycle,
  getStudentsByCycle,
  getCycle,
  getDetailSectionByCycle,
  editSectionCycleLevels,
  getPeriodsNameByGroupCycle,
  getPaysCycles,
  getPaysSettings,
  editPaysSettings,
  getPaymentSettingsBySection,
  createPaysSettings,
}

export default SchoolsCyclesService
