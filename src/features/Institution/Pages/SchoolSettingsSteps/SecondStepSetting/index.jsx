import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
// import { MdOutlineDone } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { routesNamesInstitutionSettings } from '../../../Routes/routesNames'
import useCreateSectionsHandling from '../../../hooks/useCreateSections'

import SecondStepSettingStyled, { ContainerSections, SectionStyled, ContainerButton } from './SecondStepSettingStyled'

import { changeSchoolSettings } from '@/Redux/globalSlice'
import Button, { StatusButton } from '@/common/Components/Buttons'
import TextButton from '@/common/Components/Buttons/ButtonText/buttonText'
import { Input, InputErrorStyled, InputGroup, InputLabel } from '@/common/Components/Form'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import { InfoText } from '@/common/Global-styles/Titles'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import { DeleteSectionContainer } from '@/features/Institution/Components/Sections/SectionsStyled'

const SecondStepSetting = () => {
  const { register, formState: { errors }, setValue, getValues, setError } = useForm()
  const formMethods = { register, errors, setValue, getValues, setError }
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  // const [sections, setSections] = useState(new Map())
  const { createOrEditSections, initHook, sections, handleKeyPress, removeLevel, deleteSection, addSection, addLevel } = useCreateSectionsHandling(formMethods, handleErrors)
  const initHasRun = useRef(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ============== INIT ===================
  const init = async () => {
    try {
      dispatch(changeSchoolSettings({ step: 2 }))
      initHook()
      initHasRun.current = true
    } catch (e) {
      handleErrors(e)
    }
  }
  // ============== INIT ===================
  const onSubmit = async data => {
    try {
      setPageStatus(PageStatus.LOADING)
      await createOrEditSections(0)
      // toast.success('Secciones agregadas con exito')
      navigate(routesNamesInstitutionSettings.thirdStep)
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

  return (
    <SecondStepSettingStyled>
      <h1 className='title'>Crea tus secciones</h1>
      <h3 className='subtitle'>Secciones de la Institución</h3>
      {pageStatus === PageStatus.LOADING
        ? <OnlyLoaderComponent></ OnlyLoaderComponent>
        : <ContainerSections>
          <form >
            {sections && [...sections.keys()].map((key, index) => {
              const section = sections.get(key)
              const levels = section.levels

              return (
                <>
                  <SectionStyled key={index}>
                    <DeleteSectionContainer onClick={() => deleteSection(key)}>
                      <span className='button-text'>Eliminar sección</span>
                      <IoCloseSharp className='icon'>
                      </IoCloseSharp>
                    </DeleteSectionContainer>
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
                          <InputLabel htmlFor={`level-${key}`}>Nuevo Grupo</InputLabel>
                          <div className='cont-input-level'>
                            <Input
                              maxLength={80}
                              placeholder='Ejemplo: Primer Grado'
                              onKeyDown={(event) => handleKeyPress(event, index)}
                              {...register(`level-${index}`, { required: { value: true, message: 'El nombre es requerido' } })}
                              aria-invalid={errors[`level-${index}`] ? 'true' : 'false'}
                            />
                            <div className='cont-icon-done' onClick={() => addLevel(key)}>
                              <AiOutlinePlus className='icon-done'></AiOutlinePlus>
                            </div>
                          </div>
                          <InfoText>
                            Preciona ENTER para agregar nuevo grado
                          </InfoText>

                          {errors[`level-${index}`] && (
                            <InputErrorStyled>
                              {errors[`level-${index}`].message}
                            </InputErrorStyled>
                          )}
                        </InputGroup>
                      </div>
                      <div className="item">
                        <span className='title-levels'>Grados de sección</span>
                        <div className="contaner-levels">
                          {levels && levels.map((value, index) => {
                            return <div key={index} className='level'>
                              <span>{value.name}</span>
                              <IoCloseSharp className='icon' onClick={() => removeLevel(key, index)}>
                              </IoCloseSharp>

                            </div>
                          })}
                        </div>
                        {/* Aquí puedes renderizar otros elementos relacionados con la sección si es necesario */}
                      </div>
                    </span>

                  </SectionStyled>
                  <TextButton className='add-section' onClick={() => addSection(key)}>Agregar sección</TextButton>
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
    </SecondStepSettingStyled>
  )
}

export default SecondStepSetting
