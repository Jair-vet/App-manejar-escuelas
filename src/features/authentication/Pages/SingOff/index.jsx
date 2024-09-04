import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

import { routesNamesAuth } from '../../Routes/routesNames'

import SignOffStyled, { SignOffOption } from './SingOffStyled'

import Button from '@/common/Components/Buttons'
import { lsRol, lsSchoolUUID } from '@/common/constants/localStorageConstants'
import { routesNamesDashboard } from '@/features/Dashboard/Routes/routesNames'
import AuthService from '@/services/auth.service'
import '../../../../App/Apps.css'

const SignOff = ({ closeMenu }) => {
  const MenuOption = ['Perfil']
  const navigate = useNavigate()
  const rol = localStorage.getItem(lsRol)

  const showAlert = () => {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de que deseas cerrar la sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'my-swal-container',
        title: 'my-swal-title custom-font',
        text: 'my-swal-text custom-font',
        confirmButton: 'my-swal-confirm-button',
        cancelButton: 'my-swal-cancel-button',
        icon: 'custom-icon-color'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirm()
      }
    })
  }

  const handleConfirm = async () => {
    try {
      const uuid = localStorage.getItem(lsSchoolUUID)
      if (rol.toString() === '3' || rol.toString() === '4') {
        navigate(`${routesNamesAuth.loginPage}${uuid}`)
      } else {
        navigate(routesNamesAuth.loginPage)
      }
      AuthService.logout()
      closeMenu()
    } catch (error) {
      console.log('Error al cerrar sesión', error)
    }
  }

  const handleNavigation = (option) => {
    if (option === 'Perfil') {
      navigate(routesNamesDashboard.profile)
    } else if (option === 'Perfil de Escuela' && rol === '3') {
      navigate(routesNamesDashboard.profileSchool)
    }
  }

  return (
    <SignOffStyled>
      <SignOffOption>
        <ul>
          {MenuOption.map((option) => {
            if (!(option === 'Perfil de Escuela' && rol !== '3')) {
              return (
                <li key={option} onClick={() => handleNavigation(option)}>
                  {option}
                </li>
              )
            }
            return null
          })}
        </ul>
      </SignOffOption>
      <div className="container-button">
        <Button
          color="white"
          onClick={showAlert}
          size="extraLarge"
          border="1px solid #13C5A4"
        >
          Cerrar Sesión
        </Button>
      </div>
    </SignOffStyled>
  )
}

SignOff.propTypes = {
  closeMenu: PropTypes.func
}

export default SignOff
