import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import TableBodyTeachers from './Components/TeachersBodyTable'
import TeachersStyled from './TeachersViewStyled'

import { changeTitle } from '@/Redux/globalSlice'
import LoaderComponent from '@/common/Components/LoaderComponent'
import Search from '@/common/Components/Search'
import TableCustom from '@/common/Components/Tables/TableCustom'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
import TeachersService from '@/services/teachers.service'

const TeachersPage = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  // ============ SCREEN STATUS ===============
  const dispatch = useDispatch()
  const initHasRun = useRef(false)
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Docentes'
      }))
      setPageStatus(PageStatus.LOADING)
      const id = localStorage.getItem(lsSchoolId)
      const response = await TeachersService.getTeachers(id, 1)
      setItems(response)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }
  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
  }, [])
  useEffect(() => {
  }, [errorMessage])
  // ============ INIT DATA LOADING ===============

  return (
    <TeachersStyled>
      <Toaster position="top-center" reverseOrder={false} />
      {pageStatus !== PageStatus.SUCCESS &&
        <LoaderComponent
        status={pageStatus}
        message={errorMessage}
        refreshAction={() => init()}/>}

      {/* VISTAS */}
      <Search actionButton={() => navigate(routesNamesInstitution.addteachers)} ></Search>
      <TableCustom
      withContainerWhite={true}
      totalItems={5}
      heightTable='calc(100vh - 27vh)'
      titles={['#', 'Nombre', 'correo electrónico', 'Status', 'Acciones']}
      statusTable={pageStatus}
      message={errorMessage}
      >
        <TableBodyTeachers items={items}> </TableBodyTeachers>

      </TableCustom>
    </TeachersStyled>
  )
}

export default TeachersPage
