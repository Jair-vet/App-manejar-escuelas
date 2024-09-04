import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsCloudUploadFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'

import { ContainerButton, ContainerFiles } from '../TeachersDetailStyled'

import Button, { StatusButton } from '@/common/Components/Buttons'
import { FormGlobal, Input, InputErrorStyled, InputGroup, InputLabel } from '@/common/Components/Form'
import SchoolModel from '@/common/Models/SchoolModel'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import TeachersService from '@/services/teachers.service'

const DataTeacherView = ({ school }) => {
  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  // const [showArrow, setShowArrow] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileFront, setFileFront] = useState(null)
  const [fileReverse, setFileReverse] = useState(null)
  const [fileIdentificationCard, setFileIdentificationCard] = useState(null)
  const [fileProofAddress, setFileProofAddress] = useState(null)
  const fileInputRef = useRef(null)

  // ============ INIT DATA LOADING ===============
  // useEffect(() => {
  //   // if (user.id !== undefined) {
  //   //   setValue('name', user.name)
  //   //   setValue('email', user.email)
  //   //   setValue('is_active', user.isActive)
  //   // }
  // }, [user, setValue])

  // ============ INIT DATA LOADING ===============

  const onSubmit = async data => {
    try {
      setStatusBtn(StatusButton.Loading)
      const response = await TeachersService.createTeacher(school.id, data)
      setStatusBtn(StatusButton.Enabled)
      if (response.status === 201) {
        toast.success('Docente creado correctamente')
        console.log(selectedFile)
        navigate(-1)
      }
      // if (user.id !== undefined) {
      //   setStatusBtn(StatusButton.Loading)
      //   await TeachersService.editTeacher(sc.id, data)
      //   toast.success('Docente editado correctamente')
      //   setStatusBtn(StatusButton.Enabled)
      //   // setShowArrow(true)
      // } else {
      //   setStatusBtn(StatusButton.Loading)
      //   const response = await TeachersService.createTeacher(data)
      //   setStatusBtn(StatusButton.Enabled)
      //   if (response.status === 201) {
      //     toast.success('Docente creado correctamente')
      //     // navigate(`${routesNamesDashboard.onlyDetailUser}${response.data.data.id}`)
      //   }
      // }
    } catch (e) {
      setStatusBtn(StatusButton.Enabled)
      handleErrors(e)
    }
  }

  const acceptedExtensions = ['.png', '.jpg', '.jpge', '.svg']

  const handleFileChange = (fieldName, event) => {
    const file = event.target.files[0]
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase()
      if (acceptedExtensions.includes(`.${extension}`)) {
        switch (fieldName) {
          case 'filefront' :
            setFileFront(file)
            break
          case 'fileReverse' :
            setFileReverse(file)
            break
          case 'fileInfificationCard':
            setFileIdentificationCard(file)
            break
          case 'fileProofAddress':
            break
          default:
            break
        }
        toast.success('Archivo seleccionado')
      } else {
        toast.error('Selecciona un archivo en pormato PNG, JPG, JPGE')
      }
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      console.log('Input de archivo encontrado')
    } else {
      console.log('Selecciona un archivo primero')
    }
  }

  const handleContainerClick = (fieldName) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      fileInputRef.current.onchange = (event) => handleFileChange(fieldName, event)
    }
  }
  useEffect(() => {
    console.log(errorMessage)
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])
  return (
    <>

      <FormGlobal
          onSubmit={handleSubmit(onSubmit)}
          margin={'20px'}
          >
        <div className='container-fileds'>
          <InputGroup>
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <Input
              className='personal-data'
              {...register('name', { required: 'El nombre es requerido' })}
              aria-invalid={errors.name ? 'true' : 'false'}
              width='20rem'
            />
            {
              <InputErrorStyled>
                errors.name
              </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.name?.message}
                </InputErrorStyled>
            }
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="email">Correo electrónico</InputLabel>
            <Input
              className='personal-data'
              {...register('email', { required: 'El correo es requerido', pattern: /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/ })}
              aria-invalid={errors.email ? 'true' : 'false'}
              width='20rem'
            />
            {
              <InputErrorStyled>
                errors.email
              </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.email?.message}
                </InputErrorStyled>
            }
          </InputGroup>
        </div>
        <div className='container-fileds'>
          <div className='item'>
            <InputGroup>
              <InputLabel htmlFor="clave">Foto Idenficación Oficial Frente</InputLabel>
              <div
              className={`upload-image ${fileFront ? 'hiden' : ''}`}
              onDrop={(event) => {
                event.preventDefault()
                const file = event.dataTransfer.files[0]
                if (file) {
                  const extension = file.name.split('.').pop().toLowerCase()
                  if (acceptedExtensions.includes(`.${extension}`)) {
                    setFileFront(file)
                    toast.success('Archivo caragado')
                  } else {
                    toast.error('Por favor selecciona un archivo en pormato PNG, JPG, JPGE y SVG')
                  }
                }
              }}
              onDragOver={(event) => { event.preventDefault() }}
              onClick={() => handleContainerClick('fileFront')}
            >
                <ContainerFiles>
                  {
                    fileFront
                      ? (
                        <img
                      src={URL.createObjectURL(fileFront)}
                      alt={fileFront.name}
                      className='uploaded-image'
                      />)
                      : (
                        <BsCloudUploadFill
                        size='1.5rem'
                        className='icon-upload'
                      />
                        )
                  }

                </ContainerFiles>
                <Input
                onChange={(event => handleFileChange('fileFront', event))}
                onClick={handleUploadClick}
                accept='.png, .jpg, .jpeg, .svg'
                type='file'
                name='fileFront'
                className='files'
                style={{ display: 'none' }}
                />

              </div>
            </InputGroup>
          </div>
          <div className='item'>
            <InputGroup>
              <InputLabel htmlFor="clave">Foto Idenficación Oficial Reverso</InputLabel>
              <div
              className={`upload-image ${fileReverse ? 'hidden' : ''}`}
              onDrop={(event) => {
                event.preventDefault()
                const file = event.dataTransfer.files[0]
                if (file) {
                  const extension = file.name.split('.').pop().toLowerCase()
                  if (acceptedExtensions.includes(`.${extension}`)) {
                    setFileReverse(file)
                    toast.success('Archivo cargado')
                  } else {
                    toast.error('Por Favor , selecciona un archivo en formato PNG,JPG, JPEG o SVG')
                  }
                }
              }}
              onDragOver={(event) => { event.preventDefault() }}
              onClick={() => handleContainerClick('fileReverse')}
              >
                <ContainerFiles>
                  {
                    fileReverse
                      ? (
                        <img
                      src={URL.createObjectURL(fileReverse)}
                      alt={fileReverse.name}
                      className='uploaded-image'
                      />)
                      : (
                        <BsCloudUploadFill
                      size='1.5rem'
                      className='icon-upload'
                    />
                        )
                  }

                </ContainerFiles>
                <Input
                onChange={(event => handleFileChange('fileReverse', event))}
                onClick={handleFileChange}
                accept='.png, .jpg, .jpeg, .svg'
                type='file'
                name='fileRverse'
               className='btn-file '

                style={{ display: 'none' }}
                />

              </div>
            </InputGroup>
          </div>

        </div>
        <div className='container-fileds'>
          <div className='item'>
            <InputGroup>
              <InputLabel htmlFor="clave">Cedula Profesional</InputLabel>
              <div
              className={`upload-image ${fileIdentificationCard ? 'hidden' : ''}`}
              onDrop={(event) => {
                event.preventDefault()
                const file = event.dataTransfer.files[0]
                if (file) {
                  const extension = file.name.split('.').pop().toLowerCase()
                  if (acceptedExtensions.includes(`.${extension}`)) {
                    setFileIdentificationCard(file)
                    toast.success('Archivo cargado')
                  } else {
                    toast.error('Por Favor. selecciona un archivo en formato PNG , JPG, JPEG o SVG')
                  }
                }
              }}
              onDragOver={(event) => { event.preventDefault() }}
              onClick={() => handleContainerClick('fileIdenticationCard')}
              >
                <ContainerFiles>
                  {
                    fileIdentificationCard
                      ? (
                        <img
                      src={URL.createObjectURL(fileIdentificationCard)}
                      alt={fileIdentificationCard.name}
                      className='uploaded-image'
                      />)
                      : (
                        <BsCloudUploadFill
                      size='1.5rem'
                      className='icon-upload'
                    />
                        )
                  }

                </ContainerFiles>
                <Input
                onChange={(event => handleFileChange('fileIdentificationCard', event))}
                onClick={handleUploadClick}
                accept='.png, .jpg, .jpeg, .svg'
                type='file'
                name='fileIdentificationCard'
                className='files'
                style={{ display: 'none' }}
                />

              </div>

            </InputGroup>
          </div>

          <div className='item'>
            <InputGroup>
              <InputLabel htmlFor="clave">Comprobante de domicilio</InputLabel>
              <div
              className={`upload-image ${fileProofAddress ? 'hidden' : ''}`}
              onDrop={(event) => {
                event.preventDefault()
                const file = event.dataTransfer.file[0]
                if (file) {
                  const extension = file.name.split('.').pop().toLowerCase()
                  if (acceptedExtensions.includes(`.${extension}`)) {
                    setFileProofAddress(file)
                    toast.success('Archivo cargado')
                  } else {
                    toast.error('Por favor .selecciona un archivo en formato PNG,JPG, JPEG o SVG')
                  }
                }
              }}
              onDragOver={(event => { event.preventDefault() })}
              onClick={() => handleContainerClick('fileProofAddress')}
              >
                <ContainerFiles>
                  {
                    fileProofAddress
                      ? (
                        <img
                      src={URL.createObjectURL(fileProofAddress)}
                      alt={fileProofAddress.name}
                      className=''
                      />)
                      : (
                        <BsCloudUploadFill
                        size='1.5rem'
                        className='icon-upload'
                      />
                        )
                  }

                </ContainerFiles>
                <Input
                onChange={(event => handleFileChange(fileProofAddress, event))}
                onClick={handleUploadClick}
                accept='.png, .jpg, .jpeg, .svg'
                type='file'
                name='fileProofAddress'
                className='files'
                style={{ display: 'none' }}
                />

              </div>
            </InputGroup>
          </div>

        </div>
        {/* <div className='container-fileds'> */}
        {/* { user.id !== undefined
            ? <InputGroup>
              <InputLabel htmlFor="is_active">Usuario activo</InputLabel>
              <Input
            {...register('is_active', { required: '' })}
            type="checkbox"
          />
              {
                <InputErrorStyled>
                  errors.is_active
                </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.is_active?.message}
                </InputErrorStyled>
          }
            </InputGroup>
            : <></>
          } */}
        {/* </div> */}
        <ContainerButton>
          <Button top='20px' size='large' color='white' type='submit' status={statusBtn} >Guardar</Button>
        </ContainerButton>
      </FormGlobal >
    </>

  )
}

DataTeacherView.propTypes = {
  school: PropTypes.instanceOf(SchoolModel).isRequired
}

export default DataTeacherView
