import PropTypes from 'prop-types'
import ModalCustom from '@/Common/Components/Modals'
import useErrorHandling from '@/Common/hooks/useErrorCustom'
import PageStatus from '@/common/Models/Enums'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import AddMatter from './AddMatter'
import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import StudentService from '@/Services/student.service'

const DetailsAddAsignature = ({openOrClose,idQualitification,idAsignature}) => {
  const { handleErrors, errorMessage } = useErrorHandling()
  const [modalStatus] = useState(PageStatus.SUCCESS)
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)


  const idSchool = localStorage.getItem(lsSchoolId)

  const init = async () =>{
    try{
      // const data = {
      //   qualitification : idQualitification,
      //   idAsignature : idAsignature
      // }
      // const response = await StudentService.createRatingMatter(idSchool,data)
      // console.log(response)

      console.log('init')
    }catch(error){
      handleErrors(error)
      setPageStatus(PageStatus.ERROR)
      handleErrors(error)
      toast.error(error)
    }
  }


  useEffect(()=>{
    init()
  })
  return(
    <>
      {/* <ModalCustom
       width='auto'
       height='auto'
       title={'Agregar calificación'}
       closeButton={modalStatus === PageStatus.SUCCESS}
       openOrClose={openOrClose}
       statusPageModal={PageStatus.SUCCESS}
       message={errorMessage}
       saveButton={false}
       refreshAction={() => { }}
       customButtons={true}
      >
        {pageStatus !== PageStatus.SUCCESS && (
        <AddMatter/>
        )

        }
      </ModalCustom> */}
    </>
  )
}

export default DetailsAddAsignature

DetailsAddAsignature.propTypes = {
  openOrClose: PropTypes.func,
  idQualitification: PropTypes.string,
  idAsignature: PropTypes.string
}