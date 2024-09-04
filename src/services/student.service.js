import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/Common/constants/localStorageConstants'
import { jsonToStudent } from '@/common/Models/StudentModel'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getStudents = async (idSchool, page) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.get(
      `institutions/institution/${idSchool}/students/all?page=${page}`, {
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

const searchStudent = async (idSchool, searchText) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.post(
      `/institutions/institution/${idSchool}/students/search`, { text_search: searchText }, {
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

const createStudent = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/students/create`,
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

const editStudent = async (id, idSchool, student) => {
  try {
    const token = localStorage.getItem(lsToken)
    // const data = studentToJson(student)
    const response = await instance.put(
      `/institutions/institution/${idSchool}/students/edit/${id}`,
      student, {
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
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet' + e.toString())
  }
}

const getStudent = async (idSchool, id) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/students/student/${id}`,
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

const inscriptionStudent = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/students/inscribe`,
      data, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 201) {
      const user = jsonToStudent(response.data.data)
      return user
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

const createStudentsMasive = async (idSchool, items) => {
  try {
    const token = localStorage.getItem(lsToken)
    // const formData = new FormData()
    // formData.append('file', file, file.name)
    const response = await instance.post(
      `institutions/institution/${idSchool}/students/create-masive`,
      { data: items },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 201) {
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

const readFileMasiveStudents = async (idSchool, file) => {
  try {
    const token = localStorage.getItem(lsToken)
    const formData = new FormData()
    formData.append('file', file, file.name)
    const response = await instance.post(
      `institutions/institution/${idSchool}/students/read-file`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent></calculated>',
          'Accept-Encoding': 'gzip, deflate, br',
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

const downloadFileStudents = async (idSchool) => {
  try {
    const response = await instance.get(
      `institutions/institution/${idSchool}/students/export/`)
    return response.data
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

const inscribeMasiveStudents = async (idSchool, idCycle, file) => {
  try {
    const formData = new FormData()
    const token = localStorage.getItem(lsToken)
    formData.append('file', file, file.name)
    const response = await instance.post(
      `institutions/institution/${idSchool}/students/inscribe-masive/${idCycle}`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent></calculated>',
          'Accept-Encoding': 'gzip, deflate, br',
          Authorization: 'Bearer ' + token
        }
      })
    return response.data
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
const readRatingsFile = async (idSchool, file) => {
  try {
    const formData = new FormData()
    const token = localStorage.getItem(lsToken)
    formData.append('file', file, file.name)
    const response = await instance.post(
      `institutions/institution/${idSchool}/students/matters/ratings/read-file`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent></calculated>',
          'Accept-Encoding': 'gzip, deflate, br',
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
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const uploadRatingsMasive = async (idSchool, data, periodName) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `institutions/institution/${idSchool}/students/matters/ratings/create-masive`, { ratings: data, period_name: periodName },
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
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const getMattersStudent = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/students/matters`,
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
    throw new Error(
      e.message.toString()
    )
  }
}

const searchMattersStudent = async (idSchool, data) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.post(
      `/institutions/institution/${idSchool}/students/matters/search`, {
        data,
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

const getRatingByMatter = async (idSchool, idMatter) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/students/matters/ratings/get/${idMatter}`,
      {
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

const getCyclesStudent = async (idSchool, idAsignature) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${idSchool}/students/cycles/${idAsignature}`,
      {
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

const editRatingMatter = async (idSchool, idRating, qualification) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(
      `/institutions/institution/${idSchool}/students/matters/ratings/edit/${idRating}`,
      { qualification }, {
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
      if ('message' in e.response.data.data) {
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
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet' + e.toString())
  }
}
const createRatingMatter = async (idSchool, qualification, studentMatter, periodName) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/students/matters/ratings/create`,
      {
        qualification,
        student_matter: studentMatter,
        academic_period_name: periodName
      },
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

const createComments = async (idSchool, comments, periodName, isSeparated, idCycleGroup, idStudent) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/students/matters/comments/create`,
      {
        comments,
        id_cycle_group: idCycleGroup,
        academic_period_name: periodName,
        id_student: idStudent,
        is_separated: isSeparated
      },
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

const getPaymentsStudent = async (idSchool, uuid, idGroupCycle) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${idSchool}/students/payments/all`,
      {
        uuid,
        id_group_cycle: idGroupCycle
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
    throw new Error(
      e.message.toString()
    )
  }
}
const publicRatingMatter = async (idSchool, academicPeriodName, Students, idCycleGroup) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(
      `/institutions/institution/${idSchool}/students/matters/ratings/public/`,
      {
        academic_period_name: academicPeriodName,
        students: Students,
        id_cycle_group: idCycleGroup
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
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      let message = e.toString()
      if (e.response && e.response.data) {
        if ('message' in e.response.data) {
          message = e.response.data.message
        } else if ('detail' in e.response.data) {
          message = e.response.data.detail
        } else if ('errors' in e.response.data) {
          message = JSON.stringify(e.response.data.errors)
        }
      } else {
        message = e.message
      }
      throw new ApiError(message, e.response ? e.response.status : 500)
    }
    console.error(e)
    throw new ConnectionError('Sucedió algo inesperado, revisa tu conexión a internet: ' + e.toString())
  }
}

const StudentService = {
  createStudent,
  getStudent,
  getStudents,
  searchStudent,
  editStudent,
  inscriptionStudent,
  createStudentsMasive,
  readFileMasiveStudents,
  downloadFileStudents,
  inscribeMasiveStudents,
  readRatingsFile,
  uploadRatingsMasive,
  getMattersStudent,
  searchMattersStudent,
  getRatingByMatter,
  getCyclesStudent,
  editRatingMatter,
  createRatingMatter,
  createComments,
  getPaymentsStudent,
  publicRatingMatter
}

export default StudentService
