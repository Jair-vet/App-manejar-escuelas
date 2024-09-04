/* eslint-disable multiline-ternary */
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaCaretRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router'
import { useNavigate } from 'react-router'

import { routesNamesInstitution } from '../../../Routes/routesNames'

import FiveStepSettingStyled, { ContainerButton, SectionsStyled, LevelsContainer, GroupsContainer } from './FiveStepSettingStyled'
import useGroupsSectionsSelectedHandling from './hooks/useGroupsSectionsSelected'

import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import { changeSchoolSettings } from '@/Redux/globalSlice'
import SchoolsService from '@/Services/schools.service'
import Button, { StatusButton } from '@/common/Components/Buttons'
import { InputGroup, InputLabel, Input, InputErrorStyled, FormGlobal } from '@/common/Components/Form'
import { Checkbox } from '@/common/Components/Form/checkbox'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import Tabs from '@/common/Components/Tabs'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useTabSelectedHandling from '@/common/hooks/useTabSelect'
import { ContainerFields } from '@/features/Dashboard/Pages/SchoolDetail/SchoolDetailStyled'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'
const FiveStepSettings = () => {
  // ==============  ===========
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const navigate = useNavigate()
  const { register, formState: { errors }, getValues, setError } = useForm()
  // ==============  ===========
  const levelsStore = useSelector((state) => state.levels)
  const {
    expandedLevel,
    isSelectAll,
    selectItem,
    sections,
    getSections,
    selectAll,
    selectOneSection,
    selectOneLevel,
    selectOneMatter,
    getLevelsFormat,
    sectionsMatters,
    getSectionsMattersByLevels
  } = useGroupsSectionsSelectedHandling()

  const { selectTab, changedSelectTab } = useTabSelectedHandling()
  const [tabs] = useState([
    { label: 'Ciclo Escolar', isSelect: true },
    { label: 'Secciones', isSelect: false },
    { label: 'Plan de estudios', isSelect: false }
  ])
  const initHasRun = useRef(false)
  //
  const dispatch = useDispatch()

  // ============== INIT ===================
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      dispatch(changeSchoolSettings({ step: 5 }))
      const id = localStorage.getItem(lsSchoolId)
      await getSections(id)
      setPageStatus(PageStatus.SUCCESS)
    } catch (error) {
      handleErrors(error)
    }
  }
  useEffect(() => {
    if (!initHasRun.current) {
      init()
    }
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
  // ============== INIT ===================

  const onSelectTab = async (index, tabs) => {
    changedSelectTab(index, tabs)
    if (index === 2) {
      try {
        setPageStatus(PageStatus.LOADING)
        const id = localStorage.getItem(lsSchoolId)
        const response = await SchoolsSectionsService.getSectionsWithMatters(id, levelsStore.levelsSelected)
        await getSectionsMattersByLevels(response)
        setPageStatus(PageStatus.SUCCESS)
      } catch (e) {
        handleErrors(e)
        setPageStatus(PageStatus.SUCCESS)
      }
    }
  }

  const sendData = async () => {
    try {
      const start = getValues('start')
      const end = getValues('end')

      if (start === '') {
        setError('start', { type: 'manual', message: 'Selecciona el inicio del ciclo escolar' })
        throw new Error(
          'Selecciona el inicio del ciclo escolar'
        )
      }
      if (end === '') {
        setError('end', { type: 'manual', message: 'Selecciona el término del ciclo escolar' })
        throw new Error(
          'Selecciona el término del ciclo escolar'
        )
      }
      setPageStatus(PageStatus.LOADING)
      const sections = await getLevelsFormat()
      if (sections.length === 0) {
        throw new Error(
          'Selecciona minimo una sección'
        )
      }
      const objectData = {
        start,
        end,
        sections
      }
      const idSchool = localStorage.getItem(lsSchoolId)
      await SchoolsCyclesService.createCycle(idSchool, objectData)
      setPageStatus(PageStatus.SUCCESS)
      toast.success('Ciclo escolar creado correctamente')
      await SchoolsService.finishSettingsSchool(idSchool)
      navigate(routesNamesInstitution.home)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.SUCCESS)
    }
  }
  return (
    <FiveStepSettingStyled>
      <h1 className='title'>Crea tu primer ciclo escolar</h1>
      <h3 className='subtitle'>Agrega las materias de cada grado y sección</h3>
      <Tabs items={tabs} onSelect={onSelectTab}>  </Tabs>
      {
        pageStatus === PageStatus.LOADING && <OnlyLoaderComponent></OnlyLoaderComponent>
      }
      {
        pageStatus === PageStatus.SUCCESS && (
          selectTab === 0
            ? (<FormGlobal>
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

            </FormGlobal>)
            : selectTab === 1 ? (<SectionsStyled>
              <div className='item'>
                <Checkbox
        label="Seleccionar todos"
        value={isSelectAll}
        checked={isSelectAll}
        onChange={({ target }) => selectAll()}
        />
                <div className='section-container'>
                  {
          sections && [...sections.keys()].map((key, index) => {
            const section = sections.get(key)
            const levels = section.levels
            return (
              <>
                <Checkbox
              key={key}
              label={'Seccion: ' + section.name}
              value={section.value}
              checked={section.value}
              onChange={({ target }) => selectOneSection(key)}
              />
                <LevelsContainer>
                  {levels && [...levels.keys()].map((keyLevel, index) => {
                    const level = levels.get(keyLevel)
                    const groups = level.groups

                    return (
                      <>
                        <div className='cont-level'>
                          <Checkbox
                      key={key}
                      label={'Grado: ' + level.name}
                      value={level.value}
                      checked={level.value}
                      onChange={({ target }) => selectOneLevel(key, keyLevel)}
                      />
                          <FaCaretRight className={level.isExpanded === true ? 'icon-arrow rotate' : 'icon-arrow' } onClick={() => expandedLevel(key, keyLevel)}>
                          </FaCaretRight>
                        </div>

                        <GroupsContainer>
                          <div className={level.isExpanded === true ? 'expanded' : 'not-expanded'}>
                            {groups && [...groups.keys()].map((keyGroup, index) => {
                              const group = groups.get(keyGroup)
                              return (<Checkbox
                                    key={key}
                                    label={group.name}
                                    value={group.value}
                                    checked={group.value}
                                    onChange={({ target }) => selectItem(key)}
                                    />)
                            })
                            }
                          </div>
                        </GroupsContainer>
                      </>
                    )
                  })
                  }
                </LevelsContainer>
              </>

            )
          })
        }
                </div>

              </div>

            </SectionsStyled>) : (<>
              <SectionsStyled>
                <div className='item'>
                  <div className='section-container'>
                    {
                      sectionsMatters && [...sectionsMatters.keys()].map((key, index) => {
                        const section = sectionsMatters.get(key)
                        const levels = section.levels
                        return (
                          <>
                            <Checkbox
                          key={key}
                          label={'Seccion: ' + section.name}
                          value={section.value}
                          checked={section.value}
                          onChange={({ target }) => selectOneSection(key)}
                          />
                            <LevelsContainer>
                              {levels && [...levels.keys()].map((keyLevel, indexLevel) => {
                                const level = levels.get(keyLevel)
                                const matters = level.matters

                                return (
                                  <>
                                    <div className='cont-level'>
                                      <Checkbox
                                    key={keyLevel}
                                    label={'Grado: ' + level.name}
                                    value={level.value}
                                    checked={level.value}
                                    onChange={({ target }) => selectOneLevel(key, keyLevel)}
                                    />
                                      <FaCaretRight className={level.isExpanded === true ? 'icon-arrow rotate' : 'icon-arrow' } onClick={() => expandedLevel(key, keyLevel)}>
                                      </FaCaretRight>
                                    </div>
                                    <GroupsContainer>
                                      <div className={level.isExpanded === true ? 'expanded' : 'not-expanded'}>
                                        {matters && [...matters.keys()].map((keyMatter, indexMatter) => {
                                          const group = matters.get(keyMatter)
                                          return (<Checkbox
                                          key={keyMatter}
                                          label={group.name}
                                          value={group.value}
                                          checked={group.value}
                                          onChange={({ target }) => selectOneMatter(key, keyLevel, keyMatter)}
                                          />)
                                        })
                            }
                                      </div>
                                    </GroupsContainer>
                                  </>
                                )
                              })
                  }
                            </LevelsContainer>
                          </>

                        )
                      })
        }
                  </div>

                </div>

              </SectionsStyled>
              <div className="footer">
                <ContainerButton>
                  <Button size='medium'
            color='white'
            type='submit'
            status={StatusButton.Enabled}
            onClick={sendData}
            >
                    Finalizar
                  </Button>
                </ContainerButton>

              </div>
            </>)
        )
      }
    </FiveStepSettingStyled>
  )
}

export default FiveStepSettings
