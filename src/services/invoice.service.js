import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getAllInvoices = async (idSchool, page) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.get(`/institutions/institution/${idSchool}/invoice`,
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

const invoicesService = {
    getAllInvoices
}

export default invoicesService
