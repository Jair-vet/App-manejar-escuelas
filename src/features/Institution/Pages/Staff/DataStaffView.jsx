import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import { ContainerButton, ContainerSectionFields } from './StaffStyled'

import Button, { StatusButton } from '@/Common/Components/Buttons'
import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import useErrorHandling from '@/Common/hooks/useErrorCustom'
import { changeTitle } from '@/Redux/globalSlice'
import { Input, InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
import LoaderComponent from '@/common/Components/LoaderComponent'
import PageStatus from '@/common/Models/Enums'
import EmployeeService from '@/services/employee.service'

const DataStaffView = () => {
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { handleErrors, errorMessage } = useErrorHandling()

  const idSchool = localStorage.getItem(lsSchoolId)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const [employe, setEmploye] = useState({})

  const init = async () => {
    try {
      if (id !== undefined) {
        setPageStatus(PageStatus.LOADING)
        dispatch(
          changeTitle({
            titleHeader: 'Editar personal',
            showArrow: true
          })
        )
        const response = await EmployeeService.getDetailEmploye(idSchool, id)
        setValue('name', response.name)
        setValue('last_name', response.last_name)
        setValue('second_surname', response.second_surname)
        setValue('sex', response.sex)
        setValue('birthday_date', response.birthday_date)
        setValue('curp', response.curp)
        setValue('age', response.age)
        setValue('civil_status', response.civil_status)
        setValue('id_payroll', response.id_payroll)
        setValue('tax_id', response.tax_id)
        setValue('admission_date', response.admission_date)
        setValue('low_date', response.low_date)
        setValue('position', response.position)
        setValue('email', response.email)
        setValue('number_phone_movil', response.number_phone_movil)

        setPageStatus(PageStatus.SUCCESS)
      } else {
        dispatch(
          changeTitle({
            titleHeader: 'Crear personal',
            showArrow: true
          })
        )
        setPageStatus(PageStatus.SUCCESS)
      }
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])

  const onSubmit = async data => {
    try {
      setPageStatus(PageStatus.LOADING)
      if (id === undefined) {
        await EmployeeService.createEmployee(idSchool, data)
        toast.success('Empleado creado correctamente')
        navigate(-1)
        // setStatusBtn(StatusButton.Loading)
        // await EmployeeService.editEmployee(idSchool,idEmploye,data)
        // toast.success('Empleado editado correctamente')
        // setStatusBtn(StatusButton.Enabled)
        setPageStatus(PageStatus.SUCCESS)
      } else {
        console.log('error del else')
        await EmployeeService.editEmployee(idSchool, id, data)
        // console.log(response)
        toast.success('Empleado editado correctamente')
        await init()
        setPageStatus(PageStatus.SUCCESS)
      }
    } catch (error) {
      setPageStatus(StatusButton.Enabled)
      toast.error(error)
      handleErrors(error)
    }
  }
  return (
    <>
      {pageStatus !== PageStatus.SUCCESS && (
      <LoaderComponent
            status={pageStatus}
            message={errorMessage}
            refreshAction={() => init()}
          />
      )}
      {pageStatus === PageStatus.SUCCESS && (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='all-fields-data-container'>
            <ContainerSectionFields>
              <span className='title-section'>Datos personales </span>
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
                <InputGroup className='item'>
                  <InputLabel htmlFor='civil_status'>Estados civiles:</InputLabel>
                  <Select
                  className='personal-data'
                  {...register('civil_status', { required: 'El campo es requerido' })}
                  aria-invalid={errors.civil_status ? 'true' : 'false'}
                >
                    <option className='select-option' value="">Selecciona un elemento</option>
                    <option className='select-option' value="Soltera/a">Soltera(o)</option>
                    <option className='select-option' value="Casada/o">Casada(o)</option>
                    <option className='select-option' value="Union libre">Union libre</option>
                    <option className='select-option' value="Otros">Otros</option>
                  </Select>
                  {
                    <InputErrorStyled>
                      errors.civil_status
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.civil_status?.message}
                    </InputErrorStyled>
                }
                </InputGroup>
              </div>
            </ContainerSectionFields>
            <ContainerSectionFields>
              <span className='title-section'>Registo de empleado </span>
              <div className='container-fileds'>
                <InputGroup className='item'>
                  <InputLabel htmlFor='id_payroll'>Número de trabajador</InputLabel>
                  <Input
                  className='personal-data'
                  {...register('id_payroll', { required: 'El numero es requerido' })}
                  aria-invalid={errors.id_payroll ? 'true' : 'false'}
                />
                  {
                    <InputErrorStyled>
                      errors.id_payroll
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.id_payroll?.message}
                    </InputErrorStyled>
                }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor='tax_id'>Cédula fiscal</InputLabel>
                  <Input
                  textTransform={'uppercase'}
                  maxLength={13}
                  minLength={12}
                  className='personal-data'
                  {...register('tax_id', { required: 'La cedula es requerida' })}
                  aria-invalid={errors.tax_id ? 'true' : 'false'}
                />
                  {
                    <InputErrorStyled>
                      errors.tax_id
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.tax_id?.message}
                    </InputErrorStyled>
                }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="admission_date">Fecha de ingreso</InputLabel>
                  <Input
                  type='date'
                  {...register('admission_date', { required: { value: true, message: 'La fecha es requerida' } })}
                  aria-invalid={errors.admission_date ? 'true' : 'false'}
                />
                  {
                    <InputErrorStyled>
                      errors.admission_date
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.admission_date?.message}
                    </InputErrorStyled>
                }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="low_date">Fecha de baja</InputLabel>
                  <Input
                  type='date'
                  {...register('low_date', { required: { value: false, message: 'La fecha es requerida' } })}
                  aria-invalid={errors.low_date ? 'true' : 'false'}
                />
                  {
                    <InputErrorStyled>
                      errors.low_date
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.low_date?.message}
                    </InputErrorStyled>
                }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor='position'>Puesto</InputLabel>
                  <Input
                  {...register('position', { required: { value: true, message: 'El campo es requerido' } })}
                  aria-invalid={errors.position ? 'true' : 'false'} />
                  {
                    <InputErrorStyled>
                      errors.position
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.position?.message}
                    </InputErrorStyled>
                }
                </InputGroup>
              </div>
            </ContainerSectionFields>
            <ContainerSectionFields >
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
                  <InputLabel htmlFor='number_phone_movil'>Tel movil:</InputLabel>
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
          <ContainerButton
          justify='end'
          top='1rem'
        >
            <Button
            right='.5rem'
            size='mediumSmall'
            type='submit'
          >Guardar</Button>
          </ContainerButton>
        </form>
      </>

      )}

    </>
  )
}

DataStaffView.propTypes = {
}
export default DataStaffView
