import { createSlice } from '@reduxjs/toolkit'

const initialState = { id: undefined, name: undefined, modules: [] }

export const globalSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeName: (state, action) => {
      const { name, id } = action.payload

      return { ...state, id, name }
    },
    changeModules: (state, action) => {
      const { modules } = action.payload

      return { ...state, modules }
    },
    clearUser: (state, action) => {
      return { id: undefined, name: undefined, modules: [] }
    }
  }
})

export const { changeName, changeModules } = globalSlice.actions
export default globalSlice.reducer
