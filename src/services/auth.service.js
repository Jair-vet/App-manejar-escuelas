import axios, { AxiosError } from 'axios'

import { lsCode, lsEmail, lsId, lsModules, lsName, lsProfilePhoto, lsRol, lsRolName, lsToken, lsUserName } from '../common/constants/localStorageConstants'

import instance from './baseApi'

import { baseApi, constantImageUrlUsers } from '@/Common/constants/constants'
import { ApiError, ConnectionError } from '@/Common/erros/errors'
import EncryptTools from '@/Common/utils/encrypt'

const instanceAuth = axios.create({
  baseURL: baseApi
})

const login = async (data) => {
  try {
    const response = await instanceAuth.post('/users/auth/login', data)
    if (response.status === 200) {
      localStorage.setItem(lsToken, response.data.data.token_auth)
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
const sendEmailPinCode = async (data) => {
  try {
    const response = await instanceAuth.post('/users/auth/submit-pin-code', data)
    if (response.status === 200) {
      const value = EncryptTools.encrypt(data.username_or_email)
      localStorage.setItem(lsEmail, value)
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.response.status)
      throw new ApiError('', e.response.status)
    }
    throw new Error(
      e.toString()
    )
  }
}
const validatePinCode = async (codeInput) => {
  try {
    const value = localStorage.getItem(lsEmail)
    const email = EncryptTools.decrypt(value)
    const response = await instanceAuth.post('/users/auth/pin-code-validate', {
      code: codeInput,
      username_or_email: email
    })
    if (response.status === 200) {
      const value = EncryptTools.encrypt(codeInput)
      localStorage.setItem(lsCode, value)
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.response.status)
      throw new ApiError('', e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}
const changePassword = async (data) => {
  try {
    const emailValue = localStorage.getItem(lsEmail)
    const email = EncryptTools.decrypt(emailValue)
    const codeValue = localStorage.getItem(lsCode)
    const code = EncryptTools.decrypt(codeValue)

    data.username_or_email = email
    data.code = code
    data.new_password = data.password

    const response = await instanceAuth.post('/users/auth/change-password', data)
    if (response.status === 200) {
      localStorage.clear()
    }
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.response.status)
      throw new ApiError('', e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}

const changePasswordUserSignIn = async (idUser, newpassword) => {
  // CAMBIA LA CONTRASEÑA DEL USUARIO LOGUEADO
  try {
    const response = await instanceAuth.post('/users/auth/change-password/logged-in/', { new_password: newpassword, id: idUser })
    if (response.status === 200) {
      localStorage.clear()
    }
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      let message = error.toString()
      if ('message' in error.response.data) {
        message = error.response.data.message
      }
      throw new Error(message)
    }
    throw new Error(
      error.message.toString()
    )
  }
}

const refreshToken = async () => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get('/users/auth/refresh-token',
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    if (response.status === 200) {
      const modules = JSON.stringify(response.data.data.rol.modules)
      localStorage.setItem(lsId, response.data.data.id)
      localStorage.setItem(lsToken, response.data.data.token)
      localStorage.setItem(lsModules, modules)
      localStorage.setItem(lsUserName, response.data.data.username)
      localStorage.setItem(lsName, response.data.data.name)
      localStorage.setItem(lsEmail, response.data.data.email)
      localStorage.setItem(lsProfilePhoto, response.data.data.profile_photo)
      localStorage.setItem(lsRolName, response.data.data.rol.name)
      localStorage.setItem(lsRol, response.data.data.rol.id)
      localStorage.setItem(lsId, response.data.data.id)
      return response.data.data
    }
    return response
  } catch (e) {
    localStorage.clear()
    if (e instanceof AxiosError) {
      console.log(e.response.status)
      throw new ApiError('', e.response.status)
    }
    throw new ConnectionError(
      'Sucedio algo inesperado, revisa tu conexión a internet'
    )
  }
}
const logout = () => {
  localStorage.clear()
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const loginSchool = async (idSchool, data) => {
  try {
    const response = await instanceAuth.post(`/institutions/institution/${idSchool}/auth/login/`, data)
    if (response.status === 200) {
      localStorage.setItem(lsToken, response.data.data.token_auth)
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

const AuthService = {
  login,
  sendEmailPinCode,
  logout,
  getCurrentUser,
  validatePinCode,
  changePassword,
  refreshToken,
  loginSchool,
  changePasswordUserSignIn
}

export default AuthService
