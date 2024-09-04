/* eslint-disable camelcase */
import { Box } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillEye } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import AccountsPayableStyled from './AccountsPayableStyled'
import PaymentsTable from './components/TablePayments'

import { changeCycle } from '@/Redux/cycleSlice'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import ModalCustom from '@/common/Components/Modals'
import Search from '@/common/Components/Search'
import SelectFilterStyled from '@/common/Components/SelectFilter/SelectFilterStyled'
import theme from '@/common/Global-styles/theme'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import { formatAmountMxn } from '@/common/utils/format_amount'
import paymentsService from '@/services/payments.service'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import StudentService from '@/services/student.service'

const AccountsPayablePage = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setModalStatus] = useState(PageStatus.SUCCESS)

  const { register, getValues, watch, setValue } = useForm()
  const idSchool = localStorage.getItem(lsSchoolId)
  const { viewModal, openOrClose } = useOpenModalHandling()

  // ============ SCREEN STATUS ===============
  const cycleStore = useSelector((state) => state.cycle)

  const watchCycle = watch('cycle')
  const watchStatusPayments = watch('status')

  const [cycles, setCycles] = useState([])
  const [payments, setPayments] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 15
  })
  const [rowCount, setRowCount] = useState(0)
  const [studentSelect, setStudentSelect] = useState(undefined)
  const [paymentsStudent, setPaymentsStudent] = useState([])
  const initHasRun = useRef(false)
  const dispatch = useDispatch()
  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      const responseCycles = await SchoolsCyclesService.getCycles(idSchool, 1, [1, 2, 3])
      setCycles(responseCycles)
      if (responseCycles.length > 0) {
        if (cycleStore.id === undefined) {
          setValue('cycle', responseCycles[0].id)
        } else {
          setValue('cycle', cycleStore.id)
        }
      }

      const cycle = getValues('cycle')
      await getPayments(cycle)
      setPageStatus(PageStatus.SUCCESS)
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
    if (errorMessage !== '') {
      clearErrorMessage()
    }
  }, [errorMessage])

  // ============ INIT DATA LOADING ===============

  const getPayments = async (cycle) => {
    try {
      setPageStatus(PageStatus.LOADING)
      const page = pagination.pageIndex + 1
      const response = await paymentsService.getAllPayments(idSchool, cycle, watchStatusPayments, page)
      setPayments(response.results)
      setRowCount(response.count)
      setPageStatus(PageStatus.SUCCESS)
    } catch (error) {
      setRowCount(0)
      setPayments([])
      setPageStatus(PageStatus.SUCCESS)
    }
  }
  useEffect(() => {
    // Realiza las acciones que desees cuando el campo cambie
    if (watchCycle && watchCycle !== '') {
      dispatch(
        changeCycle({
          id: watchCycle, start: '', end: ''
        })
      )
      getPayments(watchCycle)
    }
  }, [watchCycle])

  useEffect(() => {
    // Realiza las acciones que desees cuando el campo cambie
    if (watchStatusPayments && watchStatusPayments !== '') {
      getPayments(watchCycle)
    }
  }, [watchStatusPayments])

  const searchPayments = () => { }

  const openDetail = async (student) => {
    try {
      openOrClose()
      setModalStatus(PageStatus.LOADING)
      setStudentSelect(student)
      const response = await StudentService.getPaymentsStudent(idSchool, student.unique_uuid, student.id_cycle_group)
      setModalStatus(PageStatus.SUCCESS)
      setPaymentsStudent(response.items)
    } catch (error) {
      toast.error()
      setModalStatus(PageStatus.SUCCESS)
    }
  }

  const columnsTable = useMemo(
    () => [
      {
        accessorKey: 'tag_id',
        id: 'tag_id',
        header: 'Matrícula',
        size: 30
      },
      {
        accessorFn: (row) => `${row.name}, ${row.last_name} ${row.second_surname}`,
        id: 'name',
        header: 'Nombre',
        size: 120
      },
      {
        accessorKey: 'section_name',
        id: 'section_name',
        header: 'Sección',
        size: 80
      },
      {
        accessorKey: 'group_name',
        id: 'group_name',
        header: 'Grupo',
        size: 50
      },
      {
        accessorKey: 'level_name',
        id: 'level_name',
        header: 'Grado',
        size: 80
      },
      {
        accessorFn: (row) => `${formatAmountMxn.format(row.total_for_paid)}`,
        id: 'total_for_paid',
        header: 'Total a pagar',
        size: 80
      }
    ], []
  )

  const table = useMaterialReactTable({
    columns: columnsTable,
    data: payments,
    enableRowActions: true,
    positionActionsColumn: 'last',

    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Acciones', // change header text
        size: 300 // make actions column wider
      }
    },
    renderRowActions: ({ row }) => {
      return (
        <Box>
          <AiFillEye className="action-icon" onClick={() => openDetail(row.original)} />
        </Box>
      )
    },
    onPaginationChange: setPagination,
    rowCount,
    manualPagination: true,
    enableColumnActions: true,
    enableColumnFilters: true,
    enablePagination: true,
    enableStickyFooter: true,
    enableDensityToggle: false,
    initialState: { pagination: { pageSize: 15, pageIndex: 0 }, density: 'compact' },
    enableHiding: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: false,
    groupedColumnMode: false,
    state: {
      isLoading: pageStatus === PageStatus.LOADING,
      pagination,
      showLoadingOverlay: pageStatus === PageStatus.LOADING
    },
    muiCircularProgressProps: {
      Component: <OnlyLoaderComponent />
    },
    localization: MRT_Localization_ES,
    muiTableProps: {
      sx: {
        fontFamily: theme.fonts.texts

      }
    },
    muiFilterTextFieldProps: {
      sx: {
        fontFamily: theme.fonts.texts,
        // border: `2.5px solid ${theme.colors.primary}`,
        outline: '0',
        '&:focus': {
          border: `2.5px solid ${theme.colors.primary}`
        }
      }
    },
    muiFilterAutocompleteProps: {
      sx: {
        outline: '0',
        '&:focus': {
          border: `2.5px solid ${theme.colors.primary}`
        }
      }
    },
    muiLinearProgressProps: ({ isTopToolbar }) => ({
      color: 'warning',
      sx: { display: isTopToolbar ? 'block' : 'none' }, // only show top toolbar progress bar
      value: 10 // show precise real progress value if you so desire
    })
  })

  return (
    <AccountsPayableStyled>
      {/* <div className='container-top'> */}
      <Search
        showCreateButton={false}
        height='4rem'
        searchAction={searchPayments}
        isViewInputSearch={true}
      >
        <SelectFilterStyled >
          {/* <span className='name'>Filtro por ciclo escolar:</span> */}
          <select className='select' {...register('cycle', { required: 'El campo es requerido' })}>
            {
              cycles && cycles.map((cycle) => (
                <option key={cycle.id} value={cycle.id}>
                  {`${cycle.start} - ${cycle.end}`}
                </option>
              ))}
          </select>
        </SelectFilterStyled >
        <SelectFilterStyled >
          {/* <span className='name'>Filtro por ciclo escolar:</span> */}
          <select className='select' {...register('status', { required: 'El campo es requerido' })}>
            <option value={0}>
              Todos
            </option>
            <option value={1}>
              Pendiente
            </option>
            <option value={2}>
              Pagado
            </option>
            <option value={3}>
              Facturado
            </option>
            <option value={4}>
              Cancelado
            </option>
            <option value={5}>
              Reembolsado
            </option>
          </select>
        </SelectFilterStyled >
      </Search>
      {/* </div> */}

      {/* <PaymentsTable payments={payments} pageStatus={pageStatus}></PaymentsTable> */}
      <div className='container-table'>
        <MaterialReactTable table={table} />
      </div>

      {viewModal && <ModalCustom
        width='70%'
        height='100%'
        title={`Pagos de ${studentSelect.name}, ${studentSelect.last_name} ${studentSelect.second_surname}`}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={openOrClose}
        statusPageModal={PageStatus.SUCCESS}
        message={errorMessage}
        saveButton={false}
        refreshAction={() => { }}
        customButtons={true}
      >
        <PaymentsTable payments={paymentsStudent} pageStatus={modalStatus}></PaymentsTable>
      </ModalCustom>}
    </AccountsPayableStyled>
  )
}

export default AccountsPayablePage
