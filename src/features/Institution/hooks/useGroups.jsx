import { useState } from 'react'

import { lsSchoolId } from '@/common/constants/localStorageConstants'
import SchoolsGroupsService from '@/services/schoolsGroups.service'

/**
 * HOOK QUE MANEJA  LOGICA PARA  CREAR, EDITAR, BUSCAR O TRAER GRUPOS DE UN GRADO
 * @param {string} formMethods - funciones de react hooks a utilizar  en  el hook, ejemplo setValue.
 *
 */

const useCreateGroupHandling = (formMethods, handleErrors) => {
  const [groups, setGroups] = useState([])
  const [groupsSearch, setGroupsSearch] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [groupsForCreate, setGroupsForCreate] = useState(new Map())
  const { setValue, getValues, setError } = formMethods

  const getGroups = async (idLevel) => {
    const idSchool = localStorage.getItem(lsSchoolId)
    const response = await SchoolsGroupsService.getGroupsByLevel(idSchool, idLevel)
    setGroups(response)
  }

  const searchAllGroups = async (idLevel, value) => {
    setIsSearch(true)
    const idSchool = localStorage.getItem(lsSchoolId)
    const response = await SchoolsGroupsService.searchGroupsByLevel(idSchool, idLevel, value)
    setGroupsSearch(response)
    setIsSearch(true)
  }
  const loadNewGroups = async () => {
    const items = new Map()
    if (groups.length === 0) {
      items.set(0, { name: 'A' })
      items.set(1, { name: 'B' })
      items.set(2, { name: 'C' })
      items.set(3, { name: 'D' })
      items.set(4, { name: 'E' })
      setValue(`name-${0}`, 'A')
      setValue(`name-${1}`, 'B')
      setValue(`name-${2}`, 'C')
      setValue(`name-${3}`, 'D')
      setValue(`name-${4}`, 'E')
      setGroupsForCreate(items)
    } else {
      items.set(0, { name: '' })
      setValue(`name-${0}`, '')
      setGroupsForCreate(items)
    }
  }

  const deleteNewGroup = (key) => {
    const items = new Map(groupsForCreate)
    if (items.size === 1) {
      throw new Error('No se puede eliminar el unico grupo')
    }
    items.delete(key)
    setValue(`name-${key}`, '')
    setGroupsForCreate(items)
  }
  const addNewGroup = (key) => {
    const items = new Map(groupsForCreate)
    const keyCurrent = key
    const nameCurrent = getValues(`name-${keyCurrent}`)
    if (nameCurrent === '') {
      setError(`name-${keyCurrent}`, { type: 'manual', message: 'El nombre no puede estar vacio' })
      return
    }
    setError(`name-${keyCurrent}`, { type: 'manual', message: '' })
    items.set(keyCurrent + 1, { name: '' })
    setValue(`name-${keyCurrent + 1}`, '')
    setGroupsForCreate(items)
  }

  const saveGroups = async (schoolId, idLevel) => {
    const groupsForSave = []
    const keys = Array.from(groupsForCreate.keys())
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      const field = getValues(`name-${key}`)
      if (field === '') {
        setError(`name-${key}`, { type: 'manual', message: 'El nombre no puede estar vacio' })
      }
      setError(`name-${key}`, { type: 'manual', message: '' })
      groupsForSave.push({ name: field })
    }
    const data = {
      id_level: idLevel,
      groups: groupsForSave
    }
    await SchoolsGroupsService.createGroup(schoolId, data)
    await getGroups(idLevel)
  }

  return {
    getGroups,
    isSearch,
    groupsSearch,
    searchAllGroups,
    loadNewGroups,
    deleteNewGroup,
    groupsForCreate,
    groups,
    addNewGroup,
    saveGroups
  }
}

export default useCreateGroupHandling
