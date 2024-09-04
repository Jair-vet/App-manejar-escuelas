import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'

// import Inscription from '../../Inscription'
import { ContainerButton, ContainerSectionFields } from '../../StudentDetailsStyled'
import useDetailStudentHandling from '../../hooks/useStudent'

import Button, { StatusButton } from '@/Common/Components/Buttons'
import { InputErrorStyled, InputGroup, InputLabel, Input, Select } from '@/common/Components/Form'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import UtilsService from '@/services/utils.service'

const AddressStudentView = () => {
  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const { register, handleSubmit, formState: { errors }, setValue, watch, setError } = useForm()
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const studentDetailStore = useSelector((state) => state.student)
  const data = studentDetailStore.data
  const [suburbsOptions, setSuburbsOptions] = useState([])
  const { editStudent, createStudent } = useDetailStudentHandling()

  const navigate = useNavigate()

  const { id } = useParams()
  const watchPostalCode = watch('postalcode')

  // ==================== INIT  ===============

  const init = async () => {
    try {
      if (id !== undefined) {
        setValue('postalcode', data.postalcode)
        setValue('country', data.country)
        setValue('state', data.state)
        setValue('municipality', data.municipality)
        setValue('suburb', data.suburb)
        setValue('address_description', data.address_description)
        setValue('references', data.references)
        setValue('ext_number', data.ext_number)
        setValue('int_number', data.int_number)
      } else {
        setValue('country', 'México')
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
      setValue('state', response.state[0].state)
      setValue('municipality', response.municipality[0].municipality)
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

  const onSubmit = async data => {
    try {
      if (id !== undefined) {
        setStatusBtn(StatusButton.Loading)
        await editStudent(id, data)
        toast.success('Alumno editado correctamente')
        setStatusBtn(StatusButton.Enabled)
      } else {
        setStatusBtn(StatusButton.Loading)
        await createStudent(data)
        setStatusBtn(StatusButton.Enabled)
        toast.success('Alumno creado correctamente')
        navigate(-1)
        setStatusBtn(StatusButton.Enabled)
      }
    } catch (e) {
      setStatusBtn(StatusButton.Enabled)
      handleErrors(e)
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='all-fields-data-container'>
          <ContainerSectionFields margin={'10px 0px 0px 0px'}>
            <div className='container-fileds'>
              <InputGroup className='item'>
                <InputLabel htmlFor='postalcode'>Código postal:</InputLabel>
                <Input
                  type='text'
                  minLength={5}
                  maxLength={5}
                  {...register('postalcode', { required: { value: true, message: 'El campo es requerido' } })}
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
                  maxLength={ 50 }
                  {...register('country', { required: { value: true, message: 'El campo es requerido' } })}
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
                  {...register('state', { required: 'El campo  es requerido' })}
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
                  {...register('municipality', { required: 'El campo  es requerido' })}
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
                    {...register('suburb', { required: 'El campo  es requerido' })}
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
                  {...register('address_description', { required: 'El campo  es requerido' })}
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
                  {...register('references', { required: { value: false, message: '' } })}
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
                  {...register('ext_number', { required: { value: true, message: '' }, pattern: { value: /^[0-9]+$/, message: 'Solo se permiten numeros' } })}
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
                  {...register('int_number', { required: { value: false, message: '' } })}
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
        </div>
        <ContainerButton>
          {/* <Checkbox
            value={showModal}
            name=''
            disabled={false}
            id=''
            checked={showModal}
            label='Inscribir automaticamente'
            onChange={() => setShowModal(!showModal)}
          /> */}
          <Button
            size='mediumSmall'
            status={statusBtn}
          >Guardar</Button>
        </ContainerButton>
      </form>
    </>
  )
}

export default AddressStudentView
