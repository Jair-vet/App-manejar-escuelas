import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import ProfileSchoolStyled, { ContainerButton } from './ProfileSchoolStyled'

import { cangeSelectTab } from '@/Redux/adminSlice'
import SchoolsService from '@/Services/schools.service'
import Button, { StatusButton } from '@/common/Components/Buttons'
import ModalCustom from '@/common/Components/Modals'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import { lsAddres, lsName, lsClave, lsRfc, lsSchoolId, lsRol } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import OneStepSetting from '@/features/Institution/Pages/SchoolSettingsSteps/OneStepSetting'

const ProfileSchool = () => {
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)

  const [modalStatus] = useState(PageStatus.SUCCESS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setSchool] = useState({})
  const [name] = useState(localStorage.getItem(lsName))
  const [address] = useState(localStorage.getItem(lsAddres))
  const [clave] = useState(localStorage.getItem(lsClave))
  const [rfc] = useState(localStorage.getItem(lsRfc))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const adminStore = useSelector((state) => state.admin)

  const [tabs] = useState([
    { label: 'Datos de escuela', isSelect: true },
    { label: 'Pasarela de pagos', isSelect: false }
  ])

  const userRole = localStorage.getItem(lsRol)
  console.log(userRole)
  const init = async () => {
    try {
      const idSchool = localStorage.getItem(lsSchoolId)
      const response = await SchoolsService.getSchool(idSchool)

      setSchool(response)
      setValue('name', name)
      setValue('address', address)
      setValue('clave', clave)
      setValue('rfc', rfc)

      changedSelectTab(adminStore.tabSelected, tabs)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
    }
  }

  const handleCloseProfile = () => {
    setIsModalOpen(false)
    navigate(-1)
    console.log(userRole)
  }

  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  useEffect(() => {
    init()
  }, [])

  const onSelectTabs = (index, items) => {
    dispatch(changedSelectTab({
      tabSelected: index
    }))
    changedSelectTab(index, items)
  }

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <ModalCustom
        width='65%'
        title={'Perfil de Escuela'}
        onlyPrimaryButton={true}
        message='Mensaje de error'
        statusPageModal={PageStatus.SUCCESS}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={isModalOpen ? handleCloseProfile : handleCloseProfile}
        refreshAction={() => { }}
        footer={
          <div className='footer-profileSchool'>
            <ContainerButton>
              <Button onClick={handleCloseProfile}>
                Cerrar
              </Button>
            </ContainerButton>
          </div>
        }
      >
        <Tabs items={tabs} onSelect={onSelectTabs}/>
        { pageStatus === PageStatus.SUCCESS && (selectTab === 0
          ? (
            <ProfileSchoolStyled className='profileSchool'>
              <OneStepSetting
            isDisabled={userRole === '1' || userRole === '3'}
            width='90%'
            changeTextButton='Guardar cambios'
            showLabel={false}
            changeName={name}
            changeAddress={address}
            changeClave={clave}
            changeRfc={rfc}
          />
            </ProfileSchoolStyled>)
          : <></>)}

      </ModalCustom>
    </>
  )
}

export default ProfileSchool
