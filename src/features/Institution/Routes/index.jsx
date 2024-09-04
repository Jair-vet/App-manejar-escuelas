import AccountsPayablePage from '../Pages/AccountsPayable/AccountsPayable'
import AdminPage from '../Pages/Admin'
import InvoicePage from '../Pages/Invoice/Invoice'
// import BillingsPage from '../Pages/Billings/Billings'
import OneStepSetting from '../Pages/SchoolSettingsSteps/OneStepSetting'
import DetailsStaffView from '../Pages/Staff/DetailsStaffView'
import EmployePage from '../Pages/Staff/EmployePage'
// import StaffView from '../Pages/Staff/StaffView'
import StudentsPage from '../Pages/Student/StudenView'
import DetailStudentPage from '../Pages/Student/StudentDetailsPage'
import DetailTeacherPage from '../Pages/Teachers/TeachersDetailPage'
import TeachersPage from '../Pages/Teachers/TeachersView'
import ModuleTutorView from '../Pages/Tutors/ModuleTutorView'
import DetailsTutorView from '../Pages/Tutors/TutorsDetailsPage/view/DetailsTutorView'
import UsersSchoolsPage from '../Pages/Users'
import CycleDetailPage from '../Pages/home/CycleDetail'
import HomeSchoolPage from '../Pages/home/CyclesActive'

import { routesNamesInstitution, routesNamesInstitutionSettings } from './routesNames'

import RequireAuth from '@/common/hooks/auth_guard'

const routesInstitution = [
  {
    path: routesNamesInstitution.home,
    element: <RequireAuth>< HomeSchoolPage/></RequireAuth>
  },
  {
    path: routesNamesInstitution.admin,
    element: <RequireAuth>< AdminPage/></RequireAuth>
  },
  {
    path: routesNamesInstitution.teachers,
    element: <RequireAuth>< TeachersPage/></RequireAuth>
  },
  {
    path: routesNamesInstitution.addteachers,
    element: <RequireAuth>< DetailTeacherPage/></RequireAuth>
  },
  {
    path: routesNamesInstitution.users,
    element: <RequireAuth>< UsersSchoolsPage/></RequireAuth>
  },
  // {
  // path: routesNamesInstitution.detailLevel,
  // element: <RequireAuth>< SchoolLevelDetailView/></RequireAuth>
  // },
  {
    path: routesNamesInstitution.studentDetail,
    element: <RequireAuth> <DetailStudentPage/> </RequireAuth>
  },
  {
    path: routesNamesInstitution.addstudents,
    element: <RequireAuth> <DetailStudentPage/> </RequireAuth>
  },
  {
    path: routesNamesInstitution.students,
    element: <RequireAuth> <StudentsPage/> </RequireAuth>
  },
  {
    path: routesNamesInstitution.tutors,
    element: <RequireAuth><ModuleTutorView/></RequireAuth>
  },
  {
    path: routesNamesInstitution.addTutor,
    element: <RequireAuth><DetailsTutorView/></RequireAuth>
  },
  // {
  //   path: routesNamesInstitution.addTutorExisten,
  //   element: <RequireAuth><ExistingTutor/></RequireAuth>
  // },
  {
    path: routesNamesInstitution.detailCycle,
    element: <RequireAuth><CycleDetailPage/></RequireAuth>
  }, {
    path: routesNamesInstitution.staff,
    element: <RequireAuth><EmployePage/></RequireAuth>
  },
  {
    path: routesNamesInstitution.addStaff,
    element: <RequireAuth><DetailsStaffView/></RequireAuth>
  },
  {
    path: routesNamesInstitution.detailStaff,
    element: <RequireAuth><DetailsStaffView/></RequireAuth>
  },
  {
    path: routesNamesInstitution.matters,
    element: <RequireAuth><DetailsStaffView/></RequireAuth>
  },
  {
    path: routesNamesInstitution.accountsPayable,
    element: <RequireAuth><AccountsPayablePage/></RequireAuth>
  },
  {
    path: routesNamesInstitution.invoice,
    element: <RequireAuth><InvoicePage/></RequireAuth>
  }
]

export const routesInstitutionSettings = [
  {
    path: routesNamesInstitutionSettings.oneStep,
    element: <RequireAuth>< OneStepSetting/></RequireAuth>
  }
  // {
  //   path: routesNamesInstitutionSettings.secondStep,
  //   element: <RequireAuth>< SecondStepSetting/></RequireAuth>
  // },
  // {
  //   path: routesNamesInstitutionSettings.thirdStep,
  //   element: <RequireAuth><ThirdStepSettings/></RequireAuth>
  // },
  // {
  //   path: routesNamesInstitutionSettings.fourthStep,
  //   element: <RequireAuth><FourthStepSetting/></RequireAuth>
  // },
  // {
  //   path: routesNamesInstitutionSettings.fiveStep,
  //   element: <RequireAuth><FiveStepSettings/></RequireAuth>
  // }
]

export default routesInstitution
