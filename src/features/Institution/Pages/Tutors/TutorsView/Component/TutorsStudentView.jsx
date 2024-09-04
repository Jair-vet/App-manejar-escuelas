// /* eslint-disable camelcase */

import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
// import { useNavigate } from 'react-router'

import TutorViewExisten from '../../ExistingTutor/TutorViewExists'
import { ContainerButton } from '../../TutorsDetailsPage/TutorsStyled'
import DetailsTutorView from '../../TutorsDetailsPage/view/DetailsTutorView'

import TableTutorBySchool from './TutorBodyTable'

import Button from '@/common/Components/Buttons'
import ModalCustom from '@/common/Components/Modals'
import Search from '@/common/Components/Search'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useOpenModalHandling from '@/common/hooks/useModal'
// import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
import TutorService from '@/services/tutors.service'

const TutorsStudentPage = ({ studentData }) => {
  // ============ SCREEN STATUS ===============
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)

  // ============ SCREEN STATUS ===============
  // const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [itemsSearch, setStudentSearch] = useState([])
  const [isSearch, setIsSearch] = useState(false)

  const { viewModal: viewModalAllTutors, openOrClose: openOrCloseModalAllTutors } = useOpenModalHandling()
  const { viewModal: viewModalAddTutor, openOrClose: openOrCloseviewModalAddTutor } = useOpenModalHandling()

  const idSchool = localStorage.getItem(lsSchoolId)
  const initHasRun = useRef()

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      const response = await TutorService.getDetailsTutorsByStudent(idSchool, studentData.unique_uuid)
      setItems(response)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      setPageStatus(PageStatus.SUCCESS)
      toast.error(e.message)
    }
  }

  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
  }, [])

  const search = async (target) => {
    const value = target.target.value
    if (value === undefined && value === '') {
      setIsSearch(false)
      setStudentSearch([])
      return
    }
    setIsSearch(true)
    const response = await TutorService.searchTutor(idSchool, studentData.unique_uuid, value)
    console.log(response)
    setStudentSearch(response)
  }

  const createAndAssingTutor = async () => {
    openOrCloseviewModalAddTutor()
    await init()
  }
  return (
    <>
      <Search searchAction={search} showCreateButton={false}>
        <ContainerButton
          width='60%'
          justify='end'
          gap='2rem'
        >
          <Button onClick={openOrCloseModalAllTutors}>Agregar existente</Button>
          <Button onClick={openOrCloseviewModalAddTutor}>Agregar</Button>
        </ContainerButton>
      </Search>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='container-tutors-student'>
        <TableTutorBySchool
          functionCloseModal={init}
          pageStatus={pageStatus}
          tutors={isSearch ? itemsSearch : items}
        ></TableTutorBySchool>
      </div>
      {
        viewModalAllTutors && <ModalCustom
          width='90%'
          height='100%'
          title={'Tutores'}
          closeButton={pageStatus === PageStatus.SUCCESS}
          openOrClose={openOrCloseModalAllTutors}
          statusPageModal={PageStatus.SUCCESS}
          message={''}
          saveButton={false}
          refreshAction={() => { }}
          customButtons={true}
        >
          <TutorViewExisten onSendAddTutor={init} studentData={studentData} ></TutorViewExisten>
        </ModalCustom>
      }

      {viewModalAddTutor &&

        <DetailsTutorView handleCloseProfile={openOrCloseModalAllTutors} onSubmitFunction={createAndAssingTutor} ></DetailsTutorView>

      }
    </>
  )
}

TutorsStudentPage.propTypes = {
  studentData: PropTypes.object.isRequired
}
export default TutorsStudentPage
