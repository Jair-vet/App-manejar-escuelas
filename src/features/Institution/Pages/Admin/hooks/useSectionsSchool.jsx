import { useState, useEffect } from 'react'

import SchoolsSectionsService from '@/services/schoolsSections.service'

const useSectionsSchoolHandling = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  const loadItems = async (schoolId, page) => {
    try {
      const response = await SchoolsSectionsService.getSections(schoolId, page)
      setItems(response)
      setError(null)
      return response
    } catch (e) {
      console.error(e)
      setError(e)
    }
  }

  useEffect(() => {
    // Limpia
    return () => {
      setItems([])
    }
  }, [])

  return {
    items,
    setItems,
    error,
    loadItems
  }
}

export default useSectionsSchoolHandling
