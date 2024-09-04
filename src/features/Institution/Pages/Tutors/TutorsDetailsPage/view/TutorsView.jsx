import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router'

import LayoutDetailTutorsStyled, { ContainerButton, ContainerSectionFields } from '../TutorsStyled'

import Button, { StatusButton } from '@/Common/Components/Buttons'
import useErrorHandling from '@/Common/hooks/useErrorCustom'
import { InputErrorStyled, InputGroup, InputLabel, Input, Select } from '@/common/Components/Form'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import TutorService from '@/services/tutors.service'
import UtilsService from '@/services/utils.service'
// import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'

const DataTutorView = ({ idTutor, closeModal, onSubmitFunction }) => {
  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const { register, handleSubmit, formState: { errors }, setValue, watch, setError } = useForm()
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [suburbsOptions, setSuburbsOptions] = useState([])
  // const navigate = useNavigate()

  const { id } = useParams()
  const idSchool = localStorage.getItem(lsSchoolId)

  const watchPostalCode = watch('postalcode')

  const init = async () => {
    try {
      if (idTutor !== undefined) {
        setPageStatus(PageStatus.LOADING)
        const data = await TutorService.getDetailTutor(idSchool, idTutor)
        // debugger
        // console.log(data, ' si entre al if del init')
        /** Secciones de datos personales */
        setValue('name', data.name)
        setValue('last_name', data.last_name)
        setValue('second_surname', data.second_surname)
        setValue('relationship', data.relationship)
        setValue('sex', data.sex)
        setValue('birthday_date', data.birthday_date)
        /** Seccion de domicilio */
        setValue('postalcode', data.postalcode)
        setValue('country', data.country)
        setValue('state', data.state)
        setValue('municipality', data.municipality)
        setValue('suburb', data.suburb)
        setValue('address_description', data.address_description)
        setValue('references', data.references)
        setValue('ext_number', data.ext_number)
        setValue('int_number', data.int_number)
        /** Seccion de contactos */
        setValue('number_phone_home', data.number_phone_home)
        setValue('number_phone_work', data.number_phone_work)
        setValue('number_phone_movil', data.number_phone_movil)
        setValue('email', data.email)
      } else {
        setValue('country', 'México')
      }
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      console.log(e)
      toast.error(e)
      handleErrors(e)
    }
  }

  const getResidence = async () => {
    try {
      const response = await UtilsService.validatePostalCode(watchPostalCode)
      setValue('state', response.state[0].state)
      setValue('municipality', response.municipality[0].municipality)
      setSuburbsOptions(response.suburb)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    const pattern = /^[0-9]+$/
    const result = new RegExp(pattern)
    if (watchPostalCode && !result) {
      setError('postalcode', { type: 'manual', message: 'Solo se permiten numeros' })
    } else if (watchPostalCode && watchPostalCode.length === 5) {
      setError('postalcode', { type: 'manual', message: '' })
      getResidence()
    } else {
      setValue('state', '')
      setError('postalcode', { type: 'manual', message: '' })
    }
  }, [watchPostalCode])

  const createTutor = async data => {
    setStatusBtn(StatusButton.Loading)
    data.id_student = id
    await TutorService.createTutor(idSchool, data)
    toast.success('Tutor creado correctamente')
    setStatusBtn(StatusButton.Enabled)
  }

  const editTutor = async data => {
    try {
      setStatusBtn(StatusButton.Loading)
      await TutorService.editTutor(idSchool, idTutor, data)
      toast.success('Tutor editado correctamente')
      // navigate(-1)
      closeModal()
      setStatusBtn(StatusButton.Enabled)
    } catch (error) {
      setStatusBtn(StatusButton.Enabled)
      // toast.error(error.message.toString())
      handleErrors(error)
    }
  }
  const onSubmit = async data => {
    try {
      if (idTutor !== undefined) {
        await editTutor(data)
      } else {
        await createTutor(data)
      }
      await onSubmitFunction()
    } catch (error) {
      setStatusBtn(StatusButton.Enabled)
      handleErrors(error)
    }
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    console.log(errorMessage)
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  return (
    <>

      <LayoutDetailTutorsStyled>
        {pageStatus === PageStatus.LOADING && <OnlyLoaderComponent></OnlyLoaderComponent>}
        {pageStatus === PageStatus.SUCCESS && <form
          onSubmit={handleSubmit(onSubmit)}>
          <ContainerSectionFields>
            <span className='title-section'>Nombre</span>
            <div className='container-fileds'>
              <InputGroup className='item'>
                <InputLabel htmlFor='name'>Nombres</InputLabel>
                <Input
                  className='personal-data'
                  {...register('name', { required: 'El nombre es requerido' })}
                  aria-invalid={errors.name ? 'true' : 'false'}
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
              <InputGroup className='item'>
                <InputLabel htmlFor='last-name'>Apellido Paterno</InputLabel>
                <Input
                  className='personal-data'
                  {...register('last_name', { required: 'El apellido es requerido' })}
                  aria-invalid={errors.last_name ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.last_name
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.last_name?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='second_surname'>Apellido Materno </InputLabel>
                <Input
                  className='personal-data'
                  {...register('second_surname', { required: 'El apellido  es requerido' })}
                  aria-invalid={errors.second_surname ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.second_surname
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.second_surname?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='relationship'>Parentesco </InputLabel>
                <Select
                  className='personal-data'
                  {...register('relationship', { required: 'El campo es requerido' })}
                  aria-invalid={errors.relationship ? 'true' : 'false'}
                >
                  <option className='select-option' value="">Selecciona un elemento</option>
                  <option className='select-option' value="Padre">Padre</option>
                  <option className='select-option' value="Madre">Madre</option>
                  <option className='select-option' value="Abuelos">Abuelos</option>
                  <option className='select-option' value="Tios">Tios</option>
                  <option className='select-option' value="Primos">Primos</option>
                  <option className='select-option' value="Otros">Otros</option>
                </Select>
                {
                  <InputErrorStyled>
                    errors.relationship
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.relationship?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='sex'>Sexo:</InputLabel>
                <Select
                  className='personal-data'
                  {...register('sex')}
                  aria-invalid={errors.sex ? 'true' : 'false'}
                >
                  <option className='select-option' value="">Selecciona un elemento</option>
                  <option className='select-option' value="Hombre">Hombre</option>
                  <option className='select-option' value="Mujer">Mujer</option>
                </Select>
                {
                  <InputErrorStyled>
                    errors.sex
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.sex?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor="birthday-date">Fecha de nacimiento</InputLabel>
                <Input
                  type='date'
                  {...register('birthday_date', { required: { value: true, message: 'La fecha es requerida' } })}
                  aria-invalid={errors.birthday_date ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.birthday_date
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.birthday_date?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
            </div>
          </ContainerSectionFields>
          <ContainerSectionFields margin={'15px 0px 0px 0px'}>
            <span className='title-section'>Domicilio</span>
            <div className='container-fileds'>
              <InputGroup className='item'>
                <InputLabel htmlFor='postalcode'>Código postal:</InputLabel>
                <Input
                  type='text'
                  minLength={5}
                  maxLength={5}
                  {...register('postalcode', { required: 'El codigo postal es requerido' })}
                  aria-invalid={errors.postalcode ? 'true' : 'false'} />
                {
                  <InputErrorStyled>
                    errors.postalcode
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.postalcode?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='country'>País:</InputLabel>
                <Input
                  maxLength={50}
                  {...register('country', { required: { value: true, message: 'El pais es requerido' } })}
                  aria-invalid={errors.country ? 'true' : 'false'} />
                {
                  <InputErrorStyled>
                    errors.country
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.country?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='state'>Estado:</InputLabel>
                <Input
                  maxLength={50}
                  textTransform={'capitalize'}
                  {...register('state', { required: 'El estado  es requerido' })}
                  aria-invalid={errors.state ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.state
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.state?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='municipality'>Municipio:</InputLabel>
                <Input
                  textTransform={'capitalize'}
                  className='personal-data'
                  maxLength={50}
                  {...register('municipality', { required: 'El municipio  es requerido' })}
                  aria-invalid={errors.municipality ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.municipality
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.municipality?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              {suburbsOptions && suburbsOptions.length > 0
                ? <InputGroup className='item'>
                  <InputLabel htmlFor='suburb'>Colonia:</InputLabel>
                  <Select
                    {...register('suburb', { required: 'El campo es requerido' })}
                    aria-invalid={errors.suburb ? 'true' : 'false'}
                  >
                    {suburbsOptions && suburbsOptions.map((value, index) => {
                      return (
                        <option key={index} className='select-option' value={value.suburb}>{value.suburb}</option>
                      )
                    })}
                  </Select>
                  {
                    <InputErrorStyled>
                      errors.suburb
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.suburb?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                : <InputGroup className='item'>
                  <InputLabel htmlFor='suburb'>Colonia:</InputLabel>
                  <Input
                    maxLength={80}
                    {...register('suburb', { required: 'La colonia es requerido' })}
                    aria-invalid={errors.suburb ? 'true' : 'false'}
                  />
                  {
                    <InputErrorStyled>
                      errors.suburb
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.suburb?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>}

              <InputGroup className='item'>
                <InputLabel htmlFor='address_description'>Calle:</InputLabel>
                <Input
                  maxLength={80}
                  {...register('address_description', { required: 'La calle es requerido' })}
                  aria-invalid={errors.address_description ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.address_description
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.address_description?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='references'>Referencias:</InputLabel>
                <Input
                  {...register('references')}
                  aria-invalid={errors.references ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.references
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.references?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='ext_number'>Número exterior:</InputLabel>
                <Input
                  maxLength={5}
                  className='suburb'
                  {...register('ext_number', { required: { value: true, message: 'El número exterior es requerido' }, pattern: { value: /^[0-9]+$/, message: 'Solo se permiten numeros' } })}
                  aria-invalid={errors.ext_number ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.ext_number
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.ext_number?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='int_number'>Número interior:</InputLabel>
                <Input
                  maxLength={40}
                  className='suburb'
                  {...register('int_number')}
                  aria-invalid={errors.int_number ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.int_number
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.int_number?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
            </div>
          </ContainerSectionFields>
          <ContainerSectionFields margin='10px 0 0 0 '>
            <span className='title-section'>Contacto</span>
            <div className='container-fileds'>
              <InputGroup className='item'>
                <InputLabel htmlFor='name'>Tel casa:</InputLabel>
                <Input
                  type='text'
                  maxLength={10}
                  minLength={10}
                  className='personal-data'
                  {...register('number_phone_home')}
                  aria-invalid={errors.number_phone_home ? 'true' : 'false'}
                />
                {
                  errors.number_phone_home &&
                  <InputErrorStyled>
                    {errors.number_phone_home?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='last-name'>Tel trabajo:</InputLabel>
                <Input
                  type='text'
                  maxLength={10}
                  minLength={10}
                  className='personal-data'
                  {...register('number_phone_work')}
                  aria-invalid={errors.number_phone_work ? 'true' : 'false'}
                />
                {
                  errors.number_phone_work &&
                  <InputErrorStyled>
                    {errors.number_phone_work?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='number_phone_movil'>Tel movil: </InputLabel>
                <Input
                  type='text'
                  maxLength={10}
                  minLength={10}
                  className='personal-data'
                  {...register('number_phone_movil', { required: { value: true, message: 'El campo es requerido' } })}
                  aria-invalid={errors.number_phone_movil ? 'true' : 'false'}
                />
                {
                  errors.number_phone_movil &&
                  <InputErrorStyled>
                    {errors.number_phone_work?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='email'>Correo electrónico </InputLabel>
                <Input
                  {...register('email', { required: 'El correo  es requerido' })}
                  aria-invalid={errors.email ? 'true' : 'false'} />
                {
                  errors.email &&
                  <InputErrorStyled>
                    {errors.email?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
            </div>
          </ContainerSectionFields>
          <ContainerButton
            justify='end'
            top='1rem'
          >
            <Button
              left='5rem'
              size='mediumSmall'
              status={statusBtn}
            >Guardar</Button>
            <Button
              left='2rem'
              size='mediumSmall'
              status={statusBtn}
              onClick={closeModal}
            >Cerrar</Button>
          </ContainerButton>
        </form>}
      </LayoutDetailTutorsStyled>
    </>
  )
}

DataTutorView.propTypes = {
  idTutor: PropTypes.string,
  closeModal: PropTypes.func,
  onSubmitFunction: PropTypes.func
}

export default DataTutorView
