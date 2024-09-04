import React, { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import TutorPage from '../TutorsView/Component/TutorsStudentView'

import LayoutDetailTutorsStyled from './TutorsStyled'

import LoaderComponent from '@/Common/Components/LoaderComponent'
import { lsStudentId } from '@/Common/constants/localStorageConstants'
import useTabSelectedHandling from '@/Common/hooks/useTabSelect'
import { changeTitle } from '@/Redux/globalSlice'
import { changeStudent } from '@/Redux/studentSlice'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import TutorService from '@/services/tutors.service'

const DetailTutorPage = () => {
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)

  const { changedSelectTab, selectTab } = useTabSelectedHandling()

  const { id } = useParams()
  const initHasRun = useRef()
  const dispatch = useDispatch()

  const [tabs, setTabs] = useState([
    { label: 'Datos Personales', isSelected: true },
    { label: 'Domicilio', isSelected: false },
    { label: 'Datos de contacto', isSelected: false }
  ])

  const init = async () => {
    try {
      const idStudent = localStorage.getItem(lsStudentId)
      if (idStudent !== undefined) {
        dispatch(
          changeTitle({
            titleHeader: 'Editar Tutor',
            showArrow: true
          })
        )
        setPageStatus(PageStatus.LOADING)
        const response = await TutorService.getDetailsTutorsByStudent(idStudent, id)
        dispatch(changeStudent(response))
        setPageStatus(PageStatus.SUCCESS)
        initHasRun.current = true
      } else {
        dispatch(
          changeTitle({
            titleHeader: 'Agregar tutor',
            showArrow: true
          })
        )
        setTabs([
          { label: 'Datos personales', isSelect: true }
        ])
        setPageStatus(PageStatus.SUCCESS)
      }
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
      initHasRun.current = true
      console.log(e)
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
      <LayoutDetailTutorsStyled>
        <Toaster position="top-center" reverseOrder={false} />
        <Tabs items={tabs} onSelect={changedSelectTab}/>
        {pageStatus !== PageStatus.SUCCESS && (
          <LoaderComponent
            status={pageStatus}
            message={errorMessage}
            refreshAction={() => init()}
          />
        )}
        {pageStatus === PageStatus.SUCCESS && (
          <>
            {selectTab === 0 ? <TutorPage/> : null}
          </>

        )}
      </LayoutDetailTutorsStyled>
    </>
  )
}

export default DetailTutorPage
