import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthService from '../../services/auth.service'
import LoaderComponent from '../Components/LoaderComponent'
import PageStatus from '../Models/Enums'
import { lsRol, lsSchoolUUID } from '../constants/localStorageConstants'

import { routesNamesAuth } from '@/features/authentication/Routes/routesNames'

const RequireAuth = ({ children }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const rol = localStorage.getItem(lsRol)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        await AuthService.refreshToken()
        setIsAuthenticated(true)
        setLoading(false)
      } catch (e) {
        setIsAuthenticated(false)
        if (rol === 3 && rol === 4) {
          const uuid = localStorage.getItem(lsSchoolUUID)
          navigate()`${routesNamesAuth.loginPage}${uuid}`
        } else {
          navigate(routesNamesAuth.loginPage)
        }
      }
    }

    checkAuth()
  }, [navigate])

  if (loading) {
    // Renderizar un componente de carga o mensaje de espera mientras se verifica la autenticación.
    return <LoaderComponent message='' refreshAction={() => {}} status={PageStatus.LOADING} />
  }

  return isAuthenticated ? children : null // Render children only if authenticated
}

RequireAuth.propTypes = {
  children: PropTypes.node
}
export default RequireAuth
