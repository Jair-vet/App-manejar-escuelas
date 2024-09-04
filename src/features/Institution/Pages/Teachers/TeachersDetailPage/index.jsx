import React, { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import LayoutDetailTeacherStyled from './TeachersDetailStyled'
import DataTeacherView from './views/TeacherView'

import { changeTitle } from '@/Redux/globalSlice'
import LoaderComponent from '@/common/Components/LoaderComponent'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'

const DetailTeacherPage = () => {
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)

  const { id } = useParams()
  const initHasRun = useRef(false)
  const dispatch = useDispatch()
  const [model, setModel] = useState(new SchoolModel())
  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const [tabs] = useState([
    { label: 'Datos personales', isSelect: true }
  ])

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      const idSchool = localStorage.getItem(lsSchoolId)
      const model = new SchoolModel(idSchool, '', '', '', '', '', '', 0)
      setModel(model)

      if (id !== undefined) {
        dispatch(
          changeTitle({
            titleHeader: 'Editar Docente',
            showArrow: true
          })
        )

        setPageStatus(PageStatus.LOADING)
        // const response = await TeachersService.getTeacher(id)
        // setUser(response)
        setPageStatus(PageStatus.SUCCESS)
        initHasRun.current = true
      } else {
        dispatch(
          changeTitle({
            titleHeader: 'Agregar Docente',
            showArrow: true
          })
        )
        setPageStatus(PageStatus.SUCCESS)
      }
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

  return (
    <>
      <LayoutDetailTeacherStyled>
        <Toaster position="top-center" reverseOrder={false} />
        <Tabs items={tabs} onSelect={changedSelectTab} />
        {pageStatus !== PageStatus.SUCCESS && (
          <LoaderComponent
            status={pageStatus}
            message={errorMessage}
            refreshAction={() => init()}
          />
        )}
        {pageStatus === PageStatus.SUCCESS && (
          selectTab === 0
            ? <DataTeacherView school={model} />
            : <></>
        )}
      </LayoutDetailTeacherStyled>
    </>
  )
}

export default DetailTeacherPage
