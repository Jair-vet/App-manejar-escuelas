import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router'

import { ContainerButtonFiles, ContainerChangeImage, ContainerForm } from './SchoolSettingsStyled'

import Button, { StatusButton } from '@/common/Components/Buttons'
import { Input, InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
import PageStatus from '@/common/Models/Enums'
import { lsFileCer, lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import SchoolsService from '@/services/schools.service'
import UtilsService from '@/services/utils.service'
import { ContainerFile } from '../../../SchoolSettingsSteps/OneStepSetting/OneStepSettingStyled'
import { BsCloudUploadFill } from 'react-icons/bs'
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi'

const SchoolTaxData = () => {
  const [school, setSchool] = useState({})
  const { id } = useParams() // Verifica si realmente necesitas este parámetro
  const { register, handleSubmit, formState: { errors }, setValue, watch, setError } = useForm()
  const [suburbsOptions, setSuburbsOptions] = useState([])
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedImageBackground, setselectedImageBackground] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordSeeSpaces, setPasswordSeeSpaces] = useState(false)

  const watchPostalCode = watch('postal_code_sat')
  
  const acceptedExtensions = ['.cer','.key']

  
  const fileInputRef = useRef(null)
  const fileBackgroundRef = useRef(null)

  const init = async () => {
    const schoolId = localStorage.getItem(lsSchoolId)
    if (schoolId) {
      const response = await SchoolsService.getSchool(schoolId)
      setSchool(response)
      Object.keys(response).forEach(key => setValue(key, response[key]))
      if (response.postal_code_sat) {
        await getResidence(response.postal_code_sat)
      }
    }
  }

  const getResidence = async (postalCode = watchPostalCode) => {
    try {
      const response = await UtilsService.validatePostalCode(postalCode)
      console.log(response, 'console del response get residente')
      setValue('state_sat', response.state[0].state)
      setSuburbsOptions(response.suburb)
    } catch (e) {
      console.error(e)
    }
  }

  const onSubmit = async (data) => {
    try {
      setPageStatus(PageStatus.LOADING)
      const response = await SchoolsService.editSchool(school.id, data)
      setSchool(response)
      setPageStatus(PageStatus.SUCCESS)
      toast.success('Datos guardados exitosamente')

      if (selectedFile) {
        const schoolsResponse = await SchoolsService.getSchool(school.id)
        localStorage.setItem(lsFileCer, schoolsResponse.cer_file)
      }
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
        toast.error('Selecciona un archivo en formato .')
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    const pattern = /^[0-9]+$/
    if (watchPostalCode && !pattern.test(watchPostalCode)) {
      setError('postal_code_sat', { type: 'manual', message: 'Solo se permiten números' })
    } else if (watchPostalCode && watchPostalCode.length === 5) {
      getResidence()
    } else {
      setValue('state_sat', '')
    }
  }, [watchPostalCode, setError, setValue])

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage, clearErrorMessage])

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      {pageStatus === PageStatus.LOADING && <div>Loading...</div>}
      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className='item'>
          <InputLabel htmlFor='rfc'>RFC</InputLabel>
          <Input
              {...register('rfc', { required: 'El campo es requerido' })}
              aria-invalid={errors.rfc ? 'true' : 'false'}
            />
          {errors.rfc && (
            <InputErrorStyled>{errors.rfc.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup className='item'>
          <InputLabel htmlFor='razon_sat'>Razón social</InputLabel>
          <Input
              {...register('razon_sat', { required: 'El campo es requerido' })}
              aria-invalid={errors.razon_sat ? 'true' : 'false'}
            />
          {errors.razon_sat && (
            <InputErrorStyled>{errors.razon_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup className='item'>
          <InputLabel htmlFor='regimen_sat'>Régimen</InputLabel>
          <Input
              {...register('regimen_sat', { required: 'El campo es requerido' })}
              aria-invalid={errors.regimen_sat ? 'true' : 'false'}
            />
          {errors.regimen_sat && (
            <InputErrorStyled>{errors.regimen_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup className='item'>
          <InputLabel htmlFor='address_sat'>Dirección Fiscal</InputLabel>
          <Input
              {...register('address_sat', { required: 'El campo es requerido' })}
              aria-invalid={errors.address_sat ? 'true' : 'false'}
            />
          {errors.address_sat && (
            <InputErrorStyled>{errors.address_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup className='item'>
          <InputLabel htmlFor='postal_code_sat'>Código postal</InputLabel>
          <Input
              type='text'
              minLength={5}
              maxLength={5}
              {...register('postal_code_sat', { required: 'El campo es requerido' })}
              aria-invalid={errors.postal_code_sat ? 'true' : 'false'}
            />
          {errors.postal_code_sat && (
            <InputErrorStyled>{errors.postal_code_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup className='item'>
          <InputLabel htmlFor='country_sat'>País</InputLabel>
          <Input
              textTransform={'capitalize'}
              maxLength={50}
              {...register('country_sat', { required: 'El campo es requerido' })}
              aria-invalid={errors.country_sat ? 'true' : 'false'}
            />
          {errors.country_sat && (
            <InputErrorStyled>{errors.country_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup className='item'>
          <InputLabel htmlFor='state_sat'>Estado</InputLabel>
          <Input
              maxLength={50}
              textTransform={'capitalize'}
              {...register('state_sat', { required: 'El campo es requerido' })}
              aria-invalid={errors.state_sat ? 'true' : 'false'}
            />
          {errors.state_sat && (
            <InputErrorStyled>{errors.state_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        {suburbsOptions && suburbsOptions.length > 0 ? (
          <InputGroup className='item'>
            <InputLabel htmlFor='suburb_sat'>Colonia</InputLabel>
            <Select
                {...register('suburb_sat', { required: 'El campo es requerido' })}
                aria-invalid={errors.suburb_sat ? 'true' : 'false'}
              >
              {suburbsOptions.map((value, index) => (
                <option key={index} value={value.suburb}>{value.suburb}</option>
              ))}
            </Select>
            {errors.suburb && (
              <InputErrorStyled>{errors.suburb.message}</InputErrorStyled>
            )}
          </InputGroup>
        ) : (
          <InputGroup className='item'>
            <InputLabel htmlFor='suburb_sat'>Colonia</InputLabel>
            <Input
                maxLength={80}
                {...register('suburb_sat', { required: 'El campo es requerido' })}
                aria-invalid={errors.suburb_sat ? 'true' : 'false'}
              />
            {errors.suburb && (
              <InputErrorStyled>{errors.suburb_sat.message}</InputErrorStyled>
            )}
          </InputGroup>
        )}
        <InputGroup className='item'>
          <InputLabel htmlFor='address_sat'>Calle</InputLabel>
          <Input
              maxLength={80}
              {...register('address_sat', { required: 'El campo es requerido' })}
              aria-invalid={errors.address_sat ? 'true' : 'false'}
            />
          {errors.address_sat && (
            <InputErrorStyled>{errors.address_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup className='item'>
          <InputLabel htmlFor='num_ext_sat'>Número exterior</InputLabel>
          <Input
              type='text'
              maxLength={10}
              minLength={1}
              {...register('num_ext_sat', { required: 'El campo es requerido', pattern: { value: /^[0-9]+$/, message: 'Solo se permiten números' } })}
              aria-invalid={errors.num_ext_sat ? 'true' : 'false'}
            />
          {errors.num_ext_sat && (
            <InputErrorStyled>{errors.num_ext_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup className='item'>
          <InputLabel htmlFor='phone_sat'>Teléfono</InputLabel>
          <Input
              type='text'
              maxLength={10}
              minLength={10}
              {...register('phone_sat', { required: 'El campo es requerido', pattern: { value: /^[0-9]+$/, message: 'Solo se permiten números' } })}
              aria-invalid={errors.phone_sat ? 'true' : 'false'}
            />
          {errors.phone_sat && (
            <InputErrorStyled>{errors.phone_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup className='item'>
          <InputLabel htmlFor='type_person_sat'>Tipo de persona</InputLabel>
          <Select
              {...register('type_person_sat', { required: 'El campo es requerido' })}
              aria-invalid={errors.type_person_sat ? 'true' : 'false'}
            >
            <option value="">Selecciona una opción</option>
            <option value="fisica">Persona Física</option>
            <option value="moral">Persona Moral</option>
          </Select>
          {errors.type_person_sat && (
            <InputErrorStyled>{errors.type_person_sat.message}</InputErrorStyled>
          )}
        </InputGroup>
        <InputGroup >
                <InputLabel htmlFor="password_sat">Contraseña de clave privada</InputLabel>
                <div className='position-password'>
                  <Input
                    {...register('password_sat', { required: 'La contraseña es requerida' })}
                    aria-invalid={errors.password_sa ? 'true' : 'false'}
                    type={showPassword ? 'text' : 'password'}
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
                    errors.password_sat
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.password_sat?.message}
                  </InputErrorStyled>
                }
        </InputGroup>
        <ContainerChangeImage top='0rem'>
          <div className='item'>
            <InputGroup>
              <InputLabel htmlFor='cer_file'>Certificado(.cer)</InputLabel>
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
                          toast.error('Por favor, selecciona un archivo en formato .CER')
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
                        <span>Adjunta y arrastra tu certificado</span>
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
                      accept='.cer'
                    />
              </div>
            </InputGroup>
          </div>
          <div className='item'>
            <InputGroup>
              <InputLabel htmlFor='clave'>Clave privada (.key) </InputLabel>
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
                          toast.error('Por favor, selecciona un archivo en formato .KEY')
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
                      accept='.key'
                    />
              </div>
            </InputGroup>
          </div>
        </ContainerChangeImage>

        <ContainerButtonFiles right='0%' >
        <Button
          size='semiMedium'
          color='white'
          type='submit'
          status={StatusButton.Enabled}
        >
          Guardar
        </Button>
      </ContainerButtonFiles>

      </ContainerForm>
     
    </>
  )
}

export default SchoolTaxData