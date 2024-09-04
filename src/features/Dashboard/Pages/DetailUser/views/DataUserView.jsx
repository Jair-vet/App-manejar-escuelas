import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoCopy } from 'react-icons/io5'
import { useNavigate } from 'react-router'

import { ContainerButton } from '../DetailUserStyled'

import Button, { StatusButton } from '@/common/Components/Buttons'
import { FormGlobal, Input, InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
import { Checkbox } from '@/common/Components/Form/checkbox'
import ModalCustom from '@/common/Components/Modals'
import PageStatus from '@/common/Models/Enums'
import UserModel from '@/common/Models/UserModel'
import { lsId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import UsersService from '@/services/users.service'

const DataUserView = ({ user }) => {
  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm()
  const nameField = watch('name')
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const { viewModal, openOrClose } = useOpenModalHandling()
  const [isActive, setIsActive] = useState(false)
  const idCurrent = localStorage.getItem(lsId)

  const navigate = useNavigate()

  // ============ INIT DATA LOADING ===============
  useEffect(() => {
    // openOrClose()
    if (user.id !== undefined) {
      setValue('name', user.name)
      setValue('username', user.username)
      setValue('id_rol', user.rol)
      setValue('email', user.email)
      setValue('is_active', user.isActive)
      setIsActive(user.isActive)
    }
  }, [user, setValue])

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
      if (user.id !== undefined) {
        setStatusBtn(StatusButton.Loading)
        await UsersService.editUser(user.id, data)
        toast.success('Usuario editado correctamente')
        setStatusBtn(StatusButton.Enabled)
      } else {
        setStatusBtn(StatusButton.Loading)
        const response = await UsersService.createUser(data)
        setStatusBtn(StatusButton.Enabled)
        if (response.status === 201) {
          setValue('passwordUser', response.data.data.password)
          openOrClose()
          user.id = response.data.data.id
        }
      }
    } catch (e) {
      setStatusBtn(StatusButton.Enabled)
      handleErrors(e)
    }
  }

  const acceptCreatedUser = () => {
    openOrClose()
    navigate(-1)
  }

  useEffect(() => {
    // Realiza las acciones que desees cuando el campo cambie
    if (user.id === undefined) {
      const name = getValues('name')
      if (name !== '' && name !== undefined) {
        const phrases = name?.split(' ')
        const firstname = phrases[0]
        const lastName = phrases.length > 1 ? phrases[1].length > 1 ? phrases[1].charAt(0) : '' : ''
        const result = `${firstname}${lastName}`.toUpperCase()
        setValue('username', result)
      }
    }
  }, [nameField])

  const copyAccess = async () => {
    try {
      const username = getValues('username')
      const pass = getValues('passwordUser')
      const pathCurrent = location.origin

      const textToCopy = `username: ${username} \n password: ${pass} \n Link: ${pathCurrent}`
      navigator.clipboard.writeText(textToCopy)
      toast.success('Datos copiados')
    } catch (e) {
      toast.error('No se copiaron los datos' + e.toString())
    }
  }

  const onCheck = () => {
    const newValue = !isActive
    setIsActive(newValue)
    setValue('is_active', newValue)
  }
  return (
    <div className='container-form-user'>

      <FormGlobal
          onSubmit={handleSubmit(onSubmit)}
          margin={'20px'}
          padding={'30px 10px 30px 10px'}
          >
        <div className='container-fields'>
          <InputGroup className='item'>
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <Input
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
            <InputLabel htmlFor="email">Correo electrónico</InputLabel>
            <Input
              {...register('email', { required: 'El correo es requerido', pattern: /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/ })}
              aria-invalid={errors.email ? 'true' : 'false'}
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
          <InputGroup className='item'>
            <InputLabel htmlFor="username">Usuario</InputLabel>
            <Input
              {...register('username', { required: 'El usuario es requerido' })}
              aria-invalid={errors.username ? 'true' : 'false'}
              disabled={user.id !== undefined}
            />
            {
              <InputErrorStyled>
                errors.username
              </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.username?.message}
                </InputErrorStyled>
            }
          </InputGroup>
          <InputGroup className='item'>
            <InputLabel htmlFor="id_rol">Rol de usuario</InputLabel>
            <Select
              {...register('id_rol', { required: 'El rol es requerido' })}
              aria-invalid={errors.id_rol ? 'true' : 'false'}
            >
              <option className='select-option rol' value="">Selecciona un elemento</option>
              <option value={1}>Root</option>
              {/* <option value={2}>Super admin</option> */}
            </Select>
            {
              <InputErrorStyled>
                errors.name
              </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.name?.message}
                </InputErrorStyled>
            }
          </InputGroup>
          { user.id !== undefined && user.id.toString() !== idCurrent.toString()
            ? <InputGroup className='item item-checkbox'>
              <Checkbox
                  label='Usuario activo'
                  value={isActive}
                  checked={isActive}
                  onChange={({ target }) => onCheck()}
                />
            </InputGroup>
            : <></>
          }
          <InputGroup className='item'>
          </InputGroup>
        </div>
        <ContainerButton>
          <Button top='20px' size='large' color='white' type='submit' status={statusBtn} >Guardar</Button>
        </ContainerButton>
      </FormGlobal >
      {viewModal && <FormGlobal>
        <ModalCustom title={'Usuario creado'}
      onlyPrimaryButton={true}
      openOrClose={() => {}}
      statusPageModal={PageStatus.SUCCESS}
      footer={<Button onClick={() => acceptCreatedUser()} className="f-child" type='button'>Aceptar</Button>}
      message={errorMessage} >
          <div className=''>
            <div className='modal-container-field'>
              <InputGroup className='item'>
                <InputLabel htmlFor="username">Usuario</InputLabel>
                <Input
              {...register('username', { required: 'El nombre es requerido' })}
              aria-invalid={errors.name ? 'true' : 'false'}
              disabled
              />
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor="passwordUser">Contraseña</InputLabel>
                <Input
              {...register('passwordUser', { required: 'El correo es requerido' })}
              aria-invalid={errors.passwordUser ? 'true' : 'false'}
              disabled
            />
              </InputGroup>
            </div>
            <div className="copy-container" onClick={() => copyAccess()}>
              <span>Copiar accesos</span>
              <IoCopy size='2rem' className='icon'/>
            </div>
          </div>

        </ModalCustom></FormGlobal> }
    </div>

  )
}

DataUserView.propTypes = {
  user: PropTypes.instanceOf(UserModel).isRequired
}

export default DataUserView
