import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    changeStudent: (state, action) => {
      const data = action.payload
      return { ...state, data }
    }
  }
})

export const { changeStudent } = studentSlice.actions
export default studentSlice.reducer
