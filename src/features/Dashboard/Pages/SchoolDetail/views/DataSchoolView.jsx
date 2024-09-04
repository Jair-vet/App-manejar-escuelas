import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

import { ContainerFields } from '../SchoolDetailStyled'

import Button, { StatusButton } from '@/common/Components/Buttons'
import { FormGlobal, Input, InputErrorStyled, InputGroup, InputLabel } from '@/common/Components/Form'
import SchoolModel from '@/common/Models/SchoolModel'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import { ContainerButton } from '@/features/Dashboard/Pages/DetailUser/DetailUserStyled'
import SchoolsService from '@/services/schools.service'

const DataSchoolView = ({ school }) => {
  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()

  const navigate = useNavigate()

  // ============ INIT DATA LOADING ===============
  useEffect(() => {
    if (school.id !== undefined) {
      setValue('name', school.name)
      setValue('rfc', school.rfc)
      setValue('is_active', school.isActive)
      setValue('clave', school.clave)
      setValue('address', school.address)
    }
  }, [school, setValue])

  useEffect(() => {
    console.log(errorMessage)
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])
  // ============ INIT DATA LOADING ===============

  const onSubmit = async data => {
    try {
      if (school.id !== undefined) {
        setStatusBtn(StatusButton.Loading)
        await SchoolsService.editSchool(school.id, data)
        toast.success('Institución editado correctamente')
        setStatusBtn(StatusButton.Enabled)
      } else {
        setStatusBtn(StatusButton.Loading)
        const response = await SchoolsService.createSchool(data)
        setStatusBtn(StatusButton.Enabled)
        if (response.status === 201) {
          toast.success('Institución creado correctamente')
          navigate(-1)
          // navigate(`${routesNamesDashboard.onlyDetailSchool}${response.data.data.id}`, { replace: true })
        }
      }
    } catch (e) {
      setStatusBtn(StatusButton.Enabled)
      handleErrors(e)
    }
  }
  return (
    <>
      <FormGlobal onSubmit={handleSubmit(onSubmit)}
        margin={'20px'}
        padding={'30px 10px 30px 10px'}
      >
        <ContainerFields>
          <InputGroup className='item'>
            <InputLabel htmlFor="name">Nombre institución</InputLabel>

            <Input
              maxLength={45}
              {...register('name', { required: 'El nombre es requerido' })}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {<InputErrorStyled>errors.name</InputErrorStyled> && (
              <InputErrorStyled>{errors.name?.message}</InputErrorStyled>
            )}
          </InputGroup>
          <InputGroup className='item'>
            <InputLabel htmlFor="address">Dirección</InputLabel>

            <Input
              maxLength={100}
              {...register('address', {
                required: 'La Dirección es requerida'
              })}
              aria-invalid={errors.address ? 'true' : 'false'}
            />
            {<InputErrorStyled>errors.address</InputErrorStyled> && (
              <InputErrorStyled>{errors.address?.message}</InputErrorStyled>
            )}
          </InputGroup>
          <InputGroup className='item'>
            <InputLabel htmlFor="clave">Clave institución</InputLabel>

            <Input
              maxLength={60}
              {...register('clave', {
                required: 'La clave  es requerida'
              })}
              aria-invalid={errors.clave ? 'true' : 'false'}
            />
            {<InputErrorStyled>errors.clave</InputErrorStyled> && (
              <InputErrorStyled>{errors.clave?.message}</InputErrorStyled>
            )}
          </InputGroup>
          <InputGroup className='item'>
            <InputLabel htmlFor="rfc">Rfc</InputLabel>
            <Input
              textTransform={'uppercase'}
              maxLength={13}
              {...register('rfc', { required: 'El Rfc es requerido' })}
              aria-invalid={errors.rfc ? 'true' : 'false'}
            />
            {<InputErrorStyled>errors.rfc</InputErrorStyled> && (
              <InputErrorStyled>{errors.rfc?.message}</InputErrorStyled>
            )}
          </InputGroup>
          <InputGroup className='item'>
            <InputLabel htmlFor="pays_secret_key">Secret key</InputLabel>
            <Input
              maxLength={45}
              {...register('pays_secret_key', { required: { value: false } })}
              aria-invalid={errors.pays_secret_key ? 'true' : 'false'}
            />
            {<InputErrorStyled>errors.name</InputErrorStyled> && (
              <InputErrorStyled>{errors.pays_secret_key?.message}</InputErrorStyled>
            )}
          </InputGroup>
          <InputGroup className='item'>
            <InputLabel htmlFor="pays_public_key">Public key</InputLabel>

            <Input
              maxLength={100}
              {...register('pays_public_key', {
                required: { value: false }
              })}
              aria-invalid={errors.pays_public_key ? 'true' : 'false'}
            />
            {<InputErrorStyled>errors.address</InputErrorStyled> && (
              <InputErrorStyled>{errors.pays_public_key?.message}</InputErrorStyled>
            )}
          </InputGroup>

          <InputGroup className='item'>
            <InputLabel htmlFor="pays_secret_key">TEST Secret key</InputLabel>
            <Input
              maxLength={45}
              {...register('test_pays_secret_key', { required: { value: false } })}
              aria-invalid={errors.test_pays_secret_key ? 'true' : 'false'}
            />
            {<InputErrorStyled>errors.name</InputErrorStyled> && (
              <InputErrorStyled>{errors.test_pays_secret_key?.message}</InputErrorStyled>
            )}
          </InputGroup>
          <InputGroup className='item'>
            <InputLabel htmlFor="test_pays_public_key">TEST Public key</InputLabel>

            <Input
              maxLength={100}
              {...register('test_pays_public_key', {
                required: { value: false }
              })}
              aria-invalid={errors.test_pays_public_key ? 'true' : 'false'}
            />
            {<InputErrorStyled>errors.test_pays_public_key</InputErrorStyled> && (
              <InputErrorStyled>{errors.test_pays_public_key?.message}</InputErrorStyled>
            )}
          </InputGroup>
          {school.id !== undefined
            ? <InputGroup className='item'>
              <InputLabel htmlFor="is_active">Institución activa</InputLabel>
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
          }
          <InputGroup className='item'>
          </InputGroup>

        </ContainerFields>
        <ContainerButton>
          <Button top='20px' size='large' color='white' type='submit' status={statusBtn} >Guardar</Button>
        </ContainerButton>
      </FormGlobal>
    </>

  )
}

DataSchoolView.propTypes = {
  school: PropTypes.instanceOf(SchoolModel).isRequired
}

export default DataSchoolView
