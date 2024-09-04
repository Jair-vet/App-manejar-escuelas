import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { lsModules } from '../constants/localStorageConstants'

const useCurrentUserHandling = () => {
  const userState = useSelector((state) => state.user)
  const [modules, setModules] = useState([])

  const loadModules = (index, tabs) => {
    let modulesSave = userState.modules
    if (modulesSave.length === 0) {
      const resp = JSON.parse(localStorage.getItem(lsModules) ?? [])
      modulesSave = resp
    }
    setModules(modulesSave)
  }
  // const loadName = (index, tabs) => {
  // }
  useEffect(() => {
  }, [])

  return {
    modules,
    loadModules
  }
}

export default useCurrentUserHandling
