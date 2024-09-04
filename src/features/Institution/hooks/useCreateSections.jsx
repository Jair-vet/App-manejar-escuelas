import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import SchoolsSectionsService from '@/services/schoolsSections.service'
/**
 * HOOK QUE MANEJA  LOGICA PARA  CREAR SECCIONES y EDITAR
 *
 * @param {string} formMethods - funciones de react hooks a utilizar  en  el hook, ejemplo setValue.
 * @returns {Map} - Un objeto con propiedades y métodos relacionados con el hook.
 */

const useCreateSectionsHandling = (formMethods, handleErrors) => {
  const [sections, setSections] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [editLevel, setEditLevel] = useState('')
  const [selectLevelKey, setKeySelectLevel] = useState('')

  // Grupos seleccionados a mostrar
  const [groupsSelected, setGroupsSelected] = useState([])
  const [isAddGroup, setIsAddGroup] = useState(false)
  const [idEditItem, setIdEditItem] = useState('')

  const [mattersSelected, setMattersSelected] = useState([])

  const [descriptionsPeriodics, setDescriptionsPeriodics] = useState(['Bimestre', 'Cautrimestre', 'Semestre', 'Otro (especifique)'])

  const [isEditMatter, setIsEditMatter] = useState(false)
  const [matterSelected, setMatterSelected] = useState({})
  const [isSeparatedMatter, setIsSeparatedMatter] = useState(false)
  // const [isSelectAll, setIsSelectAll] = useState(true)
  // const dispatch = useDispatch()
  // const idSchool = localStorage.getItem(lsSchoolId)
  // const {
  //   createCycle,
  //   getGroups,
  //   getMatters
  // } = useCreateCycleHandling(formMethods, handleErrors)
  const { setValue, getValues, setError, reset } = formMethods

  const loadDefaultDescriptionsPeriodics = () => {
    setDescriptionsPeriodics(['Bimestre', 'Cautrimestre', 'Semestre', 'Otro (especifique)'])
  }
  // =========== EDIT SECCION  =============
  const editSection = async (idSchool, idSection) => {
    setIsEdit(true)
    loadDefaultDescriptionsPeriodics()
    const response = await SchoolsSectionsService.getSection(idSchool, idSection)
    const sects = new Map()
    const levels = []
    if (response.levels) {
      for (let index = 0; index < response.levels.length; index++) {
        const level = {
          name: response.levels[index].name,
          id: response.levels[index].id,
          groups: response.levels[index].groups,
          matters: response.levels[index].matters
        }
        levels.push(level)
      }
      if (response.levels.length > 0) {
        const keyFormart = response.id + '_' + 0
        setKeySelectLevel(keyFormart)
        setGroupsSelected(response.levels[0].groups)
        setMattersSelected(response.levels[0].matters)
      }
    }

    // const payments = await SchoolsSectionsService.getPaymentsSection(idSchool, idSection)
    sects.set(response.id,
      {
        name: response.name,
        academic_term: response.academic_term,
        academic_term_count: response.academic_term_count,
        maximum_rating: response.maximum_rating,
        levels
      })
    setSections(sects)
    const select = sects.get(idSection)
    const currentItems = descriptionsPeriodics
    const validate = select.academic_term in currentItems
    if (!validate) {
      currentItems.push(select.academic_term)
      setDescriptionsPeriodics(currentItems)
    }
    setValue(`name-${response.id}`, response.name)
    setValue(`max-${response.id}`, response.maximum_rating)
    setValue(`academic_term-${response.id}`, response.academic_term)
    setValue(`academic_term_count-${response.id}`, response.academic_term_count)

    // ============ load data payments in fields form ============

    // SE MOVIO DE tab
    // if (payments.length > 0) {
    //   setValue('amount_inscription', payments[0].amount)
    //   if (payments[0].dates.length > 0) {
    //     setValue('date_before_inscription', payments[0].dates[0].date)
    //     setValue('discount_before_incription', payments[0].dates[0].value)
    //     setValue('unity_type_discount_inscription', payments[0].dates[0].unity_type)

    //     setValue('date_limit_inscription', payments[0].dates[1].date)
    //     setValue('interest_amount_inscription', payments[0].dates[1].value)
    //     setValue('unity_type_interest_inscription', payments[0].dates[1].unity_type)
    //   }
    //   setValue('amount_months', payments[1].amount)
    //   setValue('monts_number', payments[1].count)
    //   if (payments[1].dates.length > 0) {
    //     setValue('date_before_months', payments[1].dates[0].date)
    //     setValue('discount_before_months', payments[1].dates[0].value)
    //     setValue('unity_type_discount_months', payments[1].dates[0].unity_type)

    //     setValue('date_limit_months', payments[1].dates[1].date)
    //     setValue('interest_amount_months', payments[1].dates[1].value)
    //     setValue('unity_type_discount_months', payments[1].dates[1].unity_type)
    //   }
    // }
  }
  const viewEditFieldLevel = async (key, indexLevel) => {
    const tempSections = new Map(sections)
    const selectedSection = tempSections.get(key)
    const level = selectedSection.levels[indexLevel]
    const label = key + '_' + indexLevel
    setEditLevel(label)
    setValue(label, level.name)
  }

  const handleKeyPressSaveNewNameLevel = async (event) => {
    if (event.key === 'Enter') {
      setEditLevel('')
      const value = getValues(editLevel)
      if (value === '') {
        return
      }
      const keysSplit = editLevel.split('_')
      const key = Number(keysSplit[0])
      const indexLevel = Number(keysSplit[1])
      const tempSections = new Map(sections)
      const selectedSection = tempSections.get(key)
      const levels = selectedSection.levels
      const level = levels[indexLevel]
      level.name = value
      setSections(tempSections)
      setEditLevel('')
    }
  }

  // const getLevelSelect = () =>{
  //   const tempSections = new Map(sections)
  //   const keysSplit = selectLevelKey.split('_')
  //   const key = Number(keysSplit[0])
  //   const indexLevel = Number(keysSplit[1])
  //   const selectedSection = tempSections.get(key)
  //   const levels = selectedSection.levels
  //   const level = levels[indexLevel]

  //   return level
  // }
  // =========== EDIT SECCION  =============

  const initHook = async () => {
    try {
      setIsEdit(false)
      loadDefaultDescriptionsPeriodics()
      const sects = new Map()
      const idSchool = localStorage.getItem(lsSchoolId)
      const sectionsSchool = await SchoolsSectionsService.getSections(idSchool, 1)
      console.log(sectionsSchool.length)
      if (sectionsSchool.length === 0) {
        reset()
        setGroupsSelected([])
        setMattersSelected([])
        const groups = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }]
        const matters = []
        // const payments = getdataAmountFromFormField()
        sects.set(0, { name: 'Maternal', maximum_rating: 10, academic_term: 'Trimestre', academic_term_count: 3, levels: [{ name: '1', groups, matters }, { name: '2', groups, matters }, { name: '3', groups, matters }] })
        sects.set(1, { name: 'Preescolar', maximum_rating: 10, academic_term: 'Trimestre', academic_term_count: 3, levels: [{ name: '1', groups, matters }, { name: '2', groups, matters }, { name: '3', groups, matters }] })
        sects.set(2, { name: 'Primaria', maximum_rating: 10, academic_term: 'Trimestre', academic_term_count: 3, count_partial: 3, levels: [{ name: '1', groups, matters }, { name: '2', groups, matters }, { name: '3', groups, matters }, { name: '4', groups, matters }, { name: '5', groups, matters }, { name: '6', groups, matters }] })
        sects.set(3, { name: 'Secundaria', maximum_rating: 10, academic_term: 'Trimestre', academic_term_count: 3, count_partial: 3, levels: [{ name: '1', groups, matters }, { name: '2', groups, matters }, { name: '3', groups, matters }] })
        sects.set(4, {
          name: 'Bachillerato',
          maximum_rating: 10,
          academic_term: 'Trimestre',
          academic_term_count: 3,
          levels: [
            { name: '1', groups, matters },
            { name: '2', groups, matters },
            { name: '3', groups, matters },
            { name: '4', groups, matters },
            { name: '5', groups, matters },
            { name: '6', groups, matters }
          ]
        })
        setValue(`name-${0}`, 'Maternal')
        setValue(`name-${1}`, 'Preescolar')
        setValue(`name-${2}`, 'Primaria')
        setValue(`name-${3}`, 'Secundaria')
        setValue(`name-${4}`, 'Bachillerato')

        setValue(`max-${0}`, 10)
        setValue(`max-${1}`, 10)
        setValue(`max-${2}`, 10)
        setValue(`max-${3}`, 10)
        setValue(`max-${4}`, 10)
        setValue(`academic_term-${0}`, 'Trimestre')
        setValue(`academic_term-${1}`, 'Trimestre')
        setValue(`academic_term-${2}`, 'Trimestre')
        setValue(`academic_term-${3}`, 'Trimestre')
        setValue(`academic_term-${4}`, 'Trimestre')

        setValue(`academic_term_count-${0}`, 4)
        setValue(`academic_term_count-${1}`, 4)
        setValue(`academic_term_count-${2}`, 4)
        setValue(`academic_term_count-${3}`, 4)
        setValue(`academic_term_count-${4}`, 4)
        setSections(sects)
        setKeySelectLevel('')
      } else {
        reset()
        // setValue('amount_inscription', 0.0)
        // const payments = getdataAmountFromFormField()
        sects.set(0, { name: '', academic_term: 'Trimestre', academic_term_count: 3, levels: [] })
        setValue(`name-${0}`, '')
        setValue(`academic_term-${0}`, 'Trimestre')
        setValue(`academic_term_count-${0}`, 4)
        setValue(`max-${0}`, 10)
        setSections(sects)
      }
    } catch (e) {
      handleErrors(e)
    }
  }

  const addSection = (key) => {
    try {
      const tempSections = new Map(sections)
      const keyCurrent = key
      const current = tempSections.get(keyCurrent)
      const nameSectionInput = getValues(`name-${keyCurrent}`)
      const maxSectionInput = getValues(`max-${keyCurrent}`)

      current.name = nameSectionInput
      current.maximum_rating = maxSectionInput
      if (nameSectionInput === '') {
        setError(`name-${keyCurrent}`, { type: 'manual', message: 'Ingresa nombre de la sección' })
        return
      }
      if (maxSectionInput === '') {
        setError(`max-${keyCurrent}`, { type: 'manual', message: 'Ingresa el máximo de calificación' })
        return
      }
      if (current.levels.length === 0) {
        throw new Error('Agrega mínimo un grado a la sección')
      }
      const newKey = tempSections.size
      setError(`name-${keyCurrent}`, { type: 'manual', message: '' })
      setError(`name-${newKey}`, { type: 'manual', message: '' })
      tempSections.set(newKey, { name: '', levels: [] })
      setSections(tempSections)
    } catch (e) {
      handleErrors(e)
    }
  }

  const deleteSection = (key) => {
    const tempSections = new Map(sections)
    if (tempSections.size === 1) {
      toast.success('No se puede eliminar su unica sección')
      return
    }
    tempSections.delete(key)
    setSections(tempSections)
    toast.success('Seccion eliminada')
  }

  const handleKeyPress = (event, key) => {
    if (event.key === 'Enter') {
      addLevel(key)
    }
  }
  // =================== LEVELS ===================
  const addLevel = (key) => {
    try {
      const nameField = `level-${key}`
      const value = getValues(nameField)
      if (value === '') {
        setError(nameField, { type: 'manual', message: 'El nombre del grupo no puede ir vacio' })
        return
      }
      setError(nameField, { type: 'manual', message: '' })

      const tempSections = new Map(sections)
      const selectedSection = tempSections.get(key)
      const tempLevels = [...selectedSection.levels]
      const groups = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }]
      const matters = []

      tempLevels.push({ name: value, groups, matters })
      selectedSection.levels = tempLevels

      tempSections.set(key, selectedSection)
      setSections(tempSections)
      setValue(nameField, '')
      setKeySelectLevel('')
      setMattersSelected(matters)
    } catch (error) {
      handleErrors(error)
    }
  }

  const removeLevel = (key, index) => {
    const tempSections = new Map(sections)
    const selectedSection = tempSections.get(key)
    const tempLevels = [...selectedSection.levels]
    tempLevels.splice(index, 1)
    selectedSection.levels = tempLevels
    setSections(tempSections)
    setKeySelectLevel('')
  }

  const validateMatters = (levels) => {
    for (let index = 0; index < levels.length; index++) {
      if (levels[index].matters.length === 0) {
        throw new Error(
          'Agrega materias a todos tus grados'
        )
      }
    }
  }

  const validateFieldsSection = (key, section) => {
    const valueName = getValues(`name-${key}`)
    // NAME SECTION
    if (section.name === '') {
      if (valueName === '') {
        setError(`name-${key}`, { type: 'manual', message: 'Ingresa nombre de la sección' })
        throw new Error(
          'Ingresa nombre de la sección'
        )
      }
      section.name = valueName
    }
    // MAX QUALIFICATION SECTION
    const valueMax = getValues(`max-${key}`)
    if (section.maximum_rating === '') {
      if (valueMax === '') {
        setError(`max-${key}`, { type: 'manual', message: 'Ingresa el máximo de calificación' })
        throw new Error(
          'Ingresa el máximo de calificación'
        )
      }
    }
    // LEVELS SECTION
    if (section.levels.length === 0) {
      throw new Error(
        'Agrega grado a las secciónes'
      )
    }
  }

  const createOrEditSections = async (idSection, isCreateCycle) => {
    const id = localStorage.getItem(lsSchoolId)
    const requests = []
    const sectionsKeys = Array.from(sections.keys())
    sectionsKeys.forEach(key => {
      const section = sections.get(key)
      const valueName = getValues(`name-${key}`)
      const valuePeriodicName = getValues(`academic_term-${key}`)
      const valuePeriodicCount = getValues(`academic_term_count-${key}`)

      validateFieldsSection(key, section)
      // if (section.name === '') {
      //   if (valueName === '') {
      //     setError(`name-${key}`, { type: 'manual', message: 'Ingresa nombre de la sección' })
      //     throw new Error(
      //       'Ingresa nombre de la sección'
      //     )
      //   }
      //   section.name = valueName
      // }
      section.name = valueName
      section.academic_term_count = valuePeriodicCount
      section.academic_term = valuePeriodicName

      const valueMax = getValues(`max-${key}`)
      // if (section.maximum_rating === '') {
      //   if (valueMax === '') {
      //     setError(`max-${key}`, { type: 'manual', message: 'Ingresa el máximo de calificación' })
      //     throw new Error(
      //       'Ingresa el máximo de calificación'
      //     )
      //   }
      //   section.maximum_rating = valueMax
      // }
      section.maximum_rating = valueMax

      // if (section.levels.length === 0) {
      //   throw new Error(
      //     'Agrega grado a las secciónes'
      //   )
      // }
      validateMatters(section.levels)
      section.start = ''
      section.end = ''
      // const paymentsValues = getdataAmountFromFormField(idSection)
      // section.payments = paymentsValues
      if (isEdit === true) {
        // const valueMax = getValues(`max-${key}`)
        // const sectionName = getValues(`name-${key}`)
        // if (sectionName === '') {
        // setError(`name-${key}`, { type: 'manual', message: 'El nombre de sección no puede ir vacio' })
        // throw new Error(
        // 'El nombre de sección no puede ir vacio'
        // )
        // }
        // section.name = sectionName
        // if (valueMax === '') {
        //   setError(`max-${key}`, { type: 'manual', message: 'Ingresa el máximo de calificación' })
        //   throw new Error(
        //     'Ingresa el máximo de calificación'
        //   )
        // }
        // section.maximum_rating = valueMax
        // await SchoolsSectionsService.editSection(id, section, idSection)
        // return () => SchoolsSectionsService.editSection(id, section, idSection)
        requests.push(async () => await SchoolsSectionsService.editSection(id, section, idSection))
      } else {
        // section.create_cycle = createCycle
        if (isCreateCycle) {
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
          if (end < start) {
            setError('end', { type: 'manual', message: 'La fecha no puede ser menor a la fecha de inicio' })
            throw new Error(
              'La fecha no puede ser menor a la fecha de inicio'
            )
          }
          // section.start = start
          // section.end = end
        }
        requests.push(async () => await SchoolsSectionsService.createSection(id, section))
        // await SchoolsSectionsService.createSection(id, section)
      }
    })
    // if (isEdit !== true) {
    await Promise.all(requests.map(request => request()))
    // }
    // await Promise.all(promises)
    // await SchoolsService.finishSettingsSchool(id)
    // if (isCreateCycle) {
    // const start = getValues('start')
    // const end = getValues('end')
    // const response = await SchoolsGroupsService.getGroups(idSchool, 1)
    // alert(response.length)
    // await getGroups(response, true)
    // await getMatters()
    // const response = await SchoolsGroupsService.getGroups(id, 1)
    // await getGroups(response, true)
    // await getMatters()
    // await createCycle(start, end, true, true)
    // toast.success('Secciones y ciclo escolar agregado con exito')
    // } else {
    // toast.success('Secciones agregadas con exito')
    // }
  }
  useEffect(() => {
    // Limpia
    return () => {
    }
  }, [])

  // =========== GRUPOS ===========
  const selectedGroupsAndMattersByLevel = (key, index) => {
    // Selecciona grupos de grado
    // const exist = groupsForCreate.has(keyLevel)
    // const items = new Map(groupsForCreate)
    // setKeySelectLevel(keyLevel)
    // if (exist) {
    //   const selected = groupsForCreate.get(keyLevel)
    //   setGroupsSelected(selected)
    //   // return
    // }

    // const groups = [{ name: 'A' }, { name: 'B' }, { name: 'C' }]
    // items.set(keyLevel, groups)
    // setGroupsForCreate(items)
    // setGroupsSelected(groups)
    const tempSections = new Map(sections)
    const selectedSection = tempSections.get(key)
    const levels = selectedSection.levels
    const level = levels[index]
    setGroupsSelected(level.groups)
    setMattersSelected(level.matters)
    setKeySelectLevel(key + '_' + index)
  }

  const basicValidateGroupName = (groupsSelect, name, fieldName) => {
    if (name === '' || name === ' ') {
      setError(fieldName, { type: 'manual', message: 'El nombre no puede llevar espacios' })
      return false
    }
    const pattern2 = /^[^\s]+$/
    if (!name.match(pattern2)) {
      setError(fieldName, { type: 'manual', message: 'El campo no puede contener espacios' })
      return false
    }
    if (groupsSelect.some(objeto => JSON.stringify(objeto) === JSON.stringify({ name }))) {
      setError(fieldName, { type: 'manual', message: 'El grupo ya existe' })
      return false
    }
    setError(fieldName, { type: 'manual', message: '' })
    return true
  }
  const addGroup = (name) => {
    name = name.toUpperCase()
    const tempSections = new Map(sections)
    const keysSplit = selectLevelKey.split('_')
    const key = Number(keysSplit[0])
    const indexLevel = Number(keysSplit[1])
    const selectedSection = tempSections.get(key)
    const levels = selectedSection.levels
    const level = levels[indexLevel]
    const resultValidate = basicValidateGroupName(level.groups, name, 'name-group')
    if (!resultValidate) {
      return
    }
    const newGroups = [...level.groups, { name }]
    level.groups = newGroups
    setSections(tempSections)
    setValue('name-group', '')
    setIsAddGroup(false)
    setGroupsSelected(level.groups)
    // const exist = groupsForCreate.has(keyLevel)
    // const items = new Map()
    // name = name.toUpperCase()
    // if (exist) {
    //   const groupsSelect = groupsForCreate.get(keyLevel)
    //   const resultValidate = basicValidateGroupName(groupsSelect, name, 'name-group')
    //   if (!resultValidate) {
    //     return
    //   }
    //   groupsSelect.push({ name })
    //   items.set(keyLevel, groupsSelect)
    //   setGroupsForCreate(items)
    //   setGroupsSelected(groupsSelect)
    //   setIsAddGroup(false)
    //   setValue('name-group', '')
    // }
  }
  const removeGroup = (index) => {
    const keysSplit = selectLevelKey.split('_')
    const key = Number(keysSplit[0])
    const indexLevel = Number(keysSplit[1])
    const tempSections = new Map(sections)

    const selectedSection = { ...tempSections.get(key) }
    // const selectedSection = tempSections.get(key)
    // const levels = selectedSection.levels
    const levels = [...selectedSection.levels]
    const level = { ...levels[indexLevel] }
    // const level = levels[indexLevel]
    console.log(keysSplit)
    console.log(level)

    // const groupsSelect = level.groups
    const groupsSelect = [...level.groups]

    if (groupsSelect.length === 1) {
      toast.error('No se puede eliminar su unico grupo')
      return
    }
    groupsSelect.splice(index, 1)
    // Actualizar las copias en la estructura temporal
    level.groups = groupsSelect
    levels[indexLevel] = level
    selectedSection.levels = levels
    tempSections.set(key, selectedSection)

    // Actualizar el estado
    setSections(tempSections)
    setGroupsSelected(groupsSelect)
    setIdEditItem('')
    // setSections(tempSections)
    // setGroupsSelected(groupsSelect)
    // setIdEditItem('')
  }

  const viewEditGroup = (index) => {
    setIsAddGroup(false)
    const keysSplit = selectLevelKey.split('_')
    const key = Number(keysSplit[0])
    const indexLevel = Number(keysSplit[1])
    const tempSections = new Map(sections)
    const selectedSection = tempSections.get(key)
    const levels = selectedSection.levels
    const level = levels[indexLevel]
    const groupsSelect = level.groups
    setValue('edit-group', groupsSelect[index].name)
    setIdEditItem(index)
  }
  const handleKeyEditGroup = (event, index) => {
    if (event.key === 'Enter') {
      const name = getValues('edit-group').toUpperCase()
      const keysSplit = selectLevelKey.split('_')
      const key = Number(keysSplit[0])
      const indexLevel = Number(keysSplit[1])
      const tempSections = new Map(sections)
      const selectedSection = tempSections.get(key)
      const levels = selectedSection.levels
      const level = levels[indexLevel]
      const groupsSelect = level.groups
      const validateResult = basicValidateGroupName(groupsSelect, name, 'edit-group')
      if (!validateResult) {
        return
      }
      groupsSelect[index].name = name
      setGroupsSelected(groupsSelect)
      setIdEditItem('')
    }
  }
  const handleKeyPressSaveNewNameGroup = (event) => {
    if (event.key === 'Enter') {
      const name = getValues('name-group')
      addGroup(name)
    }
  }

  // =========== MATTERS ===========
  const basicValidateMattersName = (groupsSelect, name, fieldName) => {
    if (name === '' || name === ' ') {
      setError(fieldName, { type: 'manual', message: 'El nombre no puede llevar espacios' })
      return false
    }
    if (groupsSelect.some(objeto => JSON.stringify(objeto) === JSON.stringify({ name }))) {
      setError(fieldName, { type: 'manual', message: 'La materia ya existe' })
      return false
    }
    setError(fieldName, { type: 'manual', message: '' })
    return true
  }
  // const handleKeyPressSaveNewNameMatter = (event) => {
  //   if (event.key === 'Enter') {
  //     const name = getValues('nameMatter')
  //     addMatter(name)
  //   }
  // }

  // AGREGA ASPECTO A CALIFICAR DE MATERIA
  const handleSeparateMatterCheckBox = (value) => {
    setIsSeparatedMatter(value)
  }
  const addAspectMatter = async () => {
    const tempSections = new Map(sections)
    const keysSplit = selectLevelKey.split('_')
    const key = Number(keysSplit[0])
    const indexLevel = Number(keysSplit[1])
    const selectedSection = tempSections.get(key)
    const levels = selectedSection.levels
    const level = levels[indexLevel]
    const matters = level.matters
    const matterEdit = matters.find(item => item.id === matterSelected.id)
    if (matterEdit) {
      const valueAspectInput = getValues('description')
      if (valueAspectInput === '') {
        setError('description', { type: 'manual', message: 'Ingresa una descripción' })
        // new Error()
        return
      }
      const count = matterEdit.aspects.length + 1
      matterEdit.aspects = [...matterEdit.aspects, { id: count, description: valueAspectInput }]
    }
    setSections(tempSections)
    // setMatterSelected()
    setValue('description', '')
  }

  const removeAspect = (index) => {
    const tempSections = new Map(sections)
    const keysSplit = selectLevelKey.split('_')
    const key = Number(keysSplit[0])
    const indexLevel = Number(keysSplit[1])
    const selectedSection = tempSections.get(key)
    const levels = selectedSection.levels
    const level = levels[indexLevel]
    const matters = level.matters
    const matterEdit = matters.find(item => item.id === matterSelected.id)
    const aspectsSelect = [...matterEdit.aspects]
    if (matterEdit) {
      aspectsSelect.splice(index, 1)
      matterEdit.aspects = aspectsSelect
    }
    setSections(tempSections)
  }
  // const editAspect = (index => {

  // }

  // CREA EL ELEMENTO AL QUERER AGREGAR NUEVA MATERIA

  const createRegisterNewMatter = () => {
    const tempSections = new Map(sections)
    const keysSplit = selectLevelKey.split('_')
    const key = Number(keysSplit[0])
    const indexLevel = Number(keysSplit[1])
    const selectedSection = tempSections.get(key)
    const levels = selectedSection.levels
    const level = levels[indexLevel]
    const count = level.matters.length + 1

    const matter = {
      id: count.toString() + '-0',
      name: '',
      separate_on_report_card: isSeparatedMatter,
      aspects: []
    }
    level.matters = [...level.matters, matter]
    setSections(tempSections)
    setValue('nameMatter', '')
    setMatterSelected(matter)
  }

  const addMatter = (name, typeOperation) => {
    const tempSections = new Map(sections)
    const keysSplit = selectLevelKey.split('_')
    const key = Number(keysSplit[0])
    const indexLevel = Number(keysSplit[1])
    const selectedSection = tempSections.get(key)
    const levels = selectedSection.levels
    const level = levels[indexLevel]
    const resultValidateName = basicValidateMattersName(level.matters, name, 'nameMatter')
    if (!resultValidateName) {
      return
    }
    const matters = level.matters
    const matterEdit = matters.find(item => item.id === matterSelected.id)
    // debugger
    if (matterEdit) {
      matterEdit.name = name
      matterEdit.type_operation = typeOperation
      matterEdit.separate_on_report_card = isSeparatedMatter
      // const valueAspectInput = getValues('description')
      // const count = matterEdit.aspects.length + 1
      // debugger
      // matterEdit.aspects = [...matterEdit.aspects, { id: count.toString() + '-0', description: valueAspectInput }]
      // debugger
    }
    setSections(tempSections)
    setValue('nameMatter', '')
    setValue('type_operation', 'average')
    setIsAddGroup(false)
    setMattersSelected(level.matters)
  }
  const viewEdiMatter = (index) => {
    setIsAddGroup(false)
    const keysSplit = selectLevelKey.split('_')
    const key = Number(keysSplit[0])
    const indexLevel = Number(keysSplit[1])
    const tempSections = new Map(sections)
    const selectedSection = tempSections.get(key)
    const levels = selectedSection.levels
    const level = levels[indexLevel]
    const select = level.matters
    setValue('edit-matter', select[index].name)
    setIdEditItem(index)
  }
  const handleKeyEditMatter = (event, index) => {
    if (event.key === 'Enter') {
      const name = getValues('edit-matter')
      const keysSplit = selectLevelKey.split('_')
      const key = Number(keysSplit[0])
      const indexLevel = Number(keysSplit[1])
      const tempSections = new Map(sections)
      const selectedSection = tempSections.get(key)
      const levels = selectedSection.levels
      const level = levels[indexLevel]
      const select = level.matters
      const validateResult = basicValidateMattersName(select, name, 'edit-matter')
      if (!validateResult) {
        return
      }
      select[index].name = name
      setMattersSelected(select)
      setIdEditItem('')
    }
  }

  const removeMatter = (index) => {
    const keysSplit = selectLevelKey.split('_')
    const key = Number(keysSplit[0])
    const indexLevel = Number(keysSplit[1])
    const tempSections = new Map(sections)
    const selectedSection = tempSections.get(key)
    const levels = selectedSection.levels
    const level = levels[indexLevel]
    const select = level.matters
    if (select.length === 1) {
      toast.error('No se puede eliminar su unica materia')
      return
    }
    select.splice(index, 1)
    setSections(tempSections)
    setIdEditItem('')
  }
  return {
    initHook,
    sections,
    handleKeyPress,
    removeLevel,
    deleteSection,
    addSection,
    addLevel,
    createOrEditSections,
    editSection,
    isEdit,
    viewEditFieldLevel,
    editLevel,
    handleKeyPressSaveNewNameLevel,
    groupsSelected,
    selectedGroupsAndMattersByLevel,
    addGroup,
    selectLevelKey,
    isAddGroup,
    setIsAddGroup,
    handleKeyPressSaveNewNameGroup,
    removeGroup,
    handleKeyEditGroup,
    viewEditGroup,
    idEditItem,
    setIdEditItem,
    setGroupsSelected,
    setKeySelectLevel,
    // handleKeyPressSaveNewNameMatter,
    mattersSelected,
    addMatter,
    viewEdiMatter,
    handleKeyEditMatter,
    removeMatter,
    descriptionsPeriodics,
    setDescriptionsPeriodics,
    isEditMatter,
    setIsEditMatter,
    matterSelected,
    setMatterSelected,
    addAspectMatter,
    removeAspect,
    createRegisterNewMatter,
    handleSeparateMatterCheckBox,
    isSeparatedMatter
  }
}

export default useCreateSectionsHandling
