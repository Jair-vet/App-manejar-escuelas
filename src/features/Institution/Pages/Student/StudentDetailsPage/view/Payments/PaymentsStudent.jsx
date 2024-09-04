/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { ContainerSearchInput } from '../Asignature/AsignatureBodyTableStyled'
import { ToopToolBarAsignature } from '../Asignature/AsignatureStyled'

import { PaymentsStudentStyled } from './PaymentsStudentStyled'

import { changeGroupCycleStudentSelect } from '@/Redux/mattersStudentSlice'
import Button from '@/common/Components/Buttons'
import SelectFilterStyled from '@/common/Components/SelectFilter/SelectFilterStyled'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useOpenModalHandling from '@/common/hooks/useModal'
import PaymentsTable from '@/features/Institution/Pages/AccountsPayable/components/TablePayments'
import StudentService from '@/services/student.service'
import Search from '@/common/Components/Search'

const PaymentsStudentsView = ({ studentData = {} }) => {
  const { register, getValues, reset, watch, handleSubmit, formState: { errors }, setError, setValue } = useForm()
  const dispatch = useDispatch()
  const idSchool = localStorage.getItem(lsSchoolId)
  const { id } = useParams()
  const watchCycle = watch('cycle')

  const [modalStatus, setModalStatus] = useState(PageStatus.SUCCESS)
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  const mattersStudentSelect = useSelector((state) => state.mattersStudent)
  const [groupNameSelect, setGroupNameSelect] = useState('Sin selección')

  const { viewModal, openOrClose } = useOpenModalHandling()
  const [cycles, setCycles] = useState([])
  const [payments, setPayments] = useState([])
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      const responseCycles = await StudentService.getCyclesStudent(idSchool, id)
      setCycles(responseCycles)
      setPageStatus(PageStatus.SUCCESS)
      if (responseCycles.length > 0) {
        if (mattersStudentSelect.cycle === '') {
          setValue('cycle', responseCycles[0].id)
        } else {
          setValue('cycle', mattersStudentSelect.cycle)
        }
      }
    } catch (e) {
      toast.error(e)
    }
  }
  useEffect(() => {
    init()
  }, [])

  const searchPaymentSchool = async (target) => { }

  const getPaymentsStudentWithFilter = async (cycle) => {
    try {
      setPageStatus(PageStatus.LOADING)
      const response = await StudentService.getPaymentsStudent(idSchool, id, cycle)
      // await buildTable(response.periods)
      setPayments(response.items)
      setGroupNameSelect(response.group)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      setPageStatus(PageStatus.SUCCESS)
    }
  }
  useEffect(() => {
    // Realiza las acciones que desees cuando el campo cambie
    if (watchCycle && watchCycle !== '') {
      dispatch(
        changeGroupCycleStudentSelect({
          cycle: watchCycle
        })
      )
      getPaymentsStudentWithFilter(watchCycle)
    }
  }, [watchCycle])
  return (
    <PaymentsStudentStyled>
      <ToopToolBarAsignature>
        {<span className='group-name-title'>{groupNameSelect}</span>}
        <Search
          showCreateButton={false}
          height='4rem'
          searchAction={searchPaymentSchool}
          isViewInputSearch={false}
        >
          <ContainerSearchInput>
            <SelectFilterStyled >
              <span className='name'>Filtro por ciclo escolar:</span>
              <select className='select' {...register('cycle', { required: 'El campo es requerido' })}>
                {
                  cycles && cycles.map((cycle) => (
                    <option key={cycle.id} value={cycle.id}>
                      {`${cycle.cycle_start} - ${cycle.cycle_end} /${cycle.id_cycle_level_name} ${cycle.name}`}
                    </option>
                  ))}
              </select>
            </SelectFilterStyled >
            {/* <a className='cont-file-download' onClick={downloadTicketRatings} target='_blank' rel="noreferrer">
              <span>Click para descargar boleta</span>
              <FaDownload className='icon' />
            </a> */}
          </ContainerSearchInput>
        </Search>
      </ToopToolBarAsignature>
      {/* {
        pageStatus === PageStatus.ERROR && <div> <Button size='mediumSmall' type='button' onClick={init} > Reintentar </Button> </div>
      } */}
      <div className='table-container'>
        <PaymentsTable payments={payments} pageStatus={pageStatus}>
        </PaymentsTable >
      </div>

    </PaymentsStudentStyled>
  )
}
PaymentsStudentsView.propTypes = {
  studentData: PropTypes.object.isRequired
}
export default PaymentsStudentsView
