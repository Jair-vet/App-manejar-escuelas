import React, { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import LayoutDetailSchoolsStyled from './SchoolDetailStyled'
import DataSchoolView from './views/DataSchoolView'
import UsersSchoolView from './views/UsersSchoolView'

import { changeTitle } from '@/Redux/globalSlice'
import LoaderComponent from '@/common/Components/LoaderComponent'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import SchoolsService from '@/services/schools.service'

const DetailSchoolsPage = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  // ============ SCREEN STATUS ===============

  const { id } = useParams()
  const initHasRun = useRef(false)
  const dispatch = useDispatch()
  const [model, setModel] = useState(new SchoolModel())
  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const [tabs, setTabs] = useState([
    { label: 'Datos', isSelect: true },
    { label: 'Usuarios', isSelect: false }
  ])
  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      if (id !== undefined) {
        dispatch(changeTitle({
          titleHeader: 'Editar institución',
          showArrow: true
        }))
        setPageStatus(PageStatus.LOADING)
        if (initHasRun.current === false) {
          initHasRun.current = true
          const response = await SchoolsService.getSchool(id)
          setModel(response)
        }
        setPageStatus(PageStatus.SUCCESS)
      } else {
        setTabs([
          { label: 'Datos', isSelect: true }
        ])
        dispatch(changeTitle({
          titleHeader: 'Agregar institución',
          showArrow: true
        }))
        setPageStatus(PageStatus.SUCCESS)
      }
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
      initHasRun.current = true
    }
  }

  useEffect(() => {
    if (initHasRun.current === false) {
      init()
    }
  }, [])
  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])
  // ============ INIT DATA LOADING ===============
  return (
    <>
      <LayoutDetailSchoolsStyled>
        <Toaster position="top-center" reverseOrder={false} />
        <Tabs items={tabs} onSelect={changedSelectTab} />
        {pageStatus !== PageStatus.SUCCESS &&
        <LoaderComponent
          status={pageStatus}
          message={errorMessage}
          refreshAction={() => init()}/>}
        {pageStatus === PageStatus.SUCCESS && (
          selectTab === 0
            ? <DataSchoolView school={model} />
            : <UsersSchoolView school={model} heightTable = 'calc(100% - 80px)'/>
        )}
      </LayoutDetailSchoolsStyled>
    </>

  )
}

export default DetailSchoolsPage
