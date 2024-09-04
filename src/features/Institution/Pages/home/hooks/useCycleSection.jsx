import { useEffect, useState } from 'react'

import { lsSchoolId } from '@/Common/constants/localStorageConstants'
import SchoolsCyclesService from '@/services/schoolsCycles.service'
import SchoolsSectionsService from '@/services/schoolsSections.service'

/**
 * HOOK QUE MANEJA  LOGICA PARA  EDITAR  Y MOSTRAR SECCION DE UN CICLO
 * @param {string} formMethods - funciones de react hooks a utilizar  en  el hook, ejemplo setValue.
 */
const useCycleSectionHandling = (formMethods) => {
  const { setValue, getValues, setError, reset } = formMethods

  const [sectionSelected, setSectionSelected] = useState({})
  const [levelsSections, setLevelsSection] = useState([])

  const schoolId = localStorage.getItem(lsSchoolId)
  const [selectLevelKey, setKeySelectLevel] = useState('')
  const [groupsSelected, setGroupsSelected] = useState([])
  const [mattersSelected, setMattersSelected] = useState([])

  const getDetail = async (idCycle, idSection) => {
    const response = await SchoolsCyclesService.getDetailSectionByCycle(schoolId, idCycle, idSection)
    setSectionSelected(response)
    setValue('name', response.name)
    setValue('maximum_rating', response.maximum_rating)
    setValue('academic_term', response.academic_term)
    setValue('academic_term_count', response.academic_term_count)
    if (response.levels.length > 0) {
      const keyFormart = response.id + '_' + 0
      setKeySelectLevel(keyFormart)
      setGroupsSelected(response.levels[0].groups)
      setMattersSelected(response.levels[0].matters)
    }
  }

  const loadGroupsSection = async () => {
    const response = await SchoolsSectionsService.getLevels(schoolId, sectionSelected.id)
    const levelsCurrent = sectionSelected.levels
    const levelsForView = []
    for (let index = 0; index < response.length; index++) {
      const elementSelect = response[index]
      const elementoEncontrado = levelsCurrent.find(element => element.id_level === elementSelect.id)
      if (!elementoEncontrado) {
        levelsForView.push(elementSelect)
      }
    }
    setLevelsSection(levelsForView)
  }

  const selectedGroupsAndMattersByLevel = async (index) =>{
    const key = sectionSelected.id
    const levels = sectionSelected.levels
    const level = levels[index]
    setGroupsSelected(level.groups)
    setMattersSelected(level.matters)
    setKeySelectLevel(key + '_' + index)
  }

  useEffect(() => {
    // Limpia
    return () => {
      setSectionSelected({})
    }
  }, [])

  return {
    sectionSelected,
    levelsSections,
    groupsSelected,
    mattersSelected,
    selectLevelKey,
    getDetail,
    loadGroupsSection,
    selectedGroupsAndMattersByLevel
  }
}

export default useCycleSectionHandling
