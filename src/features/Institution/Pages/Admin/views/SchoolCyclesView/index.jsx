import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import TableBodyCycles from '../../Components/CyclesBodyTable'
import TableItemsCreateCycle from '../../Components/TablesCycles/TableMattersAndGroupsSelected'
import useCyclesSchoolHandling from '../../hooks/useCyclesSchool'

import { changeTitle } from '@/Redux/globalSlice'
import Button, { ButtonSecondary, StatusButton } from '@/common/Components/Buttons'
import { FormGlobal, Input, InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
import { Checkbox } from '@/common/Components/Form/checkbox'
import LoaderComponent from '@/common/Components/LoaderComponent'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import ModalConfirm, { typeModal } from '@/common/Components/ModalConfirm'
import ModalCustom from '@/common/Components/Modals'
import Search from '@/common/Components/Search'
import TableCustom from '@/common/Components/Tables/TableCustom'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import { ContainerFields } from '@/features/Dashboard/Pages/SchoolDetail/SchoolDetailStyled'
import useCreateCycleHandling from '@/features/Institution/hooks/useCreateCycle'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsGroupsService from '@/services/schoolsGroups.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'

const SchoolCyclesView = ({ school }) => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setmodalStatus] = useState(PageStatus.SUCCESS)
  // ============ SCREEN STATUS ===============
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewModalConfirmCycle,
    openOrClose: openOrCloseViewModalConfirmCycle } = useOpenModalHandling()

  const { register, formState: { errors }, setError, getValues, reset, watch } = useForm()
  const sectionValueWatch = watch('section')
  const formMethods = { setError }
  const {
    createCycle,
    getGroups,
    groupsFormat,
    selectOrDeselectGroup,
    totalGroupsSelected,
    getMatters,
    matters,
    selectOrDeselectMatter,
    groupsView,
    setMattersView,
    setGroupsView,
    changeSelectViewGroups,
    changeSelectViewMatters,
    mattersView,
    totalMattersSelected,
    selectOrDeselectGroupAllSection,
    valueAllCheckBox,
    selectOrDeselectMattersAllSection
  } = useCreateCycleHandling(formMethods, handleErrors)

  const { cycles, load } = useCyclesSchoolHandling()

  const [isSearch, setIsSearch] = useState([])
  const dispatch = useDispatch()
  // const levelsStore = useSelector((state) => state.levels)

  const { selectTab, changedSelectTab } = useTabSelectedHandling()
  const [tabs] = useState([
    { label: 'Grados', isSelect: false },
    { label: 'Materias', isSelect: false }
  ])
  const [sections, setSections] = useState([])
  const idSchool = localStorage.getItem(lsSchoolId)
  const [messageModalActionCycle, setMessageModalActionCycle] = useState([])
  const [cycleSelectChange, setCycleSelectChange] = useState(undefined)

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Administración / ciclos escolares',
        showArrow: false
      }))
      setPageStatus(PageStatus.LOADING)
      load(school.id, 1)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage, {
        style: {
          fontFamily: 'Montserrat',
          fontSize: '17px',
          fontWeight: 'bold'
        }
      })
      clearErrorMessage()
    }
  }, [errorMessage])
  // ============ INIT DATA LOADING ===============
  useEffect(() => {
    // Realiza las acciones que desees cuando el campo cambie
    if (sectionValueWatch && sectionValueWatch !== '') {
      if (selectTab === 0) {
        changeSelectViewGroups(sectionValueWatch)
      } else {
        changeSelectViewMatters(sectionValueWatch)
      }
    } else {
      setGroupsView([])
      setMattersView([])
    }
  }, [sectionValueWatch])

  const create = async () => {
    setmodalStatus(PageStatus.LOADING)
    openOrClose()
    const response = await SchoolsGroupsService.getGroups(idSchool, 1)
    const responseSections = await SchoolsSectionsService.getSections(idSchool, 1)
    setSections(responseSections)
    await getGroups(response, true)
    await getMatters()
    reset()
    changedSelectTab(0, tabs)
    setmodalStatus(PageStatus.SUCCESS)
  }
  const edit = (item) => {
  }

  const sendData = async () => {
    try {
      setmodalStatus(PageStatus.LOADING)
      const start = getValues('start')
      const end = getValues('end')

      if (totalGroupsSelected === 0) {
        toast.error('Selecciona minimo un grupo para poder crear el ciclo escolar')
        // throw new Error(
        //   'Selecciona minimo un grupo para poder crear el ciclo escolar'
        // )
        setmodalStatus(PageStatus.SUCCESS)
        return
      }
      if (totalMattersSelected === 0) {
        toast.error('Selecciona minimo una materia para poder crear el ciclo escolar')
        // throw new Error(
        //   'Selecciona minimo una materia para poder crear el ciclo escolar'
        // )
        setmodalStatus(PageStatus.SUCCESS)
        return
      }
      await createCycle(start, end, false)
      toast.success('Ciclo escolar creado correctamente')
      load(school.id, 1)
      openOrClose()
      setmodalStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setmodalStatus(PageStatus.SUCCESS)
    }
  }
  const onSelectTab = async (index, tabs) => {
    changedSelectTab(index, tabs)
    if (index === 0) {
      changeSelectViewGroups(sectionValueWatch)
    } else {
      changeSelectViewMatters(sectionValueWatch)
    }
  }

  const searchUsers = async (target) => {
    setIsSearch(true)
  }
  const activeCycle = async (item) => {
    try {
      setCycleSelectChange(item)
      if (item.status === 1 || item.status === 2) {
        const description = 'El ciclo se cambiara a concluido y este cambio no es reversible'
        setMessageModalActionCycle(description)
        // Swal.fire({
        //   fontFamily: 'Montserrat", sans-serif',
        //   title: '¿Quieres cambiar el estatus del ciclo escolar?',
        //   text: messageModalActionCycle,
        //   icon: 'question',
        //   showCancelButton: true,
        //   confirmButtonText: 'Sí, Activar',
        //   cancelButtonText: 'No, Salir',
        //   customClass: {
        //     container: 'my-swal-container',
        //     title: 'my-swal-title custom-font',
        //     text: 'my-swal-text custom-font',
        //     confirmButton: 'my-swal-confirm-button',
        //     cancelButton: 'my-swal-cancel-button',
        //     icon: 'custom-icon-color'
        //   }
        // }).then(async (result) => {
        //   if (result.isConfirmed) {
        //     await SchoolsCyclesService.activeCycle(idSchool, item.id)
        //     toast.success('Ciclo activado')
        //     await init()
        //   }
        // })
      } else if (item.status === 1) {
        const description = 'El ciclo se cambiara a activo, y este cambio no es reversible'
        setMessageModalActionCycle(description)
      }
      openOrCloseViewModalConfirmCycle()
    } catch (e) {
      handleErrors(e)
    }
  }

  const onConfirmChangeCycle = async () => {
    try {
      if (cycleSelectChange.status === 2) {
        await SchoolsCyclesService.finishCycle(idSchool, cycleSelectChange.id)
        toast.success('Status del ciclo cambiado  a concluido')
      } else if (cycleSelectChange.status === 1) {
        await SchoolsCyclesService.activeCycle(idSchool, cycleSelectChange.id)
        toast.success('Status del ciclo cambiado a activo')
      }
      openOrCloseViewModalConfirmCycle()
      await init()
    } catch (e) {
      toast.error(e.message)
    }
  }
  const selectOrDeselectedAllGroups = async () => {
    // const currentValue = selectOrDeselectGroupAllSection()
    if (sectionValueWatch && sectionValueWatch !== '') {
      // const curentValue = valueCheckBoxAllGroups
      // setValueCheckBoxAllGroups(!curentValue)
      await selectOrDeselectGroupAllSection(sectionValueWatch)
    }
  }

  const selectOrDeselectedAllMatters = async () => {
    // const currentValue = selectOrDeselectGroupAllSection()
    if (sectionValueWatch && sectionValueWatch !== '') {
      // const curentValue = valueCheckBoxAllGroups
      // setValueCheckBoxAllGroups(!curentValue)
      await selectOrDeselectMattersAllSection(sectionValueWatch)
    }
  }

  return (
    <div className='view-detail-users-schools-container'>
      <Search actionButton={create} searchAction={searchUsers} />
      {pageStatus !== PageStatus.SUCCESS && <LoaderComponent status={pageStatus} message={errorMessage} refreshAction={() => init()} />}

      {pageStatus === PageStatus.SUCCESS &&
        <TableCustom
          statusTable={pageStatus}
          withContainerWhite={false}
          totalItems={3}
          heightTable={'calc(100% - 80px)'}
          titles={['Ciclo Escolar', 'Total de alumnos inscritos', 'Estatus', 'Acciones']}>
          <TableBodyCycles
            edit={edit}
            activeCycle={activeCycle}
            isSearch={isSearch}
            items={isSearch ? cycles : cycles} message={errorMessage}
            tableStatus={pageStatus}>
          </TableBodyCycles>
        </TableCustom>}
      {viewModal && <FormGlobal>
        <ModalCustom
          closeButton={modalStatus === PageStatus.SUCCESS}
          title={'Crear nuevo ciclo escolar'}
          openOrClose={openOrClose}
          statusPageModal={modalStatus}
          message={errorMessage}
          width='80%'
          footer={<>
            <ButtonSecondary status={StatusButton.Enabled} onClick={openOrClose}> Cerrar </ButtonSecondary>
            <Button size='medium'
              color='white'
              type='submit'
              left='10px'
              status={StatusButton.Enabled}
              onClick={sendData}
            >
              Finalizar
            </Button>
          </>}
        >
          <>
            {
              modalStatus === PageStatus.LOADING && <OnlyLoaderComponent></OnlyLoaderComponent>
            }
            {
              modalStatus === PageStatus.SUCCESS && (
                (
                  <>
                    <span>Selecciona el inicio y termino del ciclo escolar</span>
                    <FormGlobal padding={'20px'} margin='0px 0px 20px 0px' >

                      <ContainerFields>
                        <InputGroup className='item'>
                          <InputLabel htmlFor="start">Inicio de ciclo</InputLabel>

                          <Input
                            type='date'
                            {...register('start', {
                              required: {
                                value: true,
                                message: 'El campo es requerido'
                              }
                            })}
                            aria-invalid={errors.start ? 'true' : 'false'}
                          />
                          {
                            <InputErrorStyled>
                              errors.start
                            </InputErrorStyled> &&
                            <InputErrorStyled>
                              {errors.start?.message}
                            </InputErrorStyled>
                          }
                        </InputGroup>
                        <InputGroup className='item'>
                          <InputLabel htmlFor="start">Termino de ciclo</InputLabel>

                          <Input
                            type='date'
                            {...register('end', {
                              required: {
                                value: true,
                                message: 'El campo es requerido'
                              }
                            })}
                            aria-invalid={errors.end ? 'true' : 'false'}
                          />
                          {
                            <InputErrorStyled>
                              errors.end
                            </InputErrorStyled> &&
                            <InputErrorStyled>
                              {errors.end?.message}
                            </InputErrorStyled>
                          }
                        </InputGroup>
                      </ContainerFields>
                    </FormGlobal>
                    <div className='items-header-table'>
                      <InputGroup className='item'>
                        <InputLabel htmlFor="start">Filtrar por sección</InputLabel>

                        <Select
                          {...register('section', { required: 'El campo es requerido' })}
                          aria-invalid={errors.section ? 'true' : 'false'}
                        >
                          <option className='select-option' value="">Selecciona un elemento</option>
                          {
                            sections && sections.map((value) => (
                              <option key={value.id} value={value.id}>
                                {`${value.name}`}
                              </option>
                            ))}
                        </Select>
                      </InputGroup>
                      <Tabs items={tabs} onSelect={onSelectTab}> </Tabs>
                    </div>

                    {
                      selectTab === 0
                        ? <>
                          <div className="container-title-table">
                            <span className='tbl-not-data'>Selecciona los grupos del ciclo escolar</span>
                            <span className='tbl-not-data'>Grupos seleccionados <strong>{totalGroupsSelected}</strong>  de <strong>{groupsFormat.size}</strong></span>

                          </div>
                          <TableItemsCreateCycle
                            valueAllCheckBox={valueAllCheckBox}
                            totalItems={3}
                            selectAllAction={selectOrDeselectedAllGroups}
                            titles={['Grupo', 'Grado', 'Sección']}
                            heightTable='100%'
                            statusTable={modalStatus}
                            withContainerWhite={false} >
                            {groupsView.size > 0
                              ? <>
                                {groupsView && [...groupsView.keys()].map((keyGroup, index) => {
                                  const group = groupsView.get(keyGroup)
                                  return (
                                    <tr key={index} className='row'>
                                      <td className="value">
                                        <Checkbox
                                          label={group.name}
                                          value={group.value}
                                          checked={group.value}
                                          onChange={({ target }) => selectOrDeselectGroup(keyGroup, sectionValueWatch)}
                                        />
                                      </td>
                                      <td className="value">
                                        {group.name_level}
                                      </td>
                                      <td className="value">
                                        {group.name_section}
                                      </td>
                                      {/* <td className="value">
                                      </td> */}
                                    </tr>
                                  )
                                })}
                              </>
                              : <span className='tbl-not-data'>Selecciona una sección</span>
                            }
                          </TableItemsCreateCycle></>
                        : <>
                          <div className="container-title-table">
                            <span className='tbl-not-data'>Selecciona las materias del ciclo escolar</span>
                            <span className='tbl-not-data'>Materias seleccionadas <strong>{totalMattersSelected}</strong>  de <strong>{matters.size}</strong></span>
                          </div>
                          <TableItemsCreateCycle
                            totalItems={3}
                            valueAllCheckBox={valueAllCheckBox}
                            selectAllAction={selectOrDeselectedAllMatters}
                            titles={['Materia', 'Grado', 'Sección']}
                            heightTable='100%'
                            statusTable={modalStatus}
                            withContainerWhite={false} >
                            {mattersView.size > 0
                              ? <>
                                {mattersView && [...mattersView.keys()].map((keyGroup, index) => {
                                  const group = mattersView.get(keyGroup)
                                  return (
                                    <tr key={index} className='row'>
                                      <td className="value">
                                        <Checkbox
                                          label={group.name}
                                          value={group.value}
                                          checked={group.value}
                                          onChange={({ target }) => selectOrDeselectMatter(keyGroup, sectionValueWatch)}
                                        />
                                      </td>
                                      <td className="value">
                                        {group.name_level}
                                      </td>
                                      <td className="value">
                                        {group.name_section}
                                      </td>
                                      {/* <td className="value">
                                      </td> */}
                                    </tr>
                                  )
                                })}
                              </>
                              : <> <span className='tbl-not-data'>No se contraron materias, selecciona una sección</span></>
                            }
                          </TableItemsCreateCycle></>
                    }

                  </>
                )

              )
            }
          </>
        </ModalCustom>
      </FormGlobal>}

      {
        viewModalConfirmCycle && <ModalConfirm
          handleConfirm={onConfirmChangeCycle}
          title='¿Quieres cambiar el status del ciclo escolar?'
          handleClose={openOrCloseViewModalConfirmCycle}
          type={typeModal.QUESTION}
        >
          <span> {messageModalActionCycle} </span>

        </ModalConfirm>
      }
    </div>

  )
}
SchoolCyclesView.propTypes = {
  school: PropTypes.instanceOf(SchoolModel).isRequired
}
export default SchoolCyclesView
