/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
import { Box } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { BsCloudUploadFill } from 'react-icons/bs'
import { FaDownload, FaFile, FaUpload } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2'
import { useNavigate } from 'react-router'

import { ContainerFileMasive } from '../../../../Student/StudenView/StudentStyled'
import Inscription from '../../../../Student/StudentDetailsPage/view/Inscription'
// import { TableBodyStudentsToRegisterCycle } from '../../../Components/BodyStudentsForInscribe'
import { ContainerModalMasive } from '../../../CyclesActive/HomeInstitutionStyled'

import useErrorHandling from '@/Common/hooks/useErrorCustom'
import Button, { ButtonSecondary, StatusButton } from '@/common/Components/Buttons'
import { InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
// import LoaderComponent from '@/common/Components/LoaderComponent'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import ModalConfirm, { typeModal } from '@/common/Components/ModalConfirm'
import ModalCustom from '@/common/Components/Modals'
import Search from '@/common/Components/Search'
// import TableCustom from '@/common/Components/Tables/TableCustom'
import { ContainerTableNewStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import { InfoText } from '@/common/Global-styles/Titles'
import theme from '@/common/Global-styles/theme'
import PageStatus from '@/common/Models/Enums'
import { baseApi } from '@/common/constants/constants'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useOpenModalHandling from '@/common/hooks/useModal'
import { ContainerButton } from '@/features/Dashboard/Pages/DetailUser/DetailUserStyled'
// import { changeCycle } from '@/Redux/cycleSlice'
import { routesNamesInstitution } from '@/features/Institution/Routes/routesNames'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'
import StudentService from '@/services/student.service'

const CycleStudentsView = ({ cycle }) => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setModalStatus] = useState(PageStatus.SUCCESS)
  // const dispatch = useDispatch()
  const { register, formState: { errors }, getValues, setError, watch } = useForm()
  const cycleStore = cycle
  const {
    handleSubmit
  } = useForm()

  // ============ SCREEN STATUS ===============
  const [students, setStudents] = useState([])
  // const [studenSelectedRegister, setStudenSelectedRegister] = useState([])

  const [isSearch, setIsSearch] = useState(false)
  const [ratings, setRatings] = useState([])
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewModalRegister, openOrClose: openOrCloseRegister } = useOpenModalHandling()
  // const { viewModal: viewModalMasive, openOrClose: openOrCloseMassive } = useOpenModalHandling()
  const { viewModal: viewModalMattersMasive, openOrClose: openOrCloseMattersMassive } = useOpenModalHandling()
  const { viewModal: viewTableModalMattersMasive, openOrClose: openOrCloseTableMattersMassive } = useOpenModalHandling()
  const { viewModal: viewModalPeriodoName, openOrClose: openOrClosePeriodName } = useOpenModalHandling()

  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [, setIsFileVisible] = useState(false)

  const idSchool = localStorage.getItem(lsSchoolId)
  // const [cycles, setCycles] = useState([])
  const [sections, setSections] = useState([])
  const [levels, setLevels] = useState([])
  const [groups, setGroups] = useState([])

  const [watchSection, watchLevel] = watch(['section', 'level'])
  const idCycle = cycleStore.id === '' ? 0 : cycleStore.id
  const [titlesReadRatings, setTitlesReadRatings] = useState([])
  // const [titlesReadRatingsWidths, setTitlesReadRatingsWidths] = useState([])
  const [studentsByCycle, setStudentsByCycle] = useState([])
  const [totalStudents, setTotalStudents] = useState(0)
  const [studentsSearchByCycle, setStudentsSearchByCycle] = useState([])

  const [groupRatings, setGroupRatings] = useState(undefined)
  const [rowStudentsInscribeSelection, setRowStudentsInscribeSelection] = useState({})
  const [studentSelect, setStudentSelect] = useState([])

  // const [periodoSelect, setPeriodSelect] = useState(undefined)
  const [periods, setPeriods] = useState([])
  const navigate = useNavigate()
  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      const idSchool = localStorage.getItem(lsSchoolId)
      const response = await SchoolsCyclesService.getStudentsByCycle(idSchool, idCycle)
      const responseSections = await SchoolsSectionsService.getSectionByCycles(idSchool, idCycle)
      setStudentsByCycle(response)
      setTotalStudents(response.length)
      setSections(responseSections)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e.message)
      setPageStatus(PageStatus.SUCCESS)
    }
  }
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
  }, [errorMessage])
  // ============ INIT DATA LOADING ===============

  const getLevels = async () => {
    try {
      if (watchSection && watchSection !== '') {
        const response = await SchoolsCyclesService.getCycleLevelsBySection(idSchool, idCycle, watchSection)
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
  useEffect(() => {
    getGroups()
  }, [watchLevel])

  useEffect(() => {
    getLevels()
  }, [watchSection])

  const search = async (target) => {
    setIsSearch(true)
  }

  const OpenSelectStudent = async () => {
    try {
      openOrClose()
      setRowStudentsInscribeSelection({})
      setModalStatus(PageStatus.LOADING)
      const response = await StudentService.getStudents(idSchool, 1)
      setStudents(response)
      setModalStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      console.error(e)
      setModalStatus(PageStatus.ERROR)
    }
  }

  const selectStudentToRegister = async (item) => {
    // const objectStudents = rowStudentsInscribeSelection
    // objectStudents[item.unique_uuid.toString()] = item
    // setRowStudentsInscribeSelection(objectStudents)
    setStudentSelect([item])
    openOrCloseRegister()
  }

  const inscribeMasiveStudents = async () => {
    if (Object.keys(rowStudentsInscribeSelection).length === 0) {
      toast.error('selecciona un alumno para continuar')
      return
    }
    const items = []
    for (const key in rowStudentsInscribeSelection) {
      if (Object.hasOwnProperty.call(rowStudentsInscribeSelection, key)) {
        const value = rowStudentsInscribeSelection[key]
        const data = { value, unique_uuid: key }
        // debugger
        items.push(data)
      }
    }
    // debugger
    setStudentSelect(items)
    openOrCloseRegister()
  }

  const registerStudent = async () => {
    openOrCloseRegister()
    await init()
  }

  // useEffect(() => {
  //   const total = isSearch ? studentsSearchByCycle.length : studentsByCycle.length
  //   setTotalStudents(total)
  // }, [studentsSearchByCycle, studentsByCycle])

  // ===============MASIVE ===================

  const acceptedExtensions = ['.xlsx']

  const handleFileChange = (event) => {
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
  // const onDownloadLayout = () => {
  //   const cycle = getValues('id_cycle_export')
  //   if (cycle === '') {
  //     setError('id_cycle_export', { type: 'manual', message: 'Selecciona un ciclo' })
  //     return
  //   }
  //   setError('id_cycle_export', { type: 'manual', message: '' })
  //   window.location.href = `${baseApi}/institutions/institution/${idSchool}/students/export/${cycle}`
  // }

  const onDownloadMatters = async () => {
    const group = getValues('group')
    if (group === '') {
      setError('section', { type: 'manual', message: 'Selecciona una opción' })
      return
    }
    setError('section', { type: 'manual', message: '' })
    window.location.href = `${baseApi}/institutions/institution/${idSchool}/students/matters/export/${group}`
  }

  // const onSendFileMasiveInscribe = async () => {
  //   try {
  //     const idCycle = getValues('id_cycle')
  //     if (idCycle === '') {
  //       setError('id_cycle', { type: 'manual', message: 'Selecciona un ciclo' })
  //       return
  //     }
  //     setError('id_cycle', { type: 'manual', message: '' })
  //     if (selectedFile === null) {
  //       throw new Error('Selecciona el archivo excel de carga')
  //     }
  //     setModalStatus(PageStatus.LOADING)
  //     await StudentService.inscribeMasiveStudents(idSchool, idCycle, selectedFile)
  //     openOrCloseMassive()
  //     init()
  //     setModalStatus(PageStatus.SUCCESS)
  //     toast.success('Alumnos inscritos correctamente')
  //   } catch (e) {
  //     toast.error(e.message)
  //     setModalStatus(PageStatus.SUCCESS)
  //   }
  // }

  const onSendFileRatings = async () => {
    try {
      setModalStatus(PageStatus.LOADING)
      const response = await StudentService.readRatingsFile(idSchool, selectedFile)
      readOtherFileOpen()
      setRatings(response.items)
      setGroupRatings(response.id_group)
      // const firstIDGroup = response.items[0].group_name.split('/')
      const periodsNames = await SchoolsCyclesService.getPeriodsNameByGroupCycle(idSchool, response.id_group)
      setPeriods(periodsNames)
      setTitlesReadRatings(response.titles)
      const titles = []
      for (let index = 0; index < response.titles.length; index++) {
        const select = response.titles[index]
        const size = 40
        let data = {
          accessorKey: select,
          header: select,
          size
        }
        if (index > 7) {
          if (index === response.titles.length - 1) {
            data = {
              accessorKey: select,
              header: select,
              size
            }
          } else if (index === response.titles.length - 2) {
            data = {
              accessorKey: select,
              header: select,
              size
            }
          } else {
            data = {
              accessorKey: `matters.${select}.qualification`,
              header: select,
              size
            }
          }
        }
        // if (index === 1){

        // }
        // titles.push(data)
        titles.splice(index, 0, data)
      }
      // setTitlesReadRatingsWidths(widths)
      setTitlesReadRatings(titles)
      setModalStatus(PageStatus.SUCCESS)
    } catch (e) {
      toast.error(e.message)
      setModalStatus(PageStatus.SUCCESS)
    }
  }

  // Cierra modal de lectura y abre el de leear archivo de calificaciones
  const readOtherFileOpen = async () => {
    openOrCloseMattersMassive()
    openOrCloseTableMattersMassive()
  }
  const openMasiveDownloadFileMatters = async () => {
    setSelectedFile(null)
    openOrCloseMattersMassive()
  }

  const questionPeriodName = () => {
    openOrClosePeriodName()
  }

  const uploadRatings = async () => {
    try {
      openOrClosePeriodName()
      setModalStatus(PageStatus.LOADING)
      // ratings.period_name = periodoSelect
      const periodoSelect = getValues('period_name')
      if (periodoSelect === '') {
        setError('period_name', { type: 'manual', message: 'Selecciona un periodo' })
        return
      }
      await StudentService.uploadRatingsMasive(idSchool, ratings, periodoSelect)
      setModalStatus(PageStatus.SUCCESS)
      openOrCloseTableMattersMassive()
      toast.success('Calificaciones subidas con exito')
    } catch (e) {
      toast.error(e.message)
      setModalStatus(PageStatus.SUCCESS)
    }
  }

  // ==================== TABLE MATTERS READ VIEW  ===========
  const tableRatings = useMaterialReactTable({
    columns: titlesReadRatings,
    data: ratings,
    enableColumnActions: false,
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
    }
  })
  // ==================== TABLE MATTERS READ VIEW  ===========

  // ==================== TABLE STUDENTS  ===========
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
        Footer: () => <div>Total de alumnos {totalStudents} </div>
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
    data: isSearch ? studentsSearchByCycle : studentsByCycle,
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
      <ContainerButton gap='1rem' justify='end'>
        <Button className='buton-inscription' onClick={openMasiveDownloadFileMatters}>Cargar calificaciones</Button>
        {/* <Button className='buton-inscription' onClick={openModalMasive}>Inscribir masivamente</Button> */}
        <Button onClick={OpenSelectStudent}>Inscribir</Button>
      </ContainerButton>

    ),
    renderTopToolbarCustomActions: () => (
      <Search searchAction={search}
        height='60px'
        width='40%'
        alignItems='center'
        showCreateButton={false}>
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
    }
  })

  const tableStudentInscribe = useMaterialReactTable({
    columns: columnsStudenTable,
    data: students,
    enableRowActions: true,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Acciones',
        size: 300 // make actions column wider
      }
    },
    renderRowActions: ({ row }) => {
      return (
        <Box>
          <HiMiniArrowTopRightOnSquare className="action" onClick={() => selectStudentToRegister(row.original)}/>
        </Box>
      )
    },
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
    getRowId: (originalRow) => originalRow.unique_uuid,
    onRowSelectionChange: setRowStudentsInscribeSelection,
    state: {
      isLoading: pageStatus === PageStatus.LOADING,
      showLoadingOverlay: pageStatus === PageStatus.LOADING,
      rowSelection: rowStudentsInscribeSelection
    },
    muiCircularProgressProps: {
      Component: <OnlyLoaderComponent />
    },
    localization: MRT_Localization_ES,
    muiTableProps: {
      sx: {
        fontFamily: theme.fonts.texts

      }
    }
  })
  // ==================== TABLE STUDENTS  ===========

  return (
    <div className='container'>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTableNewStyled maxheight='98%'>
        <MaterialReactTable table={tableStudents} />
      </ContainerTableNewStyled>
      {viewModal && <ModalCustom
        title={'Selecciona el  alumno a inscribir'}
        closeButton={modalStatus === PageStatus.SUCCESS}
        width='80%'
        openOrClose={openOrClose}
        statusPageModal={modalStatus}
        refreshAction={() => { }}
        message={errorMessage}
        customButtons={true}
      >
        <MaterialReactTable table={tableStudentInscribe} />
        <ContainerButton gap='1rem' justify='end'>
          <Button top='10px' onClick={() => inscribeMasiveStudents()}>Aceptar</Button>
        </ContainerButton>
      </ModalCustom>}

      {viewModalRegister && <ModalCustom
        title={'Seleccionar el grado del  alumno a inscribir'}
        closeButton={modalStatus === PageStatus.SUCCESS}
        width='85%'
        openOrClose={openOrCloseRegister}
        statusPageModal={modalStatus}
        refreshAction={() => { }}
        footer={<></>}
        message={errorMessage}
      >
        <Inscription students={studentSelect} action={registerStudent} />
      </ModalCustom>}

      {viewModalMattersMasive && <ModalCustom
        title={'Subir calificaciones'}
        closeButton={modalStatus === PageStatus.SUCCESS}
        width='40%'
        openOrClose={openOrCloseMattersMassive}
        statusPageModal={modalStatus}
        refreshAction={() => { }}
        footer={<></>}
        message={errorMessage}
      >
        <ContainerModalMasive>
          <section className='container-layout'>
            <span className='subtitle-section'><FaDownload /> Exportar datos | Descargar  alumnos </span>
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

            <a className='cont-file-download' onClick={onDownloadMatters} target='_blank' rel="noreferrer">
              <span>Descargar alumnos</span>
              <FaDownload className='icon' />

            </a>
          </section>
          <section className='container-layout'>
            <span className='subtitle-section'><FaUpload /> Importar datos | Subir calificaciones</span>
            <form onSubmit={handleSubmit(onSendFileRatings)}>
              <div className='item'>
                <InputGroup>
                  {/* <InputLabel htmlFor='clave'>Archivo de carga</InputLabel> */}
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
                          toast.error('Por favor, selecciona un archivo en formato Excel')
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
                  Enviar
                </Button>
              </div>

            </form>
          </section>
        </ContainerModalMasive>

      </ModalCustom>}

      {
        viewTableModalMattersMasive && <ModalCustom
          title={'Subir calificaciones'}
          subtitle='Valida las calificaciones antes de subir'
          closeButton={modalStatus === PageStatus.SUCCESS}
          width='95%'
          openOrClose={readOtherFileOpen}
          statusPageModal={modalStatus}
          refreshAction={questionPeriodName}
          footer={<>
            <ButtonSecondary onClick={readOtherFileOpen}>Cancelar</ButtonSecondary>
            <Button left='10px' onClick={openOrClosePeriodName}>Subir</Button>
          </>}
          message={errorMessage}
        >
          <MaterialReactTable table={tableRatings} />
        </ModalCustom>}

      {
        viewModalPeriodoName && <ModalConfirm
          handleConfirm={uploadRatings}
          title='Selecciona un período'
          height='300px'
          handleClose={openOrClosePeriodName}
          type={typeModal.NORMAL}
        >
          <span>
            Si ya existe una calificación para el alumno,
            no guardara la calificación, para editar la calificación debe ir al detalle de cada alumno</span>
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
        </ModalConfirm>}
    </div>

  )
}

CycleStudentsView.propTypes = {
  cycle: PropTypes.object.isRequired
}

export default CycleStudentsView
