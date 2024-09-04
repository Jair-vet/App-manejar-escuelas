/* eslint-disable camelcase */
import { Box } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'
// import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import Button, { ButtonSecondary, StatusButton } from '@/common/Components/Buttons'
import { Input, InputErrorStyled, InputGroup, InputLabel, Select, TitleSection } from '@/common/Components/Form'
import OnlyLoaderComponent from '@/common/Components/LoaderComponent/OnlyLoader'
import ModalConfirm, { typeModal } from '@/common/Components/ModalConfirm'
import ModalCustom from '@/common/Components/Modals'
import { ContainerTableNewStyled } from '@/common/Components/Tables/TableCustom/TableCustomStyled'
import theme from '@/common/Global-styles/theme'
import PageStatus from '@/common/Models/Enums'
import { lsSchoolId } from '@/common/constants/localStorageConstants'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import { ContainerFieldsPays } from '@/features/Institution/Pages/Admin/AdminStyled'
import useCreatePaysSectionsHandling from '@/features/Institution/hooks/useCreatePays'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'

const CycleSettingsPaymentsView = () => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setModalStatus] = useState(PageStatus.SUCCESS)
  // const dispatch = useDispatch()
  const idSchool = localStorage.getItem(lsSchoolId)
  const { id } = useParams()
  const { viewModal, openOrClose } = useOpenModalHandling()
  const { viewModal: viewModalQuestion, openOrClose: openOrCloseQuestion } = useOpenModalHandling()

  const { register, reset, handleSubmit, getValues, setValue, setError, formState: { errors } } = useForm()
  const formMethods = { register, errors, setValue, getValues, setError, reset }
  const { loadValuesFieldsForm, savePaymentsDataInSectionCycle, setIsEditSettingsPays } =
    useCreatePaysSectionsHandling(formMethods, handleErrors)
  const [paymentsSettingsSections, setPaymentsSettingsSections] = useState([])
  const [paymentSelect, setPaymentSelect] = useState(undefined)

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      setPageStatus(PageStatus.LOADING)
      // dispatch(changeViewIsArrowBack({
      //   showArrow: false
      // }))
      const response = await SchoolsSectionsService.getSectionByCycles(idSchool, id)
      setPaymentsSettingsSections(response)
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
  const viewDetail = async (item) => {
    openOrClose()
    setPaymentSelect(item)
    setModalStatus(PageStatus.LOADING)
    const response = await SchoolsCyclesService.getPaymentSettingsBySection(idSchool, id, item.id)
    if (response.length === 0) {
      setIsEditSettingsPays(false)
    } else {
      setIsEditSettingsPays(true)
    }
    loadValuesFieldsForm(response)
    setModalStatus(PageStatus.SUCCESS)
  }
  const confirmAction = () => {
    openOrCloseQuestion()
  }
  const onEdit = async () => {
    try {
      setModalStatus(PageStatus.LOADING)
      await savePaymentsDataInSectionCycle(paymentSelect.id, id)
      setModalStatus(PageStatus.SUCCESS)
      openOrCloseQuestion()
      openOrClose()
    } catch (error) {
      openOrCloseQuestion()
      setModalStatus(PageStatus.SUCCESS)
      toast.error(error.message)
    }
  }

  const columnsStudenTable = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Sección',
        size: 30
      }
    ], []
  )

  const tablePayments = useMaterialReactTable({
    columns: columnsStudenTable,
    data: paymentsSettingsSections,
    positionActionsColumn: 'last',
    enableColumnActions: true,
    enableColumnFilters: true,
    enableRowActions: true,
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
    },
    renderRowActions: ({ row }) => {
      return (
        <Box>
          <FiEdit className="action" onClick={() => viewDetail(row.original)} />
        </Box>
      )
    }

  })
  return (<>
    <ContainerTableNewStyled maxheight='98%'>
      <MaterialReactTable table={tablePayments} />

    </ContainerTableNewStyled>
    {
      viewModal &&
      <form onSubmit={handleSubmit(confirmAction)}>
        <ModalCustom title={`Editar configuración de pagos | ${paymentSelect.name}`}
          closeButton={modalStatus === PageStatus.SUCCESS}
          width='60%'
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
              type='submit'
              status={StatusButton.Enabled}
            >
              Guardar
            </Button>

          </>}
          message={errorMessage} >
          <>

            <TitleSection>Monto de inscripción</TitleSection>
            <ContainerFieldsPays>
              <InputGroup className='item'>
                <InputLabel htmlFor="amount_inscription">Monto</InputLabel>
                <Input
                  type='number'
                  step=".01"
                  {...register('amount_inscription', {
                    required: {
                      value: true,
                      message: 'El campo es requerido'
                    }
                  })}
                  aria-invalid={errors.amount_inscription ? 'true' : 'false'}
                />
                {
                  <InputErrorStyled>
                    errors.amount_inscription
                  </InputErrorStyled> &&
                  <InputErrorStyled>
                    {errors.amount_inscription?.message}
                  </InputErrorStyled>
                }
              </InputGroup>
              <div className="dates">
                <InputGroup className='item'>
                  <InputLabel htmlFor="date_before_inscription">Fecha pronto pago</InputLabel>
                  <Input
                    type='date'
                    {...register('date_before_inscription', {
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    })}
                    aria-invalid={errors.date_before_inscription ? 'true' : 'false'}
                  />
                  {
                    <InputErrorStyled>
                      errors.date_before_inscription
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.date_before_inscription?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="discount_before_incription">Descuento por pagar antes</InputLabel>
                  <Input
                    min="0"
                    max="100"
                    type='number'
                    {...register('discount_before_incription', {
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                      // pattern: { value: /^[0-9]+$/, message: 'Solo se permiten numeros' }
                    })}
                    aria-invalid={errors.discount_before_incription ? 'true' : 'false'}
                    placeholder='100 o 10 %'
                    className='number'
                  />
                  {
                    <InputErrorStyled>
                      errors.discount_before_incription
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.discount_before_incription?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="unity_type_discount_inscription">Unidad de monto</InputLabel>
                  <Select {...register('unity_type_discount_inscription', {
                    required: {
                      value: true,
                      message: 'El campo es requerido'
                    }
                  })}>
                    <option value="1">Porcentaje %</option>
                    <option value="2">Pesos $</option>
                  </Select>
                  {
                    <InputErrorStyled>
                      errors.unity_type_discount_inscription
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.unity_type_discount_inscription?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
              </div>

              <div className="dates">
                <InputGroup className='item'>
                  <InputLabel htmlFor="date_limit_inscription">Fecha limite de pago</InputLabel>
                  <Input
                    type='date'
                    {...register('date_limit_inscription', {
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    })}
                    aria-invalid={errors.date_limit_inscription ? 'true' : 'false'}
                  />
                  {
                    <InputErrorStyled>
                      errors.date_limit_inscription
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.date_limit_inscription?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="interest_amount_inscription">Interés por no pagar</InputLabel>
                  <Input
                    min="0"
                    max="100"
                    step=".01"
                    type='number'
                    {...register('interest_amount_inscription', {
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    })}
                    aria-invalid={errors.interest_amount_inscription ? 'true' : 'false'}
                    placeholder='100 o 10 %'
                    className='number'
                  />
                  {
                    <InputErrorStyled>
                      errors.interest_amount_inscription
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.interest_amount_inscription?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="unity_type_interest_inscription">Unidad de monto</InputLabel>
                  <Select {...register('unity_type_discount_inscription', {
                    required: {
                      value: true,
                      message: 'El campo es requerido'
                    }
                  })}>
                    <option value="1">Porcentaje %</option>
                    <option value="2">Pesos $</option>
                  </Select>
                  {
                    <InputErrorStyled>
                      errors.unity_type_discount_inscription
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.unity_type_discount_inscription?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
              </div>
            </ContainerFieldsPays>
            <TitleSection>Monto de mensualidades</TitleSection>
            <ContainerFieldsPays>
              <div className="dates">
                <InputGroup className='item'>
                  <InputLabel htmlFor="amount_months">Monto de mensualidades</InputLabel>

                  <Input
                    type='number'
                    step=".01"
                    {...register('amount_months', {
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    })}
                    aria-invalid={errors.amount_months ? 'true' : 'false'}
                  />
                  {
                    <InputErrorStyled>
                      errors.amount_months
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.amount_months?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="start_month">Mes de inicio</InputLabel>
                  <Select {...register('start_month', {
                    required: {
                      value: true,
                      message: 'El campo es requerido'
                    }
                  })}>
                    <option value=""></option>
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>
                  </Select>
                  {
                    <InputErrorStyled>
                      errors.start_month
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.start_month?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="monts_number">Número de Mensualidades</InputLabel>
                  <Select {...register('monts_number', {
                    required: {
                      value: true,
                      message: 'El campo es requerido'
                    }
                  })}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </Select>
                  {
                    <InputErrorStyled>
                      errors.monts_number
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.monts_number?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
              </div>

              <div className="dates">
                <InputGroup className='item'>
                  <InputLabel htmlFor="date_before_months">Día de pronto pago</InputLabel>
                  <Select
                    {...register('date_before_months', { required: 'El campo es requerido' })}
                    aria-invalid={errors.date_before_months ? 'true' : 'false'}
                  >
                    <option className='select-option' value="0000-00-01">1</option>
                    <option className='select-option' value="0000-00-02">2</option>
                    <option className='select-option' value="0000-00-03">3</option>
                    <option className='select-option' value="0000-00-04">4</option>
                    <option className='select-option' value="0000-00-05">5</option>
                    <option className='select-option' value="0000-00-06">6</option>
                    <option className='select-option' value="0000-00-07">7</option>
                    <option className='select-option' value="0000-00-08">8</option>
                    <option className='select-option' value="0000-00-09">9</option>
                    <option className='select-option' value="0000-00-10">10</option>
                    <option className='select-option' value="0000-00-11">11</option>
                    <option className='select-option' value="0000-00-12">12</option>
                    <option className='select-option' value="0000-00-13">13</option>
                    <option className='select-option' value="0000-00-14">14</option>
                    <option className='select-option' value="0000-00-15">15</option>
                    <option className='select-option' value="0000-00-16">16</option>
                    <option className='select-option' value="0000-00-17">17</option>
                    <option className='select-option' value="0000-00-18">18</option>
                    <option className='select-option' value="0000-00-19">19</option>
                    <option className='select-option' value="0000-00-20">20</option>
                    <option className='select-option' value="0000-00-21">21</option>
                    <option className='select-option' value="0000-00-22">22</option>
                    <option className='select-option' value="0000-00-23">23</option>
                    <option className='select-option' value="0000-00-24">24</option>
                    <option className='select-option' value="0000-00-25">25</option>
                    <option className='select-option' value="0000-00-26">26</option>
                    <option className='select-option' value="0000-00-27">27</option>
                    <option className='select-option' value="0000-00-28">28</option>
                    <option className='select-option' value="0000-00-29">29</option>
                    <option className='select-option' value="0000-00-30">30</option>
                    <option className='select-option' value="0000-00-31">31</option>

                  </Select>
                  {
                    <InputErrorStyled>
                      errors.date_before_months
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.date_before_months?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="discount_before_months">Descuento por pagar antes</InputLabel>
                  <Input
                    min="0"
                    max="100"
                    step=".01"
                    type='number'
                    {...register('discount_before_months', {
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    })}
                    aria-invalid={errors.discount_before_months ? 'true' : 'false'}
                    placeholder='100 o 10 %'
                    className='number'
                  />
                  {
                    <InputErrorStyled>
                      errors.discount_before_months
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.discount_before_months?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="unity_type_discount_months">Unidad de monto</InputLabel>
                  <Select {...register('unity_type_discount_months', {
                    required: {
                      value: true,
                      message: 'El campo es requerido'
                    }
                  })}>
                    <option value="1">Porcentaje %</option>
                    <option value="2">Pesos $</option>
                  </Select>
                  {
                    <InputErrorStyled>
                      errors.unity_type_discount_months
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.unity_type_discount_months?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
              </div>

              <div className="dates">
                <InputGroup className='item'>
                  <InputLabel htmlFor="date_limit_months">Día de limite de pago</InputLabel>
                  <Select
                    {...register('date_limit_months', { required: 'El campo es requerido' })}
                    aria-invalid={errors.date_limit_months ? 'true' : 'false'}
                  >
                    <option className='select-option' value="0000-00-01">1</option>
                    <option className='select-option' value="0000-00-02">2</option>
                    <option className='select-option' value="0000-00-03">3</option>
                    <option className='select-option' value="0000-00-04">4</option>
                    <option className='select-option' value="0000-00-05">5</option>
                    <option className='select-option' value="0000-00-06">6</option>
                    <option className='select-option' value="0000-00-07">7</option>
                    <option className='select-option' value="0000-00-08">8</option>
                    <option className='select-option' value="0000-00-09">9</option>
                    <option className='select-option' value="0000-00-10">10</option>
                    <option className='select-option' value="0000-00-11">11</option>
                    <option className='select-option' value="0000-00-12">12</option>
                    <option className='select-option' value="0000-00-13">13</option>
                    <option className='select-option' value="0000-00-14">14</option>
                    <option className='select-option' value="0000-00-15">15</option>
                    <option className='select-option' value="0000-00-16">16</option>
                    <option className='select-option' value="0000-00-17">17</option>
                    <option className='select-option' value="0000-00-18">18</option>
                    <option className='select-option' value="0000-00-19">19</option>
                    <option className='select-option' value="0000-00-20">20</option>
                    <option className='select-option' value="0000-00-21">21</option>
                    <option className='select-option' value="0000-00-22">22</option>
                    <option className='select-option' value="0000-00-23">23</option>
                    <option className='select-option' value="0000-00-24">24</option>
                    <option className='select-option' value="0000-00-25">25</option>
                    <option className='select-option' value="0000-00-26">26</option>
                    <option className='select-option' value="0000-00-27">27</option>
                    <option className='select-option' value="0000-00-28">28</option>
                    <option className='select-option' value="0000-00-29">29</option>
                    <option className='select-option' value="0000-00-30">30</option>
                    <option className='select-option' value="0000-00-31">31</option>

                  </Select>
                  {
                    <InputErrorStyled>
                      errors.date_limit_months
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.date_limit_months?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="interest_amount_months">Interés por no pagar</InputLabel>
                  <Input
                    min="0"
                    max="100"
                    step=".01"
                    type='number'
                    {...register('interest_amount_months', {
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    })}
                    aria-invalid={errors.interest_amount_months ? 'true' : 'false'}
                    placeholder='100 o 10 %'
                    className='number'
                  />
                  {
                    <InputErrorStyled>
                      errors.interest_amount_months
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.interest_amount_months?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
                <InputGroup className='item'>
                  <InputLabel htmlFor="unity_type_discount_months">Unidad de monto</InputLabel>
                  <Select {...register('unity_type_discount_months', {
                    required: {
                      value: true,
                      message: 'El campo es requerido'
                    }
                  })}>

                    <option value="1">Porcentaje %</option>
                    <option value="2">Pesos $</option>
                  </Select>
                  {
                    <InputErrorStyled>
                      errors.unity_type_discount_months
                    </InputErrorStyled> &&
                    <InputErrorStyled>
                      {errors.unity_type_discount_months?.message}
                    </InputErrorStyled>
                  }
                </InputGroup>
              </div>
            </ContainerFieldsPays>
          </>
        </ModalCustom>
      </form>
    }

    {
      viewModalQuestion && <ModalConfirm
        handleConfirm={onEdit}
        title='¿Quieres continuar?'
        handleClose={openOrCloseQuestion}
        type={typeModal.QUESTION}
      >
        <span> Esta accion cambiará la configuración de pagos de los estudiantes y esto no es reversible </span>

      </ModalConfirm>
    }
  </>)
}

export default CycleSettingsPaymentsView
