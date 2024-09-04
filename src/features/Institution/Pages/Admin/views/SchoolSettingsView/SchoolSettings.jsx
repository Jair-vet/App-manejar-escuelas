import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsCloudUploadFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'

import { ContainerFile, FormContainerStepStyled } from '../../../SchoolSettingsSteps/OneStepSetting/OneStepSettingStyled'

import { ContainerButtonFiles, ContainerChangeImage, ContainerForm, ContainerInputs } from './SchoolSettingsStyled'

import Button, { StatusButton } from '@/common/Components/Buttons'
import { Input, InputErrorStyled, InputGroup, InputLabel } from '@/common/Components/Form'
import PageStatus from '@/common/Models/Enums'
import { lsImageBackground, lsSchoolId, lsSchoolLogo } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
import SchoolsService from '@/services/schools.service'

const SchoolSettings = () => {
  const [school, setSchool] = useState({})
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedImageBackground, setselectedImageBackground] = useState(null)
  const [, setIsFileVisible] = useState(false)
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const fileInputRef = useRef(null)
  const fileBackgroundRef = useRef(null)
  const navigate = useNavigate()

  const acceptedExtensions = ['.png', '.jpg', '.jpeg', '.svg']

  const init = async () => {
    try {
      const id = localStorage.getItem(lsSchoolId)
      const response = await SchoolsService.getSchool(id)
      setSchool(response)
      setValue('name', response.name)
      setValue('address', response.address)
      setValue('clave', response.clave)
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
    <>
      <ContainerForm height='100vh' onSubmit={handleSubmit(onSubmit)}>
        <ContainerInputs>
          <div className='item'>
            <InputGroup >
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
        </ContainerInputs>
        <ContainerButtonFiles>
          <Button
                size='semiMedium'
                color='white'
                type='submit'
                status={StatusButton.Enabled}
              >Guardar
          </Button>
        </ContainerButtonFiles>
        {/* <ContainerChangeImage>
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
        </ContainerChangeImage> */}
      </ContainerForm>

    </>
  )
}

export default SchoolSettings
