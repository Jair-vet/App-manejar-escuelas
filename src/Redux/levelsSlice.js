import { createSlice } from '@reduxjs/toolkit'

const initialState = { levelsSelected: [], levelsWithMatters: [] }

export const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    changeLevels: (state, action) => {
      const { levelsSelected } = action.payload
      return { ...state, levelsSelected }
    },
    changeLevelsWithMatters: (state, action) => {
      const { levelsWithMatters } = action.payload
      return { ...state, levelsWithMatters }
    }
  }
})

export const { changeLevels, changeLevelsWithMatters } = levelsSlice.actions
export default levelsSlice.reducer
