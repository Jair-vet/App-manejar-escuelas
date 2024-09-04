import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ContainerButtonFiles, ContainerForm, ContainerInputs } from './SchoolSettingsStyled'

import Button, { StatusButton } from '@/common/Components/Buttons'
import { Input, InputErrorStyled, InputGroup, InputLabel } from '@/common/Components/Form'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import SchoolsService from '@/services/schools.service'
import PageStatus from '@/common/Models/Enums'

const SchoolBankData = () => {
  const [pageStatus, setPageStatus] = useState(PageStatus.SUCCESS)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { handleErrors, errorMessage, clearErrorMessage } = useErrorHandling()
  const [school, setSchool] = useState({})

  const init = async () => {
    const id = localStorage.getItem(lsSchoolId)
    const response = await SchoolsService.getSchool(id)
    setSchool(response)
    setValue('bank_name', response.bank_name)
    setValue('bank_convenio', response.bank_convenio)
    setValue('bank_reference', response.bank_reference)
  }


  const onSubmit = async (data) => {
    try {
      setPageStatus(PageStatus.LOADING)
      const response = await SchoolsService.editSchool(school.id, data)
      setSchool(response)
      setPageStatus(PageStatus.SUCCESS)
      toast.success('Datos guardados exitosamente')
    } catch (e) {
      handleErrors(e)
      setPageStatus(PageStatus.ERROR)
    }
  }
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

  return (
    <>
    {pageStatus === PageStatus.LOADING && <div>Loading...</div>}
    <ContainerForm onSubmit={handleSubmit(onSubmit)}>
    <ContainerInputs>
        <div className='container_data_bank'>
          <div className='item'>
            <InputGroup >
              <InputLabel htmlFor='bank_name'>Nombre del banco</InputLabel>
              <Input
            width='85%'
            {...register('bank_name', { required: { value: true, message: 'El nombre es requerido' } })}
            aria-invalid={errors.bank_name ? 'true' : 'false'}
                  />
              {errors.bank_name && (
              <InputErrorStyled>{errors.bank_name.message}</InputErrorStyled>
              )}
            </InputGroup>
          </div>
          <div className='item'>
            <InputGroup>
              <InputLabel htmlFor='bank_convenio'>Convenio del banco</InputLabel>
              <Input
                    width='85%'
                    {...register('bank_convenio', { required: false })}
                    aria-invalid={errors.bank_convenio ? 'true' : 'false'}
                  />
              {errors.bank_convenio && (
              <InputErrorStyled>{errors.bank_convenio.message}</InputErrorStyled>
              )}
            </InputGroup>
          </div>
          <div className='item'>
            <InputGroup>
              <InputLabel htmlFor='bank_reference'>Referencia bancaria</InputLabel>
              <Input
                    width='85%'
                    {...register('bank_reference', { required: false })}
                    aria-invalid={errors.bank_reference ? 'true' : 'false'}
                  />
              {errors.bank_reference && (
              <InputErrorStyled>{errors.bank_reference.message}</InputErrorStyled>
              )}
            </InputGroup>
          </div>
        </div>

      </ContainerInputs>
      <ContainerButtonFiles right='0%' paddingTop='4rem'>
        <Button
             size='semiMedium'
             color='white'
             type='submit'
             status={StatusButton.Enabled}
           >Guardar
        </Button>
      </ContainerButtonFiles>
    </ContainerForm>
    </>

  )
}

export default SchoolBankData
