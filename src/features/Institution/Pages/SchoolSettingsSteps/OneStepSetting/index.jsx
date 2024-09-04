import PropTypes from 'prop-types'
import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsCloudUploadFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { routesNamesInstitution } from '../../../Routes/routesNames'

import OneStepSettingStyled, { FormContainerStepStyled, ContainerFile } from './OneStepSettingStyled'

import { changeSchoolSettings } from '@/Redux/globalSlice'
import Button, { StatusButton } from '@/common/Components/Buttons'
import { Input, InputErrorStyled, InputGroup, InputLabel } from '@/common/Components/Form'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import PageStatus from '@/common/Models/Enums'
import { lsImageBackground, lsSchoolId, lsSchoolLogo } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import SchoolsService from '@/services/schools.service'

const OneStepSetting = ({
  showLabel = true,
  isDisabled = false,
  useRole,
  changeTextButton = 'Finalizar',
  customStyle,
  customPosition
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()
  const [school, setSchool] = useState({})
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedImageBackground, setselectedImageBackground] = useState(null)
  // const [selectedBackground, setSelectedBackground] = useState('')
  const [, setIsFileVisible] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fileInputRef = useRef(null)
  const fileBackgroundRef = useRef(null)
  const init = async () => {
    try {
      dispatch(changeSchoolSettings({ step: 1 }))
      const id = localStorage.getItem(lsSchoolId)
      const response = await SchoolsService.getSchool(id)
      setSchool(response)
      setValue('name', response.name)
      setValue('address', response.address)
      setValue('clave', response.clave)
      setValue('rfc', response.rfc)
    } catch (e) {
      handleErrors(e)
    }
  }

  const onSubmit = async (data) => {
    try {
      setPageStatus(PageStatus.LOADING)
      const response = await SchoolsService.editSchool(school.id, data)
      setSchool(response)

      if (selectedFile) {
        await SchoolsService.changeLogoSchool(school.id, selectedFile)
        const schoolsResponse = await SchoolsService.getSchool(school.id)
        localStorage.setItem(lsSchoolLogo, schoolsResponse.logo)
      }

      if (selectedImageBackground) {
        await SchoolsService.changeBackgroundSchool(school.id, selectedImageBackground)
        const schoolsResponse = await SchoolsService.getSchool(school.id)
        localStorage.setItem(lsImageBackground, schoolsResponse.image)
      }

      await SchoolsService.finishSettingsSchool(school.id)
      toast.success('Datos guardados correctamente')
      setPageStatus(PageStatus.SUCCESS)
      navigate(routesNamesInstitution.admin)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }

 

  const acceptedExtensions = ['.png', '.jpg', '.jpeg', '.svg']

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase()
      if (acceptedExtensions.includes(`.${extension}`)) {
        setSelectedFile(file)
        toast.success('Archivo seleccionado')
      } else {
        toast.error('Selecciona un archivo en formato PNG, JPG, JPGE o SVG')
      }
    }
    setIsFileVisible(false)
  }

  const handleBackgroundChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase()
      if (acceptedExtensions.includes(`.${extension}`)) {
        setselectedImageBackground(file)
        toast.success('Archivo cargado')
      } else {
        toast.error('Selecciona un archivo en formato PNG, JPG, JPGE o SVG')
      }
    }
    setIsFileVisible(false)
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    } else {
      toast.error('No se pudo encontrar el input de archivo')
    }
  }

  const handleClickBackground = () => {
    if (fileBackgroundRef.current) {
      fileBackgroundRef.current.click()
    } else {
      toast.error('No se pudo encontrar el input de archivo')
    }
  }

  const handleCancelImage = (event) => {
    event.stopPropagation()
    setSelectedFile(null)
    setIsFileVisible(false)
  }

  const handleCancelBackground = (event) => {
    event.stopPropagation()
    setselectedImageBackground(null)
    setIsFileVisible(false)
  }

  useEffect(() => {
    init()
  }, [])
  
  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  return (
    <OneStepSettingStyled
      syle={customStyle}
      position={customPosition}
    >

      {showLabel && <h1>Termina de configurar tu sistema</h1>}
      {useRole === 1 || useRole === 3 ? <h3>Datos de la Institución</h3> : null}
      {pageStatus === PageStatus.LOADING
        ? <OnlyLoaderComponent />
        : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainerStepStyled>
              <div className='item'>
                <InputGroup>
                  <InputLabel htmlFor='name'>Nombre</InputLabel>
                  <Input
                    width='85%'
                    {...register('name', { required: { value: true, message: 'El nombre es requerido' } })}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <InputErrorStyled>{errors.name.message}</InputErrorStyled>
                  )}
                </InputGroup>
              </div>
              <div className='item'>
                <InputGroup>
                  <InputLabel htmlFor='address'>Dirección</InputLabel>
                  <Input
                    width='85%'
                    {...register('address', { required: false })}
                    aria-invalid={errors.address ? 'true' : 'false'}
                  />
                  {errors.address && (
                    <InputErrorStyled>{errors.address.message}</InputErrorStyled>
                  )}
                </InputGroup>
              </div>
              <div className='item'>
                <InputGroup>
                  <InputLabel htmlFor='clave'>Clave</InputLabel>
                  <Input
                    width='85%'
                    {...register('clave', { required: false })}
                    aria-invalid={errors.clave ? 'true' : 'false'}
                  />
                  {errors.clave && (
                    <InputErrorStyled>{errors.clave.message}</InputErrorStyled>
                  )}
                </InputGroup>
              </div>
              <div className='item'>
                <InputGroup>
                  <InputLabel htmlFor='rfc'>RFC</InputLabel>
                  <Input
                    width='85%'
                    {...register('rfc', { required: false })}
                    aria-invalid={errors.rfc ? 'true' : 'false'}
                  />
                  {errors.rfc && (
                    <InputErrorStyled>{errors.rfc.message}</InputErrorStyled>
                  )}
                </InputGroup>
              </div>
              <div className='item'>
                <InputGroup>
                  <InputLabel htmlFor='clave'>Logo de Escuela</InputLabel>
                  <div
                    className={`upload-image ${selectedFile ? 'hidden' : ''}`}
                    onDrop={(event) => {
                      event.preventDefault()
                      const file = event.dataTransfer.files[0]
                      if (file) {
                        const extension = file.name.split('.').pop().toLowerCase()
                        if (acceptedExtensions.includes(`.${extension}`)) {
                          setSelectedFile(file)
                          toast.success('Archivo cargado')
                        } else {
                          toast.error('Por favor, selecciona un archivo en formato PNG, JPG, JPEG o SVG.')
                        }
                      }
                    }}
                    onDragOver={(event) => {
                      event.preventDefault()
                    }}
                  >
                    <ContainerFile onClick={(event) => { event.preventDefault(); handleUploadClick() }}>
                      {selectedFile
                        ? (
                          <>
                            <img
                              src={URL.createObjectURL(selectedFile)}
                              alt={selectedFile.name}
                              className='uploaded-image'
                            />
                            <span onClick={handleCancelImage} className="cancel-image">Cancelar</span>
                          </>
                          )
                        : (
                          <>
                            <span>Adjunta y arrastra tu logotipo</span>
                            <BsCloudUploadFill
                              size='2rem'
                              className='icon-upload'
                              onClick={(event) => {
                                event.stopPropagation()
                                handleUploadClick()
                              }}
                            />
                          </>
                          )}
                    </ContainerFile>
                    <input
                      type='file'
                      ref={fileInputRef}
                      name='file'
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      accept='.png, .jpg, .jpeg, .svg'
                    />
                  </div>
                </InputGroup>
              </div>
              <div className='item'>
                <InputGroup>
                  <InputLabel htmlFor='clave'>Fondo de Login</InputLabel>
                  <div
                    className={`upload-image ${selectedImageBackground ? 'hidden' : ''}`}
                    onDrop={(event) => {
                      event.preventDefault()
                      const file = event.dataTransfer.files[0]
                      if (file) {
                        const extension = file.name.split('.').pop().toLowerCase()
                        if (acceptedExtensions.includes(`.${extension}`)) {
                          setselectedImageBackground(file)
                          toast.success('Archivo cargado')
                        } else {
                          toast.error('Por favor, selecciona un archivo en formato PNG, JPG, JPEG o SVG.')
                        }
                      }
                    }}
                    onDragOver={(event) => {
                      event.preventDefault()
                    }}
                  >
                    <ContainerFile onClick={(event) => { event.preventDefault(); handleClickBackground() }}>
                      {selectedImageBackground
                        ? (
                          <>
                            <img
                              src={URL.createObjectURL(selectedImageBackground)}
                              alt={selectedImageBackground.name}
                              className='uploaded-image'
                            />
                            <span onClick={handleCancelBackground} className="cancel-image">Cancelar</span>
                          </>
                          )
                        : (
                          <>
                            <span>Adjunta y arrastra tu fondo</span>
                            <BsCloudUploadFill
                              size='2rem'
                              className='icon-upload'
                              onClick={(event) => {
                                event.stopPropagation()
                                handleClickBackground()
                              }}
                            />
                          </>
                          )}
                    </ContainerFile>
                    <input
                      type='file'
                      ref={fileBackgroundRef}
                      name='file'
                      style={{ display: 'none' }}
                      onChange={handleBackgroundChange}
                      accept='.png, .jpg, .jpeg, .svg'
                    />
                  </div>
                </InputGroup>
              </div>
            </FormContainerStepStyled>

            <div className='footer profileSchool'>
              <Button
                size='semiMedium'
                color='white'
                type='submit'
                status={StatusButton.Enabled}
              >
                {changeTextButton}
              </Button>
            </div>
          </form>
          )}

    </OneStepSettingStyled>
  )
}

OneStepSetting.propTypes = {
  showLabel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  changeTextButton: PropTypes.string,
  customStyle: PropTypes.object,
  customPosition: PropTypes.string
}
export default OneStepSetting
