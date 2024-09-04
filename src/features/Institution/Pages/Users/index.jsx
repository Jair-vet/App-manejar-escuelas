import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom'

import UsersInstitutionStyled from './UsersInstitutionPageStyled'

// import LoaderComponent from '@/common/Components/LoaderComponent'
import { changeTitle } from '@/Redux/globalSlice'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import UsersSchoolView from '@/features/Dashboard/Pages/SchoolDetail/views/UsersSchoolView'
import SchoolsService from '@/services/schools.service'

const UsersSchoolsPage = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  // ============ SCREEN STATUS ===============

  const initHasRun = useRef(false)
  const dispatch = useDispatch()
  const [model, setModel] = useState(new SchoolModel())
  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Usuarios',
        showArrow: false
      }))
      setPageStatus(PageStatus.LOADING)
      const idSchool = localStorage.getItem(lsSchoolId)
      const school = await SchoolsService.getSchool(idSchool)
      setModel(school)
      setPageStatus(PageStatus.SUCCESS)
      initHasRun.current = true
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
      initHasRun.current = true
    }
  }

  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
  }, [])
  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])
  // ============ INIT DATA LOADING ===============
  return (
    <UsersInstitutionStyled>
      {model.id !== undefined ? <UsersSchoolView showArrow ={false} school={model} isShadow={true} heightTable = {'calc( 100vh - 170px)'}></UsersSchoolView> : <></>}
    </UsersInstitutionStyled>

  )
}

export default UsersSchoolsPage
