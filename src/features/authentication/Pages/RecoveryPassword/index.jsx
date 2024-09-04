import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import React from 'react-dom'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import assetBannerAuth from '../../../../Assets/Fondo3.png'
import assetIcon from '../../../../Assets/icon-white.png'
import Button, { StatusButton } from '../../../../common/Components/Buttons'
import { Form, InputGroup, InputLabel, Input, TitleFormStyled, InputErrorStyled, ContainerForm } from '../../../../common/Components/Form'
import AuthService from '../../../../services/auth.service.js'
import { routesNamesAuth } from '../../Routes/routesNames'
import LoginStyled, { ContainerCreateAccount, HeaderLogin } from '../Login/LoginStyled'

import useErrorHandling from '@/common/hooks/useErrorCustom'

const RecoveryPassword = () => {
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()

  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const { register, handleSubmit, formState: { errors } } = useForm()
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
      const response = await AuthService.sendEmailPinCode(data)
      if (response.status === 200) {
        navigate(routesNamesAuth.codeRecoveryPasswordPage)
        setStatusBtn(StatusButton.Enabled)
        toast.success('Correo enviado')
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
              <p className='information-welcome'>Escribe tu correo o tu usuario <br /> para enviar código de recuperación</p>
            </div>

          </div>
        </figure>

        <ContainerForm>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <HeaderLogin>
            <TitleFormStyled>Recuperación de contraseña</TitleFormStyled>
          </HeaderLogin>
          <Form bottom='125px' onSubmit={handleSubmit(onSubmit)}>
            <div className='container-fields'>
              <InputGroup>
                <InputLabel htmlFor="username_or_email">Usuario</InputLabel>

                <Input
                {...register('username_or_email', { required: 'El campo es requerido' })}
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
              <Button top='50px' color='white' type='submit' status={statusBtn} >Siguiente</Button>
            </div>

          </Form>
          <ContainerCreateAccount>
            <p></p>
          </ ContainerCreateAccount>
        </ContainerForm>
      </motion.div>

    </LoginStyled>

  )
}

export default RecoveryPassword
