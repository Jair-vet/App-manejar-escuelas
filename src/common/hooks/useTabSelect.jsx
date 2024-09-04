import { useState, useEffect } from 'react'

const useTabSelectedHandling = () => {
  const [newTabs, setTabs] = useState([])
  const [selectTab, setSelectTab] = useState(0)

  const changedSelectTab = (index, tabs) => {
    const tabsTemp = tabs
    tabsTemp.forEach(element => {
      if (element.isSelect) {
        element.isSelect = false
      }
    })
    tabsTemp[index].isSelect = true
    setTabs(tabsTemp)
    setSelectTab(index)
  }

  useEffect(() => {
    // Limpia
    return () => {
      setTabs([])
    }
  }, [])

  return {
    newTabs,
    selectTab,
    changedSelectTab
  }
}

export default useTabSelectedHandling
