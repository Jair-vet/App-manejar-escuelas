/* eslint-disable camelcase */

import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import TableTutorBySchool from './TutorsView/Component/TutorBodyTable'

import Search from '@/Common/Components/Search'
import useErrorHandling from '@/Common/hooks/useErrorCustom'
import { changeTitle } from '@/Redux/globalSlice'
import { ContainerTableNewStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import LayoutDetailTutorsStyled from '@/features/Institution/Pages/Tutors/TutorsView/TutorsStyled'
import TutorService from '@/services/tutors.service'

const ModuleTutorView = () => {
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  // const [modalStatus, setModalStatus] = useState(PageStatus.LOADING)
  const [itemsSearch, setStudentSearch] = useState([])

  const [page] = useState(1)
  // const [tutor, setTutor] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  // const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  // const [hasMore, setHasMore] = useState(true)
  // const [tutorId, setTutorId] = useState(undefined)
  // const [tutorSelect, setTutorSelect] = useState(undefined)

  const { errorMessage, handleErrors } = useErrorHandling()
  // const { viewModal, openOrClose } = useOpenModalHandling()
  // const { viewModal: viewModalQuestionSendEmail, openOrClose: openOrCloseQuestionSendEmail } = useOpenModalHandling()

  const idSchool = localStorage.getItem(lsSchoolId)
  // const { id } = useParams()
  const initHasRun = useRef(false)

  // const tableRef = useRef(null)
  const dispatch = useDispatch()

  const init = async () => {
    try {
      dispatch(
        changeTitle({
          titleHeader: 'Tutores',
          showArrow: false
        })
      )
      setPageStatus(PageStatus.LOADING)
      const { results } = await TutorService.getTutorBySchool(idSchool)
      setItems(results)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }
  const searchTutorSchool = async (target) => {
    const value = target.target.value
    if (value === undefined && value === '') {
      setIsSearch(false)
      setStudentSearch([])
      return
    }
    setIsSearch(true)
    const response = await TutorService.searchTutorSchool(idSchool, value)
    setStudentSearch(response)
  }

  // const loadMore = async () => {
  //   if (loading || !hasMore) return

  //   setLoading(true)
  //   try {
  //     const response = await TutorService.getTutorBySchool(idSchool)

  //     if (response.length === 0) {
  //       setHasMore(false)
  //     } else {
  //       const newTutor = [...tutor, ...response]
  //       setTutor(newTutor)
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
  //     loadMore()
  //   }
  // }

  // const sendEmail = async () => {
  //   try {
  //     const idSchool = localStorage.getItem(lsSchoolId)
  //     await TutorService.sendEmailAppAccess(idSchool, tutorSelect.id)
  //     openOrCloseQuestionSendEmail()
  //     toast.success(`Accesos enviados a ${tutorSelect.email}`)
  //   } catch (e) {
  //     handleErrors(e)
  //     toast.error(e.toString())
  //   }
  // }

  // const viewDetailTutor = (idTutor) => {
  //   openOrClose()
  //   setTutorId(idTutor)
  // }
  // const openModalQuestionSendEmail = (tutor) => {
  //   setTutorSelect(tutor)
  //   openOrCloseQuestionSendEmail()
  // }
  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
  }, [page])

  useEffect(() => {
  }, [errorMessage])
  return (
    <LayoutDetailTutorsStyled>
      <Search searchAction={searchTutorSchool} showCreateButton={false} flexWrap='nowrap' />
      <Toaster position='top-center' reverseOrder={false} />
      <ContainerTableNewStyled >
        <div className='table-view'>

          <TableTutorBySchool
            functionCloseModal={init}
            pageStatus={pageStatus}
            tutors={isSearch ? itemsSearch : items}
          ></TableTutorBySchool>
        </div>

      </ContainerTableNewStyled >

      {/* <ContainerTableNewStyled > */}
      {/* <MaterialReactTable table={table} /> */}
      {/* </ContainerTableNewStyled> */}
    </LayoutDetailTutorsStyled>
  )
}

ModuleTutorView.propTypes = {
  // idTutor: PropTypes.string,
  // idStudent: PropTypes.string,
  // onClose: PropTypes.func
}

export default ModuleTutorView
