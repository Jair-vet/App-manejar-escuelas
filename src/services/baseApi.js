import axios from 'axios'

import { baseApi } from '../common/constants/constants'

export const instance = axios.create({
  baseURL: baseApi
})

export default instance
