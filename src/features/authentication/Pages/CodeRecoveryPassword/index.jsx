import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import React from 'react-dom'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import assetBannerAuth from '../../../../Assets/Fondo3.png'
import assetIcon from '../../../../Assets/icon-white.png'
import Button, { ButtonSecondary, StatusButton } from '../../../../common/Components/Buttons'
import { TitleFormStyled, Form, InputErrorStyled } from '../../../../common/Components/Form'
import AuthService from '../../../../services/auth.service.js'
import { routesNamesAuth } from '../../Routes/routesNames'
import { ContainerButtonsCode, InputCode, HeaderLogin, ContainerInputsCodes, ContainerFormCodeRecovery } from '../CodeRecoveryPassword/CodeRecoveryPasswordStyled'
import LoginStyled, { ContainerCreateAccount } from '../Login/LoginStyled'

import useErrorHandling from '@/common/hooks/useErrorCustom'

const CodeRecoveryPassword = () => {
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()

  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const { register, handleSubmit, setFocus, formState: { errors }, setValue } = useForm()
  const navigate = useNavigate()
  useEffect(() => {
    console.log(errorMessage)
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    if (pastedText.length === 6) {
      setValue('code1', pastedText[0])
      setValue('code2', pastedText[1])
      setValue('code3', pastedText[2])
      setValue('code4', pastedText[3])
      setValue('code5', pastedText[4])
      setValue('code6', pastedText[5])
    } else {
      toast.error('Codigo con el formato incorrecto')
    }
  }
  const onSubmit = async data => {
    try {
      setStatusBtn(StatusButton.Loading)
      const code = data.code1.toString() + data.code2.toString() + data.code3.toString() + data.code4.toString() + data.code5.toString() + data.code6.toString()
      const response = await AuthService.validatePinCode(code)
      if (response.status === 200) {
        setStatusBtn(StatusButton.Enabled)
        navigate(routesNamesAuth.changePasswordPage)
      }
    } catch (e) {
      console.log(e)
      setStatusBtn(StatusButton.Enabled)
      handleErrors(e)
    }
  }

  return (

    <LoginStyled>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ease: 'easeOut', duration: 0.5 }} exit={{ opacity: 0 }}className='container-global'>

        <figure className='container-banner'>
          <div className="image-container">
            <img className='banner' src={assetBannerAuth} alt="banner" />
            <div className='container-content-banner'>
              <div className='container-icon'>
                <img className='icon' src={assetIcon} alt="" />
              </div>
              <h1 className='welcome-text'></h1>
              <p className='information-welcome'>Escribe el código <br /> que llego por correo eléctronico</p>
            </div>

          </div>
        </figure>

        <ContainerFormCodeRecovery>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <HeaderLogin>
            <TitleFormStyled>Código</TitleFormStyled>
          </HeaderLogin>
          <Form bottom='125px' onSubmit={handleSubmit(onSubmit)}>
            <ContainerInputsCodes>
              <InputCode
                type="text"
                maxLength={1}
                {...register('code1', {
                  valueAsNumber: true,
                  pattern: '[0-9]',
                  required: 'El campo es requerido',
                  onChange: (e) => {
                    if (e.target.value !== '' && e.target.value !== undefined) {
                      console.log(e.target.value)
                      setFocus('code2')
                    }
                  }
                })}
                aria-invalid={errors.code1 ? 'true' : 'false'}
                onPaste={handlePaste}
            />
              {
                <InputErrorStyled>
                  errors.email
                </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.email?.message}
                </InputErrorStyled>
                            }
              <InputCode
                                type="text"
                                maxLength={1}

                                {...register('code2', {
                                  valueAsNumber: true,
                                  pattern: '[0-9]',
                                  required: 'El campo es requerido',
                                  onChange: (e) => {
                                    if (e.target.value !== '' && e.target.value !== undefined) {
                                      console.log(e.target.value)
                                      setFocus('code3')
                                    }
                                  }
                                })}
                                aria-invalid={errors.code2 ? 'true' : 'false'}
                            />
              {
                <InputErrorStyled>
                  errors.email
                </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.email?.message}
                </InputErrorStyled>
                            }

              <InputCode
                  type="text"
                  maxLength={1}
                                {...register('code3', {
                                  valueAsNumber: true,
                                  pattern: '[0-9]',
                                  required: 'El campo es requerido',
                                  onChange: (e) => {
                                    if (e.target.value !== '' && e.target.value !== undefined) {
                                      console.log(e.target.value)
                                      setFocus('code4')
                                    }
                                  }
                                })}
                                aria-invalid={errors.code3 ? 'true' : 'false'}
                            />
              {
                <InputErrorStyled>
                  errors.email
                </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.email?.message}
                </InputErrorStyled>
                            }

              <InputCode
                                type="text"
                                maxLength={1}
                                {...register('code4', {
                                  valueAsNumber: true,
                                  pattern: '[0-9]',
                                  required: 'El campo es requerido',
                                  onChange: (e) => {
                                    if (e.target.value !== '' && e.target.value !== undefined) {
                                      console.log(e.target.value)
                                      setFocus('code5')
                                    }
                                  }
                                })}
                                aria-invalid={errors.code4 ? 'true' : 'false'}
                            />
              {
                <InputErrorStyled>
                  errors.email
                </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.email?.message}
                </InputErrorStyled>
                            }

              <InputCode
                                type="text"
                                maxLength={1}
                                {...register('code5', {
                                  valueAsNumber: true,
                                  pattern: '[0-9]',
                                  required: 'El campo es requerido',
                                  onChange: (e) => {
                                    if (e.target.value !== '' && e.target.value !== undefined) {
                                      console.log(e.target.value)
                                      setFocus('code6')
                                    }
                                  }
                                })}
                                aria-invalid={errors.code5 ? 'true' : 'false'}
                            />
              {
                <InputErrorStyled>
                  errors.email
                </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.email?.message}
                </InputErrorStyled>
                            }

              <InputCode
                                type="text"
                                maxLength={1}
                                {...register('code6', {
                                  valueAsNumber: true,
                                  pattern: '[0-9]',
                                  required: 'El campo es requerido'
                                })}
                                aria-invalid={errors.code6 ? 'true' : 'false'}
                            />
              {
                <InputErrorStyled>
                  errors.email
                </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.email?.message}
                </InputErrorStyled>
                            }
            </ContainerInputsCodes>
            <ContainerButtonsCode>
              <ButtonSecondary top='50px' color='white' type='button' onClick={() => navigate(-1)} status={statusBtn} >Atrás</ButtonSecondary>
              <Button top='50px' color='white' type='submit' status={statusBtn} >Siguiente</Button>
            </ContainerButtonsCode>

          </Form>
          <ContainerCreateAccount>
            <p ></p>
          </ ContainerCreateAccount>
        </ContainerFormCodeRecovery>
      </motion.div>

    </LoginStyled>

  )
}

export default CodeRecoveryPassword
