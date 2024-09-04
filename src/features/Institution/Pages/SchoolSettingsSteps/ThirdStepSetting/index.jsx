import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
// import { MdOutlineDone } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { routesNamesInstitutionSettings } from '../../../Routes/routesNames'

import ThirdStepSettingStyled, { SectionStyled, ContainerSections, ContainerButton } from './ThirdStepSettingStyled'

import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import { changeSchoolSettings } from '@/Redux/globalSlice'
import Button, { StatusButton } from '@/common/Components/Buttons'
import { InputGroup, InputLabel, Input, InputErrorStyled } from '@/common/Components/Form'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import { InfoText } from '@/common/Global-styles/Titles'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import SchoolsMattersService from '@/services/schoolsMatters.service'

const ThirdStepSettings = () => {
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  const [levels, setLevels] = useState(new Map())
  const { register, formState: { errors }, setValue, getValues, setError } = useForm()

  const initHasRun = useRef(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ============== INIT ===================
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      dispatch(changeSchoolSettings({ step: 3 }))
      // const id = localStorage.getItem(lsSchoolId)
      const items = new Map()
      // for (let index = 0; index < response.length; index++) {
      //   const element = response[index]
      //   items.set(items.size, { name_section: element.name_section, id_level: element.id, name: element.name, matters: [] })
      // }
      setLevels(items)
      // setValue(`name-${topics.size}`)
      initHasRun.current = true
      setPageStatus(PageStatus.SUCCESS)
    } catch (error) {
      handleErrors(error)
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
        if (topic.matters.length === 0) {
          throw new Error(
            'Agrega mínimo una materia a cada grado'
          )
        }
        await SchoolsMattersService.createMatter(id, topic)
      })
      await Promise.all(promises)
      setPageStatus(PageStatus.SUCCESS)
      toast.success('Materias agregada con exito')
      navigate(routesNamesInstitutionSettings.fourthStep)
    } catch (error) {
      handleErrors(error)
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
      addTopic(key)
    }
  }

  const addTopic = (key) => {
    try {
      const nameField = `matter-${key}`
      const value = getValues(nameField)
      if (value === '') {
        setError(nameField, { type: 'manual', message: 'El nombre de la materia no puede ir vacio' })
        return
      }
      setError(nameField, { type: 'manual', message: '' })

      const tempLevels = new Map(levels)
      const selectedCourse = tempLevels.get(key)
      const tempMatters = [...selectedCourse.matters]

      tempMatters.push({ name: value })
      selectedCourse.matters = tempMatters

      tempLevels.set(key, selectedCourse)
      setLevels(tempLevels)
      setValue(nameField, '')
    } catch (error) {
      handleErrors(error)
    }
  }

  const removeTopic = (key, index) => {
    try {
      const tempLevels = new Map(levels)
      const selectedCourse = tempLevels.get(key)
      if (selectedCourse.matters.length <= 1) {
        throw new Error(
          'No puedes eliminar la única materia'
        )
      }
      const temTopic = [...selectedCourse.matters]
      temTopic.splice(index, 1)
      selectedCourse.matters = temTopic
      setLevels(tempLevels)
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.SUCCESS)
    }
  }

  return (
    <ThirdStepSettingStyled>
      <h1 className='title'>Plan de estudios</h1>
      <h3 className='subtitle'>Agrega las materias de cada grado y sección</h3>
      {pageStatus === PageStatus.LOADING
        ? <OnlyLoaderComponent></OnlyLoaderComponent>
        : <ContainerSections>
          <form>
            {levels && [...levels.keys()].map((key, index) => {
              const level = levels.get(key)
              const course = level.matters

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
                          <InputLabel htmlFor={`matter-${key}`}>Nueva materia</InputLabel>
                          <div className='cont-input-level'>
                            <Input
                              maxLength={80}
                              placeholder='Ejemplo: Matematicas'
                              onKeyDown={(event) => handleKeyPress(event, key)}
                              {...register(`matter-${key}`, { required: { value: true, message: 'El nombre es requerido' } })}
                              aria-invalid={errors[`matter-${key}`] ? 'true' : 'false'}
                            />
                            <div className='cont-icon-done' onClick={() => addTopic(key)}>
                              <AiOutlinePlus className='icon-done'></AiOutlinePlus>
                            </div>
                          </div>
                          <InfoText>
                            Preciona ENTER para agregar nueva materia
                          </InfoText>
                          {errors[`matter-${key}`] && (
                          <InputErrorStyled>
                            {errors[`matter-${key}`].message}
                          </InputErrorStyled>
                          )}
                        </InputGroup>
                      </div>

                      <div className="item">
                        <span className='title-levels'>Materias </span>
                        <div className="contaner-levels">
                          {course && course.map((value, index) => {
                            return <div key={index} className='level'>
                              <span>{value.name}</span>
                              <IoCloseSharp className='icon' onClick={() => removeTopic(key, index)}>
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
              Siguiente
            </Button>
          </ContainerButton>

        </div>
        : <></>}
    </ThirdStepSettingStyled>
  )
}

export default ThirdStepSettings
