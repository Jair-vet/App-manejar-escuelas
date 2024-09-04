import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

// import DetailsStaffView from './DetailsStaffView'
import LayoutStaffStyled from './StaffStyled'
import TableStaffBySchool from './TableStaffBySchool'

import Button from '@/Common/Components/Buttons'
import LoaderComponent from '@/Common/Components/LoaderComponent'
import Search from '@/Common/Components/Search'
import TableCustom from '@/Common/Components/Tables/TableCustom'
import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import useErrorHandling from '@/Common/hooks/useErrorCustom'
// import useOpenModalHandling from '@/Common/hooks/useModal'
import { changeTitle } from '@/Redux/globalSlice'
import PageStatus from '@/common/Models/Enums'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
import EmployeeService from '@/services/employee.service'

const EmployePage = () => {
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [page] = useState(1)
  const [items, setItems] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [itemsSearch, setEmployeSearch] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [employe, setEmploye] = useState([])
  // const [idEmploye, setIdEmploye] = useState(undefined)
  // const [hasMore, setHasMore] = useState(true)

  const { errorMessage, handleErrors } = useErrorHandling()
  // const { viewModal, openOrClose } = useOpenModalHandling()
  // const { id } = useParams()
  const initHasRun = useRef(false)
  const navigate = useNavigate()
  // const tableRef = useRef(null)

  const idSchool = localStorage.getItem(lsSchoolId)
  const dispatch = useDispatch()

  const init = async () => {
    try {
      dispatch(
        changeTitle({
          titleHeader: 'Personal',
          showArrow: false
        })
      )
      setPageStatus(PageStatus.LOADING)
      const response = await EmployeeService.getEmployeesAll(idSchool)
      setItems(response)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }

  const searchEmploye = async (target) => {
    const value = target.target.value
    if (value === undefined && value === '') {
      setIsSearch(false)
      // setEmployeeSearch([])
      return
    }
    setIsSearch(true)
    const response = await EmployeeService.searchEmploye(idSchool, value)
    console.log(response)
    setEmployeSearch(response)
  }

  // const loadMore = async () => {
  //   if (loading || !hasMore) return

  //   setLoading(true)
  //   try {
  //     const response = await EmployeeService.getDetailEmploye(idSchool, idEmploye)

  //     if (response.length === 0) {
  //       setHasMore(false)
  //     } else {
  //       const newEmploye = [...EmployeeService, ...response]
  //       setEmploye(newEmploye)
  //     }
  //   } catch (event) {
  //     console.log(event)
  //     handleErrors(event)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const handleScroll = () => {
  //   if (tableRef.current &&
  //     tableRef.current.scrollTop + tableRef.current.clientHeight >=
  //     tableRef.current.scrollHeight - 50
  //   ) {
  //     // loadMore()
  //   }
  // }

  const viewDetailEmploye = (idEmploye) => {
    // openOrClose()
    // setIdEmploye(idEmploye)
    navigate(routesNamesInstitution.detailStaffOnlyName + idEmploye)
  }

  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
  }, [page])

  useEffect(() => {
  }, [errorMessage])

  return (
    <LayoutStaffStyled>
      <Search searchAction={searchEmploye} showCreateButton={false}>
        <Button onClick={() => navigate(routesNamesInstitution.addStaff)}>Agregar</Button>
      </Search>
      <Toaster position='top-center' reverseOrder={false}/>
      <TableCustom
        withContainerWhite={false}
        heightTable='calc(85vh - 27vh)'
        totalItems={5}
        titles={['Id Nomina', 'Nombre completo', 'Correo electrónico', 'Puesto', 'Acciones']}
        statusTable={pageStatus}
        message={errorMessage}
      >
        {pageStatus !== PageStatus.SUCCESS &&
        <LoaderComponent
      status={pageStatus}
      message={errorMessage}
      refreshAction={() => init()}
      />}

        <TableStaffBySchool employees={isSearch ? itemsSearch : items} detailEmploye={viewDetailEmploye} ></TableStaffBySchool>
        {/* <div className="table-container" onScroll={handleScroll} ref={tableRef}> */}
        {/* {loading && <p>....</p>} */}
        {/* </div> */}
      </TableCustom>
    </LayoutStaffStyled>
  )
}

export default EmployePage
