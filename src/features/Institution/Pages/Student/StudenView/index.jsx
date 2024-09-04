/* eslint-disable camelcase */
import { Box, InputLabel } from '@mui/material'
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { BsCloudUploadFill } from 'react-icons/bs'
import { FaDownload, FaFile, FaUpload } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { ContainerModalMasive } from '../../home/CyclesActive/HomeInstitutionStyled'

import StudentStyled, { ContainerFileMasive, ContainerStudent, FooterMasiveStudentsModal } from './StudentStyled'

import { changeTitle } from '@/Redux/globalSlice'
import { cangeSelectFilterTable } from '@/Redux/studentsSlice'
import Button, { ButtonSecondary, StatusButton } from '@/common/Components/Buttons'
import { InputErrorStyled, InputGroup, Select } from '@/common/Components/Form'
// import LoaderComponent from '@/common/Components/LoaderComponent'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import ModalConfirm from '@/common/Components/ModalConfirm'
import ModalCustom from '@/common/Components/Modals'
import Search from '@/common/Components/Search'
import SelectFilterStyled from '@/common/Components/SelectFilter/SelectFilterStyled'
import { ContainerTableNewStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import { InfoText } from '@/common/Global-styles/Titles'
import theme from '@/common/Global-styles/theme'
import PageStatus from '@/common/Models/Enums'
import { baseApi } from '@/common/constants/constants'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'
import StudentService from '@/services/student.service'

const StudentsPage = ({ cycle }) => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const { handleSubmit, register, watch, setValue, getValues, formState: { errors } } = useForm()

  const cycleFilterWatch = watch('cycle')
  // const filterSelectStore = useSelector((state) => state.students.cycle)
  // ============ SCREEN STATUS ===============
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [itemsSearch, setStudentSearch] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [modalStatus, setmodalStatus] = useState(PageStatus.SUCCESS)
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewTableModalStudentsMasive, openOrClose: openOrCloseTableStudentsMassive } = useOpenModalHandling()
  const { viewModal: viewConfirmCreateMasive, openOrClose: openOrCloseViewConfirmCreateMasive } = useOpenModalHandling()
  const { viewModal: viewModalPeriods, openOrClose: openOrClosePeriod } = useOpenModalHandling()

  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [, setIsFileVisible] = useState(false)
  const idSchool = localStorage.getItem(lsSchoolId)

  const initHasRun = useRef(false)
  const [items, setItems] = useState([])

  const [cycles, setCycles] = useState([])
  const [studentsMasive, setStudentsMasive] = useState([])
  const [totalStudents, setTotalStudents] = useState(0)
  const [sections, setSections] = useState([])
  const [levels, setLevels] = useState([])
  const [groups, setGroups] = useState([])

  const [periods, setPeriods] = useState([])
  const cycleStore = cycle
  const idCycle = cycleStore && cycleStore.id ? cycleStore.id : 0

  const watchCycle = watch('cycle')
  const [watchSection, watchLevel, watchGroup] = watch(['section', 'level', 'group'])
  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Alumnos'
      }))
      setPageStatus(PageStatus.LOADING)
      const selectedCycle = localStorage.getItem('selectedCycle') // Obtiene el ciclo seleccionado guardado en el almacenamiento local
      setValue('cycle', selectedCycle || '') // Establece el ciclo seleccionado en el formulario
      const responseCycles = await SchoolsCyclesService.getCycles(idSchool, 1, [1, 2])
      setCycles(responseCycles)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }

  useEffect(() => {
    const total = isSearch ? itemsSearch.length : items.length
    setTotalStudents(total)
  }, [items, itemsSearch])

  const search = async (target) => {
    const value = target.target.value
    if (value === undefined && value === '') {
      setIsSearch(false)
      setStudentSearch([])
      return
    }
    setPageStatus(PageStatus.LOADING)
    setIsSearch(true)
    const response = await StudentService.searchStudent(idSchool, value)
    setStudentSearch(response)
    setPageStatus(PageStatus.SUCCESS)
  }

  const getStudentsByCycle = async () => {
    try {
      let students = []
      setPageStatus(PageStatus.LOADING)
      // dispatch(changeTitle({
      //   titleHeader: 'Administración',
      //   showArrow: false
      // }))
      if (cycleFilterWatch === '') {
        return
      }
      setIsSearch(false)
      if (cycleFilterWatch === '0') {
        students = await StudentService.getStudents(idSchool, 1)
      } else {
        students = await SchoolsCyclesService.getStudentsByCycle(idSchool, cycleFilterWatch)
      }
      setItems(students)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.SUCCESS)
    }
  }

  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
  }, [])

  useEffect(() => {
    dispatch(cangeSelectFilterTable({ cycle: cycleFilterWatch }))
    if (cycleFilterWatch && cycleFilterWatch !== '') {
      getStudentsByCycle()
    } else {
      setItems([])
    }
  }, [cycleFilterWatch])

  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage)
      clearErrorMessage()
    }
  }, [errorMessage])

  // const handleCycleSelectChange = (event) => {
  //   const selectedCycle = event.target.value
  //   // setValue('cycle', selectedCycle)
  //   localStorage.setItem('selectedCycle', selectedCycle)
  //   getStudentsByCycle(selectedCycle)
  // }
  // ====================
  // ============ INIT DATA LOADING ===============

  const openModalMasive = () => {
    setmodalStatus(PageStatus.SUCCESS)
    openOrClose()
  }

  const acceptedExtensions = ['.xlsx']

  const handleFileChange = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase()
      if (acceptedExtensions.includes(`.${extension}`)) {
        setSelectedFile(file)
        toast.success('Archivo seleccionado')
      } else {
        toast.error('Selecciona un archivo en formato Excel xlsx')
      }
    }
    setIsFileVisible(false)
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    } else {
      toast.error('No se pudo encontrar el input de archivo')
    }
  }

  const handleCancelImage = (event) => {
    event.stopPropagation()
    setSelectedFile(null)
    setIsFileVisible(false)
  }

  const onDownloadLayout = () => {
    window.location.href = `${baseApi}/institutions/institution/${idSchool}/students/create-masive/download-layout`
  }

  // Cierra modal de lectura y abre el de leear archivo de alumnos
  const readOtherFileOpen = async () => {
    openOrClose()
    openOrCloseTableStudentsMassive()
  }
  const sendAndReadMasiveStudents = async () => {
    try {
      setmodalStatus(PageStatus.LOADING)
      const response = await StudentService.readFileMasiveStudents(idSchool, selectedFile)
      setStudentsMasive(response)
      readOtherFileOpen()
      setmodalStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setmodalStatus(PageStatus.SUCCESS)
    }
  }

  const sendAndcreateMasiveStudents = async () => {
    try {
      setmodalStatus(PageStatus.LOADING)
      await StudentService.createStudentsMasive(idSchool, studentsMasive.results)
      setmodalStatus(PageStatus.SUCCESS)
      openOrCloseTableStudentsMassive()
      init()
      handleCancelImage()
      toast.success('Alumnos creados correctamente')
    } catch (e) {
      handleErrors(e)
      setmodalStatus(PageStatus.SUCCESS)
    }
  }
  const validateAllRegistersMasive = async () => {
    if (studentsMasive.totals.total_errors_registers > 0) {
      openOrCloseViewConfirmCreateMasive()
    } else {
      await sendAndcreateMasiveStudents()
    }
  }

  const accept = async () => {
    openOrCloseViewConfirmCreateMasive()
    await sendAndcreateMasiveStudents()
  }

  const publicRatingsMasive = async () => {
    try {
      const period = getValues('period_name')
      if (period === '') {
        toast.error('Selecciona un periodo')
        return
      }

      const objectStudent = items
      setmodalStatus(PageStatus.LOADING)

      await StudentService.publicRatingMatter(idSchool, period, objectStudent, watchGroup)
      openOrClosePeriod()
      toast.success('Calificaciones publicadas correctamente')
    } catch (error) {
      setmodalStatus(PageStatus.SUCCESS)
      toast.error(error.message)
    }
  }

  const openModalPeriodsMasive = async () => {
    try {
      if (cycles.length === 0) {
        toast.error('Se debe inscribir el alumno')
        return
      }
      if (watchCycle === 0 || watchCycle === '' || watchCycle === undefined) {
        toast.error('Selecciona un ciclo')
        return
      }
      openOrClosePeriod()
      setmodalStatus(PageStatus.LOADING)
      const responseGetCycles = await SchoolsSectionsService.getSectionByCycles(idSchool, watchCycle)
      setSections(responseGetCycles)
      setmodalStatus(PageStatus.SUCCESS)
    } catch (error) {
      setmodalStatus(PageStatus.SUCCESS)
      toast.error(error.message)
    }
  }

  const getLevels = async () => {
    try {
      if (watchSection && watchSection !== '') {
        const response = await SchoolsCyclesService.getCycleLevelsBySection(idSchool, watchCycle, watchSection)
        setLevels(response)
      }
    } catch (e) {
      handleErrors(e)
    }
  }
  const getGroups = async () => {
    try {
      if (watchLevel && watchLevel !== '') {
        const response = await SchoolsCyclesService.getCycleGroupsByLevel(idSchool, watchLevel)
        setGroups(response)
      }
    } catch (e) {
      handleErrors(e)
    }
  }

  const getPeriod = async () => {
    try {
      if (watchGroup && watchGroup !== '') {
        const result = await SchoolsCyclesService.getPeriodsNameByGroupCycle(idSchool, watchGroup)
        setPeriods(result)
      }
    } catch (error) {
      handleErrors(error)
    }
  }
  useEffect(() => {
    getGroups()
  }, [watchLevel])

  useEffect(() => {
    getLevels()
  }, [watchSection])

  useEffect(() => {
    getPeriod()
  }, [watchGroup])

  // ==================== TABLE STUDENTS VIEW  ===========

  const columnsStudenTable = useMemo(
    () => [
      {
        accessorKey: 'tag_id', // access nested data with dot notation
        header: 'Matrícula',
        size: 20
      },
      {
        accessorFn: (row) => `${row.name} ${row.last_name} ${row.second_surname}`, // accessorFn used to join multiple data into a single cell
        id: 'name', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: 'Nombre completo',
        size: 120,
        Footer: () => <div>Total de alumnos { totalStudents } </div>
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
      }
    ], [totalStudents]
  )

  const tableStudents = useMaterialReactTable({
    columns: columnsStudenTable,
    data: isSearch ? itemsSearch : items,
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
          <FiEdit className="action" onClick={() => navigate(`${routesNamesInstitution.onlyStudentDetail}${row.original.unique_uuid}`)} />
        </Box>
      )
    },
    renderToolbarInternalActions: () => (
      <ContainerStudent>
        <Button padding='1.2rem' fontSize='14.5px' onClick={openModalPeriodsMasive} >Publicar calificaciones <br/> masivamente </Button>
        <Button padding='1.2rem' onClick={() => openModalMasive()}>Cargar masivamente</Button>
        <Button padding='1.2rem' onClick={() => navigate(routesNamesInstitution.addstudents)}>Agregar</Button>
      </ContainerStudent>

    ),
    renderTopToolbarCustomActions: () => (
      <Search searchAction={search}
        height='auto'
        width='55%'
        padding='1rem 0.5rem'
        alignItems='center'
        showCreateButton={false}>
        <SelectFilterStyled>
          <select className='select' {...register('cycle', { required: { value: false, message: '' } })} >
            <option value={''}>Filtrar por ciclo escolar:</option>
            <option value={0}>Todos</option>
            {
                cycles && cycles.map((cycle) => (
                  <option key={cycle.id} value={cycle.id}>
                    {`${cycle.start} - ${cycle.end} / ${cycle.status_label}`}
                  </option>
                ))}
          </select>
        </SelectFilterStyled>
      </Search>
    ),
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

  // ==================== TABLE STUDENTS VIEW  ===========

  // ==================== TABLE MASIVE READ ===========
  const data = studentsMasive.results ? studentsMasive.results : []

  const columns = useMemo(
    () => [
      {
        id: 'student', // id used to define `group` column
        header: 'Alumno',
        columns: [
          {
            accessorKey: 'student.number', // access nested data with dot notation
            header: '#',
            size: 30
          },
          {
            accessorFn: (row) => `${row.student.id_group} | ${row.student.name_level} ${row.student.name_group}`, // accessorFn used to join multiple data into a single cell
            id: 'group', // id is still required when using accessorFn instead of accessorKey
            header: 'Grado / Grupo',
            size: 100
          },
          {
            accessorFn: (row) => `${row.student.name} ${row.student.last_name} ${row.student.second_surname}`, // accessorFn used to join multiple data into a single cell
            id: 'name', // id is still required when using accessorFn instead of accessorKey
            header: 'Nombre',
            size: 250,
            Footer: () => <div>Total de alumnos : {data.length}</div>
          },
          {
            accessorKey: 'student.email', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Correo',
            size: 100
          },
          {
            accessorKey: 'student.birthday_date',
            header: 'Fecha de nacimiento',
            size: 150
          },
          {
            accessorKey: 'student.curp',
            header: 'CURP',
            size: 150
          },
          {
            accessorKey: 'student.sex',
            header: 'Sexo',
            size: 100
          }
        ]
      },
      {
        id: 'tutor', // id used to define `group` column
        header: 'Tutor',
        columns: [
          {
            accessorFn: (row) => `${row.tutor.name} ${row.tutor.last_name} ${row.tutor.second_surname}`, // accessorFn used to join multiple data into a single cell
            id: 'name_tutor', // id is still required when using accessorFn instead of accessorKey
            header: 'Nombre de tutor',
            size: 250
          },
          {
            accessorKey: 'tutor.email',
            header: 'Correo tutor',
            size: 150
          },
          {
            accessorKey: 'tutor.number_phone_movil',
            header: 'Num. movil',
            size: 150
          }
        ]
      },
      {
        id: 'errors', // id used to define `group` column
        header: 'Errores',
        columns: [
          {
            accessorKey: 'error.message', // access nested data with dot notation
            header: 'mensaje',
            size: 200
          }
        ]
      }

    ],
    []
  )
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: true,
    enablePagination: true,
    enableSorting: true,
    enableStickyFooter: true,
    enableDensityToggle: false,
    initialState: { pagination: { pageSize: 15, pageIndex: 0 }, density: 'compact' },
    enableHiding: true,
    state: {
      isLoading: pageStatus === PageStatus.LOADING,
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
    muiTableBodyCellProps: {
      sx: {
      }
    }
  })
  // ==================== TABLE MASIVE READ ===========

  return (
    <StudentStyled>
      <div className='container'>
        <Toaster position="top-center" reverseOrder={false} />
        <ContainerTableNewStyled >
          <MaterialReactTable table={tableStudents}/>
        </ContainerTableNewStyled>

        {
        viewModal && (<>
          <ModalCustom title={'Creacion de alumnos masivo'}
            closeButton={modalStatus === PageStatus.SUCCESS}
            width='50%'
            height='100vh'
            openOrClose={openOrClose}
            statusPageModal={modalStatus}
            refreshAction={() => { }}
            footer={<>
            </>}
            message={errorMessage} >
            <ContainerModalMasive>
              <section className='container-layout'>
                <span className='subtitle-section'><FaDownload /> Descargar layout </span>
                <a className='cont-file-download' onClick={onDownloadLayout} target='_blank' rel="noreferrer">
                  <span>Click para descargar layout</span>
                  <FaDownload className='icon' />
                </a>
              </section>
              <section className='container-layout'>
                <span className='subtitle-section'><FaUpload /> Leer datos de excel | validar alumnos</span>
                <form onSubmit={handleSubmit(sendAndReadMasiveStudents)}>
                  <div className='item'>
                    <InputGroup>
                      <div
                        className={`upload-image ${selectedFile ? 'hidden' : ''}`}
                        style={{ width: '100%' }}
                        onDrop={(event) => {
                          event.preventDefault()
                          const file = event.dataTransfer.files[0]
                          if (file) {
                            const extension = file.name.split('.').pop().toLowerCase()
                            if (acceptedExtensions.includes(`.${extension}`)) {
                              setSelectedFile(file)
                              toast.success('Archivo cargado')
                            } else {
                              toast.error('Por favor, selecciona un archivo en formato PNG, JPG, JPEG o SVG.')
                            }
                          }
                        }}
                        onDragOver={(event) => {
                          event.preventDefault()
                        }}
                      >
                        <ContainerFileMasive onClick={(event) => { event.preventDefault(); handleUploadClick() }}>
                          {selectedFile
                            ? (
                              <>
                                <FaFile />
                                <span onClick={handleCancelImage} className="cancel-image">Cancelar</span>
                              </>
                              )
                            : (
                              <>
                                <span>Adjunta y arrastra el archivo excel</span>
                                <BsCloudUploadFill
                                  size='2rem'
                                  className='icon-upload'
                                  // onClick={handleUploadClick}
                                />
                              </>
                              )}
                        </ContainerFileMasive>
                        <input
                          type='file'
                          ref={fileInputRef}
                          name='file'
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                          accept='.xlsx'
                        />
                      </div>
                    </InputGroup>
                  </div>
                  <div className='container-button'>
                    <Button
                      size='medium'
                      color='white'
                      type='submit'
                      top='10px'
                      status={StatusButton.Enabled}
                    >
                      Leer archivo
                    </Button>
                  </div>

                </form>
              </section>
            </ContainerModalMasive>
          </ModalCustom>
        </>)
      }
        {
        viewTableModalStudentsMasive && <ModalCustom
          title={'Crear alumnos'}
          subtitle='Crea masivamente alumnos'
          closeButton={modalStatus === PageStatus.SUCCESS}
          width='98%'
          openOrClose={readOtherFileOpen}
          statusPageModal={modalStatus}
          footer={<FooterMasiveStudentsModal>
            <div className='item'>
              {studentsMasive.totals.total_errors_registers && studentsMasive.totals.total_errors_registers > 0 ? <span className='error-text'>Tienes {studentsMasive.totals.total_errors_registers} errores</span> : <></>}
            </div>
            <div className="item">
              <ButtonSecondary onClick={readOtherFileOpen}>Cancelar</ButtonSecondary>
              <Button left='10px' onClick={validateAllRegistersMasive}>Aceptar</Button>
            </div>
          </FooterMasiveStudentsModal>}
          message={errorMessage}
        >
          {/* <TableCustom */}
          {/* statusTable={modalStatus} */}
          {/* withContainerWhite={false} */}
          {/* totalItems={9} */}
          {/* columnWidths={columnWidths} */}
          {/* heightTable={'calc(100% - 80px)'} */}
          {/* titles={['Grupo', 'Nombre completo', 'Correo', 'Fecha de nac.', 'CURP', 'Sexo', 'Nombre de tutor', 'Correo tutor', 'Num. movil']}> */}
          {/* <TableStudentsMasiveBySchool
            items={ studentsMasive.results }
            message={errorMessage} tableStatus={pageStatus}
            columnWidths={columnWidths}
            /> */}
          {/* </TableCustom> */}
          <MaterialReactTable table={table} />
        </ModalCustom>}

        {
        viewConfirmCreateMasive && <ModalConfirm
          handleClose={openOrCloseViewConfirmCreateMasive}
          handleConfirm={accept}
        >
          <span>Los registros con errores, no se crearán</span>

        </ModalConfirm>
      }

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
          {/* // ============ Formulario de select para publicar calificaciones masivas =============== */}
          <div className="selects">
            <InputGroup className='item'>
              <InputLabel htmlFor="section">Selecciona seccion</InputLabel>
              <Select
                  {...register('section', { required: 'El campo es requerido' })}
                  aria-invalid={errors.id_cycle ? 'true' : 'false'}
                >
                <option className='select-option rol' value="">Selecciona un elemento</option>
                {/* <option className='select-option rol' value={0}>Todas las secciones</option> */}
                {
                    sections && sections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
              </Select>
              {errors.section && (
              <InputErrorStyled>
                {errors.section.message}
              </InputErrorStyled>
              )}
              {/* <InfoText>
                  Se descargarán alumnos del ciclo escolar activo para pode calificar
                </InfoText> */}
            </InputGroup>
            <InputGroup className='item'>
              <InputLabel htmlFor="section">Selecciona grado</InputLabel>
              <Select
                  {...register('level', { required: 'El campo es requerido' })}
                  aria-invalid={errors.id_cycle ? 'true' : 'false'}
                >
                <option className='select-option rol' value="">Selecciona un elemento</option>
                {/* <option className='select-option rol' value={0}>Todas los grados</option> */}
                {
                    levels && levels.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
              </Select>
              {errors.section && (
              <InputErrorStyled>
                {errors.section.message}
              </InputErrorStyled>
              )}
            </InputGroup>
          </div>
          <div className="selects">
            <InputGroup className='item'>
              <InputLabel htmlFor="group">Selecciona grupo</InputLabel>
              <Select
                  {...register('group', { required: 'El campo es requerido' })}
                  aria-invalid={errors.id_cycle ? 'true' : 'false'}
                >
                <option className='select-option rol' value="">Selecciona un elemento</option>
                {
                    groups && groups.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
              </Select>
              {errors.section && (
              <InputErrorStyled>
                {errors.section.message}
              </InputErrorStyled>
              )}
            </InputGroup>
          </div>
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

          <Button onClick={publicRatingsMasive}>Aceptar</Button>
        </ModalCustom>}
      </div>

    </StudentStyled>
  )
}

StudentsPage.propTypes = {
  cycle: PropTypes.object
}

export default StudentsPage
