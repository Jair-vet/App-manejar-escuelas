import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { ContainerFieldsPays } from '../../AdminStyled'
import TableBodySections from '../../Components/SectionsBodyTable'
import useSectionsSchoolHandling from '../../hooks/useSectionsSchool'

import { changeTitle } from '@/Redux/globalSlice'
import Button, { ButtonSecondary, StatusButton } from '@/common/Components/Buttons'
import { Input, InputErrorStyled, InputGroup, InputLabel, Select, TitleSection } from '@/common/Components/Form'
import ModalConfirm from '@/common/Components/ModalConfirm'
import ModalCustom from '@/common/Components/Modals'
import Search from '@/common/Components/Search'
import TableCustom from '@/common/Components/Tables/TableCustom'
import PageStatus from '@/common/Models/Enums'
import SchoolModel from '@/common/Models/SchoolModel'
import useErrorHandling from '@/common/hooks/useErrorCustom'
import useOpenModalHandling from '@/common/hooks/useModal'
import useCreatePaysSectionsHandling from '@/features/Institution/hooks/useCreatePays'
import SchoolsSectionsService from '@/services/schoolsSections.service'

const SchoolSectionsPaysView = ({ school }) => {
  // ============ SCREEN STATUS ===============
  const { errorMessage, handleErrors, clearErrorMessage } = useErrorHandling()
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING)
  const [modalStatus, setmodalStatus] = useState(PageStatus.SUCCESS)

  // ============ SCREEN STATUS ===============
  const { items: sectionsLoad, loadItems: loadSections } = useSectionsSchoolHandling()
  const [isSearch, setIsSearch] = useState(false)
  const [sectionsSearch, setSectionsSearch] = useState([])
  const dispatch = useDispatch()
  const { register, formState: { errors }, setValue, getValues, setError, reset, handleSubmit } = useForm()
  const formMethods = { register, errors, setValue, getValues, setError, reset }

  const { viewModal: viewModalPaysSettings, openOrClose: openOrCloseModalPaysSettings } = useOpenModalHandling()
  const { viewModal: viewModalConfirm, openOrClose: openOrCloseModalConfirm } = useOpenModalHandling()

  const { initHook, savePaymentsDataInSection, isEditSettingsPays } =
    useCreatePaysSectionsHandling(formMethods, handleErrors)
  const [sectionPaysSelect, setSectionPaysSelect] = useState({})

  // ============ INIT DATA LOADING ===============
  const init = async () => {
    try {
      dispatch(changeTitle({
        titleHeader: 'Administración / configuración de pagos'
      }))
      setPageStatus(PageStatus.LOADING)
      await loadSections(school.id, 1)
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
  const edit = async (item) => {
    try {
      reset()
      setmodalStatus(PageStatus.LOADING)
      setSectionPaysSelect(item)
      openOrCloseModalPaysSettings(true)
      await initHook(item.id)
      setmodalStatus(PageStatus.SUCCESS)
    } catch (error) {
      openOrCloseModalPaysSettings(false)
      toast.error(error.message)
      setmodalStatus(PageStatus.SUCCESS)
    }
  }
  const viewConfirmEditPaysSettings = () => {
    openOrCloseModalConfirm()
  }

  const savePayments = async () => {
    try {
      openOrCloseModalConfirm()
      setmodalStatus(PageStatus.LOADING)
      await savePaymentsDataInSection(sectionPaysSelect.id)
      toast.success('Configuración guardada')
      openOrCloseModalPaysSettings(false)
      setmodalStatus(PageStatus.SUCCESS)
    } catch (e) {
      setmodalStatus(PageStatus.SUCCESS)
      toast.error(e.message)
    }
  }
  return (
    <div className='view-detail-users-schools-container'>
      <Search searchAction={search} />
      <TableCustom
        statusTable={pageStatus}
        withContainerWhite={false}
        totalItems={3}
        heightTable={'calc(100% - 80px)'}
        titles={['Nombre de Sección', 'Acciones']}>
        <TableBodySections
          edit={edit}
          items={isSearch ? sectionsSearch : sectionsLoad}
          message={errorMessage}
          tableStatus={pageStatus} >

        </TableBodySections>
      </TableCustom>

      {
        viewModalPaysSettings &&
        <form onSubmit={handleSubmit(viewConfirmEditPaysSettings)}>
          <ModalCustom title={isEditSettingsPays ? `Editar configuración de pagos | ${sectionPaysSelect.name}` : `Crear configuración de pagos | ${sectionPaysSelect.name}`}
            closeButton={modalStatus === PageStatus.SUCCESS}
            width='60%'
            openOrClose={openOrCloseModalPaysSettings}
            statusPageModal={modalStatus}
            refreshAction={() => { }}
            footer={<>
              <ButtonSecondary size='medium'
                color='white'
                type='button'
                status={StatusButton.Enabled}
                onClick={openOrCloseModalPaysSettings}>Cerrar</ButtonSecondary>
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
                      step=".01"
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
                      type='number'
                      step=".01"
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
                    {/* <Input
                        type='date'
                        {...register('date_limit_months', {
                          required: {
                            value: true,
                            message: 'El campo es requerido'
                          }
                        })}
                        aria-invalid={errors.date_limit_months ? 'true' : 'false'}
                      /> */}
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
                      type='number'
                      step=".01"
                      min={0}
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
        viewModalConfirm && <ModalConfirm
          handleConfirm={savePayments}
          handleClose={openOrCloseModalConfirm}>
          <span>Solo se modificará la configuración en secciones, los ciclos que ya estan creados no se pueden modificar, accede al detalle de cada ciclo para modificar la configuración de pagos</span>
        </ModalConfirm>
      }
    </div>
  )
}
SchoolSectionsPaysView.propTypes = {
  school: PropTypes.instanceOf(SchoolModel).isRequired
}
export default SchoolSectionsPaysView
