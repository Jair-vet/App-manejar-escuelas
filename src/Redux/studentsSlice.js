import { createSlice } from '@reduxjs/toolkit'

const initialState = { cycle: '' }

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    cangeSelectFilterTable: (state, action) => {
      const { cycle } = action.payload
      return { ...state, cycle }
    }
  }
})

export const { cangeSelectFilterTable } = studentsSlice.actions
export default studentsSlice.reducer
