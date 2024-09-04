import { useState } from 'react'

import { lsSchoolId } from '@/common/constants/localStorageConstants'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'

/**
 * HOOK QUE MANEJA  LOGICA PARA  CONFIGURAR LOS PAGOS DE CADA SECCION Y LAS CONFIG DE CADA SECCION DE UN CICLO
 *
 * @param {object} formMethods - funciones de react hooks a utilizar  en  el hook, ejemplo setValue.
 * @param {function} handleErrors - función para manejar errores.
 * @returns {object} - Un objeto con propiedades y métodos relacionados con el hook.
 */
const useCreatePaysSectionsHandling = (formMethods, handleErrors) => {
  const { setValue, getValues } = formMethods
  const idSchool = localStorage.getItem(lsSchoolId)
  const [isEditSettingsPays, setIsEditSettingsPays] = useState(false)
  const [idInscription, setIdInscription] = useState(null)
  const [idMonths, setIdMonths] = useState(null)
  const [sectionsData, setSectionsData] = useState([])

  const initHook = async (idSection) => {
    try {
      let response = await SchoolsSectionsService.getPaymentsSection(idSchool, idSection)
      if (response.length === 0) {
        response = await getdataAmountFromFormField()
      }

      setValue('amount_months', response[1].amount)
      setValue('monts_number', response[1].count)
      setValue('start_month', response[1].start_month)
      if (response[1].dates.length > 0) {
        setValue('date_before_months', response[1].dates[0].date)
        setValue('discount_before_months', response[1].dates[0].value)
        setValue('unity_type_discount_months', response[1].dates[0].unity_type)

        if (response.length > 0) {
          setIdInscription(response[0].id)
          setIdMonths(response[1].id)
          setValue('amount_inscription', response[0].amount)
          if (response[0].dates.length > 0) {
            setValue('date_before_inscription', response[0].dates[0].date)
            setValue('discount_before_incription', response[0].dates[0].value)
            setValue('unity_type_discount_inscription', response[0].dates[0].unity_type)

            setValue('date_limit_inscription', response[0].dates[1].date)
            setValue('interest_amount_inscription', response[0].dates[1].value)
            setValue('unity_type_interest_inscription', response[0].dates[1].unity_type)
          }
          setValue('amount_months', response[1].amount)
          setValue('monts_number', response[1].count)
          setValue('start_month', response[1].start_month)
          if (response[1].dates.length > 0) {
            setValue('date_before_months', response[1].dates[0].date)
            setValue('discount_before_months', response[1].dates[0].value)
            setValue('unity_type_discount_months', response[1].dates[0].unity_type)

            setValue('date_limit_months', response[1].dates[1].date)
            setValue('interest_amount_months', response[1].dates[1].value)
            setValue('unity_type_interest_inscription', response[1].dates[1].unity_type)
          }
          setSectionsData(response)
        }
      }

      setSectionsData(response)
    } catch (error) {
      handleErrors(error)
    }
  }

  const loadValuesFieldsForm = async (response) => {
    try {
      if (response.length === 0) {
        response = await getdataAmountFromFormField()
      }

      setValue('amount_months', response[1].amount)
      setValue('monts_number', response[1].count)
      setValue('start_month', response[1].start_month)
      if (response[1].dates.length > 0) {
        setValue('date_before_months', response[1].dates[0].date)
        setValue('discount_before_months', response[1].dates[0].value)
        setValue('unity_type_discount_months', response[1].dates[0].unity_type)

        if (response.length > 0) {
          setIdInscription(response[0].id)
          setIdMonths(response[1].id)
          setValue('amount_inscription', response[0].amount)
          if (response[0].dates.length > 0) {
            setValue('date_before_inscription', response[0].dates[0].date)
            setValue('discount_before_incription', response[0].dates[0].value)
            setValue('unity_type_discount_inscription', response[0].dates[0].unity_type)

            setValue('date_limit_inscription', response[0].dates[1].date)
            setValue('interest_amount_inscription', response[0].dates[1].value)
            setValue('unity_type_interest_inscription', response[0].dates[1].unity_type)
          }
          setValue('amount_months', response[1].amount)
          setValue('monts_number', response[1].count)
          setValue('start_month', response[1].start_month)
          if (response[1].dates.length > 0) {
            setValue('date_before_months', response[1].dates[0].date)
            setValue('discount_before_months', response[1].dates[0].value)
            setValue('unity_type_discount_months', response[1].dates[0].unity_type)

            setValue('date_limit_months', response[1].dates[1].date)
            setValue('interest_amount_months', response[1].dates[1].value)
            setValue('unity_type_interest_inscription', response[1].dates[1].unity_type)
          }
          setSectionsData(response)
        }
      }

      setSectionsData(response)
    } catch (error) {

    }
  }

  const getdataAmountFromFormField = async () => {
    const datesInscription = [
      {
        date: getValues('date_before_inscription') ?? '',
        value: getValues('discount_before_incription') ?? 0.0,
        concept_type: 3,
        unity_type: getValues('unity_type_discount_inscription') ?? 1
      },
      {
        date: getValues('date_limit_inscription') ?? '',
        value: getValues('interest_amount_inscription') ?? 0.0,
        concept_type: 4,
        unity_type: getValues('unity_type_interest_inscription') ?? 1
      }
    ]
    const datesMonths = [
      {
        date: getValues('date_before_months') ?? '',
        value: getValues('discount_before_months') ?? 0.0,
        concept_type: 3,
        unity_type: getValues('unity_type_discount_months') ?? 1
      },
      {
        date: getValues('date_limit_months') ?? '',
        value: getValues('interest_amount_months') ?? 0.0,
        concept_type: 4,
        unity_type: getValues('unity_type_discount_months') ?? 1
      }
    ]
    const inscription = {
      id: idInscription,
      description: 'Inscripción',
      amount: getValues('amount_inscription') ?? 0.0,
      count: 1,
      concept_type: 2,
      start_month: null,
      dates: datesInscription
    }
    const months = {
      id: idMonths,
      concept_type: 1,
      description: 'Mensualidad',
      amount: getValues('amount_months') ?? 0.0,
      count: getValues('monts_number') ?? 12,
      start_month: getValues('start_month') ?? null,
      dates: datesMonths
    }
    return [inscription, months]
  }

  const savePaymentsDataInSection = async (idSection) => {
    const dataPayments = await getdataAmountFromFormField()
    await SchoolsSectionsService.createOrEditSettingsPays(idSchool, idSection, dataPayments)
  }

  const savePaymentsDataInSectionCycle = async (idSection, idCycle) => {
    const dataPayments = await getdataAmountFromFormField()
    if (isEditSettingsPays) {
      await SchoolsCyclesService.editPaysSettings(idSchool, idCycle, idSection, dataPayments)
    } else {
      await SchoolsCyclesService.createPaysSettings(idSchool, idCycle, idSection)
    }
  }

  return {
    initHook,
    savePaymentsDataInSection,
    setIsEditSettingsPays,
    loadValuesFieldsForm,
    savePaymentsDataInSectionCycle,
    isEditSettingsPays,
    sectionsData
  }
}

export default useCreatePaysSectionsHandling
