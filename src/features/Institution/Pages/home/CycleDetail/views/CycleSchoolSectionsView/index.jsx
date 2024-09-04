import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router'

import useCycleSectionHandling from '../../../hooks/useCycleSection'

import Button, { ButtonSecondary, StatusButton } from '@/common/Components/Buttons'
import TextButton from '@/common/Components/Buttons/ButtonText/ButtonText'
import { Input, InputErrorStyled, InputGroup, InputLabel, Select } from '@/common/Components/Form'
import ModalCustom from '@/common/Components/Modals'
import TableCustom from '@/common/Components/Tables/TableCustom'
import Tabs from '@/common/Components/Tabs'
import { InfoText } from '@/common/Global-styles/Titles'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import { ChildSectionName, ContainerSections, SectionStyled } from '@/features/Institution/Components/Sections/SectionsStyled'
import { AddSectionStyled } from '@/features/Institution/Pages/Admin/AdminStyled'
import TableBodySections from '@/features/Institution/Pages/Admin/Components/SectionsBodyTable'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'

const CycleSchoolSectionsView = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setmodalStatus] = useState(PageStatus.SUCCESS)
  const [modalLevelsStatus, setModalGroupsStatus] = useState(PageStatus.SUCCESS)

  const idSchool = localStorage.getItem(lsSchoolId)
  const { id } = useParams()

  // ============ SCREEN STATUS ===============
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewAddLevel, openOrClose: openOrCloseAddLevel } = useOpenModalHandling()

  const [sections, setSections] = useState(PageStatus.SUCCESS)
  // const [isEdit, setIsEdit] = useState(false)
  const { register, formState: { errors }, setValue, getValues, setError, reset } = useForm()
  const formMethods = { register, errors, setValue, getValues, setError, reset }

  const {
    getDetail,
    sectionSelected,
    levelsSections,
    loadGroupsSection,
    groupsSelected,
    mattersSelected,
    selectLevelKey,
    selectedGroupsAndMattersByLevel
  } = useCycleSectionHandling(formMethods)
  const { changedSelectTab, selectTab } = useTabSelectedHandling()
  const [tabs] = useState([
    { label: 'Grupos', isSelect: true },
    { label: 'Materias', isSelect: false }])
  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      const response = await SchoolsSectionsService.getSectionByCycles(idSchool, id)
      setSections(response)
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

  const edit = async (section) => {
    try {
      openOrClose()
      setmodalStatus(PageStatus.LOADING)
      // setIsEdit(false)
      await getDetail(id, section.id)
      setmodalStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setmodalStatus(PageStatus.ERROR)
    }
  }

  const onSelectTab = (index, items) => {
    changedSelectTab(index, items)
  }

  const openLevels = async () => {
    openOrCloseAddLevel()
    await onlyLoadLevels()
  }
  const onlyLoadLevels = async () => {
    try {
      setModalGroupsStatus(PageStatus.LOADING)
      await loadGroupsSection()
      setModalGroupsStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setModalGroupsStatus(PageStatus.ERROR)
    }
  }

  const saveNewLevel = async () => {
    try {
      const validate = getValues('new_level')
      if (validate === '') {
        setError('new_level', { type: 'manual', message: 'Seleciona un elemento' })
      }
      setModalGroupsStatus(PageStatus.LOADING)
      await SchoolsCyclesService.editSectionCycleLevels(idSchool, id, sectionSelected.id, { new_level: validate })
      toast.success('Grado agregado correctamente')
      openOrCloseAddLevel()
      await edit()
      setModalGroupsStatus(PageStatus.SUCCESS)
      // openOrCloseAddLevel()
    } catch (e) {
      handleErrors(e)
      toast.error(e.message)
      setModalGroupsStatus(PageStatus.SUCCESS)
    }
  }

  return (<div className='view-detail-users-schools-container'>
    {/* <Search isViewInputSearch={false} /> */}

    <TableCustom
        statusTable={pageStatus}
        withContainerWhite={false}
        totalItems={3}
        heightTable={'calc(100% - 80px)'}
        refreshAction={init}
        titles={['Nombre de Sección', 'Acciones']}>
      <TableBodySections
          edit={edit}
          items={sections}
          message={errorMessage}
          tableStatus={pageStatus} >

      </TableBodySections>
    </TableCustom>
    {
      viewModal && <ModalCustom
      width='60%'
      statusPageModal={modalStatus}
      openOrClose={openOrClose}
      refreshAction={() => {}}
      footer={<>
        <ButtonSecondary size='medium'
          color='white'
          type='button'
          status={StatusButton.Enabled}
          onClick={openOrClose}>Cerrar</ButtonSecondary>
      </>}
      title={'Editar sección'}>
        <AddSectionStyled>
          <ContainerSections>
            <div className='sections-content'>
              <SectionStyled>
                <span className='items'>
                  <div className="item">
                    <InputGroup>
                      <InputLabel placeholder='Ejemplo: Primaria' htmlFor='name'>Nombre de sección</InputLabel>
                      <Input
                        maxLength={80}
                        disabled={true}
                        {...register('name', { required: { value: true, message: 'El nombre es requerido' } })}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        />
                      {errors.name && (
                      <InputErrorStyled>
                        {errors.name.message}
                      </InputErrorStyled>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <InputLabel placeholder='Ejemplo: 10' htmlFor={'maximum_rating'}>Maximo de calificación</InputLabel>
                      <Input
                        maxLength={80}
                        type='number'
                        disabled={true}
                        {...register('maximum_rating', { required: { value: true, message: 'El campo es requerido' } })}
                        aria-invalid={errors.maximum_rating ? 'true' : 'false'}
                        />
                      {errors.maximum_rating && (
                      <InputErrorStyled>
                        {errors.maximum_rating.message}
                      </InputErrorStyled>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <InputLabel htmlFor='academic_term'>Período académico</InputLabel>
                      <Input
                        type='text'
                        disabled={true}
                        // disabled={isEdit}
                        {...register('academic_term', { required: { value: true, message: 'El campo es requerido' } })}
                        aria-invalid={errors.academic_term ? 'true' : 'false'}
                        />
                      {errors.academic_term && (
                      <InputErrorStyled>
                        {errors.academic_term.message}
                      </InputErrorStyled>
                      )}
                    </InputGroup>
                    <InputGroup>
                      <InputLabel placeholder='Ejemplo: 3' htmlFor={'academic_term_count'}>Cantidad de períodos académicos</InputLabel>
                      <Input
                        maxLength={1}
                        type='number'
                        disabled={true}
                        {...register('academic_term_count', { required: { value: true, message: 'El campo es requerido' } })}
                        aria-invalid={errors.academic_term_count ? 'true' : 'false'}
                                  />
                      {errors.academic_term_count && (
                      <InputErrorStyled>
                        {errors.academic_term_count.message}
                      </InputErrorStyled>
                      )}
                    </InputGroup>
                    <div className='add-group-container'>
                      <span className='item'>Agregar grado </span>
                      <TextButton className='add-section item' onClick={openLevels}>Agregar +</TextButton>
                    </div>
                    {/* <TextButton onClick={() => editPaysSettingsSection(section)}>Configurar precios de mensualidades</TextButton> */}
                  </div>
                  <div className="item">
                    <span className='title-container'>Grados de sección</span>
                    <div className="contaner-levels">
                      {sectionSelected.levels && sectionSelected.levels.map((value, index) => {
                        const keyFormat = sectionSelected.id + '_' + index
                        return (<ChildSectionName key={index} className='level' onClick={() => selectedGroupsAndMattersByLevel(index)} >
                          <div className='element'>
                            <span className={selectLevelKey === keyFormat ? 'label select' : 'label'}>{value.name}</span>
                            <div className='actions'>

                            </div>
                          </div>
                        </ChildSectionName>)
                      })}
                    </div>
                  </div>
                </span>

              </SectionStyled>
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
                          return (<> <ChildSectionName key={index}>
                            <div className='element'>
                              <span className='label'>{groupsSelected[index].name}</span>
                            </div>

                          </ChildSectionName>

                          </>
                          )
                        })
                          }
                  </>)
                  : <>
                    {
                      mattersSelected.length === 0
                        ? (<>
                          <InfoText>
                            Selecciona un grado para ver sus materias
                          </InfoText></>)
                        : mattersSelected && mattersSelected.map((key, index) => {
                          return (<> <ChildSectionName key={index}>
                            <div className='element'>
                              <span className='label'>{mattersSelected[index].name}</span>
                            </div>
                          </ChildSectionName>

                          </>
                          )
                        })
                          }
                  </>}

              </div>
            </div>
          </ContainerSections>
        </AddSectionStyled>

      </ModalCustom>
    }
    {
      viewAddLevel && <ModalCustom
      width='50%'
      message={errorMessage}
      title='Agregar grupo'
      refreshAction = {onlyLoadLevels}
      openOrClose={openOrCloseAddLevel}
      footer={<>
        <ButtonSecondary size='medium'
          color='white'
          type='button'
          status={StatusButton.Enabled}
          onClick={openOrCloseAddLevel}>Cerrar</ButtonSecondary>
        <Button
          size='medium'
          left='10px'
          color='white'
          type='button'
          status={StatusButton.Enabled}
          onClick={() => saveNewLevel()}
        >
          Guardar
        </Button>

      </>}
      statusPageModal={modalLevelsStatus} >
        <form>
          <InputGroup>
            <InputLabel placeholder='Selecciona un elemento' htmlFor={'new_level'}>Selecciona grupo</InputLabel>
            <Select
              {...register('new_level', { required: 'El campo es requerido' })}
                aria-invalid={errors.new_level ? 'true' : 'false'}
              >
              {
              levelsSections && levelsSections.map((value, index) => {
                return (<option className='select-option' value={value.id} key={index}>{value.name}</option>)
              })
              }
            </Select>
            {
              levelsSections && levelsSections.length === 0 ? <InfoText>Todos los grados de la seccion ya existen en el ciclo escolar</InfoText> : <></>
            }
            {errors.new_level && (
              <InputErrorStyled>
                {errors.new_level.message}
              </InputErrorStyled>
            )}
          </InputGroup>
        </form>
      </ModalCustom>
    }
  </div>)
}
export default CycleSchoolSectionsView
