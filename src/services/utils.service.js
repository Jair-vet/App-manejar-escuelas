import axios, { AxiosError } from 'axios'

import { baseApiCP } from '../common/constants/constants'

import { ApiError } from '@/common/erros/errors'

export const instance = axios.create({
  baseURL: baseApiCP
})

const validatePostalCode = async (postalcode) => {
  try {
    const response = await instance.post(
      '/validate_postal_code',
      {
        postal_code: postalcode
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
    throw new Error(
      e.message.toString()
    )
  }
}

const UtilsService = {
  validatePostalCode
}

export default UtilsService
