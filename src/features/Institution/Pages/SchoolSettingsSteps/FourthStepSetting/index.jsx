import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
// import { MdOutlineDone } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { routesNamesInstitutionSettings } from '../../../Routes/routesNames'

import FourthStepSettingStyled, { ContainerSections, SectionStyled, ContainerButton } from './FourthStepSettingStyled'

import { changeSchoolSettings } from '@/Redux/globalSlice'
import Button, { StatusButton } from '@/common/Components/Buttons'
import { Input, InputErrorStyled, InputGroup, InputLabel } from '@/common/Components/Form'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import { InfoText } from '@/common/Global-styles/Titles'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import SchoolsGroupsService from '@/services/schoolsGroups.service'

const FourthStepSetting = () => {
  const { register, formState: { errors }, setValue, getValues, setError } = useForm()
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  const [levels, setLevels] = useState(new Map())
  const initHasRun = useRef(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ============== INIT ===================
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      dispatch(changeSchoolSettings({ step: 4 }))
      // const id = localStorage.getItem(lsSchoolId)
      const items = new Map()
      // for (let index = 0; index < response.length; index++) {
      //   const element = response[index]
      //   items.set(items.size, { name_section: element.name_section, id_level: element.id, name: element.name, groups: [] })
      // }
      setLevels(items)
      initHasRun.current = true
      setPageStatus(PageStatus.SUCCESS)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }
  // ============== INIT ===================
  const onSubmit = async data => {
    try {
      setPageStatus(PageStatus.LOADING)
      const id = localStorage.getItem(lsSchoolId)
      const promises = [...levels.keys()].map(async (key, index) => {
        const topic = levels.get(key)
        if (topic.groups.length === 0) {
          throw new Error(
            'Agrega mínimo un grupo a cada grado'
          )
        }
        await SchoolsGroupsService.createGroup(id, topic)
      })
      await Promise.all(promises)
      // await SchoolsService.finishSettingsSchool(id)
      toast.success('Grupos creados con exito')
      navigate(routesNamesInstitutionSettings.fiveStep)
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

  const handleKeyPress = (event, key) => {
    if (event.key === 'Enter') {
      addGroup(key)
    }
  }

  const addGroup = (key) => {
    try {
      const nameField = `g-${key}`
      const value = getValues(nameField)
      if (value === '') {
        setError(nameField, { type: 'manual', message: 'El nombre del no puede ir vacio' })
        return
      }
      setError(nameField, { type: 'manual', message: '' })

      const tempLevels = new Map(levels)
      const selectedCourse = tempLevels.get(key)
      const tempGroups = [...selectedCourse.groups]

      tempGroups.push({ name: value })
      selectedCourse.groups = tempGroups

      tempLevels.set(key, selectedCourse)
      setLevels(tempLevels)
      setValue(nameField, '')
    } catch (error) {
      handleErrors(error)
    }
  }

  const removeGroup = (key, index) => {
    try {
      const tempLevels = new Map(levels)
      const selectedCourse = tempLevels.get(key)
      if (selectedCourse.groups.length <= 1) {
        throw new Error(
          'No puedes eliminar el único grupo'
        )
      }
      const temTopic = [...selectedCourse.groups]
      temTopic.splice(index, 1)
      selectedCourse.groups = temTopic
      setLevels(tempLevels)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.SUCCESS)
    }
  }

  return (
    <FourthStepSettingStyled>
      <h1 className='title'>Crea tus grupos</h1>
      <h3 className='subtitle'>Crea los grupos de cada grado</h3>
      {pageStatus === PageStatus.LOADING
        ? <OnlyLoaderComponent></OnlyLoaderComponent>
        : <ContainerSections>
          <form>
            {levels && [...levels.keys()].map((key, index) => {
              const level = levels.get(key)
              const groups = level.groups

              return (
                <>
                  <SectionStyled key={index} >
                    <span className='items'>
                      <div className='item'>
                        <InputGroup>
                          <span className='section-name'>{level.name_section}</span>
                          <InputLabel placeholder='Ejemplo: Matematicas' htmlFor={`name-${key}`}>Nombre del grado</InputLabel>
                          <Input
                            className='input-level'
                            maxLength={80}
                            {...register(`name-${key}`, { required: { value: true, message: 'En el nombre es requerido' } })}
                            aria-invalid={errors[`name-${key}`] ? 'true' : 'false'}
                            value={ level.name }
                            disabled
                          />
                          {errors[`name-${key}`] && (
                          <InputErrorStyled>
                            {errors[`name-${key}`].message}
                          </InputErrorStyled>
                          )}
                        </InputGroup>
                        <InputGroup>
                          <InputLabel htmlFor={`g-${key}`}>Nueva grupo</InputLabel>
                          <div className='cont-input-level'>
                            <Input
                              maxLength={80}
                              placeholder='Ejemplo: Grupo C'
                              onKeyDown={(event) => handleKeyPress(event, key)}
                              {...register(`g-${key}`, { required: { value: true, message: 'El nombre es requerido' } })}
                              aria-invalid={errors[`g-${key}`] ? 'true' : 'false'}
                            />
                            <div className='cont-icon-done' onClick={() => addGroup(key)}>
                              <AiOutlinePlus className='icon-done'></AiOutlinePlus>
                            </div>
                          </div>
                          <InfoText>
                            Preciona ENTER para agregar nuevo grupo
                          </InfoText>
                          {errors[`g-${key}`] && (
                          <InputErrorStyled>
                            {errors[`g-${key}`].message}
                          </InputErrorStyled>
                          )}
                        </InputGroup>
                      </div>

                      <div className="item">
                        <span className='title-levels'>Grupos </span>
                        <div className="contaner-levels">
                          {groups && groups.map((value, index) => {
                            return <div key={index} className='level'>
                              <span>{value.name}</span>
                              <IoCloseSharp className='icon' onClick={() => removeGroup(key, index)}>
                              </IoCloseSharp>
                            </div>
                          })}
                        </div>
                      </div>
                    </span>
                  </SectionStyled>
                </>
              )
            })}
          </form>
        </ContainerSections>
      }
      {pageStatus === PageStatus.SUCCESS
        ? <div className="footer">
          <ContainerButton>
            <Button size='medium'
            color='white'
            type='button'
            status={StatusButton.Enabled}
            onClick={onSubmit}
            >
              Finalizar
            </Button>
          </ContainerButton>

        </div>
        : <></>}
    </FourthStepSettingStyled>
  )
}

export default FourthStepSetting
