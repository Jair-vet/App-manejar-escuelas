import { createSlice } from '@reduxjs/toolkit'

const initialState = { titleHeader: 'Inicio', showArrow: false, step: 0 }

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeTitle: (state, action) => {
      const { titleHeader, showArrow } = action.payload

      return { ...state, titleHeader, showArrow }
    },
    changeViewIsArrowBack: (state, action) => {
      const { showArrow } = action.payload

      return { ...state, showArrow }
    },
    changeSchoolSettings: (state, action) => {
      const { step } = action.payload

      return { ...state, step }
    }
  }
})

export const { changeTitle, changeSchoolSettings, changeViewIsArrowBack } = globalSlice.actions
export default globalSlice.reducer
