import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2'
import { IoCopy } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { ContainerFields, CopyContainer, FooterModalUser, ModalUserCreateContainer } from '../SchoolDetailStyled'
import useSearchUsersSchoolHandling from '../hooks/useSearchTable'
import useUsersSchoolHandling from '../hooks/useUsers'

import TableUsersBySchool from './TableUsersBySchool'

import SchoolModel from '@/Common/Models/SchoolModel'
import { lsId } from '@/Common/constants/localStorageConstants'
import { changeTitle } from '@/Redux/globalSlice'
import SchoolsService from '@/Services/schools.service'
import Button, { StatusButton } from '@/common/Components/Buttons'
import { FormGlobal, Input, InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
import { Checkbox } from '@/common/Components/Form/checkbox'
import ModalCustom from '@/common/Components/Modals'
import Search from '@/common/Components/Search'
import TableCustom from '@/common/Components/Tables/TableCustom'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import UsersService from '@/services/users.service'

const UsersSchoolView = ({ school, isShadow, heightTable, showArrow }) => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setmodalStatus] = useState(PageStatus.SUCCESS)
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewModalCreate, openOrClose: openOrCloseCreate } = useOpenModalHandling()

  // ============ SCREEN STATUS ===============

  const initHasRun = useRef(false)
  const { register, handleSubmit, formState: { errors }, getValues, reset, setValue, watch } = useForm()
  const nameField = watch('name')
  // const navigate = useNavigate()
  const { users, loadUsers } = useUsersSchoolHandling()
  const { isSearch, usersSearch, search } = useSearchUsersSchoolHandling()
  const [isEdit, setIsEdit] = useState(false)
  const [idUserSelect, setIdUserSelect] = useState(undefined)
  const fullPath = `${location.origin}/${school.uuid}`
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)
  const [isSuperUser, setIsSuperUser] = useState(false)

  const idCurrent = localStorage.getItem(lsId)

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Usuarios de institución',
        showArrow: showArrow === undefined ? true : showArrow
      }))
      if (school.id !== undefined) {
        setPageStatus(PageStatus.LOADING)
        await loadUsers(school.id)
        setPageStatus(PageStatus.SUCCESS)
        initHasRun.current = true
      } else {
        setPageStatus(PageStatus.SUCCESS)
      }
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
      initHasRun.current = true
    }
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

  // useEffect para observar cambios en el campo
  useEffect(() => {
    // Realiza las acciones que desees cuando el campo cambie
    if (isEdit === false) {
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
  // ============ INIT DATA LOADING ===============

  const onSubmit = async data => {
    try {
      if (isEdit) {
        setmodalStatus(PageStatus.LOADING)
        await UsersService.editUser(idUserSelect, data)
        await loadUsers(school.id)
        setmodalStatus(PageStatus.SUCCESS)
        openOrClose()
        reset()
        toast.success('Usuario editado correctamente')
      } else {
        setmodalStatus(PageStatus.LOADING)
        const response = await SchoolsService.createUserBySchool(school.id, data)
        await loadUsers(school.id)
        setmodalStatus(PageStatus.SUCCESS)
        setValue('passwordUser', response.data.data.password)
        openOrClose()
        openOrCloseCreate()
        toast.success('Usuario creado correctamente')

        // toast.success('Usuario creado correctamente')
      }
    } catch (e) {
      handleErrors(e)
      setmodalStatus(PageStatus.SUCCESS)
    }
  }
  const createUser = () => {
    setIsEdit(false)
    setIdUserSelect(undefined)
    setmodalStatus(PageStatus.SUCCESS)
    reset()
    openOrClose()
  }
  const editUser = (user) => {
    setIsEdit(true)
    setValue('name', user.name)
    setValue('username', user.username)
    setValue('id_rol', user.id_rol)
    setValue('email', user.email)
    setValue('is_active', user.is_active)
    setValue('is_super', user.is_superuser)
    setIsActive(user.is_active)
    setIsSuperUser(user.is_superuser)

    setmodalStatus(PageStatus.SUCCESS)
    openOrClose()
    setIdUserSelect(user.id)
  }
  const searchUsers = async (target) => {
    try {
      setPageStatus(PageStatus.LOADING)
      search(school.id, target.target.value)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }

  const copyAccess = async () => {
    try {
      const username = getValues('username')
      const pass = getValues('passwordUser')
      // const pathCurrent = location.origin

      const textToCopy = `username: ${username} \n password: ${pass} \n Link: ${fullPath}`
      navigator.clipboard.writeText(textToCopy)
      toast.success('Datos copiados')
    } catch (e) {
      toast.error('No se copiaron los datos' + e.toString())
    }
  }

  const changePassword = async () => {
    try {
      setmodalStatus(PageStatus.LOADING)
      const response = await SchoolsService.changePasswordAllUsersBySchool(school.id, idUserSelect)
      setValue('passwordUser', response.data.data.password)
      openOrClose()
      openOrCloseCreate()
      setmodalStatus(PageStatus.SUCCESS)
    } catch (e) {
      setmodalStatus(PageStatus.SUCCESS)
      toast.error(e.toString())
    }
  }
  const sendEmail = async (isResend) => {
    try {
      const email = getValues('email')
      const password = getValues('passwordUser')
      const subject = isResend ? 'Ssusy - Reenvio de accesos' : 'Ssusy - Accesos'
      const link = fullPath.replace('https://', '')
      await UsersService.sendAccessUser(idUserSelect, link, subject, password)
      toast.success(`Accesos enviados a ${email}`)
    } catch (e) {
      toast.error(e.toString())
    }
  }
  const onCheck = () => {
    const newValue = !isActive
    setIsActive(newValue)
    setValue('is_active', newValue)
  }
  const onCheckSuperUser = () => {
    const newValue = !isSuperUser
    setIsSuperUser(newValue)
    setValue('is_superuser', newValue)
  }
  return (
    <div className='view-detail-users-schools-container'>
      <Search actionButton={createUser} searchAction={searchUsers} />
      {/* {pageStatus !== PageStatus.SUCCESS && <LoaderComponent status={pageStatus} message={errorMessage} refreshAction={() => init()}/>} */}
      {/* 'calc(100% - 80px)' */}
      <TableCustom
        statusTable={pageStatus}
        indexImageField={1}
        withContainerWhite={isShadow}
        totalItems={5}
        heightTable={heightTable}
        titles={['Nombre', 'Nombre de usuario', 'Rol', 'Status', 'Acciones']}>
        <TableUsersBySchool editUser={editUser} isSearch={isSearch} items={isSearch ? usersSearch : users}></TableUsersBySchool>
      </TableCustom>
      {viewModal && <FormGlobal onSubmit={handleSubmit(onSubmit)}>
        <ModalCustom
          footer={<FooterModalUser gap='1.2rem' justify='end' right='0.8rem'>
            <Button status={StatusButton.Enabled} onClick={changePassword} className="f-child item" type='button'>Cambiar contraseña</Button>
            <Button className="f-child item" type='submit'>Guardar</Button>
          </FooterModalUser>}
          width={'52%'} closeButton={true} refreshAction={() => setmodalStatus(modalStatus.SUCCESS)}
          title={'Agregar usuario'} openOrClose={openOrClose}
          statusPageModal={modalStatus} message={errorMessage} >
          <ContainerFields>
            <Toaster
            position="top-center"
            reverseOrder={false}
          />
            <InputGroup className='item'>
              <InputLabel htmlFor="name">Nombre completo</InputLabel>
              <Input
                maxLength={45}
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
                textTransform={'uppercase'}
                {...register('username', { required: 'El nombre de usuario es requerido' })}
                aria-invalid={errors.email ? 'true' : 'false'}
                disabled={isEdit === true}
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
            <InputGroup className='item rol'>
              <InputLabel htmlFor="id_rol">Rol de usuario</InputLabel>
              <Select
                {...register('id_rol', { required: 'El rol es requerido' })}
                aria-invalid={errors.id_rol ? 'true' : 'false'}
              >
                <option className='select-option' value="">Selecciona un elemento</option>
                <option value={3}>Administrador</option>
                {/* <option value={4}>Docente</option> */}
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
            {isEdit && idUserSelect.toString() !== idCurrent.toString()
              ? <>
                <InputGroup className='item item-checkbox' >
                  <Checkbox
                  label='Usuario activo'
                  value={isActive}
                  checked={isActive}
                  onChange={({ target }) => onCheck()}
                />
                </InputGroup>
                <InputGroup className='item item-checkbox' >
                  <Checkbox
                    label='Es super usuario'
                    value={isSuperUser}
                    checked={isSuperUser}
                    onChange={({ target }) => onCheckSuperUser()}
                  />
                </InputGroup>
              </>
              : <></>
            }
            <InputGroup className='item'>
            </InputGroup>
          </ContainerFields>

        </ModalCustom>
      </FormGlobal>}

      {viewModalCreate && <FormGlobal>
        <ModalCustom title={'Usuario creado'}
          width='50%'
          onlyPrimaryButton={true}
          closeButton={true}
          openOrClose={() => { }}
          statusPageModal={PageStatus.SUCCESS}
          footer={<Button onClick={() => openOrCloseCreate()} className="f-child" type='button'>Aceptar</Button>}
          message={errorMessage} >
          <div className=''>
            <Toaster
            position="top-center"
            reverseOrder={false}
          />
            <ModalUserCreateContainer>
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
            </ModalUserCreateContainer>
            <CopyContainer>
              <a href={fullPath} target="_blank" className='link-container' rel="noreferrer" >
                <span className='link-login'>{fullPath}</span>
                <HiMiniArrowTopRightOnSquare className="icon" />
              </a>
              <div className="copy-container" onClick={() => copyAccess()}>
                <span>Copiar accesos</span>
                <IoCopy size='1.5rem' className='icon' />
              </div>
            </CopyContainer>
            <CopyContainer>
              <div className="copy-container" onClick={() => sendEmail()}>
                <span>Enviar por correo</span>
                <MdEmail size='1.5rem' className='icon' />
              </div>
            </CopyContainer>
          </div>

        </ModalCustom></FormGlobal>}
    </div>

  )
}

UsersSchoolView.propTypes = {
  school: PropTypes.instanceOf(SchoolModel).isRequired,
  isShadow: PropTypes.bool.isRequired,
  heightTable: PropTypes.string.isRequired,
  showArrow: PropTypes.bool.isRequired
}

// // DataSchoolView.propTypes = {
// //   schools: PropTypes.array.isRequired
// // }

export default UsersSchoolView
