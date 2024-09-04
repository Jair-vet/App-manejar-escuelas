/* eslint-disable camelcase */

import { ErrorRounded } from '@mui/icons-material'
import { Box } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaDownload } from 'react-icons/fa6'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { AddMatterStyled } from './AddMatterStyled'
import { ContainerSearchInput } from './AsignatureBodyTableStyled'
import LayoutDetailAsignaturesStyled, { ToopToolBarAsignature } from './AsignatureStyled'
import DetailsAsignatureView from './DEtailsAsignatureView'

import Button from '@/Common/Components/Buttons'
import ModalCustom from '@/Common/Components/Modals'
import useErrorHandling from '@/Common/hooks/useErrorCustom'
import useOpenModalHandling from '@/Common/hooks/useModal'
import { changeGroupCycleStudentSelect } from '@/Redux/mattersStudentSlice'
import { Input, InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import ModalConfirm, { typeModal } from '@/common/Components/ModalConfirm'
import Search from '@/common/Components/Search'
import SelectFilterStyled from '@/common/Components/SelectFilter/SelectFilterStyled'
import { ContainerTableNewStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import { InfoText } from '@/common/Global-styles/Titles'
import PageStatus from '@/common/Models/Enums'
import { baseApi } from '@/common/constants/constants'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import StudentService from '@/services/student.service'

const AsignaturePage = ({ idMatter }) => {
  const [modalStatus, setModalStatus] = useState(PageStatus.SUCCESS)
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [cycles, setCycles] = useState([])
  const [items, setItems] = useState([])
  const mattersStudentSelect = useSelector((state) => state.mattersStudent)
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(false)
  const [asignatureSelected, setAsignature] = useState({})
  // const [isSearch, setIsSearch] = useState(false)

  // const [idGrade, setIdGrade] = useState(undefined)

  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewModalAdd, openOrClose: openOrCloseAdd } = useOpenModalHandling()
  const { viewModal: viewModalAddComments, openOrClose: openOrCloseAddComments } = useOpenModalHandling()
  const { viewModal: viewModalPeriods, openOrClose: openOrClosePeriod } = useOpenModalHandling()

  const { register, getValues, reset, watch, handleSubmit, formState: { errors }, setError, setValue } = useForm()
  // const tableRef = useRef(null)
  const { id } = useParams()

  // const [asignatureSearch,setAsignatureSearch] = useState([])

  const idSchool = localStorage.getItem(lsSchoolId)
  const [columns, setColumns] = useState([])
  const watchCycle = watch('cycle')
  const [validationErrors, setValidationErrors] = useState({})
  const [groupNameSelect, setGroupNameSelect] = useState('Sin selección')
  const [periods, setPeriods] = useState([])

  const [editedUsers, setEditedUsers] = useState(undefined)
  const init = async () => {
    try {
      console.log('INIT')
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
      // await getMattersStudentWithFilter(responseCycles, false)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
      handleErrors(e)
      toast.error(e)
    }
  }

  const buildTable = async (titles) => {
    const items = []
    for (let index = 0; index < titles.length; index++) {
      const element = titles[index]
      // let titleId =
      if (index > 0) {
        // const value = ratings[element]
        items.push({
          accessorKey: `ratings.${element}`,
          header: element,
          muiEditTextFieldProps: ({ cell, row }) => ({
            type: 'text',
            required: true,
            error: !!validationErrors?.[cell.id],
            helperText: validationErrors?.[cell.id],
            onBlur: (event) => {
              setEditedUsers(row.original)
            }
          })
          // size: 20
        })
      } else {
        items.push({
          accessorKey: 'matter_name',
          header: element
        })
      }
    }
    setColumns(items)
  }
  const getMattersStudentWithFilter = async (cycle) => {
    // let cycle = 0
    // if (!fromWatch && cyclesResponse.length > 0) {
    //   setValue('cycle', cyclesResponse[0].id)
    //   cycle = cyclesResponse[0].id
    // }
    // const cycleID = parseInt(cycle)
    const data = {
      id_student: id,
      id_group: cycle
    }
    try {
      const response = await StudentService.getMattersStudent(idSchool, data)
      await buildTable(response.periods)
      setItems(response.items)
      setGroupNameSelect(response.group)
    } catch (e) {

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
      getMattersStudentWithFilter(watchCycle)
    }
  }, [watchCycle])

  const searchMatterSchool = async (target) => { }

  const downloadTicketRatings = async () => {
    const cycle = getValues('cycle')
    if (cycle === '0') {
      toast.error('Selecciona un grupo para poder descargar la boleta')
    } else {
      window.location.href = `${baseApi}/institutions/institution/${idSchool}/students/matters/ratings/ticket/${cycle}/${id}`
    }
  }

  const viewDetailsAsignature = (asignature) => {
    openOrClose()
    setAsignature(asignature)
    // setIdGrade(idGrade)
  }

  const addRating = async (asignature) => {
    try {
      if (cycles.length === 0) {
        toast.error('Se debe inscribir el alumno')
        return
      }
      const response = await SchoolsCyclesService.getPeriodsNameByGroupCycle(idSchool, watchCycle)
      setPeriods(response)
      setAsignature(asignature)
      openOrCloseAdd()
    } catch (e) {
      toast.error(e.message)
    }
  }

  const onCreateRatingMatter = async () => {
    try {
      const value = getValues('qualification')
      const periodName = getValues('period_name')

      if (value && parseFloat(value.toString()) <= 0) {
        setError('qualification', { type: 'manual', message: 'La calificaón no pude ser menor o igual a 0' })
        return
      }
      setError('qualification', { type: 'manual', message: '' })

      setPageStatus(PageStatus.LOADING)
      await StudentService.createRatingMatter(idSchool, value, asignatureSelected.id, periodName)
      openOrCloseAdd()
      toast.success('Calificación agregada')
      reset()
      setPageStatus(PageStatus.SUCCESS)
      await init()
    } catch (e) {
      setPageStatus(PageStatus.SUCCESS)
      handleErrors(e)
    }
  }

  const publicRatings = async () => {
    try {
      const period = getValues('period_name')
      if (period === '') {
        toast.error('Selecciona un periodo')
        return
      }

      const objectStudent = [{ unique_uuid: id }]
      setModalStatus(PageStatus.LOADING)
      await StudentService.publicRatingMatter(idSchool, period, objectStudent, watchCycle)
      openOrClosePeriod()
      toast.success('Calificaciones publicadas correctamente')
    } catch (error) {
      setModalStatus(PageStatus.SUCCESS)
      toast.error(error.message)
    }
  }

  const openModalPeriodsDetails = async () => {
    try {
      if (cycles.length === 0) {
        toast.error('Se debe inscribir el alumno')
        return
      }
      openOrClosePeriod()
      setModalStatus(PageStatus.LOADING)
      const resultget = await SchoolsCyclesService.getPeriodsNameByGroupCycle(idSchool, watchCycle)
      setModalStatus(PageStatus.SUCCESS)
      setPeriods(resultget)
    } catch (error) {
      setModalStatus(PageStatus.SUCCESS)
      toast.error(error.message)
    }
  }

  // const viewDetailsAddAsignature = () => {
  //   openOrClose()
  // }
  const addCommentOpenModal = async () => {
    openOrCloseAddComments()
    if (cycles.length === 0) {
      toast.error('Se debe inscribir el alumno')
      return
    }
    setValue('comments', '')
    const response = await SchoolsCyclesService.getPeriodsNameByGroupCycle(idSchool, watchCycle)
    setPeriods(response)
  }
  const addComment = async () => {
    try {
      setModalStatus(PageStatus.LOADING)
      const period = getValues('period_name')
      const comments = getValues('comments')
      const isSeparated = getValues('is_separated')
      if (comments === '') {
        toast.error('Agrega un comentario')
        return
      }
      if (period === '') {
        toast.error('El periodo es requerido')
        return
      }
      await StudentService.createComments(idSchool, comments, period, isSeparated, watchCycle, id)
      openOrCloseAddComments()
      setModalStatus(PageStatus.SUCCESS)
      toast.success('Comentario agregado')
    } catch (e) {
      setModalStatus(PageStatus.SUCCESS)
      toast.error(e.message)
    }
  }

  const closeDetailRatings = () => {
    openOrClose()
    getMattersStudentWithFilter(watchCycle)
  }
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    console.log(errorMessage)
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  const columnsTable = useMemo(
    () => columns, [items]
  )
  // useEffect(() => {
  //   if (editedUsers !== undefined) {
  //     toast.success('ok')
  //     setEditedUsers(undefined)
  //   }
  // }, [editedUsers])
  const tableBody = useMaterialReactTable({
    columns: columnsTable,
    data: items,
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
    renderRowActions: ({ row }) => {
      return (
        <Box>
          <FiEdit className="action" onClick={() => viewDetailsAsignature(row.original)} />
          <FiPlus className="action" onClick={() => addRating(row.original)} />
        </Box>
      )
    },
    // enableCellActions: true,
    // editDisplayMode: 'cell',
    // enableEditing: true,
    // onEditingCellChange: () => {
    //   console.log('OK')
    //   console.log(editedUsers)
    // },
    // muiEditTextFieldProps: () => {},
    // enableColumnPinning: true,
    localization: MRT_Localization_ES,
    state: {
      // isSaving: false,
      isLoading: pageStatus === PageStatus.LOADING,
      showLoadingOverlay: pageStatus === PageStatus.LOADING
    },
    muiCircularProgressProps: {
      Component: <OnlyLoaderComponent />
    },
    renderTopToolbar: () => (
      <ToopToolBarAsignature justify = 'none' >
        {<span className='group-name-title'>{groupNameSelect}</span>}
        <Search
          showCreateButton={false}
          height='4rem'
          searchAction={searchMatterSchool}
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
            <a className='cont-file-download' onClick={downloadTicketRatings} target='_blank' rel="noreferrer">
              <span>Click para descargar boleta</span>
              <FaDownload className='icon' />
            </a>
          </ContainerSearchInput>
        </Search>
        <Button onClick={openModalPeriodsDetails}>Publicar calificaciones</Button>
        <Button onClick={addCommentOpenModal}>Agregar comentario</Button>
      </ToopToolBarAsignature>

    )
  })
  return (
    <LayoutDetailAsignaturesStyled>
      <div className='table-container'>
        <MaterialReactTable table={tableBody} />
      </div>
      {
        viewModal && <ModalCustom
          width='50%'
          height='100%'
          title={`Calificaciones de ${asignatureSelected.matter_name}`}
          closeButton={modalStatus === PageStatus.SUCCESS}
          openOrClose={closeDetailRatings}
          statusPageModal={PageStatus.SUCCESS}
          message={errorMessage}
          saveButton={false}
          refreshAction={() => { }}
          customButtons={true}
        >
          {
            <DetailsAsignatureView idMatter={asignatureSelected.id} openOrClose={closeDetailRatings} />
          }

        </ModalCustom>
        //
      }
      {viewModalAdd && <ModalCustom
        width='40%'
        height='100vh'
        title={`Nueva calificación de ${asignatureSelected.matter_name}`}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={openOrCloseAdd}
        statusPageModal={PageStatus.SUCCESS}
        message={errorMessage}
        saveButton={false}
        refreshAction={() => { }}
        customButtons={true}
      >
        {modalStatus === PageStatus.SUCCESS && (
          <AddMatterStyled>
            <form onSubmit={handleSubmit(onCreateRatingMatter)}>
              <InputGroup className='item mt-5'>
                <InputLabel htmlFor="period_name">Selecciona un período</InputLabel>
                <Select
                  {...register('period_name', { required: 'El campo es requerido' })}
                  aria-invalid={errors.period_name ? 'true' : 'false'}
                >
                  {
                    periods && periods.map((period) => (
                      <option key={period} value={period}>
                        {`${period}`}
                      </option>
                    ))}
                </Select>
                {errors.period_name && (
                  <InputErrorStyled>
                    {errors.period_name.message}
                  </InputErrorStyled>
                )}
                <InfoText>
                  Selecciona el periodo que quieres calificar
                </InfoText>
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='qualification'>Calificación</InputLabel>
                <Input
                  type='number'
                  step="0.01"
                  min="1"
                  {...register('qualification', { required: 'El campo es requerido' })}
                  aria-invalid={errors.qualification ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.qualification
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.qualification?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <div className='button'>
                <Button
                  size='mediumSmall'
                  type='submit'
                >Guardar</Button>
              </div>

            </form>
          </AddMatterStyled>
        )
        }
        {
          modalStatus === PageStatus.LOADING && (
            <OnlyLoaderComponent>
            </OnlyLoaderComponent>
          )
        }
      </ModalCustom>}

      {viewModalAddComments && <ModalCustom
        width='40%'
        title={'Nueva comentario'}
        closeButton={modalStatus === PageStatus.SUCCESS}
        openOrClose={openOrCloseAddComments}
        statusPageModal={PageStatus.SUCCESS}
        message={errorMessage}
        saveButton={false}
        refreshAction={() => { }}
        customButtons={true}
      >
        {pageStatus === PageStatus.SUCCESS && (
          <AddMatterStyled>
            <form onSubmit={handleSubmit(addComment)}>
              <InputGroup className='item mt-5'>
                <InputLabel htmlFor="period_name">Selecciona un período</InputLabel>
                <Select
                  {...register('period_name', { required: 'El campo es requerido' })}
                  aria-invalid={errors.period_name ? 'true' : 'false'}
                >
                  {
                    periods && periods.map((period) => (
                      <option key={period} value={period}>
                        {`${period}`}
                      </option>
                    ))}
                </Select>
                {errors.period_name && (
                  <InputErrorStyled>
                    {errors.period_name.message}
                  </InputErrorStyled>
                )}
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='comments'>Comentario</InputLabel>
                <Input
                  type='text'
                  maxLength={200}
                  {...register('comments', { required: 'El campo es requerido' })}
                  aria-invalid={errors.comments ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.comments
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.comments?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <InputGroup className='item mt-5'>
                <InputLabel htmlFor="is_separated">Selecciona tipo de comentario</InputLabel>
                <Select
                  {...register('is_separated', { required: 'El campo es requerido' })}
                  aria-invalid={errors.is_separated ? 'true' : 'false'}
                >
                  <option value={false}> Normal(Español) </option>
                  <option value={true}> Ingles(En boleta se separa) </option>
                </Select>
                {errors.is_separated && (
                  <InputErrorStyled>
                    {errors.is_separated.message}
                  </InputErrorStyled>
                )}
              </InputGroup>
              <div className='button'>
                <Button
                  size='mediumSmall'
                  type='submit'
                >Guardar</Button>
              </div>

            </form>
          </AddMatterStyled>
        )
        }
      </ModalCustom>}
      {
        viewModalPeriods && <ModalCustom
          title='Selecciona un período'
          height='100vh'
          openOrClose={openOrClosePeriod}
          closeButton={modalStatus === PageStatus.SUCCESS}
          statusPageModal={modalStatus}
          message={errorMessage}
          saveButton={false}
          refreshAction={() => {}}
          customButtons={true}
        >
          <InputGroup className='item mt-5'>
            <InputLabel htmlFor="period_name">Selecciona un período</InputLabel>
            <Select
              {...register('period_name', { required: 'El campo es requerido' })}
              aria-invalid={errors.period_name ? 'true' : 'false'}
            >
              {
                periods && periods.map((period) => (
                  <option key={period} value={period}>
                    {`${period}`}
                  </option>
                ))}
            </Select>
            {errors.period_name && (
              <InputErrorStyled>
                {errors.period_name.message}
              </InputErrorStyled>
            )}
            <InfoText>
              Selecciona el periodo que quieres calificar
            </InfoText>
          </InputGroup>
          <Button onClick={publicRatings}>Aceptar</Button>
        </ModalCustom>}

    </LayoutDetailAsignaturesStyled>
  )
}

AsignaturePage.propTypes = {
  idMatter: PropTypes.string,
  idQualitification: PropTypes.string
}
export default AsignaturePage
