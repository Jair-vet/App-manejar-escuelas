import { AxiosError } from 'axios'

import instance from './baseApi'

import { lsToken } from '@/common/constants/localStorageConstants'
import { ApiError, ConnectionError } from '@/common/erros/errors'

const getAllPayments = async (idSchool, idCycle, statusPayment, page) => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await instance.post(`/institutions/institution/${idSchool}/payments?page=${page}`,
      {
        cycle: idCycle,
        status_payment: statusPayment
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

const paymentsService = {
  getAllPayments
}

export default paymentsService
