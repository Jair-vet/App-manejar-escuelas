import { createSlice } from '@reduxjs/toolkit'

const initialState = { cycle: '' }

export const mattersStudent = createSlice({
  name: 'mattersStudent',
  initialState,
  reducers: {
    changeGroupCycleStudentSelect: (state, action) => {
      const { cycle } = action.payload
      return { ...state, cycle }
    }
  }
})

export const { changeGroupCycleStudentSelect } = mattersStudent.actions
export default mattersStudent.reducer
