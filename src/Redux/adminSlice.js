import { createSlice } from '@reduxjs/toolkit'

const initialState = { tabSelected: 0 }

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    cangeSelectTab: (state, action) => {
      const { tabSelected } = action.payload
      return { ...state, tabSelected }
    }
  }
})

export const { cangeSelectTab } = adminSlice.actions
export default adminSlice.reducer
