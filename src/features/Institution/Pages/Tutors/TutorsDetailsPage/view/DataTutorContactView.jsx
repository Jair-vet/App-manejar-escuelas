import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router'

import LayoutDetailTutorsStyled, { ContainerButton, ContainerSectionFields } from '../TutorsStyled'

import Button, { StatusButton } from '@/Common/Components/Buttons'
import PageStatus from '@/common/Models/Enums'
import useErrorHandling from '@/Common/hooks/useErrorCustom'
import TutorService from '@/Services/tutors.service'
import { InputErrorStyled, InputGroup, InputLabel, Input } from '@/Common/Components/Form'
import { lsSchoolId } from '@/Common/constants/localStorageConstants'

const DataTutorContacView = ({ idTutor }) => {
  const [statusBtn, setStatusBtn] = useState(StatusButton.Enabled)
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm()
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const [, setPageStatus] = useState(PageStatus.LOADING)

  const navigate = useNavigate()

  const { id } = useParams()
  const idSchool = localStorage.getItem(lsSchoolId)

  const watchNumberPhoneHome = watch('number_phone_home')
  const watchNumberPhoneWork = watch('number_phone_work')
  const watchNumberPhoneMovil = watch('number_phone_movil')
  const watchEmail = watch('email')

  const init = async () => {
    try {
      if (idTutor !== undefined) {
        const data = await TutorService.getDetailTutor(idSchool, idTutor)
        console.log(
          data
        )
        setValue('number_phone_home', data.number_phone_home)
        setValue('number_phone_work', data.number_phone_work)
        setValue('number_phone_movil', data.number_phone_movil)
        setValue('email', data.email)
        setPageStatus(PageStatus.SUCCESS)
      }
    } catch (e) {
      console.log(e)
      toast.error(e)
      handleErrors(e)
    }
  }

  useEffect(() => {
    setValue('number_phone_home', watchNumberPhoneHome)
    setValue('number_phone_work', watchNumberPhoneWork)
    setValue('number_phone_movil', watchNumberPhoneMovil)
    setValue('email', watchEmail)
  }, [watchNumberPhoneHome, watchNumberPhoneWork, watchNumberPhoneMovil, watchEmail])

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

  const onSubmit = async data => {
    try {
      if (idTutor !== undefined) {
        setStatusBtn(StatusButton.Loading)
        await TutorService.editTutor(idSchool, idTutor, data)
        toast.success('Tutor editado correctamente')
        setStatusBtn(StatusButton.Enabled)
      } else {
        setStatusBtn(StatusButton.Loading)
        data.id_student = id
        await TutorService.createTutor(idSchool, data)
        toast.success('Tutor creado correctamente')
        navigate(-1)
        setStatusBtn(StatusButton.Enabled)
      }
    } catch (error) {
      setStatusBtn(StatusButton.Enabled)
      handleErrors(error)
    }
  }

  return (
    <>
      <LayoutDetailTutorsStyled>
        <form
        onSubmit= { handleSubmit(onSubmit)}>
          <ContainerSectionFields>
            <span className='title-section'>Contacto</span>
            <div className='container-fileds'>
              <InputGroup className='item'>
                <InputLabel htmlFor='name'>Tel casa:</InputLabel>
                <Input
              className='personal-data'
            {...register('number_phone_home')}
           aria-invalid={errors.number_phone_home ? 'true' : 'false'}
            />
                {
                    errors.number_phone_home &&
                    <InputErrorStyled>
                      {errors.number_phone_home?.message}
                    </InputErrorStyled>
            }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='last-name'>Tel trabajo:</InputLabel>
                <Input
              className='personal-data'
              {...register('number_phone_work')}
              aria-invalid={errors.number_phone_work ? 'true' : 'false'}
            />
                {
                    errors.number_phone_work &&
                    <InputErrorStyled>
                      {errors.number_phone_work?.message}
                    </InputErrorStyled>
            }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='number_phone_movil'>Tel movil: </InputLabel>
                <Input
              className='personal-data'
              {...register('number_phone_movil', { required: 'El telefono movil es requerido' })}
              aria-invalid={errors.number_phone_movil ? 'true' : 'false'}
            />
                {
                    errors.number_phone_work &&
                    <InputErrorStyled>
                      {errors.number_phone_work?.message}
                    </InputErrorStyled>
            }
              </InputGroup>
              <InputGroup className='item'>
                <InputLabel htmlFor='email'>Correo electrónico </InputLabel>
                <Input
                {...register('email', { required: 'El telefono movil es requerido' })}
                aria-invalid={errors.email ? 'true' : 'false'}/>
                {
                    errors.email &&
                    <InputErrorStyled>
                      {errors.email?.message}
                    </InputErrorStyled>
            }
              </InputGroup>
            </div>
          </ContainerSectionFields>
          <ContainerButton
        justify='end'
        top='1rem'
        >
            <Button
          size='mediumSmall'
          status={statusBtn}
          >Guardar</Button>
            <Button
          left='2rem'
          size='mediumSmall'
          status={statusBtn}
          onClick={() => navigate(-1)}
          >Cerrar</Button>
          </ContainerButton>
        </form>
      </LayoutDetailTutorsStyled>
    </>
  )
}

DataTutorContacView.propTypes = {
  idTutor: PropTypes.string
}
export default DataTutorContacView
