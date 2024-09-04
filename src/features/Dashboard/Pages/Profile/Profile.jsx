import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { MdModeEditOutline } from 'react-icons/md'
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import ProfileStyled, { ContainerUser, DataUser, ContainerProfile, ContainerMain, ContainerButton, ContainerRestorePassword } from './profileStyled'

import Button, { ButtonSecondary } from '@/common/Components/Buttons'
import { Input, InputErrorStyled, InputGroup, InputLabel } from '@/common/Components/Form'
import ModalCustom from '@/common/Components/Modals'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import UserModel from '@/common/Models/UserModel'
import { constantImageUrlUsers } from '@/common/constants/constants'
import { lsEmail, lsName, lsProfilePhoto, lsUserName, lsRolName, lsSchoolId, lsId, lsRol } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import AuthService from '@/services/auth.service'
import SchoolsService from '@/services/schools.service'
import UsersService from '@/services/users.service'

const Profile = ({ school }) => {
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const { register, formState: { errors }, setValue, getValues, handleSubmit } = useForm()

  const navigate = useNavigate()

  const [, setPageStatus] = useState(PageStatus.SUCCESS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setSelectedFile] = useState(null)
  // const [idUserSelect, setIdUserSelect] = useState(undefined)
  // const [isEditing, setIsEditing] = useState(true)
  const [urlSelected, setUserURL] = useState('')

  const profilePhoto = localStorage.getItem(lsProfilePhoto)
  // const [name, setName] = useState(localStorage.getItem(lsName))
  const name = localStorage.getItem(lsName)
  const username = localStorage.getItem(lsUserName)
  const email = localStorage.getItem(lsEmail)

  // const [username, setUsername] = useState(localStorage.getItem(lsUserName))
  // const [email, setEmail] = useState(localStorage.getItem(lsEmail))
  const [rol] = useState(localStorage.getItem(lsRolName))
  const [modalStatus, setmodalStatus] = useState(PageStatus.SUCCESS)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const idUser = localStorage.getItem(lsId)
  const idRol = localStorage.getItem(lsRol)
  const idSchool = localStorage.getItem(lsSchoolId)

  // const [newPassword, setNewPassword] = useState('')
  // const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [imageUser, setImageUser] = useState('')
  const { viewModal, openOrClose } = useOpenModalHandling()

  const fileInputRef = useRef(null)

  const init = async () => {
    setValue('name', name)
    setValue('email', email)
    const validatePhoto = profilePhoto.includes('https') ? profilePhoto : constantImageUrlUsers + profilePhoto

    setImageUser(validatePhoto)
  }

  useEffect(() => {

  })
  const sendDataUser = async (id, user) => {
    await UsersService.editUser(id, user)
  }
  const sendDataUserBySchool = async (id, user) => {
    await SchoolsService.editUserBySchool(idSchool, id, user)
  }
  const onSubmit = async data => {
    try {
      setPageStatus(PageStatus.LOADING)
      const isActive = getValues('is_active')
      const email = getValues('email')
      const name = getValues('name')
      const user = new UserModel(idUser, isActive, idRol, '', email, name, '')
      user.id_rol = idRol
      if (idRol === '1' || idRol === '2') {
        await sendDataUser(idUser, user)
      } else {
        await sendDataUserBySchool(idUser, user)
      }
      toast.success('Datos guardados correctamente')
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }

  const handleFileSelect = async (event) => {
    try {
      const selected = event.target.files[0]
      if (selected) {
        setSelectedFile(selected)
        const urlTemp = URL.createObjectURL(selected)
        setUserURL(urlTemp)
        await UsersService.changePhotoUser(idUser, selected)

        toast.success('Datos guardados correctamente')
      }
    } catch (e) {
      handleErrors(e)
    }
  }

  const onChangePassword = async () => {
    try {
      const password = getValues('password')
      setmodalStatus(PageStatus.LOADING)
      if (idRol === '1' || idRol === '2') {
        await AuthService.changePasswordUserSignIn(idUser, password)
      } else {
        await SchoolsService.changePasswordBySchool(idSchool, idUser, password)
      }
      openOrClose()
      setValue('password', '')
      setValue('password2', '')
      // toast.success('Contraseña cambiada correctamente')
      // setmodalStatus(PageStatus.SUCCESS)
      setmodalStatus(PageStatus.SUCCESS)
    } catch (e) {
      setmodalStatus(PageStatus.SUCCESS)
      toast.error(e.toString())
    }
  }

  const handleOpenProfile = () => {
    setIsModalOpen(true)
  }

  const handleCloseProfile = () => {
    setIsModalOpen(false)
    navigate(-1)
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
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <ModalCustom
        width='65%'
        title={'Perfil'}
        onlyPrimaryButton={true}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={isModalOpen ? handleCloseProfile : handleOpenProfile}
        statusPageModal={PageStatus.SUCCESS}
        message='Mensaje de error'
        refreshAction={() => { }}
        footer={<div>
          <Button
            onClick={handleCloseProfile}
          >
            Cerrar
          </Button>
        </div>}
      >
        <ProfileStyled >
          <ContainerProfile>
            <ContainerMain>
              <DataUser>
                <span>Datos personales</span>
                <div className='container-main-data'>
                  <div className='container-data'>
                    <div className='container-input'>
                      <InputLabel
                        htmlFor='name'
                        className='item-title'
                        display='flex'
                      >Nombre completo:</InputLabel>

                      <Input
                            type="text"
                            width='50%'
                            {...register('name', { required: 'El nombre es requerido' })}
                            aria-invalid={errors.name ? 'true' : 'false'}
                          />

                    </div>
                    <div className='container-input'>
                      <InputLabel
                        htmlFor='username'
                        className='item-title'
                        display='flex'
                        fontSize='17px'
                      >Nombre de usuario:
                      </InputLabel>
                      <p>{username}</p>

                    </div>
                    <div className='container-input'>
                      <InputLabel
                        className='item-title'
                        htmlFor='email'
                        display='flex'
                      >Correo:
                      </InputLabel>
                      <Input
                            type="text"
                            width='50%'
                            {...register('email', { required: 'El correo es requerido' })}
                            aria-invalid={errors.email ? 'true' : 'false'}
                          />

                    </div>
                    <div className='container-input'>
                      <InputLabel
                        className='item-title'
                        display='flex'
                        htmlFor='rol'
                      >Tipo de usuario
                      </InputLabel>
                      <p>{rol}</p>

                    </div>
                    <ContainerRestorePassword>
                      <div className="row">
                        <ButtonSecondary onClick={openOrClose} left='-1.2rem'>Restaurar contraseña</ButtonSecondary>
                      </div>
                    </ContainerRestorePassword>
                  </div>

                </div>

              </DataUser>
              <ContainerUser>
                <div className='container-photo'>
                  <img src={urlSelected === '' ? imageUser : urlSelected} alt="user" className='user' />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                  />
                </div>
                <div className='container-icon'>
                  <span
                    onClick={() => fileInputRef.current.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <MdModeEditOutline size='1.2rem' className='icon-edit' />
                  </span>
                </div>
              </ContainerUser>

            </ContainerMain>
            <ContainerButton>
              <Button onClick={onSubmit} left='3.2rem' bottom='1rem'>Guardar Cambios</Button>
            </ContainerButton>
          </ContainerProfile>
        </ProfileStyled>
      </ModalCustom>

      {viewModal && (<ModalCustom
        key={1}
        width='30%'
        title={'Cambiar contraseña'}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={openOrClose}
        statusPageModal={modalStatus}
        customButtons={true}
        message='Mensaje de error'
        refreshAction={() => { }}
      >
        <form onSubmit={handleSubmit(onChangePassword)}>
          <div className='container-main-data'>
            <div className='container-data'>
              <ContainerRestorePassword>
                <InputGroup>
                  <InputLabel htmlFor="password" placeholder='Confirma contraseña' >Confirma contraseña</InputLabel>

                  <div className='position'>
                    <Input
                    minLength={3}
                    maxLength={40}
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: { value: true, message: 'El campo es requerido' }
                    })}
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                    <div className='see-password-recovery'>
                      {showPassword
                        ? (
                          <PiEyeLight
                        size='1.2rem'
                        color='#13C5A4'
                        onClick={() => setShowPassword(false)}
                  />
                          )
                        : (
                          <PiEyeClosedLight
                  className='eyes'
                    size='1.2rem'
                    color='#13C5A4'
                    onClick={() => setShowPassword(true)}
                  />
                          )}
                    </div>
                  </div>

                  {
                    <InputErrorStyled>
                      errors.password
                    </InputErrorStyled> &&
                      <InputErrorStyled>
                        {errors.password?.message}
                      </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup>
                  <InputLabel htmlFor="password2" placeholder='Confirma contraseña' >Confirma contraseña</InputLabel>

                  <div className='position'>
                    <Input
                    minLength={3}
                    maxLength={40}
                    type={showPassword2 ? 'text' : 'password'}
                    {...register('password2', {
                      required: { value: true, message: 'El campo es requerido' },
                      validate: (value) => {
                        const password = getValues('password')
                        if (password !== value) {
                          return 'Las contraseñas no coinciden'
                        }
                        return true
                      }
                    })}
                    aria-invalid={errors.password2 ? 'true' : 'false'}
                  />
                    <div className='see-password-recovery'>
                      {showPassword2
                        ? (
                          <PiEyeLight
                        size='1.2rem'
                        color='#13C5A4'
                        onClick={() => setShowPassword2(false)}
                  />
                          )
                        : (
                          <PiEyeClosedLight
                  className='eyes'
                    size='1.2rem'
                    color='#13C5A4'
                    onClick={() => setShowPassword2(true)}
                  />
                          )}
                    </div>
                  </div>

                  {
                    <InputErrorStyled>
                      errors.password2
                    </InputErrorStyled> &&
                      <InputErrorStyled>
                        {errors.password2?.message}
                      </InputErrorStyled>
                  }
                </InputGroup>
              </ContainerRestorePassword>
            </div>

          </div>
          <Button left='3.2rem' top='10px' type='submit'>Guardar</Button>
        </form>

      </ModalCustom>)}
    </>
  )
}
Profile.propTypes = {
  school: PropTypes.instanceOf(SchoolModel)
}

export default Profile
