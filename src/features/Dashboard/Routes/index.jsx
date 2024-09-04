import DetailUserPage from '../Pages/DetailUser'
import Profile from '../Pages/Profile/Profile'
import ProfileSchool from '../Pages/Profile/ProfileSchool'
import DetailSchoolsPage from '../Pages/SchoolDetail'
import SchoolsPage from '../Pages/Schools/'
import Users from '../Pages/Users'

import { routesNamesDashboard } from './routesNames'

import RequireAuth from '@/common/hooks/auth_guard'

const routesDashboard = [
  {
    path: routesNamesDashboard.users,
    element: <RequireAuth> < Users/> </ RequireAuth>
  },
  {
    path: routesNamesDashboard.profile,
    element: <RequireAuth> < Profile/> </RequireAuth>
  },
  {
    path: routesNamesDashboard.detailUser,
    element: <RequireAuth> < DetailUserPage /> </RequireAuth>
  },
  {
    path: routesNamesDashboard.addUser,
    element: <RequireAuth> < DetailUserPage /> </RequireAuth>
  },
  {
    path: routesNamesDashboard.schools,
    element: <RequireAuth> < SchoolsPage /> </RequireAuth>
  },
  {
    path: routesNamesDashboard.profileSchool,
    element: <RequireAuth> < ProfileSchool/> </RequireAuth>
  },
  {
    path: routesNamesDashboard.addSchool,
    element: <RequireAuth>< DetailSchoolsPage /></RequireAuth>
  },
  {
    path: routesNamesDashboard.detailSchool,
    element: <RequireAuth>< DetailSchoolsPage /></RequireAuth>
  }
]

export default routesDashboard
