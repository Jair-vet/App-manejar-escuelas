import { AxiosError } from 'axios'

import instance from './baseApi'

import { jsonToSchool, schoolToJson } from '@/common/Models/SchoolModel'
import { userToJson } from '@/common/Models/UserModel'
import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getSchools = async (page) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/all?page=${page}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
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

const searchSchools = async (text) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      '/institutions/search', { text_search: text }, {
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

const createSchool = async (data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      '/institutions/institution/create/',
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 201) {
      await getDataApiSsusy(response.data)
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

const editSchool = async (id, school) => {
  try {
    const token = localStorage.getItem(lsToken)
    const data = schoolToJson(school)
    console.log('data',data)
    const response = await instance.put(
      `/institutions/institution/${id}`,
      data, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      await getDataApiSsusy(response.data)
      const model = jsonToSchool(response.data.data)
      return model
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

const getSchool = async (id) => {
  try {
    const token = localStorage.getItem(lsToken);
    const response = await instance.get(`/institutions/institution/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status === 200) {
      // console.log(response.data)

      const model = jsonToSchool(response.data.data);
      return model;
    }
    return response;
  } catch (e) {
    if (e instanceof axios.AxiosError) {
      let message = e.toString();
      if ('message' in e.response.data) {
        message = e.response.data.message;
      } else {
        message = e.response.statusText;
      }
      throw new ApiError(message, e.response.status);
    }
    throw new ConnectionError(
      'Sucedió algo inesperado, revisa tu conexión a internet'
    );
  }
};


const getNameSchool = async (uuid) => {
  try {
    // const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/get-by-uuid/${uuid}`
    )
    if (response.status === 200) {
      return response.data.data
    }
    throw new Error(response.status)
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

const changeLogoSchool = async (id, image) => {
  try {
    const token = localStorage.getItem(lsToken)
    const formData = new FormData()
    formData.append('image', image, image.name)
    const response = await instance.put(
      `/institutions/institution/change-logo/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent></calculated>',
          // 'Accept-Encoding': 'gzip, deflate, br',
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data
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

const finishSettingsSchool = async (id) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/finish-settings/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data
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
const getUserBySchool = async (id) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(
      `/institutions/institution/${id}/users/`,
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

const createUserBySchool = async (id, data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${id}/users/create`,
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

const editUserBySchool = async (id, idUser, user) => {
  try {
    const data = userToJson(user)
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(
      `/institutions/institution/${id}/users/edit/${idUser}`,
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
        message = e.response.data.message
      } else if ('detail' in e.response.data) {
        message = e.response.data.detail
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new Error(
      e.message
    )
  }
}

const searchUsersBySchool = async (id, textSearch) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${id}/users/search`,
      { text_search: textSearch },
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
const searchInvoicesBySchool = async (id, textSearch) => {
  // console.log(id, textSearch);
  
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      `/institutions/institution/${id}/invoice/search`,
      { text_search: textSearch },
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

const changePasswordAllUsersBySchool = async (id, idUser, newPassword) => {
  // recupera password de cualquier usuario de la escuela, siempre y cuando el usuario
  // que hace la peticion sea super user
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(
      `/institutions/institution/${id}/auth/change-password-all/`,
      {
        id: idUser
      },
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
        message = e.response.data.message
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new Error(
      e.message
    )
  }
}

const changePasswordBySchool = async (idSchool, idUser, password) => {
  // Recupera el password de un usuario solo permite cambiarla
  // si el que esta haciendo la peticion es el logueado
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.put(
      `/institutions/institution/${idSchool}/auth/change-password/`,
      {
        id: idUser,
        new_password: password
      },
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
        message = e.response.data.message
      } else {
        message = e.response.statusText
      }
      throw new ApiError(message, e.response.status)
    }
    throw new Error(
      e.message
    )
  }
}


const changeBackgroundSchool = async (id, background) => {
  try {
    const token = localStorage.getItem(lsToken)

    // Convertir la imagen a bytes usando FileReader
    const reader = new FileReader()
    reader.readAsDataURL(background)
    reader.onload = async function () {
      const bytes = reader.result.split(',')[1] // Obtiene solo los bytes de la imagen

      // Preparar la solicitud con los bytes de la imagen
      const response = await instance.put(
        `/institutions/institution/change-background/${id}`,
        { data: bytes }, // Aquí enviamos los bytes de la imagen en el cuerpo de la solicitud
        {
          headers: {
            'Content-Type': 'application/json', // Cambiamos el tipo de contenido a JSON
            Authorization: 'Bearer ' + token
          }
        }
      )

      if (response.status === 200) {
        return response.data
      }
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
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const getAllInvoices = async (idSchool) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/invoice-all/`,
    {
        headers: {
          Authorization: 'Bearer ' + token
        }
    })
    if (response.status === 200) {
      return response.data.data.results
    }
    console.log(response)
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

const SchoolsService = {
  createSchool,
  getSchools,
  editSchool,
  getSchool,
  changeLogoSchool,
  finishSettingsSchool,
  searchSchools,
  getUserBySchool,
  createUserBySchool,
  searchUsersBySchool,
  searchInvoicesBySchool,
  changePasswordBySchool,
  editUserBySchool,
  changePasswordAllUsersBySchool,
  getNameSchool,
  changeBackgroundSchool,
  getAllInvoices
}

export default SchoolsService
