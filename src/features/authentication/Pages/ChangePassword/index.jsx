import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import React from 'react-dom'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import assetBannerAuth from '../../../../Assets/Fondo3.png'
import assetIcon from '../../../../Assets/icon-white.png'
import Button, { StatusButton } from '../../../../common/Components/Buttons'
import { Form, InputGroup, InputLabel, Input, TitleFormStyled, InputErrorStyled, ContainerForm } from '../../../../common/Components/Form'
import { routesNamesAuth } from '../../Routes/routesNames'
import LoginStyled, { ContainerCreateAccount, HeaderLogin } from '../Login/LoginStyled'

import useErrorHandling from '@/common/hooks/useErrorCustom'
import AuthService from '@/services/auth.service'

const ChangePassword = () => {
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()

  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const navigate = useNavigate()
  useEffect(() => {
    console.log(errorMessage)
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])
  const onSubmit = async data => {
    try {
      setStatusBtn(StatusButton.Loading)
      const response = await AuthService.changePassword(data)
      if (response.status === 200) {
        setStatusBtn(StatusButton.Enabled)
        toast.success('Contraseña cambiada correctamente')
        navigate(routesNamesAuth.loginPage)
      }
    } catch (e) {
      console.log(e)
      setStatusBtn(StatusButton.Enabled)
      handleErrors(e)
    }
  }

  return (

    <LoginStyled>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ease: 'easeOut', duration: 0.5 }} exit={{ opacity: 0 }} className='container-global'>
        <figure className='container-banner'>
          <div className="image-container">
            <img className='banner' src={assetBannerAuth} alt="banner" />
            <div className='container-content-banner'>
              <div className='container-icon'>
                <img className='icon' src={assetIcon} alt="" />
              </div>
              <h1 className='welcome-text'></h1>
              <p className='information-welcome'>Escribe tu nueva contraseña <br /> intenta minimo 6 caracteres</p>
            </div>

          </div>
        </figure>

        <ContainerForm>
          <Toaster
            position="top-center"
            reverseOrder={false}
        />
          <HeaderLogin>
            <TitleFormStyled>Cambio de contraseña</TitleFormStyled>
          </HeaderLogin>
          <Form bottom='125px' onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fields">
              <InputGroup>
                <InputLabel htmlFor="password">Nueva contraseña</InputLabel>
                <div className='position-password'>
                  <Input
                {...register('password', { required: 'La contraseña es requerida' })}
                aria-invalid={errors.password ? 'true' : 'false'}
                type={showPassword ? 'text' : 'password'}
                />
                  <div className='see-password'>
                    {showPassword
                      ? (
                        <PiEyeLight
                        color='#13C5A4'
                        size='1.2rem'
                        onClick={togglePasswordVisibility}
                  />
                        )
                      : (
                        <PiEyeClosedLight
                    color='#13C5A4'
                    size='1.2rem'
                    onClick={togglePasswordVisibility}
                  />
                        )}
                  </div>
                </div>

                {
                  <InputErrorStyled>
                    errors.password
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.password?.message}
                  </InputErrorStyled>
                            }
              </InputGroup>
              <Button top='50px' color='white' type='submit' status={statusBtn} >Aceptar</Button>
            </div>

          </Form>
          <ContainerCreateAccount>
            <p className=''></p>
          </ ContainerCreateAccount>
        </ContainerForm>
      </motion.div>
    </LoginStyled>

  )
}

export default ChangePassword
