import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsMattersService from '@/services/schoolsMatters.service'
/**
 * HOOK QUE MANEJA LOGICA PARA  CREAR CICLO ESCOLAR
 *
 * @param {string} formMethods - funciones de react hooks a utilizar en  el hook, ejemplo setValue.
 * @returns {Map} - Un objeto con propiedades y métodos relacionados con el hook.
 */

const useCreateCycleHandling = (formMethods, handleErrors) => {
  // const levelsStore = useSelector((state) => state.levels)
  // const [sections, setSections] = useState([])
  // const [sectionsMatters, setSectionsMatters] = useState([])
  const idSchool = localStorage.getItem(lsSchoolId)
  const [groupsFormat, setGroups] = useState(new Map())
  const [totalGroupsSelected, setTotalGroupsSelected] = useState(groupsFormat.size)
  const [matters, setMatters] = useState(new Map())
  const [groupsView, setGroupsView] = useState(new Map())
  const [mattersView, setMattersView] = useState(new Map())
  const [totalMattersSelected, setTotalMattersSelected] = useState(matters.size)
  const [valueAllCheckBox, setValueAllCheckBox] = useState(true)
  const [levelsSelected, setLevelsSelected] = useState(new Map())

  // const [GrSeatch, setGroupsSearch] = useState(new Map())

  // const [sectionsMatters] = useState([])
  // let levelsIds = []

  const [isSelectAll, setIsSelectAll] = useState(true)
  // const dispatch = useDispatch()
  const { setError } = formMethods
  // ================== SECCIONES MATERIAS==================

  // const getSectionsMattersByLevels = async (sections) => {
  //   try {
  //     const items = new Map()
  //     const sectionsMat = sections
  //     for (let index = 0; index < sectionsMat.length; index++) {
  //       const element = sectionsMat[index]
  //       const levels = await getLevelsWithMatters(element.levels, true)
  //       items.set(element.id, {
  //         id: element.id,
  //         name: element.name,
  //         value: true,
  //         isExpanded: true,
  //         levels
  //       })
  //     }
  //     // dispatch(changeLevels({ levelsSelected: levelsIds }))
  //     // setSectionsMatters(items)
  //     // dispatch(changeLevelsWithMatters({ levelsWithMatters: items }))
  //     setSectionsMatters(items)

  //     // for (let index = 0; index < response.length; index++) {
  //     //   const element = array[index]
  //     //   items.set()
  //     // }
  //   } catch (e) {

  //   }
  // }
  // const getLevelsWithMatters = async (levels) => {
  //   // const response = await SchoolsSectionsService.getSectionsWithGroups(id, 1)
  //   const items = new Map()
  //   for (let index = 0; index < levels.length; index++) {
  //     const element = levels[index]
  //     const matters = await getMatters(element.matters, true)
  //     items.set(element.id, {
  //       id: element.id,
  //       name: element.name,
  //       value: true,
  //       isExpanded: true,
  //       matters
  //     })
  //   }
  //   return items
  // }

  // const getMatters = async (matters) => {
  //   // const response = await SchoolsSectionsService.getSectionsWithGroups(id, 1)
  //   const items = new Map()
  //   for (let index = 0; index < matters.length; index++) {
  //     const element = matters[index]
  //     // const levels = await getLevels(element.levels, true)
  //     items.set(element.id, new MatterModel(element.id, true, element.name))
  //   }
  //   return items
  // }
  // const getMattersFormat = async () => {
  //   const sectionsMat = levelsStore.levelsWithMatters
  //   const items = []
  //   for (let index = 0; index < sectionsMat.length; index++) {
  //     const element = sectionsMat[index]
  //     const levels = Array.from(element.levels.values())
  //     for (let index = 0; index < levels.length; index++) {
  //       const level = levels[index]
  //       const matters = Array.from(level.matters.values())
  //       for (let index = 0; index < matters.length; index++) {
  //         const matter = matters[index]
  //         if (matter.value === true) {
  //           items.push({
  //             id_matter: matter.id,
  //             name: matter.name
  //           })
  //         }
  //       }
  //     }
  //   }
  //   return items
  // }

  // ================== SECCIONES ==================
  // const selectOneMatter = async (key, KeyLevel, keyMatter) => {
  //   // const response = await SchoolsSectionsService.getSectionsWithGroups(id, 1)
  //   const items = new Map(sectionsMatters)
  //   const levels = items.get(key).levels
  //   const matters = levels.get(KeyLevel).matters
  //   const matterSelected = matters.get(keyMatter)
  //   const newValue = !matterSelected.value
  //   matterSelected.value = newValue
  //   // dispatch(changeLevelsWithMatters({ levelsWithMatters: items }))
  //   setSectionsMatters(items)
  // }

  // ================== FINISH SECCIONES MATERIAS==================

  // const getSections = async (id) => {
  //   const response = await SchoolsSectionsService.getSectionsWithGroups(id, 1)
  //   const items = new Map()
  //   levelsIds = []
  //   for (let index = 0; index < response.length; index++) {
  //     const element = response[index]
  //     const levels = await getLevels(element.levels, true)
  //     items.set(element.id, {
  //       id: element.id,
  //       idSection: element.id_section,
  //       name: element.name,
  //       namelevel: element.name_level,
  //       value: true,
  //       isExpanded: true,
  //       levels
  //     })
  //   }
  //   dispatch(changeLevels({ levelsSelected: levelsIds }))
  //   setSections(items)
  // }

  // const getLevels = async (levels, value) => {
  //   const items = new Map()
  //   // const ids = []
  //   for (let index = 0; index < levels.length; index++) {
  //     const element = levels[index]
  //     // const groups = await getGroups(element.groups, value)
  //     const groups = []
  //     items.set(element.id, {
  //       id: element.id,
  //       name: element.name,
  //       groups,
  //       value,
  //       isExpanded: false
  //     })
  //     console.log(element.id)
  //     // ids.push(element.id)
  //     if (value) {
  //       const newLevelsIDS = [...levelsIds, element.id]
  //       levelsIds = newLevelsIDS
  //     }
  //   }
  //   return items
  // }

  // const getLevelsSelected = async (levels, value) => {
  //   levelsIds = levelsStore.levelsSelected
  //   const items = new Map()
  //   const values = Array.from(levels.values())
  //   for (let index = 0; index < values.length; index++) {
  //     const element = values[index]
  //     // const updategroups = await getGroups(Array.from(element.groups.values()), value)
  //     const updategroups = []
  //     if (value === true) {
  //       const newLevelsIDS = [...levelsIds, element.id]
  //       levelsIds = newLevelsIDS
  //     } else {
  //       const newArr = levelsIds.filter(item => item !== element.id)
  //       levelsIds = newArr
  //     }
  //     dispatch(changeLevels({ levelsSelected: levelsIds }))
  //     items.set(element.id, {
  //       id: element.id,
  //       name: element.name,
  //       groups: updategroups,
  //       value,
  //       isExpanded: false
  //     })
  //   }
  //   return items
  // }

  // const selectAll = async () => {
  //   const newValue = !isSelectAll
  //   const items = new Map()
  //   const sectionsCurrent = Array.from(sections.values())
  //   for (let index = 0; index < sectionsCurrent.length; index++) {
  //     levelsIds = levelsStore.levelsSelected
  //     const element = sectionsCurrent[index]
  //     const levels = await getLevelsSelected(element.levels, newValue)
  //     dispatch(changeLevels({ levelsSelected: levelsIds }))
  //     items.set(element.id, {
  //       id: element.id,
  //       id_section: element.id_section,
  //       name: element.name,
  //       name_level: element.name_level,
  //       value: newValue,
  //       isExpanded: true,
  //       levels
  //     })
  //   }
  //   setSections(items)
  //   setIsSelectAll(newValue)
  //   if (!newValue) {
  //     dispatch(changeLevels({ levelsSelected: [] }))
  //   }
  //   // else {
  //   //   dispatch(changeLevels({ levelsSelected: levelsIds }))
  //   // }
  // }
  // const selectOneSection = async (sectionkey) => {
  //   levelsIds = levelsStore.levelsSelected
  //   const tempSections = new Map(sections)
  //   const select = tempSections.get(sectionkey)
  //   const newValue = !select.value
  //   const levels = await getLevelsSelected(select.levels, newValue)
  //   select.value = newValue
  //   select.levels = levels
  //   setSections(tempSections)
  //   dispatch(changeLevels({ levelsSelected: levelsIds }))
  // }
  // const selectOneLevel = async (sectionkey, levelKey) => {
  //   levelsIds = levelsStore.levelsSelected
  //   const tempSections = new Map(sections)
  //   const sectionLevel = tempSections.get(sectionkey)
  //   const levelsTemp = new Map(sectionLevel.levels)
  //   const selectLevel = levelsTemp.get(levelKey)

  //   // const updategroups = await getGroups(Array.from(selectLevel.groups.values()), !selectLevel.value)
  //   selectLevel.value = !selectLevel.value
  //   // selectLevel.groups = updategroups
  //   selectLevel.groups = []

  //   if (selectLevel.value === true) {
  //     const newLevelsIDS = [...levelsIds, selectLevel.id]
  //     levelsIds = newLevelsIDS
  //   } else {
  //     const newArr = levelsIds.filter(item => item !== selectLevel.id)
  //     levelsIds = newArr
  //   }
  //   dispatch(changeLevels({ levelsSelected: levelsIds }))
  //   setSections(tempSections)
  // }

  // const expandedLevel = (key, keyLevel) => {
  //   const tempSections = new Map(sections)
  //   const sectionLevel = tempSections.get(key)
  //   const levelsTemp = new Map(sectionLevel.levels)
  //   const selectLevel = levelsTemp.get(keyLevel)
  //   selectLevel.isExpanded = !selectLevel.isExpanded
  //   setSections(tempSections)
  // }

  // RECORRE SECCIONES Y GUARDA LOS GRADOS y MATERIAS DE UN GRADO PARA ENVIAR  A API
  // const getLevelsFormat = async () => {
  //   const items = []
  //   const sectionsCurrent = Array.from(sections.keys())
  //   for (let index = 0; index < sectionsCurrent.length; index++) {
  //     const element = sections.get(sectionsCurrent[index])
  //     const elementMatters = sectionsMatters.get(sectionsCurrent[index])

  //     if (element.value === true) {
  //       const levels = Array.from(element.levels.keys())
  //       for (let index = 0; index < levels.length; index++) {
  //         const level = element.levels.get(levels[index])
  //         const levelMatter = elementMatters.levels.get(levels[index])

  //         if (level.value === true) {
  //           const groups = Array.from(level.groups.values())
  //           const matters = Array.from(levelMatter.matters.values())
  //           items.push({ id: level.id, groups, matters })
  //         }
  //       }
  //     }
  //   }
  //   return items
  // }

  const createCycle = async (start, end, active, getDataAll) => {
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
    // if (getDataAll === true) {
    //   const response = await SchoolsGroupsService.getGroups(idSchool, 1)
    //   await getGroups(response, true)
    //   await getMatters()
    // }
    getDataAll = getDataAll === undefined ? false : getDataAll
    const sendGroups = Array.from(groupsFormat.values())
    const sendMatters = Array.from(matters.values())
    // if (!sendGroups || sendGroups.length === 0) {
    //   // throw new Error('Selecciona minimo una sección')
    //   const response = await SchoolsGroupsService.getGroups(idSchool, 1)
    //   await getGroups(response, true)
    //   await createCycle()
    //   return
    // }
    // if (!sendMatters || sendMatters.length === 0) {
    //   // throw new Error('Selecciona minimo una materia')
    //   await getMatters()
    //   await createCycle()
    //   return
    // }
    const objectData = {
      start,
      end,
      groups: sendGroups,
      matters: sendMatters,
      active,
      all: getDataAll
    }
    debugger
    await SchoolsCyclesService.createCycle(idSchool, objectData)
  }

  // ============= NEW ===============
  const getGroups = async (groups, value) => {
    const items = new Map()
    for (let index = 0; index < groups.length; index++) {
      const element = groups[index]
      items.set(element.id, {
        id: element.id,
        name: element.name,
        name_level: element.name_level,
        id_level: element.id_level,
        name_section: element.name_section,
        id_section: element.id_section,
        value
      })
    }
    // alert(items.size)
    await new Promise((resolve) => {
      setGroups(items)
      resolve()
    })
    // setGroups(items)
    setTotalGroupsSelected(items.size)
    setGroupsView([])
  }
  const selectOrDeselectGroup = (key, sectionId) => {
    const items = new Map(groupsFormat)
    const select = items.get(key)
    const newValue = !select.value
    select.value = newValue
    const temp = totalGroupsSelected
    if (!newValue) {
      const operation = temp - 1
      setTotalGroupsSelected(operation)
    } else {
      const operation = temp + 1
      setTotalGroupsSelected(operation)
    }
    setGroups(items)
    changeSelectViewGroups(sectionId)
  }

  const getMatters = async () => {
    const idSchool = localStorage.getItem(lsSchoolId)
    const response = await SchoolsMattersService.getMatters(idSchool, 1)
    const items = new Map()
    const itemsLevels = new Map()

    for (let index = 0; index < response.length; index++) {
      const element = response[index]
      items.set(element.id, {
        id: element.id,
        name: element.name,
        name_level: element.name_level,
        id_level: element.id_level,
        name_section: element.name_section,
        id_section: element.id_section,
        value: true
      })
      itemsLevels.set(element.id_level, element.id_level)
    }
    setMatters(items)
    setLevelsSelected(itemsLevels)
    setTotalMattersSelected(items.size)
  }
  const selectOrDeselectMatter = (key, sectionId) => {
    const items = new Map(matters)
    const select = items.get(key)
    const result = validateLevelExistsInGroups(select.id_level)
    let newValue
    // VALIDA SI EL ID DE GRADO EXISTE EN LOS SELECCIONADOS EN LOS GRUPOS
    // SI NO EXISTE NO DEBERIA PODER SELECCIONARSE
    if (result) {
      newValue = !select.value
    } else {
      newValue = false
      toast.error(`No se puede seleccionar porque no tiene ningun grupo seleccionado del grado ${select.name_level} de ${select.name_section}`)
    }
    const temp = totalMattersSelected
    if (!newValue) {
      const operation = temp - 1
      setTotalMattersSelected(operation)
    } else {
      const operation = temp + 1
      setTotalMattersSelected(operation)
    }
    select.value = newValue
    setMatters(items)
    changeSelectViewMatters(sectionId)
  }
  const changeSelectViewGroups = async (value) => {
    const items = new Map()
    const itemsLevels = new Map(levelsSelected)
    const keys = Array.from(groupsFormat.keys())
    let totalFalseElements = 0
    // let totalSectionElements = 0

    for (let index = 0; index < keys.length; index++) {
      const element = groupsFormat.get(keys[index])
      if (element.id_section.toString() === value.toString()) {
        items.set(element.id, {
          id: element.id,
          name: element.name,
          name_level: element.name_level,
          id_level: element.id_level,
          name_section: element.name_section,
          id_section: element.id_section,
          value: element.value
        })
        // totalSectionElements = totalSectionElements + 1
        if (!element.value) {
          totalFalseElements = totalFalseElements + 1
          itemsLevels.delete(element.id_level)
        } else {
          itemsLevels.set(element.id_level, element.id_level)
        }
      }
    }
    // si todos los elementos de la seccion son false entonces el checkbox se pone en false
    // debugger
    console.log('totalFalseElements GRUPOS ' + totalFalseElements.toString())

    if (totalFalseElements > 0) {
      setValueAllCheckBox(false)
    } else {
      setValueAllCheckBox(true)
    }
    setGroupsView(items)
    setLevelsSelected(itemsLevels)
  }
  const changeSelectViewMatters = async (value) => {
    const items = new Map()
    const keys = Array.from(matters.keys())
    let totalFalseElements = 0

    for (let index = 0; index < keys.length; index++) {
      const element = matters.get(keys[index])
      if (element.id_section.toString() === value.toString()) {
        // VALIDA SI EL ID DE GRADO EXISTE EN LOS SELECCIONADOS EN LOS GRUPOS
        // SI NO EXISTE NO DEBERIA PODER SELECCIONARSE
        const result = validateLevelExistsInGroups(element.id_level)
        // debugger
        let newValue
        if (result) {
          newValue = element.value
        } else {
          newValue = false
        }
        items.set(element.id, {
          id: element.id,
          name: element.name,
          name_level: element.name_level,
          id_level: element.id_level,
          name_section: element.name_section,
          id_section: element.id_section,
          value: newValue
        })
        if (!newValue) {
          totalFalseElements = totalFalseElements + 1
        }
      }
    }
    console.log('totalFalseElements ' + totalFalseElements.toString())
    if (totalFalseElements > 0) {
      setValueAllCheckBox(false)
    } else {
      setValueAllCheckBox(true)
    }
    setMattersView(items)
  }
  const selectOrDeselectGroupAllSection = async (idSection) => {
    // RECORRE TODOS LOS GRUPOS Y DESELECCIONA O SELECCIONA TODOS LOS ELEMENTOS
    // QUE PERTENECEN A LA SECCION  PASADA COMO PARAMETRO
    const items = new Map(groupsFormat)
    const itemsLevels = new Map(levelsSelected)
    const keys = Array.from(items.keys())
    let newValue = valueAllCheckBox
    let temp = totalGroupsSelected
    for (let index = 0; index < keys.length; index++) {
      const select = groupsFormat.get(keys[index])
      if (select.id_section.toString() === idSection.toString()) {
        newValue = !valueAllCheckBox
        select.value = newValue
        if (!select.value) {
          temp = temp - 1
          itemsLevels.delete(select.id_level)
          // setTotalGroupsSelected(operation)
        } else {
          itemsLevels.set(select.id_level, select.id_level)
          temp = temp + 1
          // setTotalGroupsSelected(operation)
        }
      }
    }
    setTotalGroupsSelected(temp)
    setGroups(items)
    setValueAllCheckBox(newValue)
    changeSelectViewGroups(idSection)
    setLevelsSelected(itemsLevels)
  }

  const selectOrDeselectMattersAllSection = async (idSection) => {
    // RECORRE TODOS LAS MATERIAS Y DESELECCIONA O SELECCIONA TODOS LOS ELEMENTOS
    // QUE PERTENECEN A LA SECCION  PASADA COMO PARAMETRO
    const items = new Map(matters)
    const keys = Array.from(items.keys())
    let newValue = valueAllCheckBox
    let resultValidate
    let temp = totalMattersSelected
    for (let index = 0; index < keys.length; index++) {
      const select = matters.get(keys[index])
      if (select.id_section.toString() === idSection.toString()) {
        // VALIDA SI EL ID DE GRADO EXISTE EN LOS SELECCIONADOS EN LOS GRUPOS
        // SI NO EXISTE NO DEBERIA PODER SELECCIONARSE
        resultValidate = validateLevelExistsInGroups(select.id_level)
        if (resultValidate) {
          newValue = !valueAllCheckBox
        } else {
          newValue = false
        }

        select.value = newValue
        if (!select.value) {
          temp = temp - 1
          // setTotalGroupsSelected(operation)
        } else {
          temp = temp + 1
          // setTotalGroupsSelected(operation)
        }
      }
    }
    setTotalMattersSelected(temp)
    setMatters(items)
    setValueAllCheckBox(newValue)
    if (!resultValidate) {
      toast.error('No se puede seleccionar porque no tiene ningun grupo seleccionado de la seccion filtrada')
    }
    changeSelectViewMatters(idSection)
  }

  const validateLevelExistsInGroups = (idLevel) => {
    const existeClave = levelsSelected.has(idLevel)
    return existeClave
  }

  useEffect(() => {
    // Limpia
    return () => {
    }
  }, [])

  return {
    // getSections,
    // selectAll,
    setIsSelectAll,
    // selectOneSection,
    // selectOneLevel,
    // expandedLevel,
    // sections,
    isSelectAll,
    // sectionsMatters,
    // getSectionsMattersByLevels,
    // selectOneMatter,
    // getLevelsFormat,
    createCycle,
    getGroups,
    groupsFormat,
    selectOrDeselectGroup,
    totalGroupsSelected,
    getMatters,
    matters,
    selectOrDeselectMatter,
    groupsView,
    setGroupsView,
    setMattersView,
    changeSelectViewGroups,
    mattersView,
    changeSelectViewMatters,
    totalMattersSelected,
    selectOrDeselectGroupAllSection,
    valueAllCheckBox,
    setValueAllCheckBox,
    selectOrDeselectMattersAllSection
  }
}

export default useCreateCycleHandling
