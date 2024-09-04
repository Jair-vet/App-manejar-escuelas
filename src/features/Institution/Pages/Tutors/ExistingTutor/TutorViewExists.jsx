import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import LayoutDetailTutorsStyled from '../TutorsDetailsPage/TutorsStyled'

import TableTutorExistingBySchool from './TutorBodyTableExisting'

import Search from '@/Common/Components/Search'
import useErrorHandling from '@/Common/hooks/useErrorCustom'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import TutorService from '@/services/tutors.service'

const TutorViewExists = ({ onSendAddTutor, studentData }) => {
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [itemsSearch, setStudentSearch] = useState([])
  const [page] = useState(1)
  const [isSearch, setIsSearch] = useState(false)
  const [items, setItems] = useState([])

  const idSchool = localStorage.getItem(lsSchoolId)
  // const { id } = useSearchParams()
  const initHasRun = useRef(false)

  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      const { results } = await TutorService.getTutorBySchool(idSchool)
      setItems(results)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }

  const addTutorExisting = async (idTutor) => {
    try {
      setPageStatus(PageStatus.LOADING)
      // debugger
      const idSchool = localStorage.getItem(lsSchoolId)
      const data = {
        id_tutor: idTutor,
        id_student: studentData.unique_uuid
      }
      await TutorService.addTutorStudent(idSchool, data)
      // debugger
      await onSendAddTutor()
      toast.success('Tutor asignado correctamente')
      setPageStatus(PageStatus.SUCCESS)
    } catch (error) {
      setPageStatus(PageStatus.SUCCESS)
      toast.error(error.message)
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

  // const viewDetailTutor = (idTutor) => {
  //   openOrClose()
  //   setTutorId(idTutor)
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
      <Search searchAction={searchTutorSchool} showCreateButton={false} flexWrap='nowrap'>
      </Search>
      <Toaster position='top-center' reverseOrder={false} />
      <TableTutorExistingBySchool
      pageStatus={pageStatus}
      onAddTutorExisting={addTutorExisting}
      tutors={isSearch ? itemsSearch : items} />
    </LayoutDetailTutorsStyled>
  )
}

TutorViewExists.propTypes = {
  onSendAddTutor: PropTypes.oneOf(Object.values(PageStatus)).isRequired,
  studentData: PropTypes.object.isRequired
}

export default TutorViewExists
