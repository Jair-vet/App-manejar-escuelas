import { AxiosError } from 'axios'

import instance from './baseApi'

import { jsonToUser, userToJson } from '@/common/Models/UserModel'
import { constantImageUrlUsers } from '@/common/constants/constants'
import { lsProfilePhoto, lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getUsers = async (page) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.get(
      `/users/all?page=${page}`, {
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

const searchUsers = async (searchText) => {
  try {
    const token = localStorage.getItem(lsToken)

    const response = await instance.post(
      '/users/search', { text_search: searchText }, {
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
const createUser = async (data) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      '/users/user/create/',
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

const editUser = async (id, user) => {
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
    throw new ConnectionError('Sucedio algo inesperado, revisa tu conexión a internet' + e.toString())
  }
}

const getUser = async (id) => {
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

const changePhotoUser = async (id, image) => {
  try {
    const token = localStorage.getItem(lsToken)
    const formData = new FormData()
    formData.append('image', image, image.name)
    const response = await instance.put(
      `/users/user/change-photo/${id}`,
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
      const url = constantImageUrlUsers + response.data.data.profile_photo
      localStorage.setItem(lsProfilePhoto, url)
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

const sendAccessUser = async (id, link, subject, password) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(
      '/users/user/send-access-email/',
      {
        id,
        link,
        subject,
        password
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (response.status === 200) {
      return response.data
    }
    throw new ApiError(response.statusText, response.status)
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
      e.message.toString()
    )
  }
}

const changePasswordUser = async (id, image) => {
  try {
    const token = localStorage.getItem(lsToken)
    const formData = new FormData()
    formData.append('image', image, image.name)
    const response = await instance.put(
      `/users/user/change-photo/${id}`,
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
      const url = constantImageUrlUsers + response.data.data.profile_photo
      localStorage.setItem(lsProfilePhoto, url)
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
const UsersService = {
  createUser,
  getUser,
  getUsers,
  editUser,
  searchUsers,
  changePhotoUser,
  sendAccessUser,
  changePasswordUser
}

export default UsersService
