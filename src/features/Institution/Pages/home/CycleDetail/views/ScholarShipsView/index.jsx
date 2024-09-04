/* eslint-disable camelcase */
import { Box } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import { changeViewIsArrowBack } from '@/Redux/globalSlice'
import Button from '@/common/Components/Buttons'
import { Input, InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import ModalCustom from '@/common/Components/Modals'
import { ContainerTableNewStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import theme from '@/common/Global-styles/theme'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import { formatAmountMxn } from '@/common/utils/format_amount'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
import ScholarShipsService from '@/services/scholarShips.service'

const CycleScholarShipsView = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setModalStatus] = useState(PageStatus.SUCCESS)
  const idSchool = localStorage.getItem(lsSchoolId)
  // const idSection = localStorage.getItem(lsSection)
  // const [isSearch, setIsSearch] = useState(false)
  const { id } = useParams()
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewStudentsModal, openOrClose: openOrCloseStudentsModal } = useOpenModalHandling()
  const { viewModal: viewStudentsScholarShipModal, openOrClose: openOrCloseStudentsScholarShipModal } = useOpenModalHandling()

  const { register, reset, handleSubmit, formState: { errors } } = useForm()
  // const watchUnityType = watch('unity_type')
  const [studentsByCycle, setStudentsByCycle] = useState([])
  const [rowStudentsSelection, setRowStudentsSelection] = useState({})
  const [idScolarShip, setIdScolarShip] = useState(undefined)
  const [studentsByScholarShip, setStudentsByScholarShip] = useState([])

  // ============ SCREEN STATUS ===============
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [scholarShips, setScholarShips] = useState([])
  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      dispatch(changeViewIsArrowBack({
        showArrow: false
      }))
      const response = await ScholarShipsService.getScholarShipsByCycle(idSchool, id)
      setScholarShips(response)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }
  useEffect(() => {
    init()
  }, [])

  // ============ INIT DATA LOADING ===============

  const onGetModalStudents = async (idScholarShip) => {
    try {
      setModalStatus(PageStatus.LOADING)
      openOrCloseStudentsModal()
      const response = await ScholarShipsService.getStudentsCycleAndSkipScolarShip(idSchool, id, idScholarShip)
      setStudentsByCycle(response)
      setIdScolarShip(idScholarShip)
      setRowStudentsSelection({})
      setModalStatus(PageStatus.SUCCESS)
    } catch (error) {
      setModalStatus(PageStatus.SUCCESS)
      openOrCloseStudentsModal()
      toast.error(error.message)
    }
  }

  const columnsStudenTable = useMemo(
    () => [
      {
        accessorKey: 'tag_id',
        header: 'Matrícula',
        size: 20
      },
      {
        accessorFn: (row) => `${row.name} ${row.last_name} ${row.second_surname}`,
        id: 'name',
        header: 'Nombre completo',
        size: 120
      },
      {
        accessorKey: 'section_name',
        header: 'Sección',
        size: 30
      },
      {
        accessorKey: 'level_name',
        header: 'Grado',
        size: 30
      },
      {
        accessorKey: 'group_name',
        header: 'Grupo',
        size: 30
      }
    ], []
  )
  const tableStudents = useMaterialReactTable({
    columns: columnsStudenTable,
    data: studentsByCycle,
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
    enableRowSelection: true,

    state: {
      isLoading: pageStatus === PageStatus.LOADING,
      showLoadingOverlay: pageStatus === PageStatus.LOADING,
      rowSelection: rowStudentsSelection

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
    getRowId: (originalRow) => originalRow.id_cycle_student,
    onRowSelectionChange: setRowStudentsSelection

  })

  const openModalCreateScholarShip = () => {
    setModalStatus(PageStatus.SUCCESS)
    reset()
    openOrClose()
  }
  const createScholarShip = async (data) => {
    try {
      setModalStatus(PageStatus.LOADING)
      data.id_cycle = id
      await ScholarShipsService.createScholarShip(idSchool, data)
      await init()
      // const response = ScholarShipsService.getScholarShipsByCycle(idSchool, id)
      // setScholarShips(response)
      openOrClose()
      toast.success('Beca creada')
      setModalStatus(PageStatus.SUCCESS)
    } catch (error) {
      toast.error(error.message)
      setModalStatus(PageStatus.SUCCESS)
    }
  }

  const loadStudentByScholarShip = async (idScolarShip) => {
    try {
      openOrCloseStudentsScholarShipModal()
      setModalStatus(PageStatus.LOADING)
      const response = await ScholarShipsService.getStudentsbyScolarShip(idSchool, idScolarShip)
      setStudentsByScholarShip(response)
      setModalStatus(PageStatus.SUCCESS)
    } catch (error) {
      setModalStatus(PageStatus.SUCCESS)
    }
  }

  const titlesScolarShips = useMemo(
    () => [{
      accessorKey: 'description',
      header: 'Descripción',
      size: 40
    },
    {
      accessorKey: 'unity',
      header: 'Unidad',
      size: 40
    },
    {
      accessorKey: 'value',
      header: 'Valor',
      size: 40
    },
    {
      accessorKey: 'total_students',
      header: 'Total de alumnos',
      size: 40
    }
    ])
  const tableScholarShips = useMaterialReactTable({
    columns: titlesScolarShips,
    data: scholarShips,
    positionActionsColumn: 'last',
    enableRowActions: true,
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
      showLoadingOverlay: pageStatus === PageStatus.LOADING
    },
    localization: MRT_Localization_ES,
    muiCircularProgressProps: {
      Component: <OnlyLoaderComponent />
    },
    renderRowActions: ({ row }) => {
      return (
        <Box>
          {/* <FiEdit className="action" onClick={() => onGetModalStudents(row.original.id)} /> */}
          <FiPlus className="action" onClick={() => onGetModalStudents(row.original.id)} />
          <BsBoxArrowUpRight className="action" onClick={() => loadStudentByScholarShip(row.original.id)} />

        </Box>
      )
    },
    renderToolbarInternalActions: () => (<>
      <Button left='10px' onClick={openModalCreateScholarShip}>Agregar</Button></>
    )
  })

  const titlesScolarShipsStudents = useMemo(
    () => [{
      accessorKey: 'tag_id', // access nested data with dot notation
      header: 'Matrícula',
      size: 20
    },
    {
      accessorFn: (row) => `${row.name} ${row.last_name} ${row.second_surname}`, // accessorFn used to join multiple data into a single cell
      id: 'name', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
      header: 'Nombre completo',
      size: 120
    },
    {
      accessorKey: 'section_name', // access nested data with dot notation
      header: 'Sección',
      size: 30
    },
    {
      accessorKey: 'level_name', // access nested data with dot notation
      header: 'Grado',
      size: 30
    },
    {
      accessorKey: 'group_name', // access nested data with dot notation
      header: 'Grupo',
      size: 30
    },
    {
      accessorFn: (row) => `${formatAmountMxn.format(row.discount)}`,
      id: 'discount',
      header: 'Monto de descuento',
      size: 40
    }
    ])
  const tableScholarShipsStudents = useMaterialReactTable({
    columns: titlesScolarShipsStudents,
    data: studentsByScholarShip,
    positionActionsColumn: 'last',
    enableRowActions: true,
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
      showLoadingOverlay: pageStatus === PageStatus.LOADING
    },
    localization: MRT_Localization_ES,
    muiCircularProgressProps: {
      Component: <OnlyLoaderComponent />
    },
    renderRowActions: ({ row }) => {
      return (
        <Box>
          <FiEdit className="action" onClick={() => navigate(`${routesNamesInstitution.onlyStudentDetail}${row.original.unique_uuid}`)} />
        </Box>
      )
    }
  })
  const addScholarShipToStudent = async () => {
    try {
      if (Object.keys(rowStudentsSelection).length === 0) {
        toast.error('selecciona minimo un alumno para continuar')
        return
      }
      const items = []
      setModalStatus(PageStatus.LOADING)
      for (const key in rowStudentsSelection) {
        if (Object.hasOwnProperty.call(rowStudentsSelection, key)) {
          const value = rowStudentsSelection[key]
          const data = { value, id_cycle_student: key }
          items.push(data)
        }
      }
      await ScholarShipsService.addScholarShipToStudent(idSchool, items, idScolarShip)
      await init()
      toast.success('Se agrego beca a alumnos')
      openOrCloseStudentsModal()
      setModalStatus(PageStatus.SUCCESS)
    } catch (error) {
      setModalStatus(PageStatus.SUCCESS)
      toast.error(error.message)
    }
  }
  return <>
    <ContainerTableNewStyled maxheight='98%'>
      <MaterialReactTable table={tableScholarShips} />
    </ContainerTableNewStyled>

    {
      viewModal && <ModalCustom
        width='50%'
        height='100%'
        title={'Crear beca'}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={openOrClose}
        statusPageModal={modalStatus}
        message={errorMessage}
        saveButton={false}
        refreshAction={() => { }}
        customButtons={true}
      >
        <form className='scholarship-form' onSubmit={handleSubmit(createScholarShip)}>
          <InputGroup className='item'>
            <InputLabel htmlFor='description'>Descripcion</InputLabel>
            <Input
              type='text'
              maxLength={200}
              {...register('description', { required: 'El campo es requerido' })}
              aria-invalid={errors.description ? 'true' : 'false'}
            />
            {
              <InputErrorStyled>
                errors.description
              </InputErrorStyled> &&
              <InputErrorStyled>
                {errors.description?.message}
              </InputErrorStyled>
            }
          </InputGroup>
          <InputGroup className='item'>
            <InputLabel htmlFor="unity_type">Unidad de monto</InputLabel>
            <Select className='select' {...register('unity_type', {
              required: {
                value: true,
                message: 'El campo es requerido'
              }
            })}>
              <option value="1">Porcentaje %</option>
              <option value="2">Pesos $</option>
            </Select>
            {
              <InputErrorStyled>
                errors.unity_type
              </InputErrorStyled> &&
              <InputErrorStyled>
                {errors.unity_type?.message}
              </InputErrorStyled>
            }
          </InputGroup>
          <InputGroup className='item'>
            <InputLabel htmlFor="value">{'Cantidad'}</InputLabel>
            <Input
              type='number'
              step="0.01"
              min="1"
              {...register('value', {
                required: {
                  value: true,
                  message: 'El campo es requerido'
                }
              })}
              aria-invalid={errors.value ? 'true' : 'false'}
              placeholder='10'
              className='number'
            />
            {
              <InputErrorStyled>
                errors.value
              </InputErrorStyled> &&
              <InputErrorStyled>
                {errors.value?.message}
              </InputErrorStyled>
            }
          </InputGroup>
          <div className='footer'>
            <Button type='submit'>Guardar</Button>

          </div>

        </form >

      </ModalCustom>

    }
    {
      viewStudentsModal && <form onSubmit={handleSubmit(addScholarShipToStudent)} > <ModalCustom
        width='99%'
        height='100%'
        title={'Selecciona alumnos para agregarles la beca'}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={openOrCloseStudentsModal}
        statusPageModal={modalStatus}
        message={errorMessage}
        saveButton={false}
        refreshAction={() => { }}
      >
        <ContainerTableNewStyled maxheight='98%'>
          <MaterialReactTable table={tableStudents} />
        </ContainerTableNewStyled>
      </ModalCustom>
      </form>
    }

    {
      viewStudentsScholarShipModal && <ModalCustom
        width='99%'
        height='100%'
        title={'Alumnos con beca'}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={openOrCloseStudentsScholarShipModal}
        statusPageModal={modalStatus}
        message={errorMessage}
        saveButton={false}
        refreshAction={() => { }}
      >
        <ContainerTableNewStyled maxheight='98%'>
          <MaterialReactTable table={tableScholarShipsStudents} />
        </ContainerTableNewStyled>
      </ModalCustom>
    }
  </>
}

export default CycleScholarShipsView
