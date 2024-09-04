import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

import TableEditAsignature from './TableEditAsignature'

import LoaderComponent from '@/Common/Components/LoaderComponent'
import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import useErrorHandling from '@/Common/hooks/useErrorCustom'
import PageStatus from '@/common/Models/Enums'
import StudentService from '@/services/student.service'

const DetailsAsignatureView = ({ idMatter }) => {
  const { handleErrors, errorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)

  const initHasRun = useRef(false)
  const idSchool = localStorage.getItem(lsSchoolId)
  const [items, setItems] = useState([])

  const init = async () => {
    try {
      if (idMatter !== undefined) {
        setPageStatus(PageStatus.LOADING)
        const response = await StudentService.getRatingByMatter(idSchool, idMatter)
        setItems(response)
        setPageStatus(PageStatus.SUCCESS)
        initHasRun.current = true
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

  const editAsignature = () => {
    init()
  }
  return (
    <>
      {/* <ModalCustom
        width='auto'
        height='100%'
        title={'Calificaciones'}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={openOrClose}
        statusPageModal={PageStatus.SUCCESS}
        message={errorMessage}
        saveButton={false}
        refreshAction={() => { }}
        customButtons={true}
      >
        {pageStatus !== PageStatus.SUCCESS && (
          <LoaderComponent
            status={pageStatus}
            message={errorMessage}
            refreshAction={() => init()}
          />
        )}
        {pageStatus === PageStatus.SUCCESS && (
        <TableEditAsignature idMatter={idMatter} items={items} detailsAsignature={editAsignature}/>
        )}
      </ModalCustom> */}

      {pageStatus !== PageStatus.SUCCESS && (
      <LoaderComponent
            status={pageStatus}
            message={errorMessage}
            refreshAction={() => init()}
          />
      )}
      {pageStatus === PageStatus.SUCCESS && (
        <TableEditAsignature idMatter={idMatter} items={items} detailsAsignature={editAsignature}/>
      )}
    </>
  )
}

export default DetailsAsignatureView

DetailsAsignatureView.propTypes = {
  idMatter: PropTypes.string,
  openOrClose: PropTypes.func,
  idGrade: PropTypes.string

}
