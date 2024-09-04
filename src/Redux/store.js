import { configureStore } from '@reduxjs/toolkit'

import adminReduce from '../Redux/adminSlice'
import cycleReducer from '../Redux/cycleSlice'
import globalReduce from '../Redux/globalSlice'
import levelsReducer from '../Redux/levelsSlice'
import mattersStudentReducer from '../Redux/mattersStudentSlice'
import studentReducer from '../Redux/studentSlice'
import studentsReducer from '../Redux/studentsSlice'
import userReduce from '../Redux/userSlice'

export const store = configureStore({
  reducer: {
    global: globalReduce,
    user: userReduce,
    levels: levelsReducer,
    cycle: cycleReducer,
    admin: adminReduce,
    student: studentReducer,
    students: studentsReducer,
    mattersStudent: mattersStudentReducer
  }
})
