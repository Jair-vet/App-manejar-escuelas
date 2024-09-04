import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom'

import InvoiceStyled from './InvoiceStyled'

// import LoaderComponent from '@/common/Components/LoaderComponent'
import { changeTitle } from '@/Redux/globalSlice'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import UsersSchoolView from '@/features/Dashboard/Pages/SchoolDetail/views/UsersSchoolView'
import SchoolsService from '@/services/schools.service'
import InvoicesSchoolView from '@/features/Dashboard/Pages/SchoolDetail/views/InvoiceSchoolView'

const InvoicePage = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const initHasRun = useRef(false)
  const dispatch = useDispatch()
  const [model, setModel] = useState(new SchoolModel())
  const [idInstitution, setIdInstitution] = useState(0);
  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Usuarios',
        showArrow: false
      }))
      setPageStatus(PageStatus.LOADING)
      // const idSchool = localStorage.getItem(lsSchoolId)
      const idSchool = localStorage.getItem('lsSchoolId'); // Asegúrate de que 'lsSchoolId' sea el nombre correcto
      const school = await SchoolsService.getSchool(idSchool)
      if (idSchool) {
        const school = await SchoolsService.getSchool(idSchool);
        setIdInstitution(idSchool); // Actualiza el estado con el idSchool
      }

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
    <InvoiceStyled>
      {model.id !== undefined 
        ? 
        <InvoicesSchoolView 
          showArrow ={false}
          idInstitution={idInstitution}
          school={model} 
          isShadow={true} 
          heightTable = {'calc( 100vh - 170px)'}
        >
        </InvoicesSchoolView> 
        : 
        <></>
      }
    </InvoiceStyled>

  )
}

export default InvoicePage
