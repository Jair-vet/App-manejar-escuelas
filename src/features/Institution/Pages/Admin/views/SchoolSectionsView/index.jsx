import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'

// import Swal from 'sweetalert2'

import { ChildSectionName, ContainerSections, DeleteSectionContainer, SectionStyled } from '../../../../Components/Sections/SectionsStyled'
import { AddSectionStyled, ContainerDetailMatter, ContainerMatters } from '../../AdminStyled'
import TableBodySections from '../../Components/SectionsBodyTable'
import useSectionsSchoolHandling from '../../hooks/useSectionsSchool'

import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import { changeTitle } from '@/Redux/globalSlice'
import { ButtonSecondary, StatusButton } from '@/common/Components/Buttons'
import Button from '@/common/Components/Buttons/ButtonStyled'
import TextButton from '@/common/Components/Buttons/ButtonText/ButtonText'
import { FormGlobal, Input, InputErrorStyled, InputGroup, InputLabel, InputWithoutBorder, Select } from '@/common/Components/Form'
import { Checkbox } from '@/common/Components/Form/checkbox'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import ModalCustom from '@/common/Components/Modals'
import Search from '@/common/Components/Search'
import TableCustom from '@/common/Components/Tables/TableCustom'
import Tabs from '@/common/Components/Tabs'
import { InfoText } from '@/common/Global-styles/Titles'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import { ContainerFields } from '@/features/Dashboard/Pages/SchoolDetail/SchoolDetailStyled'
import useCreateCycleHandling from '@/features/Institution/hooks/useCreateCycle'
import useCreateSectionsHandling from '@/features/Institution/hooks/useCreateSections'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'

const SchoolSectionsView = ({ school }) => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setmodalStatus] = useState(PageStatus.SUCCESS)
  const [modalStatusAddMatter, setmodalAddMatterStatus] = useState(PageStatus.SUCCESS)

  const idSchool = localStorage.getItem(lsSchoolId)

  // ============ SCREEN STATUS ===============

  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewModalCycle, openOrClose: openOrCloseCycleModal } = useOpenModalHandling()
  const { viewModal: viewModalOtherPeriodic, openOrClose: openOrCloseModalOtherPeriodic } = useOpenModalHandling()
  const { viewModal: viewModalAddMatter, openOrClose: openOrCloseModalAddMatter } = useOpenModalHandling()

  const { items: sectionsLoad, loadItems: loadSections } = useSectionsSchoolHandling()
  const [isSearch, setIsSearch] = useState(false)
  const [sectionsSearch, setSectionsSearch] = useState([])
  const [idSelectedSection, setIdSelectedSection] = useState(0)

  const dispatch = useDispatch()
  // ============ NEW SECTION   ===============
  const { register, formState: { errors }, setValue, getValues, setError, reset, watch } = useForm()
  const watchDescriptionPeriodic = watch(`academic_term-${idSelectedSection}`)
  const watchTypeOperation = watch('type_operation')

  const formMethods = { register, errors, setValue, getValues, setError, reset }
  const {
    createOrEditSections, editSection, isEdit, initHook,
    sections, handleKeyPress, removeLevel,
    deleteSection, addSection, addLevel,
    viewEditFieldLevel, editLevel,
    handleKeyPressSaveNewNameLevel,
    groupsSelected,
    selectedGroupsAndMattersByLevel,
    removeGroup,
    setIsAddGroup,
    isAddGroup,
    handleKeyPressSaveNewNameGroup,
    viewEditGroup,
    idEditItem,
    setIdEditItem,
    handleKeyEditGroup,
    setGroupsSelected,
    selectLevelKey,
    setKeySelectLevel,
    handleKeyPressSaveNewNameMatter,
    mattersSelected,
    // viewEdiMatter,
    // handleKeyEditMatter,
    removeMatter,
    descriptionsPeriodics,
    setDescriptionsPeriodics,
    // isEditMatter,
    // setIsEditMatter,
    matterSelected,
    setMatterSelected,
    addAspectMatter,
    addMatter,
    removeAspect,
    createRegisterNewMatter,
    handleSeparateMatterCheckBox,
    isSeparatedMatter
    // savePaymentsDataInSection
  } = useCreateSectionsHandling(formMethods)
  const {
    createCycle
  } = useCreateCycleHandling(formMethods, handleErrors)
  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const [textInfoTypeOperation, setTextInfoTypeOperation] = useState('')

  const [tabs] = useState([
    { label: 'Grupos', isSelect: true },
    { label: 'Materias', isSelect: false }])
  // ============ NEW SECTION ===============

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Administración / secciones'
      }))
      setPageStatus(PageStatus.LOADING)
      const response = await loadSections(school.id, 1)
      if (response.length === 0) {
        if (!viewModal) {
          openOrClose()
        }
        // openOrClose()
        await initHook()
      }

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

  useEffect(() => {
    if (watchDescriptionPeriodic && watchDescriptionPeriodic === 'Otro (especifique)') {
      openOrCloseModalOtherPeriodic()
    }
  }, [watchDescriptionPeriodic])

  useEffect(() => {
    if (watchTypeOperation && watchTypeOperation === 'average') {
      setTextInfoTypeOperation('Todas las calificaciones que se suban de esta materia, se promediarán')
    } else if (watchTypeOperation && watchTypeOperation === 'sum') {
      setTextInfoTypeOperation('Todas las calificaciones que se suban de esta materia, solo se sumarán')
    }
  }, [watchTypeOperation])
  // ============ INIT DATA LOADING ===============
  const showAlert = async (data) => {
    if (isEdit) {
      await onSubmit(false)
      return
    }
    const cycles = await SchoolsCyclesService.getCycles(idSchool, 1, [1, 2, 3])
    if (cycles.length === 0) {
      openOrClose()
      openOrCloseCycleModal()
    } else {
      await onSubmit(false)
    }
  }
  const onSubmit = async (isCreateCycle) => {
    try {
      setmodalStatus(PageStatus.LOADING)
      await createOrEditSections(idSelectedSection, isCreateCycle)
      if (isCreateCycle) {
        const start = getValues('start')
        const end = getValues('end')
        await createCycle(start, end, false, true)
      }
      loadSections(school.id, 1)
      initHook()
      setmodalStatus(PageStatus.SUCCESS)
      if (isCreateCycle) {
        openOrCloseCycleModal()
      } else {
        openOrClose()
      }
    } catch (e) {
      handleErrors(e)
      setmodalStatus(PageStatus.SUCCESS)
      if (isCreateCycle) {
        openOrCloseCycleModal()
        openOrClose()
      }
    }
  }
  const edit = async (item) => {
    try {
      setmodalStatus(PageStatus.LOADING)
      openOrClose()
      const idSchool = school.id
      setIdSelectedSection(item.id)
      await editSection(idSchool, item.id)
      // setKeySelectLevel('')
      // setGroupsSelected([])
      // SET VALUE NOMBRE DE  PERIODO ACADEMIDO SI NOO ESTA EN LOS DEFAULT

      setmodalStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      // debugger
      setmodalStatus(PageStatus.ERROR)
      // openOrClose()
    }
  }
  const search = async (target) => {
    setIsSearch(true)
    try {
      setPageStatus(PageStatus.LOADING)
      const idSchool = school.id
      const response = await SchoolsSectionsService.searchSections(idSchool, target.target.value)
      setSectionsSearch(response)
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }
  const openAndCreate = async () => {
    initHook()
    openOrClose()
    setGroupsSelected([])
    setKeySelectLevel('')
    setIdSelectedSection(0)
  }

  const onSelectTab = (index, items) => {
    setIdEditItem('')
    changedSelectTab(index, items)
  }
  const saveOtherDescriptionPeriodic = () => {
    const currentItems = descriptionsPeriodics
    const valueDescriptionPeriodic = getValues('name_other_periodic')
    if (valueDescriptionPeriodic === '') {
      setError('name_other_periodic', { type: 'manual', message: 'El campo no puede ir vacio' })
      return
    }
    currentItems.push(valueDescriptionPeriodic)
    setDescriptionsPeriodics(currentItems)
    setValue(`academic_term-${idSelectedSection}`, valueDescriptionPeriodic)
    openOrCloseModalOtherPeriodic()
  }
  const openDetailMatter = async (matter) => {
    try {
      setmodalAddMatterStatus(PageStatus.LOADING)
      openOrCloseModalAddMatter()
      if (matter !== undefined) {
        // const response = await SchoolsMattersService.getAspectsMatters(idSchool, matter.id)
        setMatterSelected(matter)
        setValue('nameMatter', matter.name)
        setValue('type_operation', matter.type_operation)
        handleSeparateMatterCheckBox(matter.separate_on_report_card)
      } else {
        createRegisterNewMatter()
      }
      setmodalAddMatterStatus(PageStatus.SUCCESS)
      // openOrCloseModalAddMatter()
    } catch (e) {
      openOrCloseModalAddMatter()
      setmodalAddMatterStatus(PageStatus.SUCCESS)
      toast.error(e.message)
    }
  }

  const addNewAspectMatter = (event) => {
    if (event.key === 'Enter') {
      addAspectMatter()
    }
  }
  const saveMatter = () => {
    const name = getValues('nameMatter')
    const typeOperation = getValues('type_operation')
    if (name === '') {
      setError('nameMatter', { type: 'manual', message: 'Agregar el nombre de la materia' })
      return
    }
    addMatter(name, typeOperation)
    openOrCloseModalAddMatter()
  }

  // const onCheck = () => {
  //   setIsActive(!isActive)
  // }

  return (
    <div className='view-detail-users-schools-container'>
      <Search actionButton={openAndCreate} searchAction={search} />
      <TableCustom
        statusTable={pageStatus}
        withContainerWhite={false}
        totalItems={3}
        heightTable={'calc(100% - 80px)'}
        refreshAction={init}
        titles={['Nombre de Sección', 'Acciones']}>
        <TableBodySections
          edit={edit}
          items={isSearch ? sectionsSearch : sectionsLoad}
          message={errorMessage}
          tableStatus={PageStatus.SUCCESS} >

        </TableBodySections>
      </TableCustom>
      {viewModal &&
        <ModalCustom overflowContent='none' title={isEdit ? 'Editar Sección' : sectionsLoad.length === 0 ? 'Crea tus secciones' : 'Crear Sección'}
          closeButton={modalStatus !== PageStatus.LOADING}
          width='80%'
          openOrClose={openOrClose}
          statusPageModal={modalStatus}
          refreshAction={() => { }}
          footer={<>
            <ButtonSecondary size='medium'
              color='white'
              type='button'
              status={StatusButton.Enabled}
              onClick={openOrClose}>Cerrar</ButtonSecondary>
            <Button
              size='medium'
              left='10px'
              color='white'
              type='button'
              status={StatusButton.Enabled}
              onClick={showAlert}
            >
              Guardar
            </Button>

          </>}
          message={errorMessage} >
          <AddSectionStyled>
            <form>
              {modalStatus === PageStatus.LOADING
                ? <OnlyLoaderComponent></ OnlyLoaderComponent>

                : <ContainerSections>
                  <div className='sections-content'>

                    {sections && [...sections.keys()].map((key, index) => {
                      const section = sections.get(key)
                      const levels = section.levels

                      return (
                        <>
                          <SectionStyled key={key}>
                            {!isEdit && <DeleteSectionContainer onClick={() => deleteSection(key)}>
                              <span className='button-text'>Eliminar sección</span>
                              <IoCloseSharp className='icon'>
                              </IoCloseSharp>
                            </DeleteSectionContainer>}
                            <span className='items'>
                              <div className="item">
                                <InputGroup>
                                  <InputLabel placeholder='Ejemplo: Primaria' htmlFor={`name-${key}`}>Nombre de sección</InputLabel>
                                  <Input
                                    maxLength={80}
                                    {...register(`name-${key}`, { required: { value: true, message: 'El nombre es requerido' } })}
                                    aria-invalid={errors[`name-${key}`] ? 'true' : 'false'}
                                  />
                                  {errors[`name-${key}`] && (
                                    <InputErrorStyled>
                                      {errors[`name-${key}`].message}
                                    </InputErrorStyled>
                                  )}
                                </InputGroup>
                                <InputGroup>
                                  <InputLabel placeholder='Ejemplo: 10' htmlFor={`max-${key}`}>Maximo de calificación</InputLabel>
                                  <Input
                                    maxLength={80}
                                    type='number'
                                    disabled={isEdit}
                                    {...register(`max-${key}`, { required: { value: true, message: 'El campo es requerido' } })}
                                    aria-invalid={errors[`max-${key}`] ? 'true' : 'false'}
                                  />
                                  {errors[`max-${key}`] && (
                                    <InputErrorStyled>
                                      {errors[`max-${key}`].message}
                                    </InputErrorStyled>
                                  )}
                                </InputGroup>
                                <InputGroup>
                                  <InputLabel placeholder='Seleccion un elemento' htmlFor={`academic_term-${key}`}>Período académico</InputLabel>
                                  <Select
                                    {...register(`academic_term-${key}`, { required: 'El campo es requerido' })}
                                    aria-invalid={errors[`academic_term-${key}`] ? 'true' : 'false'}
                                  >
                                    {
                                      descriptionsPeriodics && descriptionsPeriodics.map((value, index) => {
                                        return (<option className='select-option' value={value} key={index}>{value}</option>)
                                      })
                                    }
                                  </Select>
                                  {errors[`academic_term-${key}`] && (
                                    <InputErrorStyled>
                                      {errors[`academic_term-${key}`].message}
                                    </InputErrorStyled>
                                  )}
                                </InputGroup>
                                <InputGroup>
                                  <InputLabel placeholder='Ejemplo: 3' htmlFor={`academic_term_count-${key}`}>Cantidad de períodos académicos</InputLabel>
                                  <Input
                                    maxLength={1}
                                    type='number'
                                    // disabled={isEdit}
                                    {...register(`academic_term_count-${key}`, { required: { value: true, message: 'El campo es requerido' } })}
                                    aria-invalid={errors[`academic_term_count-${key}`] ? 'true' : 'false'}
                                  />
                                  {errors[`academic_term_count-${key}`] && (
                                    <InputErrorStyled>
                                      {errors[`academic_term_count-${key}`].message}
                                    </InputErrorStyled>
                                  )}
                                </InputGroup>
                                <InputGroup>
                                  <InputLabel htmlFor={`level-${key}`}>Nuevo grado</InputLabel>
                                  <div className='cont-input-level'>
                                    <Input
                                      type='number'
                                      placeholder='Ejemplo: Primer Grado'
                                      onKeyDown={(event) => handleKeyPress(event, key)}
                                      {...register(`level-${key}`, { required: { value: false, message: '' } })}
                                      aria-invalid={errors[`level-${key}`] ? 'true' : 'false'}
                                    />
                                    <div className='cont-icon-done' onClick={() => addLevel(key)}>
                                      <AiOutlinePlus className='icon-done'></AiOutlinePlus>
                                    </div>
                                  </div>
                                  <InfoText>
                                    Preciona ENTER para agregar nuevo grado
                                  </InfoText>

                                  {errors[`level-${key}`] && (
                                    <InputErrorStyled>
                                      {errors[`level-${key}`].message}
                                    </InputErrorStyled>
                                  )}
                                </InputGroup>
                                {/* <TextButton onClick={() => editPaysSettingsSection(section)}>Configurar precios de mensualidades</TextButton> */}
                              </div>
                              <div className="item">
                                <span className='title-container'>Grados de sección</span>
                                <div className="contaner-levels">
                                  {levels && levels.map((value, index) => {
                                    const keyFormat = key + '_' + index
                                    if (keyFormat === editLevel) {
                                      return (<>
                                        <InputWithoutBorder key={index} autoFocus
                                          {...register(`${editLevel}`, { required: { value: true, message: 'El nombre es requerido' } })}
                                          onKeyDown={(event) => handleKeyPressSaveNewNameLevel(event)}
                                        ></InputWithoutBorder>
                                        <InfoText>
                                          Preciona ENTER para guardar nuevo nombre
                                        </InfoText>
                                      </>)
                                    } else {
                                      return (<ChildSectionName key={index} className='level' onClick={() => selectedGroupsAndMattersByLevel(key, index)}>
                                        <div className='element'>
                                          <span className={selectLevelKey === keyFormat ? 'label select' : 'label'}>{value.name}</span>
                                          <div className='actions'>
                                            {value.id === undefined
                                              ? <IoCloseSharp className='icon' onClick={() => removeLevel(key, index)}>
                                              </IoCloseSharp>
                                              : <MdEdit className='icon icon-edit' onClick={() => viewEditFieldLevel(key, index)}></MdEdit>}

                                          </div>
                                        </div>
                                      </ChildSectionName>)
                                    }
                                  })}
                                </div>
                                {/* Aquí puedes renderizar otros elementos relacionados con la sección si es necesario */}
                              </div>
                            </span>

                          </SectionStyled>
                          {isEdit === false ? <TextButton className='add-section' onClick={() => addSection(key)}>Agregar sección</TextButton> : <></>}
                        </>

                      )
                    })}
                  </div>
                  <div className='groups-content'>
                    <div className='groups'>
                      <Tabs items={tabs} onSelect={onSelectTab} />
                      {selectTab === 0
                        ? (<>
                          {
                            groupsSelected.length === 0
                              ? (<>
                                <InfoText>
                                  Selecciona un grado para ver sus grupos
                                </InfoText></>)
                              : groupsSelected && groupsSelected.map((key, index) => {
                                if (idEditItem === index) {
                                  return (<>
                                    <ChildSectionName key={key}>
                                      <InputWithoutBorder autoFocus
                                        textTransform='uppercase'
                                        {...register('edit-group', {
                                          required: { value: true, message: 'El nombre es requerido' }
                                        })}
                                        onKeyDown={(event) => handleKeyEditGroup(event, index)}
                                      ></InputWithoutBorder>

                                    </ChildSectionName>
                                    {errors['edit-group'] && (
                                      <InputErrorStyled>
                                        {errors['edit-group'].message}
                                      </InputErrorStyled>
                                    )}
                                    <InfoText>
                                      Preciona ENTER para guardar nuevo nombre
                                    </InfoText>

                                  </>)
                                }
                                return (<> <ChildSectionName key={index}>
                                  <div className='element'>
                                    <span className='label'>{groupsSelected[index].name}</span>
                                    <div className='actions'>
                                      <MdEdit className='icon edit' onClick={() => viewEditGroup(index)}></MdEdit>
                                      {!isEdit && <IoCloseSharp className='icon delete' onClick={() => removeGroup(index)}>
                                      </IoCloseSharp>}
                                    </div>
                                  </div>

                                </ChildSectionName>

                                </>
                                )
                              })
                          }
                          {isAddGroup
                            ? (<> <InputWithoutBorder autoFocus
                              textTransform='uppercase'
                              {...register('name-group', {
                                required: { value: true, message: 'El nombre es requerido' }
                              })}
                              onKeyDown={(event) => handleKeyPressSaveNewNameGroup(event)}
                            ></InputWithoutBorder>
                              {errors['name-group'] && (
                                <InputErrorStyled>
                                  {errors['name-group'].message}
                                </InputErrorStyled>
                              )}
                              <InfoText>
                                Preciona ENTER para guardar nuevo nombre
                              </InfoText>
                            </>)
                            : <></>}
                          {groupsSelected.length > 0 && <TextButton className='add-section' onClick={() => { setIsAddGroup(true); setIdEditItem('') }}>Agregar grupo</TextButton>}</>)
                        : <>
                          {
                            mattersSelected.length === 0
                              ? (<>
                                <InfoText>
                                  Selecciona un grado para ver sus materias
                                </InfoText></>)
                              : (<ContainerMatters> {mattersSelected && mattersSelected.map((key, index) => {
                                  return (<> <ChildSectionName key={index}>
                                    <div className='element'>
                                      <span className='label'>{mattersSelected[index].name}</span>
                                      <div className='actions'>
                                        <MdEdit className='icon edit' onClick={() => openDetailMatter(mattersSelected[index])}></MdEdit>
                                        {!isEdit && <IoCloseSharp className='icon delete' onClick={() => removeMatter(index)}>
                                        </IoCloseSharp>}
                                      </div>
                                    </div>

                                  </ChildSectionName>

                                  </>
                                  )
                                })}</ContainerMatters>
                                )
                          }
                          {isAddGroup
                            ? (<> <InputWithoutBorder autoFocus
                              textTransform='capitalize'
                              {...register('name-matter', {
                                required: { value: true, message: 'El nombre es requerido' }
                              })}
                              onKeyDown={(event) => handleKeyPressSaveNewNameMatter(event)}
                            ></InputWithoutBorder>
                              {errors['name-matter'] && (
                                <InputErrorStyled>
                                  {errors['name-matter'].message}
                                </InputErrorStyled>
                              )}
                              <InfoText>
                                Preciona ENTER para guardar nueva materia
                              </InfoText>
                            </>)
                            : <></>}
                          {selectLevelKey !== '' && <TextButton className='add-section' onClick={() => openDetailMatter()}>Agregar materia</TextButton>}
                        </>}

                    </div>
                  </div>
                </ContainerSections>
              }
            </form>

          </AddSectionStyled>
        </ModalCustom>
      }
      {
        viewModalCycle &&
        <ModalCustom title={isEdit ? 'Editar ciclo escolar automaticamente' : 'Crear ciclo escolar automaticamente'}
          closeButton={modalStatus === PageStatus.SUCCESS}
          width='80%'
          openOrClose={openOrCloseCycleModal}
          statusPageModal={modalStatus}
          refreshAction={isEdit ? edit : () => { }}
          footer={<>
            <ButtonSecondary size='medium'
              color='white'
              type='button'
              status={StatusButton.Enabled}
              onClick={openOrCloseCycleModal}>Cerrar</ButtonSecondary>
            <Button
              size='medium'
              left='10px'
              color='white'
              type='button'
              status={StatusButton.Enabled}
              onClick={() => onSubmit(true)}
            >
              Guardar
            </Button>

          </>}
          message={errorMessage} >
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
          </>
        </ModalCustom>
      }
      {
        viewModalOtherPeriodic &&
        <ModalCustom title={'Descripción de período académico'}
          closeButton={modalStatus === PageStatus.SUCCESS}
          width='50%'
          openOrClose={openOrCloseModalOtherPeriodic}
          statusPageModal={modalStatus}
          refreshAction={() => { }}
          footer={<>
            <ButtonSecondary size='medium'
              color='white'
              type='button'
              status={StatusButton.Enabled}
              onClick={openOrCloseModalOtherPeriodic}>Cerrar</ButtonSecondary>
            <Button
              size='medium'
              left='10px'
              color='white'
              type='button'
              status={StatusButton.Enabled}
              onClick={() => saveOtherDescriptionPeriodic()}
            >
              Aceptar
            </Button>

          </>}
          message={errorMessage} >
          <>
            <InputGroup>
              <InputLabel htmlFor="name_other_periodic">Descripción de período académico</InputLabel>
              <Input
                type='text'
                maxLength={40}
                {...register('name_other_periodic', {
                  required: {
                    value: true,
                    message: 'El campo es requerido'
                  }
                })}
                aria-invalid={errors.name_other_periodic ? 'true' : 'false'}
              />
              {
                <InputErrorStyled>
                  errors.name_other_periodic
                </InputErrorStyled> &&
                <InputErrorStyled>
                  {errors.name_other_periodic?.message}
                </InputErrorStyled>
              }
            </InputGroup>
          </>
        </ModalCustom>
      }

      {viewModalAddMatter && <ModalCustom title={matterSelected !== undefined ? `Editar materia | ${matterSelected.name}` : 'Agregar materia'}
        closeButton={modalStatusAddMatter === PageStatus.SUCCESS}
        width='70%'
        openOrClose={openOrCloseModalAddMatter}
        statusPageModal={modalStatusAddMatter}
        refreshAction={() => { }}
        footer={<>
          <ButtonSecondary size='medium'
            color='white'
            type='button'
            status={StatusButton.Enabled}
            onClick={openOrCloseModalAddMatter}>Cerrar</ButtonSecondary>
          <Button
            size='medium'
            left='10px'
            color='white'
            type='button'
            status={StatusButton.Enabled}
            onClick={() => saveMatter()}
          >
            Aceptar
          </Button>
        </>}
        message={errorMessage} >
        <ContainerDetailMatter>
          <div className='name-matter-inputs'>
            <InputGroup>
              <InputLabel htmlFor={'nameMatter'}>Nombre de materia:</InputLabel>
              <Input
                placeholder='Ejemplo: Ingles'
                maxLength={80}
                type='text'
                {...register('nameMatter', { required: { value: true, message: 'El campo es requerido' } })}
                aria-invalid={errors.nameMatter ? 'true' : 'false'}
              />
              {errors.nameMatter && (
                <InputErrorStyled>
                  {errors.nameMatter.message}
                </InputErrorStyled>
              )}
            </InputGroup>
            <InputGroup>
              <InputLabel htmlFor={'description'}>Agrega aspecto a calificar(opcional):</InputLabel>
              <Input
                placeholder='Ejemplo: Speaking'
                maxLength={80}
                onKeyDown={(event) => addNewAspectMatter(event)}
                type='text'
                {...register('description', { required: { value: false, message: 'El campo es requerido' } })}
                aria-invalid={errors.description ? 'true' : 'false'}
              />
              <InfoText>
                Preciona ENTER para agregar aspecto
              </InfoText>
              {errors.description && (
                <InputErrorStyled>
                  {errors.description.message}
                </InputErrorStyled>
              )}
            </InputGroup>
            <InputGroup>
              <InputLabel placeholder='Seleccion un elemento' htmlFor='type_operation'>Tipo de operación</InputLabel>
              <Select
                {...register('type_operation', { required: 'El campo es requerido' })}
              >
                <option className='select-option' value='average' >Promediar</option>
                <option className='select-option' value='sum' >Sumar</option>
              </Select>
              {errors.type_operation && (
                <InputErrorStyled>
                  {errors.type_operation.message}
                </InputErrorStyled>
              )}
              <InfoText>{textInfoTypeOperation}</InfoText>
            </InputGroup>
            <div className='container-checkbox-matter'><Checkbox
              label='¿Separar materia en la boleta?'
              value={isSeparatedMatter}
              checked={isSeparatedMatter}
              onChange={({ target }) => handleSeparateMatterCheckBox(!isSeparatedMatter)}
            /></div>
          </div>
          <div className='matter-aspects'>
            <span>Aspectos de materia(opcional)</span>
            <div className="items">
              {
                matterSelected === undefined
                  ? <span>Agrega aspectos a calificar de la materia</span>
                  : <>
                    {matterSelected?.aspects?.map((aspect, index) => {
                      return (
                        <ChildSectionName key={index}>
                          <div className='element'>
                            <span className='label'>{aspect.description}</span>
                            <div className='actions'>
                              {/* <MdEdit className='icon edit' onClick={() => viewEdiMatter()}></MdEdit> */}
                              {<IoCloseSharp className='icon delete' onClick={() => removeAspect(index)}>
                              </IoCloseSharp>}
                            </div>
                          </div>

                        </ChildSectionName>
                      )
                    })}
                  </>
              }
            </div>

          </div>
        </ContainerDetailMatter>

      </ModalCustom>

      }

    </div >

  )
}
SchoolSectionsView.propTypes = {
  school: PropTypes.instanceOf(SchoolModel).isRequired
}
export default SchoolSectionsView
