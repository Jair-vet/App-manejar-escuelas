import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const cycleSlice = createSlice({
  name: 'cycle',
  initialState,
  reducers: {
    changeCycle: (state, action) => {
      const { start, end, id } = action.payload
      return { ...state, id, start, end }
    }
  }
})

export const { changeCycle } = cycleSlice.actions
export default cycleSlice.reducer
