import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2'
import { IoCopy } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { ContainerFields, CopyContainer, FooterModalUser, ModalUserCreateContainer } from '../SchoolDetailStyled'
// import useSearchUsersSchoolHandling from '../hooks/useSearchTable'
import useInvoicesSchoolHandling from '../hooks/useInvoices'

import TableUsersBySchool from './TableUsersBySchool'

// import SchoolModel from '@/Common/Models/SchoolModel'
// import { lsId } from '@/Common/constants/localStorageConstants'
import { changeTitle } from '@/Redux/globalSlice'
// import SchoolsService from '@/Services/schools.service'
import Button, { StatusButton } from '@/common/Components/Buttons'
import { FormGlobal, Input, InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
import { Checkbox } from '@/common/Components/Form/checkbox'
import ModalCustom from '@/common/Components/Modals'
import Search from '@/common/Components/Search'
import TableCustom from '@/common/Components/Tables/TableCustom'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import UsersService from '@/services/users.service'
import TableInvoicesBySchool from './TableInvoicesBySchool'
import { lsId } from '@/common/constants/localStorageConstants'
import SchoolModel from '@/common/Models/SchoolModel'
import useSearchInvoicesSchoolHandling from '../hooks/useSearchInvoicesTable'

const InvoicesSchoolView = ({ school, isShadow, idInstitution, heightTable, showArrow }) => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setmodalStatus] = useState(PageStatus.SUCCESS)
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewModalCreate, openOrClose: openOrCloseCreate } = useOpenModalHandling()
  // ============ SCREEN STATUS ===============

  const initHasRun = useRef(false)
  const { register, handleSubmit, formState: { errors }, getValues, reset, setValue, watch } = useForm()
  const nameField = watch('name')
  // const navigate = useNavigate()
  const { invoices, loadInvoices } = useInvoicesSchoolHandling()
  const { isSearch, invoicesSearch, search } = useSearchInvoicesSchoolHandling()
  const [isEdit, setIsEdit] = useState(false)
  const [idUserSelect, setIdUserSelect] = useState(undefined)
  const fullPath = `${location.origin}/${school.uuid}`
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)
  const [isSuperUser, setIsSuperUser] = useState(false)

  const idCurrent = localStorage.getItem(lsId)
  

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Facturas',
        showArrow: showArrow === undefined ? true : showArrow
      }))
      if (school.id !== undefined) {
        setPageStatus(PageStatus.LOADING)
        await loadInvoices(idInstitution)
        setPageStatus(PageStatus.SUCCESS)
        initHasRun.current = true
      } else {
        setPageStatus(PageStatus.SUCCESS)
      }
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
      initHasRun.current = true
    }
  }
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  const searchUsers = async (target) => {
    try {
      setPageStatus(PageStatus.LOADING)
      search(school.id, target.target.value)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }

  // useEffect para observar cambios en el campo
  useEffect(() => {
    // Realiza las acciones que desees cuando el campo cambie
    if (isEdit === false) {
      const name = getValues('name')
      if (name !== '' && name !== undefined) {
        const phrases = name?.split(' ')
        const firstname = phrases[0]
        const lastName = phrases.length > 1 ? phrases[1].length > 1 ? phrases[1].charAt(0) : '' : ''
        const result = `${firstname}${lastName}`.toUpperCase()
        setValue('username', result)
      }
    }
  }, [nameField])
  // ============ INIT DATA LOADING ===============


  return (
    <div className='view-detail-users-schools-container'>
      <Search searchAction={searchUsers} />
      {/* {pageStatus !== PageStatus.SUCCESS && <LoaderComponent status={pageStatus} message={errorMessage} refreshAction={() => init()}/>} */}
      {/* 'calc(100% - 80px)' */}
      <TableCustom
        statusTable={pageStatus}
        indexImageField={1}
        withContainerWhite={isShadow}
        totalItems={6}
        heightTable={heightTable}
        titles={['Serie', 'Folio', 'Metodo de Pago', 'Forma de Pago', 'Razon Social', 'Total', 'PDF']}>
        <TableInvoicesBySchool 
          isSearch={isSearch}
          items={ isSearch ? invoicesSearch : invoices}
        ></TableInvoicesBySchool>
      </TableCustom>
      {viewModal && <FormGlobal onSubmit={handleSubmit(onSubmit)}>
      </FormGlobal>}
    </div>

  )
}

InvoicesSchoolView.propTypes = {
  school: PropTypes.instanceOf(SchoolModel).isRequired,
  isShadow: PropTypes.bool.isRequired,
  heightTable: PropTypes.string.isRequired,
  showArrow: PropTypes.bool.isRequired
}

// // DataSchoolView.propTypes = {
// //   schools: PropTypes.array.isRequired
// // }

export default InvoicesSchoolView
