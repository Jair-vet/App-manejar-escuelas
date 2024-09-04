/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// import Asignature from '../Asignature/AsignaturePage'
import TutorsStudentPage from '../../Tutors/TutorsView/Component/TutorsStudentView'

import LayoutDetailStudentStyled from './StudentDetailsStyled'
import AsignaturePage from './view/Asignature/AsignaturePage'
import PaymentsStudentsView from './view/Payments/PaymentsStudent'
import AddressStudentView from './view/PersonalData/StudentAddressView'
import DataStudentView from './view/PersonalData/StudentView'

import LoaderComponent from '@/Common/Components/LoaderComponent'
import Tabs from '@/Common/Components/Tabs'
import { changeTitle } from '@/Redux/globalSlice'
import { changeStudent } from '@/Redux/studentSlice'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import StudentService from '@/services/student.service'

const DetailStudentPage = () => {
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)

  const { id } = useParams()
  const initHasRun = useRef(false)
  const dispatch = useDispatch()
  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const [tabs, setTabs] = useState([
    { label: 'Datos personales', isSelect: true },
    { label: 'Domicilio', isSelect: false },
    { label: 'Tutores', isSelect: false },
    { label: 'Materias', isSelect: false },
    { label: 'Pagos', isSelect: false }
  ])
  const [studentData, setStudentData] = useState({})

  // ============ INIT DATA LOADING ===============

  const getFullName = (student) => {
    const { name, last_name, second_surname } = student
    return `${name} ${last_name} ${second_surname}`
  }

  const init = async () => {
    try {
      const idSchool = localStorage.getItem(lsSchoolId)
      if (id !== undefined) {
        setPageStatus(PageStatus.LOADING)
        const response = await StudentService.getStudent(idSchool, id)
        dispatch(changeStudent(response))
        setStudentData(response)
        setPageStatus(PageStatus.SUCCESS)
        initHasRun.current = true
      } else {
        dispatch(
          changeTitle({
            titleHeader: 'Agregar Alumno',
            showArrow: true
          })
        )
        setTabs([{ label: 'Datos personales', isSelect: true }])
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
    if (studentData && Object.keys(studentData).length > 0) {
      dispatch(
        changeTitle({
          titleHeader: `Editar Alumno : ${getFullName(studentData)}`,
          showArrow: true
        })
      )
    }
  }, [studentData, selectTab, initHasRun])

  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])

  return (
    <>
      <LayoutDetailStudentStyled>
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
          <>
            {selectTab === 0 ? <DataStudentView studentData={studentData} /> : <></>}
            {selectTab === 1 ? <AddressStudentView studentData={studentData} /> : <></>}
            {selectTab === 2 ? <TutorsStudentPage studentData={studentData}/> : <></>}
            {selectTab === 3 ? <AsignaturePage studentData={studentData} /> : <></>}
            {selectTab === 4 ? <PaymentsStudentsView studentData={studentData} /> : <></>}
          </>
        )}
      </LayoutDetailStudentStyled>
    </>
  )
}

export default DetailStudentPage
