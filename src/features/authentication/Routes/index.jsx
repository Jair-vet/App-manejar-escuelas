import ChangePassword from '../Pages/ChangePassword'
import CodeRecoveryPassword from '../Pages/CodeRecoveryPassword'
import Login from '../Pages/Login'
import RecoveryPassword from '../Pages/RecoveryPassword'

import { routesNamesAuth } from './routesNames'

const routesAuth = [
  {
    path: routesNamesAuth.loginPage,
    element: < Login />
  },
  {
    path: routesNamesAuth.loginInstitutionPage,
    element: < Login />
  },
  {
    path: routesNamesAuth.recoveryPasswordPage,
    element: < RecoveryPassword />
  },
  {
    path: routesNamesAuth.codeRecoveryPasswordPage,
    element: < CodeRecoveryPassword />
  },
  {
    path: routesNamesAuth.changePasswordPage,
    element: < ChangePassword />
  }
]

export default routesAuth
