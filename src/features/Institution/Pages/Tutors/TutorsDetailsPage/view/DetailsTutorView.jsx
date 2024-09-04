import PropTypes from 'prop-types'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'

// import AddressTutorView from './AddressTutorView'
// import DataTutorContacView from './DataTutorContactView'
// import { useNavigate } from 'react-router'

import DataTutorView from './TutorsView'

// import LoaderComponent from '@/Common/Components/LoaderComponent'
import ModalCustom from '@/Common/Components/Modals'
// import { lsSchoolId } from '@/Common/constants/localStorageConstants'
// import useErrorHandling from '@/Common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/Common/hooks/useTabSelect'
// import { changeTitle } from '@/Redux/globalSlice'
// import TutorService from '@/Services/tutors.service'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
// import useOpenModalHandling from '@/common/hooks/useModal'

const DetailsTutorView = ({ idTutor, handleCloseProfile, onSubmitFunction }) => {
  const { changedSelectTab } = useTabSelectedHandling()
  const [tabs] = useState([
    { label: 'Datos personales', isSelect: true }
  ])

  // const initHasRun = useRef(false)

  // const init = async () => {
  // try {
  // if (idTutor !== undefined) {
  //   // dispatch(
  //   //   changeTitle({
  //   //     titleHeader: 'Editar tutor',
  //   //     showArrow: true
  //   //   })
  //   // )
  //   setPageStatus(PageStatus.LOADING)
  //   // SE ESTA CONSUMIENTO EL MMISMO ENDPOINT EN DataTutorView
  //   // await TutorService.getDetailTutor(idSchool, idTutor)

  //   setPageStatus(PageStatus.SUCCESS)
  //   initHasRun.current = true
  // } else {
  //   dispatch(
  //     changeTitle({
  //       titleHeader: 'Agregar Tutor',
  //       showArrow: true
  //     })
  //   )
  //   setPageStatus(PageStatus.SUCCESS)
  // }
  // } catch (e) {
  //   handleErrors(e)
  //   setPageStatus(PageStatus.ERROR)
  //   initHasRun.current = true
  // }
  // }

  // const hancleOpenModal = () => {
  //   setIsModalOpen(!isModalOpen)
  // }
  // const handleCloseProfile = () => {
  //   setIsModalOpen(false)
  //   navigate(-1)
  // }

  // useEffect(() => {
  //   if (!initHasRun.current) {
  //     init()
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log(errorMessage)
  // }, [errorMessage])

  return (
    <>
      <ModalCustom
        width='70%'
        height='100%'
        title={'Tutores'}
        closeButton={PageStatus === PageStatus.SUCCESS}
        openOrClose={handleCloseProfile}
        statusPageModal={PageStatus.SUCCESS}
        message={'errorMessage'}
        saveButton={false}
        refreshAction={() => { }}
        customButtons={true}

      >
        <Tabs items={tabs} onSelect={changedSelectTab} />
        <DataTutorView idTutor={idTutor} closeModal={handleCloseProfile} onSubmitFunction={onSubmitFunction} />

        {/* )} */}
      </ModalCustom>
    </>
  )
}

export default DetailsTutorView

DetailsTutorView.propTypes = {
  idTutor: PropTypes.string,
  onSubmitFunction: PropTypes.func,
  handleCloseProfile: PropTypes.func
}
