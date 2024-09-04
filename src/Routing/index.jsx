import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import AuthLayout from '../features/Authentication/Pages/AuthLayout'
import routesAuth from '../features/Authentication/Routes'
import DashboardLayout from '../features/Dashboard/Pages/DashBoardLayout'
import routesDashboard from '../features/Dashboard/Routes'

import { routesNames } from './routesNames'

// import InstitutionSettingsLayout from '@/features/Institution/Pages/InstitutionFirstSettingsLayout'
import InstitutionLayout from '@/features/Institution/Pages/InstitutionLayout'
import InstitutionSettingsLayout from '@/features/Institution/Pages/SchoolSettingsSteps/InstitutionFirstSettingsLayout'
import routesInstitution, { routesInstitutionSettings } from '@/features/Institution/Routes'

// import RequireAuth from '@/common/hooks/auth_guard'

const router = createBrowserRouter([
  {
    path: routesNames.initPage,
    element: <AuthLayout />,
    children: routesAuth
  },
  {
    path: routesNames.dashboardPage,
    element: <DashboardLayout />,
    children: routesDashboard
  },
  {
    path: routesNames.institutionSettingsPage,
    element: <InstitutionSettingsLayout />,
    children: routesInstitutionSettings
  },
  {
    path: routesNames.institutionPage,
    element: <InstitutionLayout />,
    children: routesInstitution
  }
])

export default router
