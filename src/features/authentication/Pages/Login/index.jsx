import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router-dom'

import assetBannerAuth from '../../../../Assets/Fondo3.png'
import assetIcon from '../../../../Assets/icon-white.png'
import Button, { StatusButton } from '../../../../common/Components/Buttons'
import { Form, InputGroup, InputLabel, Input, TitleFormStyled, InputErrorStyled, ContainerForm } from '../../../../common/Components/Form'
import AuthService from '../../../../services/auth.service'
import { routesNamesAuth } from '../../Routes/routesNames'
import { LoginStyled, HeaderLogin, FooterLogin } from '../Login/LoginStyled'

// import { Checkbox } from '@/common/Components/Form/checkbox'
import { versionApp } from '@/Common/constants/constants'
import { lsSchoolId, lsSchoolLogo, lsSchoolName, lsSchoolUUID } from '@/Common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import { routesNamesDashboard } from '@/features/Dashboard/Routes/routesNames'
import { routesNamesInstitution, routesNamesInstitutionSettings } from '@/features/Institution/Routes/routesNames'
import SchoolsService from '@/services/schools.service'

const Login = () => {
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { id } = useParams()
  const [showPassword, setShowPassword] = useState(false)
  const [passwordSeeSpaces, setPasswordSeeSpaces] = useState(false)
  const [username, setUsername] = useState('')
  const [rememberCredencial, setRememberCredential] = useState('')
  // const [rememberUser, setRememberUser] = useState('')
  // const [rememberPassword, setRememberPassword] = useState('')
  const [school, setSchool] = useState(undefined)

  const navigate = useNavigate()

  const getDataSchool = async () => {
    try {
      const schoolsResponse = await SchoolsService.getNameSchool(id)
      setSchool(schoolsResponse)
    } catch (e) {

    }
  }

  const validateAuth = async () => {
    try {
      const response = await AuthService.refreshToken()
      if (id !== undefined) {
        if (response.rol.id === 3) {
          navigate(routesNamesInstitution.admin)
        }
      } else {
        if (response.rol.id === 1) {
          navigate(routesNamesInstitution.schools)
        }
      }
    } catch (e) {
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      getDataSchool()
    }
    validateAuth()
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }


  const onSubmit = async data => {
    try {
      setStatusBtn(StatusButton.Loading)
      localStorage.clear()

      if (data.password.trim() !== data.password) {
        setPasswordSeeSpaces(true)
        throw Error()
      } else {
        setPasswordSeeSpaces(false)
      }

      if (id === undefined) {
        await AuthService.login(data)
      } else {
        await AuthService.loginSchool(id, data)
      }

      if (rememberCredencial) {
        localStorage.setItem('rememberUser', data.username_or_email)
        localStorage.setItem('rememberPassword', data.password)
      }
      const response = await AuthService.refreshToken()

      if (response.rol.id === 1) {
        navigate(routesNamesDashboard.users)
      } else if (response.rol.id === 3) {
        const schoolsResponse = await SchoolsService.getSchool(response.id_institution)
        setStatusBtn(StatusButton.Enabled)
        localStorage.setItem(lsSchoolId, response.id_institution)
        localStorage.setItem(lsSchoolUUID, response.uuid_institution)
        localStorage.setItem(lsSchoolLogo, schoolsResponse.logo)
        localStorage.setItem(lsSchoolName, schoolsResponse.name)
        // setSchool(schoolsResponse)
        if (schoolsResponse.stepSetting === 0) {
          navigate(routesNamesInstitutionSettings.oneStep)
        } else {
          navigate(routesNamesInstitution.admin)
        }
      } else {
        toast.error('Sin permisos necesarios, contacte con el administrador')
      }
    } catch (e) {
      setStatusBtn(StatusButton.Enabled)
      handleErrors(e)
    }
  }

  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  return (
    <LoginStyled>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ease: 'easeOut', duration: 0.5 }} exit={{ opacity: 0 }} className='container-global'>
        <figure className='container-banner'>
          <div className="image-container">
            <div className='container-content-banner'>
              <div className='container-icon'>
                <img className='icon' src={assetIcon} alt="" />
              </div>
              <h1 className='welcome-text'>Bienvenido <br /> {school !== undefined ? school.name : ''}</h1>
              { school !== undefined ? <p className='information-welcome'>Ingresa y empieza a usar Ssusy </p> : <p className='information-welcome'>Ingresa y empieza a usar Ssusy <br /> o crea una cuenta </p> }
            </div>
            <img className='banner' src={assetBannerAuth} alt="banner" />
          </div>
        </figure>
        <ContainerForm>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <HeaderLogin>
            {username && <div>Bienvenido, {username}</div>}
            <TitleFormStyled>Iniciar Sesión</TitleFormStyled>
          </HeaderLogin>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fields">
              <InputGroup>
                <InputLabel htmlFor="username_or_email" placeholder='Usuario o correo' >Usuario</InputLabel>
                <Input
                  {...register('username_or_email', { required: 'El usuario es requerido' })}
                  aria-invalid={errors.username_or_email ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.username_or_email
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.username_or_email?.message}
                  </InputErrorStyled>
                }

              </InputGroup>

              <InputGroup>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <div className='position-password'>
                  <Input
                    {...register('password', { required: 'La contraseña es requerida' })}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    type={showPassword ? 'text' : 'password'}
                  // value={rememberPassword || ''}
                  // onChange={(e) => { setRememberPassword(e.target.value) }}
                  />
                  <div className='see-password'>
                    {showPassword
                      ? (
                        <PiEyeLight
                          size='1.2rem'
                          color='#13C5A4'
                          onClick={togglePasswordVisibility}
                        />
                        )
                      : (
                        <PiEyeClosedLight
                          className='eyes'
                          size='1.2rem'
                          color='#13C5A4'
                          onClick={togglePasswordVisibility}
                        />
                        )}
                  </div>
                </div>
                {
                  passwordSeeSpaces && (
                    <InputErrorStyled>
                      La contraseña tiene espacios.
                    </InputErrorStyled>
                  )
                }
                {
                  <InputErrorStyled>
                    errors.password
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.password?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <FooterLogin>
                {/* <Checkbox
                id='rememberCredentials'
                name='check-remeber-credentials'
                label='Recordar'
                value={rememberCredencial}
                onChange={handleCheckbox}
                checked= {!!rememberCredencial}
                disabled={false}
                >
                </Checkbox>
                */}
                {id === undefined && (<span className='recovery-password'>
                  <a onClick={() => navigate(routesNamesAuth.recoveryPasswordPage)} >Recuperar contraseña</a>
                </span>)}
              </FooterLogin>

              <Button sizeize={'medium'} top='50px' color='white' type='submit' status={statusBtn} >Iniciar sesión</Button>
            </div>

          </Form>
          <span className='version'>versión {versionApp}</span>
        </ContainerForm>
      </motion.div>
    </LoginStyled >

  )
}

Login.propTypes = {
  children: PropTypes.node
}

export default Login
