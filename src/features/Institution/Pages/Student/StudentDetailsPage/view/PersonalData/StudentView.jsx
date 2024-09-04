import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import { ContainerButton, ContainerSectionFields } from '../../StudentDetailsStyled'
import useDetailStudentHandling from '../../hooks/useStudent'
import Inscription from '../Inscription'

import UtilsService from '@/Services/utils.service'
import Button, { StatusButton } from '@/common/Components/Buttons'
import { InputErrorStyled, InputGroup, InputLabel, Input, Select } from '@/common/Components/Form'
import { CheckboxV2 } from '@/common/Components/Form/checkboxV2'
import ModalCustom from '@/common/Components/Modals'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'

const DataStudentView = () => {
  const { current: modalStatus } = useRef(PageStatus.SUCCESS)

  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const [isShowModal, setIsShowModal] = useState(false)
  const { id: isStudentToEdit } = useParams()

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm()
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const { editStudent, createStudent } = useDetailStudentHandling()

  const student = useSelector((state) => state.student.data)

  const [curpArray, setCurpArray] = useState(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
  const [watchPostalCode,
    watchName,
    watchLastName,
    watchSecondSurname,
    watchDateBirth,
    watchSex
  ] = watch([
    'place_of_birth_postalcode',
    'name', 'last_name',
    'second_surname',
    'birthday_date',
    'sex'])

  // ==================== INIT  ===============

  const init = async () => {
    try {
      if (isStudentToEdit) {
        const data = student
        setValue('tag_id', data.tag_id)
        setValue('name', data.name)
        setValue('last_name', data.last_name)
        setValue('second_surname', data.second_surname)
        setValue('email', data.email)
        if (data.curp && data.curp !== '') {
          const curpTemp = data.curp.split('')
          setCurpArray(curpTemp)
          setValue('curp', data.curp)
        }

        setValue('birthday_date', data.birthday_date)
        setValue('place_of_birth_postalcode', data.place_of_birth_postalcode)
        setValue('place_of_birth_state', data.place_of_birth_state)
        setValue('place_of_birth_country', data.place_of_birth_country)
        setValue('place_of_birth_location', data.place_of_birth_location)
        setValue('sex', data.sex)
        setValue('age', data.age)
        setValue('number_phone_home', data.number_phone_home)
        setValue('number_phone_movil', data.number_phone_movil)
      } else {
        setValue('place_of_birth_country', 'México')
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
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
  // ==================== INIT  ===============

  const getResidence = async () => {
    try {
      const response = await UtilsService.validatePostalCode(watchPostalCode)
      setValue('place_of_birth_state', response.state[0].state)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    if (watchPostalCode && watchPostalCode.length > 4) {
      getResidence()
    } else {
      setValue('place_of_birth_state', '')
    }
  }, [watchPostalCode])

  useEffect(() => {
    if (watchName && watchName.length > 0) {
      const curpTemp = curpArray
      curpTemp[3] = watchName[0].toUpperCase()
      setCurpArray(curpTemp)
      const curpFormat = curpArray.join('')
      setValue('curp', curpFormat)
    }
  }, [watchName])

  useEffect(() => {
    if (watchLastName && watchLastName.length > 1) {
      const curpTemp = curpArray
      curpTemp[0] = watchLastName[0].toUpperCase()
      curpTemp[1] = watchLastName[1].toUpperCase()
      setCurpArray(curpTemp)
      const curpFormat = curpArray.join('')
      setValue('curp', curpFormat)
    }
  }, [watchLastName])

  useEffect(() => {
    if (watchSecondSurname && watchSecondSurname.length > 0) {
      const curpTemp = curpArray
      curpTemp[2] = watchSecondSurname[0].toUpperCase()
      setCurpArray(curpTemp)
      const curpFormat = curpArray.join('')
      setValue('curp', curpFormat)
    }
  }, [watchSecondSurname])

  useEffect(() => {
    if (watchDateBirth && watchDateBirth !== '') {
      const curpTemp = curpArray
      const dateSplit = watchDateBirth.split('-')
      curpTemp[4] = dateSplit[0][2]
      curpTemp[5] = dateSplit[0][3]
      curpTemp[6] = dateSplit[1][0]
      curpTemp[7] = dateSplit[1][1]
      curpTemp[8] = dateSplit[2][0]
      curpTemp[9] = dateSplit[2][1]
      setCurpArray(curpTemp)
      const curpFormat = curpArray.join('')
      setValue('curp', curpFormat)
    }
  }, [watchDateBirth])

  useEffect(() => {
    if (watchSex && watchSex !== '') {
      const curpTemp = curpArray
      curpTemp[10] = watchSex[0].toUpperCase()
      setCurpArray(curpTemp)
      const curpFormat = curpArray.join('')
      setValue('curp', curpFormat)
    }
  }, [watchSex])

  const create = async data => {
    setStatusBtn(StatusButton.Loading)
    await createStudent(data)
    toast.success('Alumno creado correctamente')
    navigate(-1)
    setStatusBtn(StatusButton.Enabled)
  }

  const edit = async data => {
    setStatusBtn(StatusButton.Loading)
    await editStudent(student.id, data)
    toast.success('Alumno editado correctamente')
    setStatusBtn(StatusButton.Enabled)
  }

  const onSubmit = async data => {
    try {
      isStudentToEdit
        ? await edit(data)
        : await create(data)
    } catch (e) {
      setStatusBtn(StatusButton.Enabled)
      handleErrors(e)
    }
  }

  const handleShowModal = ({ target }) => {
    setIsShowModal(target.checked)
  }

  const registerStudent = async () => { }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='all-fields-data-container'>
          <ContainerSectionFields>
            <span className='title-section'>Nombre</span>
            <div className='container-fileds'>
              <InputGroup className='item'>
                <InputLabel htmlFor='name'>Matricula:</InputLabel>
                <Input
                  className='personal-data'
                  {...register('tag_id')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  disabled
                />
                {
                  <InputErrorStyled>
                    errors.tag_id
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.tag_id?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='name'>Nombres:</InputLabel>
                <Input
                  maxLength={50}
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
                <InputLabel htmlFor='last-name'>Apellido Paterno:</InputLabel>
                <Input
                  maxLength={50}
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
                <InputLabel htmlFor='second_surname'>Apellido Materno:</InputLabel>
                <Input
                  maxLength={50}
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
            </div>
          </ContainerSectionFields>
          <ContainerSectionFields margin={'10px 0px 0px 0px'}>
            <span className='title-section'>Lugar de nacimiento:</span>
            <div className='container-fileds'>
              <InputGroup className='item'>
                <InputLabel htmlFor='place_of_birth_postalcode'>Código postal:</InputLabel>
                <Input
                  type='number'
                  minLength={5}
                  maxLength={5}
                  {...register('place_of_birth_postalcode')}
                  aria-invalid={errors.place_of_birth_postalcode ? 'true' : 'false'} />
                {
                  <InputErrorStyled>
                    errors.place_of_birth_postalcode
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.place_of_birth_postalcode?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='place_of_birth_state'>Estado:</InputLabel>
                <Input
                  maxLength={20}
                  textTransform={'capitalize'}
                  className='personal-data'
                  {...register('place_of_birth_state')}
                  aria-invalid={errors.place_of_birth_state ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.place_of_birth_state
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.place_of_birth_state?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='place_of_birth_country'>Pais:</InputLabel>
                <Input
                  maxLength={60}
                  textTransform={'capitalize'}
                  className='personal-data'
                  {...register('place_of_birth_country')}
                  aria-invalid={errors.place_of_birth_country ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.place_of_birth_country
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.place_of_birth_country?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='place_of_birth_location'>Lugar de nacimiento:</InputLabel>
                <Input
                  maxLength={100}
                  className='place_of_birth_location'
                  {...register('place_of_birth_location')}
                  aria-invalid={errors.place_of_birth_location ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.place_of_birth_location
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.place_of_birth_location?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
            </div>
          </ContainerSectionFields>
          <ContainerSectionFields margin={'10px 0px 0px 0px'}>
            <span className='title-section'>Otros datos</span>
            <div className='container-fileds'>
              <InputGroup className='item'>
                <InputLabel htmlFor='birthday_date'>Fecha de nacimiento:</InputLabel>
                <Input
                  type='date'
                  className='personal-data'
                  {...register('birthday_date', { required: 'El campo es requerido' })}
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
              <InputGroup className='item'>
                <InputLabel htmlFor='sex'>Sexo:</InputLabel>
                <Select
                  className='personal-data'
                  {...register('sex', { required: 'El campo es requerido' })}
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
                <InputLabel htmlFor='curp'>CURP:</InputLabel>
                <Input
                  textTransform={'uppercase'}
                  maxLength={18}
                  minLength={18}
                  {...register('curp', { required: { value: true, message: 'El campo es requerido' } })}
                  aria-invalid={errors.curp ? 'true' : 'false'} />
                {
                  <InputErrorStyled>
                    errors.curp
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.curp?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='age'>Edad:</InputLabel>
                <Input
                  disabled
                  className='personal-data'
                  {...register('age')}
                  aria-invalid={errors.age ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.age
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.age?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
            </div>
          </ContainerSectionFields>
          <ContainerSectionFields margin={'10px 0px 0px 0px'}>
            <span className='title-section'>Contacto</span>
            <div className='container-fileds'>
              <InputGroup className='item'>
                <InputLabel htmlFor='email'>Correo electrónico:</InputLabel>
                <Input
                  maxLength={30}
                  type='email'
                  {...register('email', { required: 'El correo es requerido', pattern: /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/ })}
                  aria-invalid={errors.email ? 'true' : 'false'} />
                {
                  <InputErrorStyled>
                    errors.email
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.email?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='number_phone_home'>Tel casa:</InputLabel>
                <Input
                  type='text'
                  maxLength={10}
                  minLength={10}
                  className='personal-data'
                  {...register('number_phone_home', { required: { value: false, message: '' }, pattern: { value: /^[0-9]+$/, message: 'Solo se permiten numeros' } })}
                  aria-invalid={errors.number_phone_home ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.number_phone_home
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.number_phone_home?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='curp'>Tel movil:</InputLabel>
                <Input
                  type='text'
                  maxLength={10}
                  minLength={10}
                  className='personal-data'
                  {...register('number_phone_movil', { required: { value: false, message: '' }, pattern: { value: /^[0-9]+$/, message: 'Solo se permiten numeros' } })}
                  aria-invalid={errors.number_phone_movil ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.number_phone_movil
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.number_phone_movil?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
            </div>
          </ContainerSectionFields>
        </div>
        <div className='button-data-personal'>
          {isStudentToEdit && (
            <CheckboxV2
              name='asad'
              id='asad'
              label='Inscribir automaticamente'
              onChange={handleShowModal}
            />
          )}
          <ContainerButton>
            <Button size='mediumSmall' status={statusBtn} style={'text-align: end'}>
              Guardar
            </Button>
          </ContainerButton>
        </div>
      </form>
      {isShowModal && <ModalCustom
        openOrClose={handleShowModal}
        width='80%'
        title='Inscribir alumno'
        refreshAction={_ => { }}
        closeButton={modalStatus === PageStatus.SUCCESS}
        statusPageModal={modalStatus}
        message={errorMessage}
        footer={false}
      >
        <Inscription student={student} action={registerStudent} />
      </ModalCustom>}
    </>
  )
}

export default DataStudentView
